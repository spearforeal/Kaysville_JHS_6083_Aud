import type { CSSProperties } from "react";

interface ProgramAudioControlProps {
  isMuted: boolean;
  level: number;
  onLevelChange: (level: number) => void;
  onMuteToggle: () => void;
}

export function ProgramAudioControl({
  isMuted,
  level,
  onLevelChange,
  onMuteToggle,
}: ProgramAudioControlProps) {
  const sliderStyle = {
    "--program-level": `${level}%`,
  } as CSSProperties;

  return (
    <section className="program-audio" aria-labelledby="program-audio-title">
      <div className="program-audio-heading">
        <h2 id="program-audio-title">Program</h2>
        <output htmlFor="program-level"></output>
      </div>

      <div className="program-fader">
        <input
          aria-label="Program audio level"
          className="program-fader-input"
          id="program-level"
          max="100"
          min="0"
          onChange={(event) => onLevelChange(Number(event.target.value))}
          style={sliderStyle}
          type="range"
          value={level}
        />
      </div>

      <button
        aria-pressed={isMuted}
        className="program-mute"
        onClick={onMuteToggle}
        type="button"
      >
        {isMuted ? "Muted" : "Mute"}
      </button>
    </section>
  );
}
