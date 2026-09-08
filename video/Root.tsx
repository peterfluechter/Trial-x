import React from "react";
import { Composition } from "remotion";
import { ChapterVideo } from "./ChapterVideo";
import { chapters } from "./chapters";
import { totalDurationInFrames } from "./types";

/** Meldet jedes Kapitel aus video/chapters als eigene Composition an. */
export const RemotionRoot: React.FC = () => (
  <>
    {chapters.map((chapter) => (
      <Composition
        key={chapter.id}
        id={chapter.id}
        component={ChapterVideo}
        durationInFrames={totalDurationInFrames(chapter)}
        fps={chapter.fps}
        width={chapter.width}
        height={chapter.height}
        defaultProps={{ chapter }}
      />
    ))}
  </>
);
