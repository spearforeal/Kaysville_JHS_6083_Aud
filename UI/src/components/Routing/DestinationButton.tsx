import type { ComponentType, SVGProps } from "react";

type TDestinationButtonProps = {
  label: string;
  currentSource: string | null;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
} & (
  | { disabled: true; onClick?: never }
  | { disabled?: false; onClick: () => void }
);
export function DestinationButton({
  Icon,
  label,
  currentSource,
  onClick,
  disabled = false,
}: TDestinationButtonProps) {
  return (
    <button
      className="Destination-button"
      type="button"
      onClick={onClick}
      disabled={disabled}
    >
      <Icon className="Destination-icon" aria-hidden="true" />
      <span className="Destination-details">
        <strong>{label}</strong>
        <small>
          {currentSource === null
            ? "Route status unavailable"
            : `Current source: ${currentSource}`}
        </small>
      </span>
    </button>
  );
}
