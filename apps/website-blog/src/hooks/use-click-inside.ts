import { useEffect, useRef } from "react"

type EventListener = (event: MouseEvent) => void

const useClickInside = (
  callback: EventListener,
  targetRef: React.RefObject<HTMLElement>
) => {
  const savedCallback = useRef<EventListener | null>(null)

  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const { current: target } = targetRef

      const shouldTrigger = target && savedCallback.current
      if (shouldTrigger) {
        savedCallback.current!(event)
      }
    }

    document.addEventListener("click", handleClick)

    return () => {
      document.removeEventListener("click", handleClick)
    }
  }, [targetRef])
}

export { useClickInside }
