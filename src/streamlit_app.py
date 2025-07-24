"""
streamlit_app.py
================

Einfache Streamlit‑Oberfläche zur Anzeige der generierten Signale. Die
App stellt Filtermöglichkeiten bereit und visualisiert die Score‑Werte.
"""

from __future__ import annotations

import pandas as pd
import streamlit as st
from sqlalchemy.orm import Session

from .db.database import SessionLocal
from .db.models import Signal, Article


def load_signals(db: Session) -> pd.DataFrame:
    """Lädt Signale aus der Datenbank und konvertiert sie in ein DataFrame."""
    rows = (
        db.query(Signal, Article)
        .join(Article, Signal.article_id == Article.id)
        .order_by(Signal.created_at.desc())
        .all()
    )
    data = []
    for signal, article in rows:
        data.append(
            {
                "id": signal.id,
                "created_at": signal.created_at,
                "score": signal.score,
                "sentiment": signal.sentiment_label,
                "sentiment_score": signal.sentiment_score,
                "events": ", ".join(signal.events or []),
                "article_title": article.title,
                "article_url": article.url,
            }
        )
    return pd.DataFrame(data)


def main() -> None:
    st.set_page_config(page_title="Economic Signals", layout="wide")
    st.title("Frühindikator‑Dashboard")
    with SessionLocal() as db:
        df = load_signals(db)
    if df.empty:
        st.info("Keine Signale in der Datenbank. Bitte `/refresh` aufrufen.")
        return
    # Filter
    st.sidebar.header("Filter")
    sentiments = st.sidebar.multiselect(
        "Sentiment", options=df["sentiment"].unique().tolist(), default=[]
    )
    events = st.sidebar.multiselect(
        "Ereignisse", options=df["events"].unique().tolist(), default=[]
    )
    filtered = df
    if sentiments:
        filtered = filtered[filtered["sentiment"].isin(sentiments)]
    if events:
        filtered = filtered[filtered["events"].isin(events)]
    st.dataframe(filtered, use_container_width=True)
    st.line_chart(filtered.set_index("created_at")["score"])


if __name__ == "__main__":
    main()
