"""
sentiment.py
============

Wrapper‑Funktionen für die Sentiment‑Analyse mit FinBERT.
"""

from __future__ import annotations

from typing import Dict, List

from .pipeline import get_sentiment_model


def analyze_sentiment(text: str) -> List[Dict[str, float | str]]:
    """Führt die Sentiment‑Analyse eines Textes mit FinBERT durch.

    Args:
        text: Der zu analysierende Text.

    Returns:
        Eine Liste von Ergebnisobjekten mit Label und Score.
    """
    model = get_sentiment_model()
    return model(text[:512])
