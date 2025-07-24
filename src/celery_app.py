"""
celery_app.py
=============

Konfiguriert die Celery‑Anwendung zur asynchronen Ausführung von Tasks.
Die Anwendung nutzt Redis als Message‑Broker und Backend.
"""

from __future__ import annotations

import os

from celery import Celery


def make_celery_app() -> Celery:
    broker_url = os.getenv("CELERY_BROKER_URL", "redis://redis:6379/0")
    backend_url = os.getenv("CELERY_RESULT_BACKEND", "redis://redis:6379/1")
    celery_app = Celery(
        "econ_signals",
        broker=broker_url,
        backend=backend_url,
        include=["src.tasks"],
    )
    celery_app.conf.task_routes = {"src.tasks.*": {"queue": "default"}}
    return celery_app


celery_app = make_celery_app()
