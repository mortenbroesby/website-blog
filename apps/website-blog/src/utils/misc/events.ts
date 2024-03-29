export function on<T extends Window | Document | HTMLElement | EventTarget>(
  object: T | null,
  ...args: Parameters<T["addEventListener"]> | [string, Function | null, ...any]
): void {
  if (object && object.addEventListener) {
    object.addEventListener(
      ...(args as Parameters<HTMLElement["addEventListener"]>)
    )
  }
}

export function off<T extends Window | Document | HTMLElement | EventTarget>(
  object: T | null,
  ...args:
    | Parameters<T["removeEventListener"]>
    | [string, Function | null, ...any]
): void {
  if (object && object.removeEventListener) {
    object.removeEventListener(
      ...(args as Parameters<HTMLElement["removeEventListener"]>)
    )
  }
}

export function isTouchEvent(event: Event): event is TouchEvent {
  return "touches" in event
}
