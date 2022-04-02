import { parseISO, format } from "date-fns";

export function parseDate(dateString: string) {
  const date = parseISO(dateString);
  const formattedDate = format(date, "LLLL d, yyyy");
  return formattedDate;
}

export function flattenObject(object) {
  const result = {};

  Object.values(object).forEach((nestedObject) => {
    Object.assign(result, nestedObject);
  });

  return result;
}

export const noop = (...args: any[]): any => void 0;
