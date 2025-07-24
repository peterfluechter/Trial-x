"""
tasks.py
========

Definiert Celery‑Tasks für die asynchrone Ausführung der Dateningestion und
Artikelverarbeitung. Diese Tasks können über die FastAPI oder einen
Scheduler (z. B. Celery Beat) ausgelöst werden.
"""

from __future__ import annotations

import logging
from celery import shared_task
from sqlalchemy.orm import Session

from .celery_app import celery_app
from .db.database import SessionLocal
from .db import crud
from .ingestion.rss_fetcher import fetch_rss_feed
from .ingestion.article_processor import download_article
from .nlp.pipeline import process_text
from .nlp.events import classify_events
from .scoring.scoring import heuristic_score

logger = logging.getLogger(__name__)


@shared_task
def refresh_task() -> int:
    """Asynchrone Celery‑Task zum Abrufen und Verarbeiten neuer Feeds."""
    db: Session = SessionLocal()
    try:
        feed_urls = [
            "https://www.handelsblatt.com/rss",
            "https://www.faz.net/rss/aktuell/",
        ]
        processed = 0
        for url in feed_urls:
            for entry in fetch_rss_feed(url):
                if crud.get_article_by_url(db, entry.link):
                    continue
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
        logger.info("%d Artikel verarbeitet", processed)
        return processed
    finally:
        db.close()


@shared_task
def process_article_task(article_id: int) -> int:
    """Verarbeitet einen Artikel asynchron und legt ein Signal an."""
    db: Session = SessionLocal()
    try:
        article = db.query(crud.models.Article).get(article_id)
        if not article:
            logger.warning("Artikel %s nicht gefunden", article_id)
            return 0
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
        return 1
    finally:
        db.close()
