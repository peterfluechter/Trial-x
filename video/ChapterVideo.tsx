import React from "react";
import { AbsoluteFill, Series } from "remotion";
import { Background } from "./components/Background";
import { ChapterFrame } from "./components/ChapterFrame";
import { SceneView } from "./scenes";
import type { ChapterData } from "./types";

/**
 * Setzt ein Kapitel aus seiner Datendatei zusammen: durchgehender Hintergrund,
 * Szenen nacheinander, darüber die dauerhafte Kapitelkennung.
 */
export const ChapterVideo: React.FC<{ chapter: ChapterData }> = ({ chapter }) => (
  <AbsoluteFill>
    <Background />

    <Series>
      {chapter.scenes.map((scene, index) => (
        <Series.Sequence
          key={`${scene.type}-${index}`}
          durationInFrames={scene.durationInFrames}
        >
          <SceneView scene={scene} />
        </Series.Sequence>
      ))}
    </Series>

    <ChapterFrame label={chapter.label} title={chapter.title} />
  </AbsoluteFill>
);
