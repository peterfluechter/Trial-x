"""
Tests für das Ingestion‑Modul.
"""

from src.ingestion.rss_fetcher import parse_date


def test_parse_date_none() -> None:
    assert parse_date(None) is None
