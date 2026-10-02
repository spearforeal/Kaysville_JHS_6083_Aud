export interface MenuItem {
  id: string;
  label: string;
}

interface SideMenuProps {
  activeMenuId: string;
  items: readonly MenuItem[];
  onExit: () => void;
  onNavigate: (id: string) => void;
}

export function SideMenu({
  activeMenuId,
  items,
  onExit,
  onNavigate,
}: SideMenuProps) {
  return (
    <aside className="side-menu">
      <nav aria-label="Auditorium controls">
        {items.map((item) => (
          <button
            aria-current={item.id === activeMenuId ? "page" : undefined}
            className="side-menu-item"
            key={item.id}
            onClick={() => onNavigate(item.id)}
            type="button"
          >
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <button className="end-session" onClick={onExit} type="button">
        End session
      </button>
    </aside>
  );
}
