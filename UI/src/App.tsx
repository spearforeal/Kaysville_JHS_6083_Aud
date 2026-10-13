import { useCallback, useEffect, useRef, useState } from "react";
import { initializeConnection, Signal } from "@jag/crestron-ch5-core";
import { PREVIEW_PASSCODE } from "./config/auth";
import {
  PANEL_CONNECTION,
  ROOM_SHUTDOWN_REQUEST_JOIN,
  ROOM_STATE_JOIN,
} from "./config/joins";
import { ROOM_TRANSITION_MS } from "./config/session";
import { MainMenuPage } from "./pages/MainMenuPage";
import { PasswordPage } from "./pages/PasswordPage";
import { ShutdownPage } from "./pages/ShutdownPage";
import { TransitionPage } from "./pages/TransitionPage";
import { WelcomePage } from "./pages/WelcomePage";
import "./App.css";

type AppView = "welcome" | "password" | "warming" | "main" | "shutdown" | "cooling";

function App() {
  const [view, setView] = useState<AppView>("welcome");
  const [processorConnected, setProcessorConnected] = useState(false);
  const shutdownRequestHigh = useRef(false);

  const confirmShutdown = useCallback(() => {
    Signal.Digital(ROOM_STATE_JOIN, false);
    setView("cooling");
  }, []);

  useEffect(
    () =>
      initializeConnection((isConnected) => {
        setProcessorConnected(isConnected);
        console.info(
          `Crestron connection ${isConnected ? "connected" : "disconnected"}`,
        );
      }, PANEL_CONNECTION),
    [],
  );

  useEffect(() => {
    const subscriptionId = Signal.DigitalEvent(ROOM_SHUTDOWN_REQUEST_JOIN, (requested) => {
      if (requested && !shutdownRequestHigh.current) confirmShutdown();
      shutdownRequestHigh.current = requested;
    });
    return () =>
      Signal.RemoveDigitalEvent(ROOM_SHUTDOWN_REQUEST_JOIN, subscriptionId);
  }, [confirmShutdown]);

  if (view === "welcome") {
    return <WelcomePage onStart={() => setView("password")} />;
  }

  if (view === "password") {
    return (
      <PasswordPage
        onBack={() => setView("welcome")}
        onSubmit={(passcode) => passcode === PREVIEW_PASSCODE}
        onAuthorized={() => setView("warming")}
      />
    );
  }

  if (view === "warming") {
    return (
      <TransitionPage
        durationMs={ROOM_TRANSITION_MS.warming}
        mode="warming"
        onComplete={() => {
          Signal.Digital(ROOM_STATE_JOIN, true);
          setView("main");
        }}
      />
    );
  }

  if (view === "main") {
    return (
      <MainMenuPage
        onExit={() => setView("shutdown")}
        processorConnected={processorConnected}
      />
    );
  }

  if (view === "shutdown") {
    return (
      <ShutdownPage
        onCancel={() => setView("main")}
        onConfirm={confirmShutdown}
      />
    );
  }

  return (
    <TransitionPage
      durationMs={ROOM_TRANSITION_MS.cooling}
      mode="cooling"
      onComplete={() => setView("welcome")}
    />
  );
}

export default App;
