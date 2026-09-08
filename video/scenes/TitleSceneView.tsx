import React from "react";
import { interpolate } from "remotion";
import { SceneFrame } from "../components/SceneFrame";
import { useEntrance } from "../components/useEntrance";
import { theme } from "../theme";
import type { TitleScene } from "../types";

export const TitleSceneView: React.FC<{ scene: TitleScene }> = ({ scene }) => {
  const kicker = useEntrance(0);
  const title = useEntrance(6);
  const subtitle = useEntrance(14);

  return (
    <SceneFrame durationInFrames={scene.durationInFrames}>
      {scene.kicker ? (
        <div
          style={{
            opacity: kicker,
            color: theme.colors.accent,
            fontSize: theme.fontSize.kicker,
            letterSpacing: 6,
            textTransform: "uppercase",
            marginBottom: 28,
          }}
        >
          {scene.kicker}
        </div>
      ) : null}

      <div
        style={{
          opacity: title,
          transform: `translateY(${interpolate(title, [0, 1], [40, 0])}px)`,
          fontSize: theme.fontSize.title,
          fontWeight: 700,
          lineHeight: 1.1,
        }}
      >
        {scene.title}
      </div>

      {scene.subtitle ? (
        <div
          style={{
            opacity: subtitle,
            color: theme.colors.textMuted,
            fontSize: theme.fontSize.subtitle,
            lineHeight: 1.4,
            marginTop: 36,
            maxWidth: 1300,
          }}
        >
          {scene.subtitle}
        </div>
      ) : null}
    </SceneFrame>
  );
};
