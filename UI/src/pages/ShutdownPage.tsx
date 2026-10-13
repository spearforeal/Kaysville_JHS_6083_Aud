interface ShutdownPageProps {
  onCancel: () => void;
  onConfirm: () => void;
}

export function ShutdownPage({ onCancel, onConfirm }: ShutdownPageProps) {
  return (
    <main className="shutdown-page">
      <section className="shutdown-content" aria-labelledby="shutdown-title">
        <p className="page-kicker">Auditorium</p>
        <h1 id="shutdown-title">End session?</h1>
        <p className="transition-copy">This will shut down the room controls.</p>
        <div className="shutdown-actions">
          <button className="shutdown-cancel" onClick={onCancel} type="button">
            Cancel
          </button>
          <button className="primary-action" onClick={onConfirm} type="button">
            Confirm shutdown
          </button>
        </div>
      </section>
    </main>
  );
}
