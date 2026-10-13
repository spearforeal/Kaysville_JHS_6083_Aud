import type { ReactNode } from "react";
import { SideMenu, type MenuItem } from "./SideMenu";
import { SystemClock } from "./SystemClock";

interface AppShellProps {
  activeMenuId: string;
  children: ReactNode;
  mainClassName?: string;
  menuItems: readonly MenuItem[];
  onExit: () => void;
  onNavigate: (id: string) => void;
  rightRail?: ReactNode;
}

export function AppShell({
  activeMenuId,
  children,
  mainClassName,
  menuItems,
  onExit,
  onNavigate,
  rightRail,
}: AppShellProps) {
  return (
    <div className={`app-shell${rightRail ? " app-shell--with-right-rail" : ""}`}>
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

      <main className={`app-main${mainClassName ? ` ${mainClassName}` : ""}`}>
        {children}
      </main>

      {rightRail ? <aside className="right-rail">{rightRail}</aside> : null}

      <footer className="app-footer"></footer>
    </div>
  );
}
