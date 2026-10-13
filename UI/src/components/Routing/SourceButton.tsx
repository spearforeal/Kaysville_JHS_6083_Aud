import type { ComponentType, SVGProps } from "react";

type TSourceButtonProps = {
  label: string;
  isActive?: boolean;
  selected: boolean;
  onClick: () => void;
} & (
  | { Icon: ComponentType<SVGProps<SVGSVGElement>>; iconSrc?: never }
  | { Icon?: never; iconSrc: string }
);
export function SourceButton({
  Icon,
  iconSrc,
  label,
  selected,
  /*isActive,*/
  onClick,
}: TSourceButtonProps) {
  return (
    <button
      className={
        selected
          ? "Source-button Selected Button-press-effect"
          : "Source-button Button-press-effect"
      }
      type="button"
      aria-pressed={selected}
      onClick={onClick}
    >
      {Icon ? (
        <Icon className="Source-icon" aria-hidden="true" />
      ) : (
        <img className="Source-icon" src={iconSrc} alt="" />
      )}
      <span>{label}</span>
      {/*<span
        className={isActive ? "Led-indicator Active" : "Led-indicator"}
        aria-hidden="true"
      /> */}
    </button>
  );
}
