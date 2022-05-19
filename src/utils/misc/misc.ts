/**
 * A "no-operation" function, which does nothing.
 *
 * Explanation: https://www.noop.com.au/noop-meaning/
 *
 * @param args - any arguments passed to the function
 * @returns void (nothing)
 */
export const noop = (...args: any[]): any => void 0;

/**
 * Are we dealing with SSR or CSR (normal browser)?
 * Is used to check when implementing isomorphic (aka universal) logic
 *
 * @returns boolean
 */
export const isBrowser = !!(
  typeof window !== "undefined" &&
  window.document &&
  window.document.createElement
);

/**
 * Generate a random identifier string.
 *
 * @param prefix - Optional prefix
 * @returns string
 */
export function getRandomId(prefix?: string) {
  if (prefix) {
    return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
  }

  return `${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Preload image
 *
 * @param src - image source
 * @returns promise
 */
export function preloadImage(src: string) {
  return new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = function () {
      resolve(img);
    };

    img.onerror = img.onabort = function () {
      reject(src);
    };

    img.src = src;
  });
}

export function flattenObject(object) {
  const result = {};

  Object.values(object).forEach((nestedObject) => {
    Object.assign(result, nestedObject);
  });

  return result;
}

/**
 * calculateReadTime
 *
 * @description
 * Calculate average read time based on string input.
 *
 * @param content - content to be checked
 * @returns number - time in minutes it takes to read the content.
 */
export function calculateReadTime(content: string): number {
  const WPS = 200 / 60;

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

export function delay(milliseconds: number) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

export function getRandomItemFromArray<T extends any[]>(array: T) {
  return array[Math.floor(Math.random() * array.length)];
}
