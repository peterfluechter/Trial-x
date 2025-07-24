"""
events.py
==========

Regelbasierte Event‑Klassifikation. Diese Komponente erkennt
wirtschaftsrelevante Ereignisse in Texten anhand einfacher
Schlüsselwortmuster. Für produktive Einsätze sollte dieses Regelwerk
umfassend gepflegt und bei Bedarf durch ML‑Modelle ergänzt werden.
"""

from __future__ import annotations

from typing import List, Optional


EVENT_RULES = {
    "earnings warning": ["gewinnwarnung", "profit warning", "lower guidance"],
    "merger": ["merger", "fusion", "übernahme", "acquisition"],
    "regulation": ["regulatory", "regulation", "behörde", "aufsicht"],
    "dividend": ["dividend", "ausschüttung"],
}


def classify_events(text: str) -> List[str]:
    """Klassifiziert Ereignisse in einem Text anhand von Schlüsselwörtern.

    Args:
        text: Der zu analysierende Text.

    Returns:
        Eine Liste von Ereigniskategorien, die im Text gefunden wurden.
    """
    text_lower = text.lower()
    detected: List[str] = []
    for category, keywords in EVENT_RULES.items():
        if any(keyword in text_lower for keyword in keywords):
            detected.append(category)
    return detected
