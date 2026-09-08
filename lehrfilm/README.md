# Lehrfilm „Lust auf Abstinenz" — Kapitel 2, Der Weg in die Sucht

Remotion-Projekt zum Drehbuch v1. Erzeugt ein Video von 3:30 Min, 1920×1080, 30 Bilder/s, 6300 Frames.

Fachliche Grundlage: Bachmann, M. / El-Akhras, A.: Lust auf Abstinenz. Springer 2014. Sämtliche Texte und Grafiken in diesem Projekt sind eigenständige Formulierungen und Darstellungen; übernommen sind ausschließlich die nicht schutzfähigen Modelle. Der Abspann führt die Quellen, siehe Drehbuch Abschnitt 6.

---

## Loslegen

Voraussetzung ist Node 20 oder neuer. Beim ersten Lauf lädt Remotion einen eigenen Browser für das Rendern herunter, dafür wird etwa 1 GB Plattenplatz gebraucht.

```bash
npm install
npm run studio      # Live-Vorschau im Browser, Bearbeiten bei laufender Wiedergabe
npm run render      # erzeugt out/Kapitel02.mp4
```

Das Projekt liegt im Repository `Trial-x` im Verzeichnis `lehrfilm/`. Die drei Befehle
funktionieren sowohl hier im Verzeichnis als auch von der Repository-Wurzel aus; dort sind
sie als npm-Workspace durchgereicht, das Ergebnis liegt dann in `lehrfilm/out/Kapitel02.mp4`.

Im Studio lässt sich der Zeitstrahl scrubben; jede Szene erscheint als eigener Abschnitt mit ihrem Namen aus dem Drehbuch. Änderungen an den Quelldateien sind sofort sichtbar, ohne neu zu rendern.

## Was wo geändert wird

| Was | Datei |
|---|---|
| Hausfarben, Schriftgrößen, Szenenlängen | `src/thema.ts` |
| Schriftart | `src/schrift.ts` |
| Reihenfolge der Szenen, Blenden, Tonspur | `src/Kapitel02.tsx` |
| Figur, Bildtext, Bühnenrahmen | `src/bausteine/Basis.tsx` |
| Einzelne Szenen | `src/szenen/…` |

**Hausfarben.** In `src/thema.ts` stehen derzeit Platzhalter. Werden dort die EFH-Farben eingetragen, ändert sich der gesamte Film, ohne dass eine Szene angefasst werden muss.

**Schrift.** Voreingestellt ist Poppins über `@remotion/google-fonts`. Die Schriftdateien werden dabei von Google-Servern geladen. Falls das Klinik-Netz das blockiert oder aus Datenschutzgründen unerwünscht ist: Schriftdatei nach `public/schrift/` legen und `src/schrift.ts` entsprechend dem dortigen Kommentar umstellen.

**Tonspur.** Der Sprechertext steht vollständig in Abschnitt 3 des Drehbuchs. Aufnahme als `public/sprecher.mp3` ablegen und in `src/Kapitel02.tsx` die beiden auskommentierten Zeilen aktivieren. Passt die Länge nicht exakt, werden die Werte in `szenenSekunden` in `src/thema.ts` angepasst; die Bildtexte innerhalb der Szenen verschieben sich dann mit.

## Prüfstand

Geprüft und bestanden:

- `npx tsc --noEmit` — Typprüfung ohne Fehler
- `npx remotion bundle` — Bündelung erfolgreich, die Composition `Kapitel02` wird korrekt registriert
- `npm run render` — vollständiger Renderlauf über alle 6300 Frames; Ergebnis `out/Kapitel02.mp4`,
  H.264, 1920×1080, 30 Bilder/s, 3:30 Min
- Sichtprüfung an acht Einzelbildern über alle sechs Szenen; Poppins wird korrekt geladen,
  Umlaute und Zeilenumbrüche stimmen
- Geprüfte Datei: 3:30,05 Min, H.264 (avc1), 1920×1080, 30 fps. `npm run render` legt zusätzlich
  eine stumme AAC-Tonspur an; `npm run render-stumm` erzeugt die Fassung ganz ohne Tonspur.

Beim ersten Sichten gefunden und behoben:

- **Szene 2.4:** Die Kästen „Stimmung" und „Familie und Geld" überlappten sich um 30 × 6 Pixel.
  „Stimmung" steht jetzt bei `my + r + 90` statt `my + r + 60`; Abstand zum Nachbarkasten 24 px,
  Unterkante 32 px über dem Kapitel-Label.

Offen, bewusst nicht geändert — das sind Gestaltungsentscheidungen, keine Fehler:

| Stelle | Beobachtung | Möglicher Eingriff |
| --- | --- | --- |
| Szene 2.4 | Der umlaufende Punkt kreuzt oben den Text „Kurze Erleichterung" | in `kasten()` `fill="none"` durch `fill={farben.grund}` ersetzen, dann läuft der Punkt hinter dem Kasten |
| Szene 2.5 | Die Ellipse „Wissen" ragt links über die Kopfkontur hinaus | `rx` von 165 auf 145 verringern |
| Szene 2.1, 2.2 | Die stehende Figur (`gehphase={null}`) hat beide Beine auf derselben Seite und wirkt dadurch wie im Schritt | in `Figur` die Ruhewerte symmetrisch setzen, z. B. `beinLinks = 0.35`, `beinRechts = -0.35` |
| Szene 2.6 | Die Stufengrafik steht 130 px über der Grundlinie und schwebt dadurch | `basisY` von `0.78 * HOEHE` auf `0.9 * HOEHE` setzen oder `grundlinie={false}` |
| Szene 2.1 | Der Kapiteltitel steht gleichzeitig groß im Bild und klein in der Fußzeile | Fußzeile während des Titels ausblenden |

## Gestaltungsregeln, die nicht verhandelbar sind

Im gesamten Film wird kein Konsumgegenstand gezeigt. Suchtmittel erscheinen ausschließlich als neutraler grauer Kreis (`NeutralesSymbol` in `src/bausteine/Basis.tsx`). Begründung: Der Film läuft in der Aufnahmewoche vor frisch entgifteten Rehabilitanden.

Alle Kernaussagen erscheinen zusätzlich als Bildtext, damit der Film auch ohne Ton verständlich bleibt.

## Ein weiteres Kapitel anlegen

1. Neue Datei unter `src/szenen/` nach dem Muster von `Szene23.tsx`.
2. Kapiteldatei nach dem Muster von `src/Kapitel02.tsx`, Szenenlängen in `src/thema.ts` ergänzen.
3. In `src/Root.tsx` eine weitere `<Composition>` mit eigener `id` eintragen.

Die Stufengrafik aus Szene 2.6 ist die Rahmengrafik des gesamten Films und sollte am Anfang jedes weiteren Kapitels wieder auftauchen.

## Lizenz

Remotion ist quelloffene, aber nicht freie Software. Die Nutzung erfolgt hier unter der Free License für Non-Profit-Organisationen; die Berechtigung der gGmbH ist geklärt.
