import { useState } from "react";
import { ClearSourceIcon } from "../components/Routing/ClearSourceIcon";
import { JoinedDestinationButton } from "../components/Routing/JoinedDestinationButton";
import { SourceButton } from "../components/Routing/SourceButton";
import {
  AUDIO_SOURCE_VALUES,
  ROUTING_DESTINATION_JOINS,
  VIDEO_SOURCE_VALUES,
} from "../config/joins";
import {
  HdmiPortIcon,
  TvMinimalPlayIcon,
  ProjectorIcon,
  MonitorIcon,
  Volume2Icon,
} from "lucide-react";

type RoutingSourceId = keyof typeof VIDEO_SOURCE_VALUES;

const INPUT_SOURCES = [
  { id: "hdmi-1", label: "HDMI 1", Icon: HdmiPortIcon },
  { id: "hdmi-2", label: "HDMI 2", Icon: HdmiPortIcon },
  {
    id: "media-stream-1",
    label: "Media Stream 1",
    Icon: TvMinimalPlayIcon,
  },
  {
    id: "media-stream-2",
    label: "Media Stream 2",
    Icon: TvMinimalPlayIcon,
  },
] as const;
const SOURCE_LABELS: Record<RoutingSourceId, string> = {
  clear: "No route",
  "hdmi-1": "HDMI 1",
  "hdmi-2": "HDMI 2",
  "media-stream-1": "Media Stream 1",
  "media-stream-2": "Media Stream 2",
};
const ROUTING_DESTINATIONS = [
  {
    id: "output-1",
    label: "OUTPUT 1",
    Icon: ProjectorIcon,
    joins: ROUTING_DESTINATION_JOINS["output-1"],
    sourceValues: VIDEO_SOURCE_VALUES,
  },
  {
    id: "output-2",
    label: "OUTPUT 2",
    Icon: MonitorIcon,
    joins: ROUTING_DESTINATION_JOINS["output-2"],
    sourceValues: VIDEO_SOURCE_VALUES,
  },
  {
    id: "audio",
    label: "AUDIO",
    Icon: Volume2Icon,
    joins: ROUTING_DESTINATION_JOINS.audio,
    sourceValues: AUDIO_SOURCE_VALUES,
  },
] as const;

export function RoutingPage() {
  const [selectedSourceId, setSelectedSourceId] =
    useState<RoutingSourceId | null>(null);

  return (
    <section
      className="main-content routing-page"
      aria-labelledby="routing-title"
    >
      <h1 id="routing-title">Routing</h1>
      <div
        className="routing-destinations"
        aria-labelledby="destinations-title"
      >
        <h2 id="destinations-title">Destinations</h2>
        <div className="routing-destination-grid">
          {ROUTING_DESTINATIONS.map((destination) => (
            <JoinedDestinationButton
              Icon={destination.Icon}
              joins={destination.joins}
              key={destination.id}
              label={destination.label}
              selectedSourceId={selectedSourceId}
              sourceLabels={SOURCE_LABELS}
              sourceValues={destination.sourceValues}
            />
          ))}
        </div>
      </div>
      <div className="routing-sources-footer">
        <div className="routing-sources-heading">
          <h2>Sources</h2>
        </div>
        <div className="routing-source-grid">
          {INPUT_SOURCES.map((source) => (
            <SourceButton
              Icon={source.Icon}
              key={source.id}
              label={source.label}
              onClick={() => setSelectedSourceId(source.id)}
              selected={selectedSourceId === source.id}
            />
          ))}
          <SourceButton
            Icon={ClearSourceIcon}
            label="Clear Source"
            onClick={() => setSelectedSourceId("clear")}
            selected={selectedSourceId === "clear"}
          />
        </div>
      </div>
    </section>
  );
}
