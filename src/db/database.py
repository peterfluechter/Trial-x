"""
database.py
===========

Stellt die Verbindung zur PostgreSQL‑Datenbank über SQLAlchemy her.
Unterstützt sowohl synchrone als auch asynchrone Sessions.
"""

from __future__ import annotations

import os
from typing import Generator

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, scoped_session


DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "postgresql+psycopg2://econ_user:econ_pass@db:5432/econ_signals",  # default for Docker
)

# Engine für synchrone Nutzung
engine = create_engine(DATABASE_URL, pool_pre_ping=True)

# Session Factory
SessionLocal = scoped_session(
    sessionmaker(autocommit=False, autoflush=False, bind=engine)
)


def get_db() -> Generator:
    """Stellt eine Datenbank‑Session als Generator bereit.

    Diese Funktion wird als Dependency in FastAPI verwendet.
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
