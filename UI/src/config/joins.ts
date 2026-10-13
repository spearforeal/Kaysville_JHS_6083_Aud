export const PANEL_CONNECTION = {
  ipId: "0x03",
} as const;

export const ROOM_STATE_JOIN = 1;

export const DSP_STATUS_JOINS = {
  connected: 2,
  ipAddress: 2,
} as const;
export const VIDEO_SOURCE_VALUES = {
  clear: 0,
  "hdmi-1": 1,
  "hdmi-2": 2,
  "media-stream-1": 7,
  "media-stream-2": 8,
} as const;
export const AUDIO_SOURCE_VALUES = {
  clear: 0,
  "hdmi-1": 6,
  "hdmi-2": 7,
  "media-stream-1": 12,
  "media-stream-2": 13,
} as const;

export const ROUTING_DESTINATION_JOINS = {
  "output-1": { command: 10, feedback: 10 },
  "output-2": { command: 11, feedback: 11 },
  audio: { command: 12, feedback: 12 },
} as const;

export const PROGRAM_AUDIO_JOINS = {
  level: 5,
  mute: 5,
} as const;

export const DISPLAY_POWER_JOINS = {
  on: { command: 50, feedback: 50 },
  off: { command: 51, feedback: 51 },
} as const;

export const AUDIO_INPUT_JOINS = {
  "mic-line-1": {
    level: 25,
    mute: 25,
  },
  "mic-line-2": {
    level: 26,
    mute: 26,
  },
  "mic-line-3": {
    level: 27,
    mute: 27,
  },
  "mic-line-4": {
    level: 28,
    mute: 28,
  },
  "mic-line-5": {
    level: 29,
    mute: 29,
  },
  "mic-line-6": {
    level: 30,
    mute: 30,
  },
  "mic-line-7": {
    level: 31,
    mute: 31,
  },
  "mic-line-8": {
    level: 32,
    mute: 32,
  },
  "mic-line-9": {
    level: 33,
    mute: 33,
  },
  "mic-line-10": {
    level: 34,
    mute: 34,
  },
  "mic-line-11": {
    level: 35,
    mute: 35,
  },
  "mic-line-12": {
    level: 36,
    mute: 36,
  },
  "mic-line-13": {
    level: 37,
    mute: 37,
  },
  "mic-line-14": {
    level: 38,
    mute: 38,
  },
  "bluetooth-wall-plate-1": {
    level: 39,
    mute: 39,
  },
  "bluetooth-wall-plate-2": {
    level: 40,
    mute: 40,
  },
} as const;
