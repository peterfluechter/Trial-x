"""
Tests für die NLP‑Komponenten.
"""

from src.nlp.events import classify_events


def test_classify_events() -> None:
    text = "The company issued a profit warning and announced a merger."
    events = classify_events(text)
    assert "earnings warning" in events
    assert "merger" in events
