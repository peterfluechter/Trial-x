"""
article_processor.py
====================

Dieses Modul stellt Funktionen bereit, um Artikel anhand ihrer URL
herunterzuladen und den Text sowie Metadaten zu extrahieren. Es nutzt
``newspaper3k`` für die Extraktion.
"""

from __future__ import annotations

import logging
from dataclasses import dataclass
from datetime import datetime
from typing import Optional

from newspaper import Article

logger = logging.getLogger(__name__)


@dataclass
class ArticleContent:
    """Repräsentiert den extrahierten Inhalt eines Artikels."""

    url: str
    title: str
    text: str
    authors: list[str]
    publish_date: Optional[datetime]


def download_article(url: str) -> ArticleContent:
    """Lädt einen Artikel von der angegebenen URL herunter.

    Args:
        url: Ziel‑URL des Artikels.

    Returns:
        Ein ``ArticleContent``‑Objekt mit Titel, Text, Autoren und
        Veröffentlichungsdatum.
    """
    logger.info("Lade Artikel von %s", url)
    article = Article(url)
    article.download()
    article.parse()
    return ArticleContent(
        url=url,
        title=article.title or "",
        text=article.text or "",
        authors=article.authors or [],
        publish_date=article.publish_date,
    )
