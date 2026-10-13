import { useEffect, useRef, useState } from "react";

interface TransitionPageProps {
  durationMs: number;
  mode: "warming" | "cooling";
  onComplete: () => void;
}

export function TransitionPage({
  durationMs,
  mode,
  onComplete,
}: TransitionPageProps) {
  const [progress, setProgress] = useState(0);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    if (durationMs <= 0) {
      throw new Error("Room transition duration must be greater than zero.");
    }

    const startedAt = Date.now();
    const intervalId = window.setInterval(() => {
      const nextProgress = Math.min((Date.now() - startedAt) / durationMs, 1);
      setProgress(nextProgress);
      if (nextProgress === 1) {
        window.clearInterval(intervalId);
        onCompleteRef.current();
      }
    }, 100);

    return () => window.clearInterval(intervalId);
  }, [durationMs]);

  const warming = mode === "warming";
  const title = warming ? "Starting up" : "Shutting down";

  return (
    <main className="transition-page">
      <section
        className="transition-content"
        aria-labelledby="transition-title"
      >
        <p className="page-kicker">Auditorium</p>
        <h1 id="transition-title">{title}</h1>
        <p className="transition-copy">
          {warming ? "The room is starting." : "The room is shutting down."}
        </p>
        <div
          aria-label={`${title} progress`}
          aria-valuemax={100}
          aria-valuemin={0}
          aria-valuenow={Math.round(progress * 100)}
          className="transition-track"
          role="progressbar"
        >
          <div
            className="transition-fill"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
        <p className="transition-percent">{Math.round(progress * 100)}%</p>
      </section>
    </main>
  );
}
