"""
crud.py
=======

Stellt grundlegende CRUD‑Operationen für Artikel und Signale bereit.
Diese Funktionen kapseln die Nutzung des SQLAlchemy‑ORMs.
"""

from __future__ import annotations

from typing import List, Optional

from sqlalchemy.orm import Session

from . import models


def get_article_by_url(db: Session, url: str) -> Optional[models.Article]:
    """Sucht einen Artikel anhand seiner URL."""
    return db.query(models.Article).filter(models.Article.url == url).first()


def create_article(
    db: Session,
    url: str,
    title: str,
    authors: str,
    text: str,
    published_at,
) -> models.Article:
    """Erstellt einen neuen Artikel und speichert ihn in der DB."""
    article = models.Article(
        url=url,
        title=title,
        authors=authors,
        text=text,
        published_at=published_at,
    )
    db.add(article)
    db.commit()
    db.refresh(article)
    return article


def create_signal(
    db: Session,
    article: models.Article,
    sentiment_label: str,
    sentiment_score: float,
    events: List[str],
    score: float,
) -> models.Signal:
    """Erstellt ein Signal für einen Artikel."""
    signal = models.Signal(
        article_id=article.id,
        sentiment_label=sentiment_label,
        sentiment_score=sentiment_score,
        events=events,
        score=score,
    )
    db.add(signal)
    db.commit()
    db.refresh(signal)
    return signal


def list_signals(
    db: Session,
    limit: int = 100,
    offset: int = 0,
) -> List[models.Signal]:
    """Liest eine Liste von Signalen aus der Datenbank."""
    return (
        db.query(models.Signal)
        .order_by(models.Signal.created_at.desc())
        .offset(offset)
        .limit(limit)
        .all()
    )
