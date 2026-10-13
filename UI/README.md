# Kaysville Junior High Auditorium UI

React and TypeScript CH5 interface for the Kaysville Junior High Auditorium
Crestron system.

## Toolchain

- Node.js 24.18.0
- npm 10.9.8
- React 19
- Vite 8
- Crestron CH5 libraries 2.19.x
- `@jag/crestron-ch5-core` 0.1.0 from the private GitHub repository

Volta pins the expected Node.js and npm versions in `package.json`. Use the
pinned toolchain consistently so Vite's native Rolldown dependency matches the
Node.js CPU architecture used during installation.

## Development

```bash
npm install
npm run dev
```

The development server prints the local preview URL.

## Verification and CH5 archive

```bash
npm run lint
npm run build
```

The build runs TypeScript and Vite, then packages `dist/` with the project-local
Crestron CH5 CLI. The generated archive is:

```text
kaysville-jhs-auditorium-ui.ch5z
```

Build output and `.ch5z` archives are intentionally ignored by Git.

## Processor-triggered shutdown

- The panel sends the maintained room command on digital join 1: `true` after
  warming and `false` when shutdown is confirmed.
- The processor drives digital feedback join 3 high to invoke the same action
  as the panel's Confirm shutdown button. The panel sends join 1 `false`, shows
  the 5-second cooling page, then returns to Welcome.
- Drive join 3 low again afterward so a future high can trigger another
  shutdown. A low value has no action on its own.

The Vite production configuration is panel-specific:

- `base: './'` keeps JavaScript and CSS paths relative to the CH5 project.
- A build-only HTML transform emits a classic deferred entry script for native
  Crestron touchpanels while retaining normal Vite modules during development.

## Package access

The shared CH5 core repository is private. A new development machine must be
authenticated with GitHub before running `npm install`.
