"""
Tests für die Scoring‑Funktionen.
"""

from econ_signals_tool.src.scoring.scoring import heuristic_score


def test_heuristic_score() -> None:
    sentiment = [{"label": "negative", "score": 0.9}]
    events = ["earnings warning"]
    score = heuristic_score(sentiment, events)
    # score = sentiment weight (1 * 0.9) + event weight (2)
    assert abs(score - 2.9) < 0.001
