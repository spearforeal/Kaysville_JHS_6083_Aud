import { useEffect, useState } from "react";
import { Signal } from "@jag/crestron-ch5-core";
import { analogToPercent, percentToAnalog } from "../config/analog";
import { PROGRAM_AUDIO_JOINS } from "../config/joins";
import { AppShell } from "../components/AppShell";
import { ProgramAudioControl } from "../components/ProgramAudioControl";
import { AudioControlsPage } from "./AudioControlsPage";
import { RoutingPage } from "./RoutingPage";
import { DisplayControlPage } from "./DisplayControlPage";
const MENU_ITEMS = [
  { id: "routing", label: "Routing" },
  { id: "audio-controls", label: "Audio Controls" },
  { id: "display-controls", label: "Display Controls" },
] as const;

type MenuId = (typeof MENU_ITEMS)[number]["id"];

interface MainMenuPageProps {
  onExit: () => void;
}

export function MainMenuPage({ onExit }: MainMenuPageProps) {
  const [activeMenuId, setActiveMenuId] = useState<MenuId>("routing");
  const [programLevel, setProgramLevel] = useState(0);
  const [isProgramMuted, setIsProgramMuted] = useState(false);
  useEffect(() => {
    const subscriptionId = Signal.AnalogEvent(
      PROGRAM_AUDIO_JOINS.level,
      (analogValue) => {
        setProgramLevel(analogToPercent(analogValue));
      },
    );
    return () => {
      Signal.RemoveAnalogEvent(PROGRAM_AUDIO_JOINS.level, subscriptionId);
    };
  }, []);
  useEffect(() => {
    const subscriptionId = Signal.DigitalEvent(
      PROGRAM_AUDIO_JOINS.mute,
      (isMuted) => {
        setIsProgramMuted(isMuted);
      },
    );
    return () => {
      Signal.RemoveDigitalEvent(PROGRAM_AUDIO_JOINS.mute, subscriptionId);
    };
  }, []);
  const handleProgramLevelChange = (percent: number) => {
    Signal.Analog(PROGRAM_AUDIO_JOINS.level, percentToAnalog(percent));
  };
  const handleProgramMuteToggle = () => {
    Signal.Digital(PROGRAM_AUDIO_JOINS.mute, !isProgramMuted);
  };
  const isAudioControls = activeMenuId === "audio-controls";
  const showProgramAudio = activeMenuId !== "audio-controls";

  return (
    <AppShell
      activeMenuId={activeMenuId}
      mainClassName={isAudioControls ? "app-main--wide" : undefined}
      menuItems={MENU_ITEMS}
      onExit={onExit}
      onNavigate={(id) => setActiveMenuId(id as MenuId)}
      rightRail={
        showProgramAudio ? (
          <ProgramAudioControl
            isMuted={isProgramMuted}
            level={programLevel}
            onLevelChange={handleProgramLevelChange}
            onMuteToggle={handleProgramMuteToggle}
          />
        ) : undefined
      }
    >
      {isAudioControls ? (
        <AudioControlsPage
          isProgramMuted={isProgramMuted}
          onProgramLevelChange={handleProgramLevelChange}
          onProgramMuteToggle={handleProgramMuteToggle}
          programLevel={programLevel}
        />
      ) : activeMenuId === "routing" ? (
        <RoutingPage />
      ) : (
        <DisplayControlPage />
      )}
    </AppShell>
  );
}
