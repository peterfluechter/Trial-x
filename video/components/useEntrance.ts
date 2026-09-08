import { spring, useCurrentFrame, useVideoConfig } from "remotion";

/**
 * Weiches Einlaufen eines Elements (0 = unsichtbar, 1 = am Platz).
 * `delay` staffelt mehrere Elemente gegeneinander.
 */
export const useEntrance = (delay = 0): number => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return spring({
    frame: frame - delay,
    fps,
    durationInFrames: 24,
    config: { damping: 200 },
  });
};
