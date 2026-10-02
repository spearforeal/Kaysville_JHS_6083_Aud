import type { ReactNode } from "react";
import { SideMenu, type MenuItem } from "./SideMenu";
import { SystemClock } from "./SystemClock";

interface AppShellProps {
  activeMenuId: string;
  children: ReactNode;
  menuItems: readonly MenuItem[];
  onExit: () => void;
  onNavigate: (id: string) => void;
}

export function AppShell({
  activeMenuId,
  children,
  menuItems,
  onExit,
  onNavigate,
}: AppShellProps) {
  return (
    <div className="app-shell">
      <header className="app-header">
        <span aria-hidden="true" />
        <h1>Auditorium</h1>
        <SystemClock />
      </header>

      <SideMenu
        activeMenuId={activeMenuId}
        items={menuItems}
        onExit={onExit}
        onNavigate={onNavigate}
      />

      <main className="app-main">{children}</main>

      <footer className="app-footer"></footer>
    </div>
  );
}
