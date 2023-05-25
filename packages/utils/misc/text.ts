/**
 * Capitalize the first letter of a string
 * @param input - input
 * @returns string
 */
export const capitalize = (input: string) => {
  return input.charAt(0).toUpperCase() + input.slice(1);
};

/**
 * Is target value a string?
 *
 * @param value - input
 * @returns boolean
 */
export const isText = (value: unknown) => {
  return typeof value === "string" || value instanceof String;
};
