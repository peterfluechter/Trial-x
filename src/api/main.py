"""
main.py
=======

Definiert die FastAPI‑Anwendung für das Frühindikator‑Tool. Die API
ermöglicht das Starten der Dateningestion, die Verarbeitung einzelner
Artikel sowie den Abruf gespeicherter Signale.
"""

from __future__ import annotations

import logging
from typing import List, Optional

from fastapi import Depends, FastAPI, HTTPException

from ..db import crud
from ..db.database import get_db
from ..db.models import Base, Article, Signal
from ..ingestion.rss_fetcher import fetch_rss_feed
from ..ingestion.article_processor import download_article
from ..nlp.pipeline import process_text
from ..nlp.events import classify_events
from ..scoring.scoring import heuristic_score
from . import schemas

logger = logging.getLogger(__name__)

app = FastAPI(title="Economic Signals API")


@app.post("/refresh", summary="Aktualisiert die Datenbasis")
def refresh_data(db=Depends(get_db)) -> dict:
    """Lädt neue Artikel aus vordefinierten Feeds und verarbeitet sie.

    In einer produktiven Umgebung sollte diese Funktion als asynchroner
    Task umgesetzt werden. Hier erfolgt die Verarbeitung synchron und
    dient lediglich als Prototyp.
    """
    feed_urls = [
        "https://www.handelsblatt.com/rss",
        "https://www.faz.net/rss/aktuell/",  # Beispiele; in Produktion konfigurieren
    ]
    processed = 0
    for url in feed_urls:
        for entry in fetch_rss_feed(url):
            if crud.get_article_by_url(db, entry.link):
                continue  # bereits verarbeitet
            article_content = download_article(entry.link)
            article = crud.create_article(
                db=db,
                url=article_content.url,
                title=article_content.title,
                authors=", ".join(article_content.authors),
                text=article_content.text,
                published_at=article_content.publish_date,
            )
            nlp_result = process_text(article.text)
            events = classify_events(article.text)
            score = heuristic_score(nlp_result["sentiment"], events)
            crud.create_signal(
                db=db,
                article=article,
                sentiment_label=nlp_result["sentiment"][0]["label"],
                sentiment_score=float(nlp_result["sentiment"][0]["score"]),
                events=events,
                score=score,
            )
            processed += 1
    return {"processed": processed}


@app.post("/process/{article_id}", response_model=schemas.SignalOut)
def process_article(article_id: int, db=Depends(get_db)) -> schemas.SignalOut:
    """Verarbeitet einen existierenden Artikel erneut und erstellt ein neues Signal."""
    article = db.query(Article).get(article_id)
    if not article:
        raise HTTPException(status_code=404, detail="Artikel nicht gefunden")
    nlp_result = process_text(article.text)
    events = classify_events(article.text)
    score = heuristic_score(nlp_result["sentiment"], events)
    signal = crud.create_signal(
        db=db,
        article=article,
        sentiment_label=nlp_result["sentiment"][0]["label"],
        sentiment_score=float(nlp_result["sentiment"][0]["score"]),
        events=events,
        score=score,
    )
    return schemas.SignalOut.from_orm(signal)


@app.get("/signals", response_model=List[schemas.SignalOut])
def list_signals(
    limit: int = 100,
    offset: int = 0,
    db=Depends(get_db),
) -> List[schemas.SignalOut]:
    """Listet gespeicherte Signale mit Paginierung."""
    signals = crud.list_signals(db, limit=limit, offset=offset)
    return [schemas.SignalOut.from_orm(sig) for sig in signals]
