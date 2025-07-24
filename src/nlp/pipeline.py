"""
pipeline.py
===========

Dieses Modul definiert die NLP‑Pipeline zur Verarbeitung von Artikeln.
Es verwendet spaCy für die linguistische Grundverarbeitung und das
FinBERT‑Modell zur Sentiment‑Analyse. Darüber hinaus können regelbasierte
Klassifikatoren integriert werden.
"""

from __future__ import annotations

import logging
from functools import lru_cache
from typing import Any, Dict

import spacy
from spacy.language import Language
from transformers import pipeline as hf_pipeline

logger = logging.getLogger(__name__)


@lru_cache(maxsize=1)
def get_spacy_model() -> Language:
    """Lädt das spaCy‑Modell einmalig.

    Returns:
        Ein geladenes spaCy‑Modell.
    """
    try:
        nlp = spacy.load("en_core_web_lg")
    except OSError:
        logger.error(
            "Das spaCy‑Modell 'en_core_web_lg' ist nicht installiert. "
            "Bitte führen Sie `python -m spacy download en_core_web_lg` aus."
        )
        raise
    return nlp


@lru_cache(maxsize=1)
def get_sentiment_model():
    """Lädt das FinBERT‑Sentiment‑Pipeline von HuggingFace.

    Returns:
        Eine transformers‑Pipeline zur Sentiment‑Analyse.
    """
    return hf_pipeline(
        "sentiment-analysis", model="ProsusAI/finbert", tokenizer="ProsusAI/finbert"
    )


def process_text(text: str) -> Dict[str, Any]:
    """Verarbeitet den gegebenen Text durch die NLP‑Pipeline.

    Args:
        text: Der zu analysierende Text.

    Returns:
        Ein Wörterbuch mit Token, Sentiment‑Score und anderen Merkmalen.
    """
    nlp = get_spacy_model()
    finbert = get_sentiment_model()

    doc = nlp(text)
    sentiment = finbert(text[:512])  # FinBERT verarbeitet maximal 512 Token

    return {
        "tokens": [token.text for token in doc],
        "sentences": [sent.text for sent in doc.sents],
        "entities": [(ent.text, ent.label_) for ent in doc.ents],
        "sentiment": sentiment,
    }
