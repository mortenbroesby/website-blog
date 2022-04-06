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

export function calculateReadTime(content: string): number {
  const WPS = 275 / 60;

  let images = 0;
  const regex = /\w/;

  const words = content.split(" ").filter((word) => {
    if (word.includes("<img")) {
      images += 1;
    }
    return regex.test(word);
  }).length;

  const imageAdjust = images * 4;
  let imageSecs = 0;
  let imageFactor = 12;

  while (images) {
    imageSecs += imageFactor;

    if (imageFactor > 3) {
      imageFactor -= 1;
    }

    images -= 1;
  }

  const minutes = Math.ceil(((words - imageAdjust) / WPS + imageSecs) / 60);
  return minutes;
}
