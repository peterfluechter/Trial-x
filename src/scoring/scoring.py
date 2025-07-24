"""
scoring.py
==========

Berechnet Relevanzscores für extrahierte Signale auf Basis von
Sentiment‑Werten und erkannten Ereignissen.

Der heuristische Score kombiniert die Stärke des Sentiments mit der
Anzahl wichtiger Ereignisse. Negatives Sentiment und kritische
Ereignisse (z. B. Gewinnwarnungen) führen zu höheren Scores.
"""

from __future__ import annotations

from typing import List, Dict, Any


SENTIMENT_WEIGHTS = {
    "positive": -1.0,
    "neutral": 0.0,
    "negative": 1.0,
}

EVENT_WEIGHTS = {
    "earnings warning": 2.0,
    "merger": 1.5,
    "regulation": 1.0,
    "dividend": -0.5,
}


def heuristic_score(sentiment: List[Dict[str, Any]], events: List[str]) -> float:
    """Berechnet einen heuristischen Score basierend auf Sentiment und Ereignissen.

    Args:
        sentiment: Ergebnis der FinBERT‑Analyse.
        events: Liste erkannter Ereigniskategorien.

    Returns:
        Ein numerischer Score; positive Werte deuten auf negative Nachrichten
        hin (Alarm), negative Werte auf positive Nachrichten.
    """
    score = 0.0
    if sentiment:
        # FinBERT liefert eine Liste von Dicts mit 'label' und 'score'
        label = sentiment[0]["label"].lower()
        prob = float(sentiment[0]["score"])
        weight = SENTIMENT_WEIGHTS.get(label, 0.0)
        score += weight * prob
    for event in events:
        score += EVENT_WEIGHTS.get(event, 0.0)
    return score
