/** Zentrale Gestaltungswerte. Änderungen hier wirken auf alle Kapitel. */
export const theme = {
  colors: {
    background: "#0B1120",
    backgroundAccent: "#152544",
    text: "#F8FAFC",
    textMuted: "#94A3B8",
    accent: "#38BDF8",
    accentMuted: "rgba(56, 189, 248, 0.18)",
  },
  fontFamily:
    'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "DejaVu Sans", sans-serif',
  fontSize: {
    kicker: 34,
    title: 104,
    subtitle: 44,
    heading: 72,
    body: 46,
    statement: 68,
    caption: 30,
  },
  spacing: {
    page: 140,
  },
} as const;
