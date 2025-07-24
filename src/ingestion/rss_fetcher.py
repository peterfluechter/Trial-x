"""
rss_fetcher.py
================

Dieses Modul enthält Funktionen zur Abfrage und Verarbeitung von RSS‑Feeds.
Es nutzt das Paket ``feedparser``, um Feeds zu laden und einfache
Metadaten wie Titel, Link, Veröffentlichungsdatum und Beschreibung zu
extrahieren.
"""

from __future__ import annotations

import logging
from dataclasses import dataclass
from datetime import datetime, timezone
from typing import List

import feedparser

logger = logging.getLogger(__name__)


@dataclass
class FeedEntry:
    """Datenklasse für einen RSS‑Feed‑Eintrag."""

    title: str
    link: str
    published: datetime | None
    summary: str


def parse_date(date_str: str | None) -> datetime | None:
    """Versucht, einen Datumsstring in ein ``datetime``‑Objekt zu parsen.

    ``feedparser`` liefert Datumsinformationen als Tupel. Dieses
    Hilfsfunktion konvertiert solche Werte zu einem ``datetime``.
    """
    if not date_str:
        return None
    try:
        # feedparser gibt ``published_parsed`` als time.struct_time zurück
        if isinstance(date_str, tuple):
            return datetime(*date_str[:6], tzinfo=timezone.utc)
        # fallback: parse ISO‑Strings
        return datetime.fromisoformat(date_str)
    except Exception:  # pragma: no cover
        logger.exception("Fehler beim Parsen des Datums: %s", date_str)
        return None


def fetch_rss_feed(url: str) -> List[FeedEntry]:
    """Lädt einen RSS‑Feed und gibt eine Liste von ``FeedEntry`` zurück.

    Args:
        url: URL des RSS‑Feeds.

    Returns:
        Liste von ``FeedEntry`` mit grundlegenden Informationen.
    """
    logger.info("Lade RSS‑Feed von %s", url)
    feed = feedparser.parse(url)
    entries: List[FeedEntry] = []
    for entry in feed.entries:
        published = None
        # ``published_parsed`` kann fehlen
        if hasattr(entry, "published_parsed") and entry.published_parsed:
            published = parse_date(entry.published_parsed)
        elif hasattr(entry, "published"):
            published = parse_date(entry.published)  # type: ignore[arg-type]
        entries.append(
            FeedEntry(
                title=getattr(entry, "title", ""),
                link=getattr(entry, "link", ""),
                published=published,
                summary=getattr(entry, "summary", ""),
            )
        )
    logger.debug("%d Einträge aus dem Feed gelesen", len(entries))
    return entries
