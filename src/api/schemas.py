"""
schemas.py
==========

Pydantic‑Modelle für die API. Diese Schemas stellen sicher, dass die
Eingaben und Ausgaben der API validiert werden.
"""

from __future__ import annotations

from datetime import datetime
from typing import Any, List, Optional

from pydantic import BaseModel, Field


class ArticleBase(BaseModel):
    url: str
    title: str
    authors: Optional[str]
    text: str
    published_at: Optional[datetime]


class ArticleInDB(ArticleBase):
    id: int
    created_at: datetime

    class Config:
        orm_mode = True


class SignalBase(BaseModel):
    sentiment_label: str
    sentiment_score: float
    events: List[str] = Field(default_factory=list)
    score: float


class SignalOut(SignalBase):
    id: int
    article: ArticleInDB
    created_at: datetime

    class Config:
        orm_mode = True
