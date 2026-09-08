# Kapitelvideos (Remotion)

Dieser Teil des Repositorys erzeugt Videos aus Code: Die Inhalte stehen als
Textdaten in einer Datei, Layout und Animation liegen im Code. Ein Kapitel wird
im Browser live bearbeitet und anschließend als MP4 exportiert.

Der Python-Teil des Repositorys (Frühindikator-Tool, siehe `README.md`) ist davon
unberührt; beide Teile liegen nebeneinander und teilen sich keine Abhängigkeiten.

## Voraussetzungen

- Node.js ab Version 18 (geprüft mit Node 22)
- Beim ersten Rendern lädt Remotion automatisch eine passende Chromium-Version
  herunter (rund 150 MB). In abgeschotteten Netzen siehe „Fehlerbehebung".

## Die drei Befehle

```bash
npm install         # einmalig: Abhängigkeiten installieren
npm run studio      # Live-Vorschau im Browser, Bearbeiten bei laufender Wiedergabe
npm run render      # erzeugt out/Kapitel02.mp4
```

Weitere Befehle:

```bash
npm run compositions                              # zeigt alle Kapitel mit Länge an
npm run render:chapter -- Kapitel03 out/Kapitel03.mp4   # anderes Kapitel exportieren
npm run still                                     # Einzelbild als PNG (Frame 0)
npm run typecheck                                 # TypeScript-Prüfung ohne Ausgabe
```

## Inhalte ändern

Der gesamte Text von Kapitel 02 steht in **`video/chapters/kapitel02.ts`**.
Nur diese Datei wird bearbeitet; Layout, Animation und Renderbefehle bleiben
unverändert. Bei laufendem `npm run studio` wird jede Änderung sofort sichtbar.

Die aktuell hinterlegten Texte sind **Platzhalter** und beschreiben lediglich die
Vorlage selbst.

### Szenentypen

| Typ         | Zweck                          | Felder                          |
| ----------- | ------------------------------ | ------------------------------- |
| `title`     | Titelkarte                     | `kicker?`, `title`, `subtitle?` |
| `bullets`   | Überschrift mit Aufzählung     | `heading`, `bullets[]`          |
| `statement` | einzelne Kernaussage           | `text`, `source?`               |
| `outro`     | Abspann                        | `title`, `note?`                |

Jede Szene hat zusätzlich `durationInFrames`. Die Hilfsfunktion `seconds(8)`
rechnet Sekunden in Frames um (8 Sekunden bei 30 fps = 240 Frames). Die
Gesamtlänge des Kapitels ergibt sich automatisch aus der Summe aller Szenen.

## Neues Kapitel anlegen

1. `video/chapters/kapitel02.ts` kopieren, z. B. nach `kapitel03.ts`.
2. In der Kopie `id` (`"Kapitel03"`), `label` und `title` anpassen sowie die
   Szenen mit dem eigenen Skript füllen.
3. In `video/chapters/index.ts` das neue Kapitel importieren und in die Liste
   `chapters` aufnehmen.

Danach erscheint es automatisch im Studio und lässt sich exportieren mit
`npm run render:chapter -- Kapitel03 out/Kapitel03.mp4`.

## Gestaltung ändern

Farben, Schriftgrößen und Seitenränder stehen zentral in `video/theme.ts` und
wirken auf alle Kapitel. Der Aufbau der einzelnen Szenen liegt in
`video/scenes/`, die durchgehenden Bildelemente (Kapitelkennung oben,
Fortschrittsbalken unten) in `video/components/ChapterFrame.tsx`.

Bewusst wird eine System-Schriftfamilie verwendet, damit das Projekt ohne
Netzzugriff rendert. Eine eigene Schrift lässt sich über `@remotion/google-fonts`
oder eine lokale Schriftdatei in `public/` ergänzen.

## Verzeichnisse

```
video/
  index.ts              Einstiegspunkt (meldet die Kapitel an)
  Root.tsx              erzeugt je Kapitel eine Composition
  ChapterVideo.tsx      setzt ein Kapitel aus seinen Szenen zusammen
  types.ts              Datenmodell und Hilfsfunktionen
  theme.ts              Farben, Schriftgrößen, Abstände
  chapters/             Inhalte je Kapitel  <- hier wird geschrieben
  scenes/               Darstellung der vier Szenentypen
  components/           Hintergrund, Rahmen, Ein-/Ausblenden
out/                    Renderergebnisse (nicht versioniert)
remotion.config.ts      Renderoptionen
```

## Fehlerbehebung

**Chromium-Download schlägt fehl (Proxy, gesperrtes Netz).** Ein bereits
vorhandenes Chrome/Chromium kann verwendet werden:

```bash
export REMOTION_BROWSER_EXECUTABLE=/pfad/zu/chrome   # Windows: set REMOTION_BROWSER_EXECUTABLE=...
npm run render
```

`remotion.config.ts` wertet diese Umgebungsvariable aus; ohne sie bleibt das
Standardverhalten unverändert.

**Port 3000 belegt.** `npm run studio -- --port 3111`

**Rendern dauert zu lange.** `npm run render -- --concurrency=4` begrenzt die
parallelen Prozesse, `--jpeg-quality` steuert die Qualität der Einzelbilder.

## Lizenzhinweis

Remotion ist quelloffen, aber **nicht** unter einer freien Lizenz. Laut
`node_modules/remotion/LICENSE.md` ist die kostenlose Nutzung zulässig für
Einzelpersonen, für gemeinnützige und nicht gewinnorientierte Organisationen,
für gewinnorientierte Unternehmen mit bis zu drei Mitarbeitenden sowie zur
Evaluierung. Andernfalls ist eine kostenpflichtige Company License erforderlich
(Bedingungen und Preise: remotion.pro/license).

Vor produktivem Einsatz im Klinikkontext ist daher die Rechtsform des Trägers zu
prüfen: Bei gemeinnütziger Trägerschaft greift die kostenlose Lizenz, bei einer
gewinnorientierten Gesellschaft mit mehr als drei Mitarbeitenden nicht.
