import { useState } from "react";
import { AppShell } from "../components/AppShell";

const MENU_ITEMS = [
  { id: "option-1", label: "Routing" },
  { id: "option-2", label: "Audio Controls" },
  { id: "option-3", label: "Settings" },
] as const;

type MenuId = (typeof MENU_ITEMS)[number]["id"];

interface MainMenuPageProps {
  onExit: () => void;
}

export function MainMenuPage({ onExit }: MainMenuPageProps) {
  const [activeMenuId, setActiveMenuId] = useState<MenuId>("option-1");
  const activeItem = MENU_ITEMS.find((item) => item.id === activeMenuId);

  return (
    <AppShell
      activeMenuId={activeMenuId}
      menuItems={MENU_ITEMS}
      onExit={onExit}
      onNavigate={(id) => setActiveMenuId(id as MenuId)}
    >
      <section className="main-content" aria-labelledby="main-page-title">
        <p className="page-kicker">Main menu</p>
        <h1 id="main-page-title">{activeItem?.label}</h1>
        <p>
          Select controls for this section when its room functions are defined.
        </p>
      </section>
    </AppShell>
  );
}
