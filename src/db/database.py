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
from sqlalchemy.orm import scoped_session, sessionmaker

DATABASE_URL = os.getenv(
    "DATABASE_URL",
    # Vorgabe fuer den Betrieb mit Docker Compose
    "postgresql+psycopg2://econ_user:econ_pass@db:5432/econ_signals",
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
