"""
models.py
=========

Definiert die ORM‑Modelle für Artikel und Signale.
"""

from __future__ import annotations

from datetime import datetime
from typing import List, Optional

from sqlalchemy import Column, DateTime, Float, ForeignKey, Integer, String, Text
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.orm import declarative_base, relationship


Base = declarative_base()


class Article(Base):  # type: ignore[call-arg]
    __tablename__ = "articles"

    id: int = Column(Integer, primary_key=True, index=True)
    url: str = Column(String, unique=True, nullable=False)
    title: str = Column(String, nullable=False)
    authors: Optional[str] = Column(String)
    text: str = Column(Text, nullable=False)
    published_at: Optional[datetime] = Column(DateTime)
    created_at: datetime = Column(DateTime, default=datetime.utcnow)

    signals: List["Signal"] = relationship("Signal", back_populates="article")


class Signal(Base):  # type: ignore[call-arg]
    __tablename__ = "signals"

    id: int = Column(Integer, primary_key=True, index=True)
    article_id: int = Column(Integer, ForeignKey("articles.id"), nullable=False)
    sentiment_label: str = Column(String)
    sentiment_score: float = Column(Float)
    events: Optional[dict] = Column(JSONB)
    score: float = Column(Float)
    created_at: datetime = Column(DateTime, default=datetime.utcnow)

    article: Article = relationship("Article", back_populates="signals")
