import { Config } from "@remotion/cli/config";

// Ausgabeformat: H.264/MP4, für Präsentationen und LMS-Uploads unproblematisch.
Config.setVideoImageFormat("jpeg");
Config.setCodec("h264");

// Bestehende Datei in out/ wird beim erneuten Rendern überschrieben.
Config.setOverwriteOutput(true);

// Optional: eigener Chromium-Pfad (z. B. in CI oder Container ohne Download).
// Lokal nicht nötig – Remotion lädt beim ersten Rendern eine passende Version.
const browserExecutable = process.env.REMOTION_BROWSER_EXECUTABLE;
if (browserExecutable) {
  Config.setBrowserExecutable(browserExecutable);
}
