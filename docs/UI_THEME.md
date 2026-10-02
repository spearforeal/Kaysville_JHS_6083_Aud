# Kaysville Junior High Auditorium UI Theme

## Direction

The UI should feel recognizably connected to Kaysville Junior High without copying the public website. The website's strongest visual signals are its deep school red, high-contrast white and black, heavy sans-serif headings, square geometry, thin dividers, and direct icon-plus-label navigation.

For an auditorium, those cues are adapted to a dark control surface. This reduces glare in a dim room and lets the red identify priority, selection, and focus instead of covering most of the screen.

## Brand translation

| Website cue | Control UI use |
| --- | --- |
| Kaysville red `#A60017` | Primary action, selected source, active navigation, focus ring |
| White backgrounds | Warm-white text and elevated control surfaces |
| Black text | Charcoal room background |
| Heavy Inter headings | Short page titles and clear control labels |
| Square tiles and rules | Low-radius panels with thin borders |
| Simple white line icons | Familiar AV icons paired with text labels |
| Knight identity | Restrained angular/notched details; no mascot dependency |

## Core palette

- `Brand / Kaysville Red`: `#A60017`
- `Brand Red Hover`: `#BF0A27`
- `Brand Red Pressed`: `#850012`
- `Canvas`: `#0E1114`
- `Surface`: `#171B20`
- `Surface Raised`: `#20262C`
- `Border`: `#353D45`
- `Text`: `#F7F7F5`
- `Text Muted`: `#AEB5BC`
- `Disabled`: `#646C74`
- `Success`: `#35A86B`
- `Warning`: `#E5A62B`
- `Fault`: `#E24A4A`

The semantic fault color stays visually separate from the darker brand red. This prevents a normal selected button from looking like an alarm.

## Typography

- Primary stack: `Inter, Helvetica Neue, Arial, sans-serif`.
- Page title: 28–34 px, weight 800–900.
- Section heading: 18–22 px, weight 750–800.
- Control label: 16–20 px, weight 650–750.
- Supporting/status text: 14–16 px, weight 450–550.
- Use sentence case for instructions and status. Reserve uppercase for short navigation or mode labels.

## Shape and spacing

- Use an 8 px spacing grid.
- Standard panel radius: 8 px.
- Buttons: 6 px radius; selected tiles may use one subtle clipped/notched corner.
- Use 1 px borders and avoid large shadows.
- Minimum touch target: 56 x 56 px; primary controls should usually be 64–72 px tall.
- Keep generous empty space between source selection, transport, volume, and room actions.

## Component behavior

### Navigation

Use a stable left rail or bottom bar depending on panel aspect ratio. Active navigation uses a red edge or red-filled item with a white icon and label. Do not rely on color alone; preserve the label and a clear selected shape.

### Source tiles

Source tiles use raised charcoal surfaces. A selected source gets a red border or red fill plus a visible `Selected` or `On air` state. Avoid making every source tile red.

### Primary actions

Use brand red for actions such as `Start room`, `Present`, or `Confirm`. Use charcoal/outlined buttons for secondary actions. Destructive actions should use the separate fault color and require clear wording.

### Volume

Keep volume persistent and easy to reach. Use a large level readout, mute state with text and icon, and plus/minus targets sized for touch. Red can indicate the active slider or focus; fault red is reserved for actual problems.

### Feedback and faults

Normal feedback should be quiet and local to the related control. Use the semantic success, warning, and fault colors only when their meanings apply. Required configuration or failed operations must surface visibly rather than falling back silently.

## First-screen guidance

When the room is off, show only:

1. `Kaysville Junior High Auditorium`
2. One short sentence explaining that the system is off.
3. One primary `Start room` action.

After startup, prioritize the operator's workflow: choose a source, confirm the destination/state, adjust audio, and end the session. Avoid connection badges, processor terminology, IP IDs, and other implementation details on end-user screens.

## Avoid

- Full-screen red backgrounds for normal control pages.
- Gradients, glass effects, oversized shadows, or decorative chrome.
- Mascot or school-logo reproduction unless an approved asset and usage decision are provided.
- Red for both normal selection and alarms without another distinguishing signal.
- Icon-only controls for unfamiliar AV functions.
- Tiny web-style links or controls that are difficult to operate from a touch panel.

## Source reference

Theme cues were taken from the official [Kaysville Junior High website](https://kaysvillejr.davis.k12.ut.us/) on 2026-10-02. The site exposed `#A60017` as its primary red and used `Inter, Helvetica, Arial, sans-serif` with heavy headings.
