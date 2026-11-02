import type { ReactNode } from "react";
import { LockKeyhole } from "lucide-react";
import { SideMenu, type MenuItem } from "./SideMenu";
import { SystemClock } from "./SystemClock";

interface AppShellProps {
  activeMenuId: string;
  children: ReactNode;
  mainClassName?: string;
  menuItems: readonly MenuItem[];
  onExit: () => void;
  onLock: () => void;
  onNavigate: (id: string) => void;
  rightRail?: ReactNode;
}

export function AppShell({
  activeMenuId,
  children,
  mainClassName,
  menuItems,
  onExit,
  onLock,
  onNavigate,
  rightRail,
}: AppShellProps) {
  return (
    <div className={`app-shell${rightRail ? " app-shell--with-right-rail" : ""}`}>
      <header className="app-header">
        <span aria-hidden="true" />
        <h1>Auditorium</h1>
        <div className="header-actions">
          <SystemClock />
          <button
            aria-label="Lock Panel"
            className="panel-lock-button"
            onClick={onLock}
            type="button"
          >
            <LockKeyhole aria-hidden="true" size={22} />
          </button>
        </div>
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
