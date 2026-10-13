import { useEffect, useState } from "react";
import { Signal } from "@jag/crestron-ch5-core";
import { DSP_STATUS_JOINS } from "../config/joins";

interface StatusPageProps {
  processorConnected: boolean;
}

export function StatusPage({ processorConnected }: StatusPageProps) {
  const [dspConnected, setDspConnected] = useState<boolean | null>(null);
  const [dspIpAddress, setDspIpAddress] = useState<string | null>(null);

  useEffect(() => {
    const connectionSubscription = Signal.DigitalEvent(
      DSP_STATUS_JOINS.connected,
      setDspConnected,
    );
    const ipSubscription = Signal.SerialEvent(
      DSP_STATUS_JOINS.ipAddress,
      setDspIpAddress,
    );

    return () => {
      Signal.RemoveDigitalEvent(
        DSP_STATUS_JOINS.connected,
        connectionSubscription,
      );
      Signal.RemoveSerialEvent(DSP_STATUS_JOINS.ipAddress, ipSubscription);
    };
  }, []);

  const connectionLabel =
    !processorConnected || dspConnected === null
      ? "Unavailable"
      : dspConnected
        ? "Connected"
        : "Disconnected";
  const ipLabel =
    processorConnected && dspIpAddress?.trim()
      ? dspIpAddress.trim()
      : "Unavailable";

  return (
    <section className="status-page" aria-labelledby="status-title">
      <h1 id="status-title">Status</h1>
      <div className="status-list">
        <div className="status-row">
          <span>DSP connection</span>
          <strong
            className={
              connectionLabel === "Connected" ? "status-connected" : undefined
            }
          >
            {connectionLabel}
          </strong>
        </div>
        <div className="status-row">
          <span>DSP IP address</span>
          <strong>{ipLabel}</strong>
        </div>
      </div>
    </section>
  );
}
