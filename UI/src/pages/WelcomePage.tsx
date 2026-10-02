interface WelcomePageProps {
  onStart: () => void
}

export function WelcomePage({ onStart }: WelcomePageProps) {
  return (
    <main className="welcome-page">
      <div className="welcome-accent" aria-hidden="true" />
      <section className="welcome-content" aria-labelledby="welcome-title">
        <p className="welcome-location">Kaysville Junior High</p>
        <h1 id="welcome-title">Welcome.</h1>
        <p className="welcome-copy">
          The auditorium controls are ready when you are.
        </p>
        <button className="primary-action" onClick={onStart} type="button">
          Start room <span aria-hidden="true">→</span>
        </button>
      </section>
    </main>
  )
}
