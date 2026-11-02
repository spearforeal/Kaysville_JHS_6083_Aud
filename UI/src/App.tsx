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
  const [locked, setLocked] = useState(false);
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

  let page;
  if (view === "welcome") {
    page = <WelcomePage onStart={() => setView("password")} />;
  } else if (view === "password") {
    page = (
      <PasswordPage
        onBack={() => setView("welcome")}
        onSubmit={(passcode) => passcode === PREVIEW_PASSCODE}
        onAuthorized={() => setView("warming")}
      />
    );
  } else if (view === "warming") {
    page = (
      <TransitionPage
        durationMs={ROOM_TRANSITION_MS.warming}
        mode="warming"
        onComplete={() => {
          Signal.Digital(ROOM_STATE_JOIN, true);
          setView("main");
        }}
      />
    );
  } else if (view === "main") {
    page = (
      <MainMenuPage
        onExit={() => setView("shutdown")}
        onLock={() => setLocked(true)}
        processorConnected={processorConnected}
      />
    );
  } else if (view === "shutdown") {
    page = (
      <ShutdownPage
        onCancel={() => setView("main")}
        onConfirm={confirmShutdown}
      />
    );
  } else {
    page = (
      <TransitionPage
        durationMs={ROOM_TRANSITION_MS.cooling}
        mode="cooling"
        onComplete={() => setView("welcome")}
      />
    );
  }

  return (
    <>
      <div inert={locked}>{page}</div>
      {locked ? (
        <div
          aria-label="Panel locked"
          aria-modal="true"
          className="panel-lock-overlay"
          role="dialog"
        >
          <PasswordPage
            onSubmit={(passcode) => passcode === PREVIEW_PASSCODE}
            onAuthorized={() => setLocked(false)}
            purpose="unlock"
          />
        </div>
      ) : null}
    </>
  );
}

export default App;
