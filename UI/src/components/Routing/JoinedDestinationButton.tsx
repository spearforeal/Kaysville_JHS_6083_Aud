import { useEffect, useState } from "react";
import type { ComponentType, SVGProps } from "react";
import { Signal } from "@jag/crestron-ch5-core";
import type { VIDEO_SOURCE_VALUES } from "../../config/joins";
import { DestinationButton } from "./DestinationButton";

type RoutingSourceId = keyof typeof VIDEO_SOURCE_VALUES;

interface JoinedDestinationButtonProps {
  label: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  joins: { readonly command: number; readonly feedback: number };
  sourceValues: Readonly<Record<RoutingSourceId, number>>;
  sourceLabels: Readonly<Record<RoutingSourceId, string>>;
  selectedSourceId: RoutingSourceId | null;
}

export function JoinedDestinationButton({
  label,
  Icon,
  joins,
  sourceValues,
  sourceLabels,
  selectedSourceId,
}: JoinedDestinationButtonProps) {
  const [feedbackValue, setFeedbackValue] = useState<number | null>(null);

  useEffect(() => {
    const subscriptionId = Signal.AnalogEvent(joins.feedback, setFeedbackValue);
    return () => Signal.RemoveAnalogEvent(joins.feedback, subscriptionId);
  }, [joins.feedback]);

  const matchedSource = Object.entries(sourceValues).find(
    ([, value]) => value === feedbackValue,
  );
  const currentSource =
    feedbackValue === null
      ? null
      : matchedSource
        ? sourceLabels[matchedSource[0] as RoutingSourceId]
        : `Unknown route (${feedbackValue})`;

  if (selectedSourceId === null) {
    return (
      <DestinationButton
        Icon={Icon}
        currentSource={currentSource}
        disabled
        label={label}
      />
    );
  }

  return (
    <DestinationButton
      Icon={Icon}
      currentSource={currentSource}
      label={label}
      onClick={() => Signal.Analog(joins.command, sourceValues[selectedSourceId])}
    />
  );
}
