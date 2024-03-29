/**
 * Calculate the value based on percentage, lower and upper bound values
 *
 * @param percent the percent value in decimals (e.g 0.6, 0.3)
 * @param min the minimum value
 * @param max the maximum value
 */
export function percentToValue(percent: number, min: number, max: number) {
  return (max - min) * percent + min
}

/**
 * Convert a value to percentage based on lower and upper bound values
 *
 * @param value the value in number
 * @param min the minimum value
 * @param max the maximum value
 */
export function valueToPercent(value: number, min: number, max: number) {
  return ((value - min) * 100) / (max - min)
}

interface Clamp {
  value: number
  min: number
  max: number
}

export function clamp({ value, min, max }: Clamp): number {
  const isUndefined = value === null || value === undefined
  const hasInvalidBounds = max < min

  const isValid = !isUndefined && !hasInvalidBounds
  if (isValid) {
    return Math.min(max, Math.max(min, value))
  }

  const warningMessage = {
    undefined: "clamp: value cannot be undefined",
    invalidBounds: "clamp: max cannot be less than min",
  }

  if (isUndefined) {
    console.warn(warningMessage.undefined)
  } else {
    console.warn(warningMessage.invalidBounds)
  }

  return 0
}
