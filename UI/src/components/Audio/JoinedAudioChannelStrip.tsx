import { useEffect, useState } from "react";
import { Signal } from "@jag/crestron-ch5-core";
import { analogToPercent, percentToAnalog } from "../../config/analog";
import { AudioChannelStrip } from "./AudioChannelStrip";

interface JoinedAudioChannelStripProps {
  label: string;
  joins: {
    readonly level: number;
    readonly mute: number;
  };
}

export function JoinedAudioChannelStrip({
  label,
  joins,
}: JoinedAudioChannelStripProps) {
  const [level, setLevel] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  useEffect(() => {
    const join = joins.level;
    const subscriptionId = Signal.AnalogEvent(join, (value) => {
      setLevel(analogToPercent(value));
    });
    return () => Signal.RemoveAnalogEvent(join, subscriptionId);
  }, [joins.level]);
  useEffect(() => {
    const join = joins.mute;
    const subscriptionId = Signal.DigitalEvent(join, (value) => {
      setIsMuted(value);
    });
    return () => Signal.RemoveDigitalEvent(join, subscriptionId);
  }, [joins.mute]);
  return (
    <AudioChannelStrip
      isMuted={isMuted}
      label={label}
      level={level}
      onLevelChange={(percent) => {
        Signal.Analog(joins.level, percentToAnalog(percent));
      }}
      onMuteToggle={() => {
        Signal.Digital(joins.mute, !isMuted);
      }}
    />
  );
}
