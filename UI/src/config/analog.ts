const ANALOG_MAX = 65535;
const PERCENT_MAX = 100;

export function analogToPercent(value: number): number {
  if (!Number.isFinite(value) || value < 0 || value > ANALOG_MAX) {
    throw new RangeError(`Invalid Crestron analog value: ${value}`);
  }

  return Math.round((value / ANALOG_MAX) * PERCENT_MAX);
}

export function percentToAnalog(percent: number): number {
  if (!Number.isFinite(percent) || percent < 0 || percent > PERCENT_MAX) {
    throw new RangeError(`Invalid percentage: ${percent}`);
  }

  return Math.round((percent / PERCENT_MAX) * ANALOG_MAX);
}
