# Frühindikator‑Tool für wirtschaftliche Signale

Dieses Projekt ist ein webbasiertes Frühindikator‑System, das aus verschiedenen
Datenquellen Wirtschaftsinformationen extrahiert, durch eine NLP‑Pipeline
anreichert und mittels heuristischer sowie optional maschinell erlernter
Scoring‑Verfahren bewertet. Das Ziel ist es, anhand von Nachrichten und
Unternehmensmeldungen frühzeitig Hinweise auf Marktentwicklungen zu erkennen.

## Funktionsumfang

1. **Daten‑Ingestion**: RSS‑Feeds werden mit Hilfe von **feedparser**
   abgerufen, einzelne Artikel über die Bibliothek **newspaper3k**
   heruntergeladen und geparst.
2. **NLP‑Pipeline**: Für die Textanalyse wird ein erweiterter
   spaCy‑Pipeline mit dem Modell `en_core_web_lg` eingesetzt. Die
   Sentiment‑Analyse erfolgt mit **FinBERT**, eine regelbasierte
   Event‑Erkennung identifiziert relevante Ereignisse wie
   Gewinnwarnungen, Übernahmen oder regulatorische Änderungen.
3. **Scoring**: Ein heuristischer Score berechnet die Relevanz der
   identifizierten Signale. Optional kann ein ML‑Modell trainiert
   werden, um das Scoring zu verbessern.
4. **Speicherung**: Alle Signale und Metadaten werden in einer
   PostgreSQL‑Datenbank mittels SQLAlchemy‑ORM persistiert.
5. **Backend‑API**: Eine FastAPI‑Anwendung stellt Endpunkte zur
   Aktualisierung der Daten (`/refresh`), zur Einzelverarbeitung
   (`/process/{id}`) und zum Abruf aggregierter Signale (`/signals`)
   bereit.
6. **Frontend‑Prototyp**: Über eine **Streamlit**‑App können die
   Signale gefiltert, als Tabelle dargestellt und anhand von
   Kursvisualisierungen analysiert werden.
7. **Asynchrone Tasks**: Zur zeitgesteuerten Ausführung der
   Ingestion‑ und NLP‑Prozesse kommt **Celery** zum Einsatz.
8. **Deployment**: Das komplette System wird mit **Docker Compose**
   orchestriert. Eine GitHub‑Actions‑Pipeline führt Tests, Linting
   sowie den automatisierten Build und das Deployment durch.

## Installation

1. Klonen Sie das Repository und wechseln Sie in das Projektverzeichnis:

   ```bash
   git clone <repo-url>
   cd econ_signals_tool
   ```

2. Erstellen und aktivieren Sie ein virtuelles Environment und
   installieren Sie die Abhängigkeiten:

   ```bash
   python3 -m venv .venv
   source .venv/bin/activate
   pip install --upgrade pip
   pip install -r requirements.txt
   ```

3. Starten Sie die Anwendung im Entwicklungsmodus:

   ```bash
   # Backend API
   uvicorn src.api.main:app --reload

   # Streamlit‑Frontend
   streamlit run src/streamlit_app.py
   ```

4. Für die Nutzung der asynchronen Tasks starten Sie zusätzlich einen
   Celery‑Worker. Dazu ist ein laufender Redis‑Dienst notwendig:

   ```bash
   celery -A src.tasks worker --loglevel=info
   ```

## Nutzung

1. **Daten aktualisieren**: Der Endpunkt `/refresh` startet die
   Ingestion neuer Artikel und deren Verarbeitung.
2. **Einzelverarbeitung**: Über `/process/{id}` kann ein bestimmter
   Artikel nachverarbeitet werden, z. ‑ B. wenn er nachträglich
   klassifiziert werden soll.
3. **Signale abrufen**: Über `/signals` lassen sich die
   gespeicherten Signale abfragen. Parameter ermöglichen Filter
   hinsichtlich Zeitraum, Unternehmen oder Score.

## Tests und Qualitätssicherung

Das Projekt nutzt `pytest` für Unit‑Tests und `flake8` für Linting.
Die Continuous‑Integration‑Pipeline in `.github/workflows/ci.yml`
stellt sicher, dass Tests und Linter bei jedem Commit ausgeführt
werden.
