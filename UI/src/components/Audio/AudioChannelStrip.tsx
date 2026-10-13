import type { CSSProperties } from "react";

interface AudioChannelStripProps {
  isMuted: boolean;
  label: string;
  level: number;
  onLevelChange: (level: number) => void;
  onMuteToggle: () => void;
}

export function AudioChannelStrip({
  isMuted,
  label,
  level,
  onLevelChange,
  onMuteToggle,
}: AudioChannelStripProps) {
  const sliderStyle = {
    "--channel-level": `${level}%`,
  } as CSSProperties;

  return (
    <article className="audio-channel-strip">
      <header className="audio-channel-heading">
        <h3>{label}</h3>
      </header>

      <div className="audio-channel-fader">
        <input
          aria-label={`${label} level`}
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
        className="audio-channel-mute"
        onClick={onMuteToggle}
        type="button"
      >
        {isMuted ? "Muted" : "Mute"}
      </button>
    </article>
  );
}
