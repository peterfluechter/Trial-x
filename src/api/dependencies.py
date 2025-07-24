"""
dependencies.py
===============

Definiert Dependency‑Funktionen für FastAPI, z. B. Bereitstellung der
Datenbank‑Session.
"""

from __future__ import annotations

from typing import Generator

from fastapi import Depends

from ..db.database import get_db


def get_db_session() -> Generator:
    """Wrapper für die Datenbank‑Session als FastAPI‑Dependency."""
    yield from get_db()
