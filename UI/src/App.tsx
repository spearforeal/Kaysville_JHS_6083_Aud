import { useEffect, useState } from "react";
import { initializeConnection } from "@jag/crestron-ch5-core";
import { PREVIEW_PASSCODE } from "./config/auth";
import { PANEL_CONNECTION } from "./config/joins";
import { MainMenuPage } from "./pages/MainMenuPage";
import { PasswordPage } from "./pages/PasswordPage";
import { WelcomePage } from "./pages/WelcomePage";
import "./App.css";

type AppView = "welcome" | "password" | "main";

function App() {
  const [view, setView] = useState<AppView>("welcome");

  useEffect(
    () =>
      initializeConnection((isConnected) => {
        console.info(
          `Crestron connection ${isConnected ? "connected" : "disconnected"}`,
        );
      }, PANEL_CONNECTION),
    [],
  );

  if (view === "welcome") {
    return <WelcomePage onStart={() => setView("password")} />;
  }

  if (view === "password") {
    return (
      <PasswordPage
        onBack={() => setView("welcome")}
        onSubmit={(passcode) => passcode === PREVIEW_PASSCODE}
        onAuthorized={() => setView("main")}
      />
    );
  }

  return <MainMenuPage onExit={() => setView("welcome")} />;
}

export default App;
