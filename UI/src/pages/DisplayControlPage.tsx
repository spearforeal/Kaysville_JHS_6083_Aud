import { useEffect, useState } from "react";
import { Signal } from "@jag/crestron-ch5-core";
import { DISPLAY_POWER_JOINS } from "../config/joins";

export function DisplayControlPage() {
  const [onFeedback, setOnFeedback] = useState<boolean | null>(null);
  const [offFeedback, setOffFeedback] = useState<boolean | null>(null);

  useEffect(() => {
    const onJoin = DISPLAY_POWER_JOINS.on.feedback;
    const offJoin = DISPLAY_POWER_JOINS.off.feedback;
    const onSubscription = Signal.DigitalEvent(onJoin, setOnFeedback);
    const offSubscription = Signal.DigitalEvent(offJoin, setOffFeedback);

    return () => {
      Signal.RemoveDigitalEvent(onJoin, onSubscription);
      Signal.RemoveDigitalEvent(offJoin, offSubscription);
    };
  }, []);

  return (
    <section
      className="display-controls-page"
      aria-labelledby="display-controls-title"
    >
      <h1 id="display-controls-title">Display Controls</h1>

      <div className="display-control-card">
        <div className="display-control-heading">
          <h2>Display</h2>
        </div>

        <div
          className="display-power-buttons"
          role="group"
          aria-label="Display 1 power"
        >
          <button
            aria-pressed={onFeedback === true}
            className="display-power-button display-power-button--on"
            onClick={() => Signal.PressAndRelease(DISPLAY_POWER_JOINS.on.command)}
            type="button"
          >
            On
          </button>
          <button
            aria-pressed={offFeedback === true}
            className="display-power-button display-power-button--off"
            onClick={() => Signal.PressAndRelease(DISPLAY_POWER_JOINS.off.command)}
            type="button"
          >
            Off
          </button>
        </div>
      </div>
    </section>
  );
}
