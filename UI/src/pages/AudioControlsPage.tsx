import { useState } from "react";
import { AudioChannelStrip } from "../components/Audio/AudioChannelStrip";
import { JoinedAudioChannelStrip } from "../components/Audio/JoinedAudioChannelStrip";
import { AUDIO_INPUT_JOINS } from "../config/joins";

interface AudioControlsPageProps {
  isProgramMuted: boolean;
  onProgramLevelChange: (level: number) => void;
  onProgramMuteToggle: () => void;
  programLevel: number;
}
type AudioInputId = keyof typeof AUDIO_INPUT_JOINS;
type InputGroupId = "program-wireless" | "stage-room";

const INPUT_GROUPS = [
  { id: "program-wireless", label: "Program & Wireless" },
  { id: "stage-room", label: "Stage & Room" },
] as const;

const AUDIO_INPUTS: { id: AudioInputId; label: string; group: InputGroupId }[] =
  [
    { id: "mic-line-1", label: "Wireless 1", group: "program-wireless" },
    { id: "mic-line-2", label: "Wireless 2", group: "program-wireless" },
    { id: "mic-line-3", label: "Wireless 3", group: "program-wireless" },
    { id: "mic-line-4", label: "Wireless 4", group: "program-wireless" },
    { id: "mic-line-5", label: "Wireless 5", group: "program-wireless" },
    { id: "mic-line-6", label: "Wireless 6", group: "program-wireless" },
    { id: "mic-line-7", label: "Talkback", group: "program-wireless" },
    //{ id: "mic-line-8", label: "Page Zone", group: "program-wireless" },
    { id: "mic-line-9", label: "Platform Left", group: "stage-room" },
    { id: "mic-line-10", label: "Platform Center", group: "stage-room" },
    { id: "mic-line-11", label: "Platform Right", group: "stage-room" },
    { id: "mic-line-12", label: "Room Mic 1", group: "stage-room" },
    { id: "mic-line-13", label: "Room Mic 2", group: "stage-room" },
    { id: "mic-line-14", label: "Room Mic 3", group: "stage-room" },
    {
      id: "bluetooth-wall-plate-1",
      label: "Bluetooth Wall Plate 1",
      group: "stage-room",
    },
    {
      id: "bluetooth-wall-plate-2",
      label: "Bluetooth Wall Plate 2",
      group: "stage-room",
    },
  ];

export function AudioControlsPage({
  isProgramMuted,
  onProgramLevelChange,
  onProgramMuteToggle,
  programLevel,
}: AudioControlsPageProps) {
  const [activeGroup, setActiveGroup] =
    useState<InputGroupId>("program-wireless");

  return (
    <section className="audio-controls-page" aria-labelledby="audio-page-title">
      <header className="audio-controls-header">
        <div>
          <h1 id="audio-page-title">Audio Controls</h1>
        </div>
      </header>

      <nav className="audio-bank-menu" aria-label="Input groups">
        {INPUT_GROUPS.map((group) => (
          <button
            aria-pressed={activeGroup === group.id}
            key={group.id}
            onClick={() => setActiveGroup(group.id)}
            type="button"
          >
            {group.label}
          </button>
        ))}
      </nav>

      <div className="audio-channel-grid">
        {activeGroup === "program-wireless" && (
          <AudioChannelStrip
            isMuted={isProgramMuted}
            label="Program"
            level={programLevel}
            onLevelChange={onProgramLevelChange}
            onMuteToggle={onProgramMuteToggle}
          />
        )}
        {AUDIO_INPUTS.filter((channel) => channel.group === activeGroup).map(
          (channel) => (
            <JoinedAudioChannelStrip
              joins={AUDIO_INPUT_JOINS[channel.id]}
              key={channel.id}
              label={channel.label}
            />
          ),
        )}
      </div>
    </section>
  );
}
