export const EqualiserSvg = (properties) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="rotate-180"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="orange"
      {...properties}
    >
      <rect
        className="animate-equaliser-bar-short"
        x="4"
        y="4"
        width="3.7"
        height="8"
      />
      <rect
        className="animate-equaliser-bar-tall animation-delay-33"
        x="10.2"
        y="4"
        width="3.7"
        height="16"
      />
      <rect
        className="animate-equaliser-bar-short animation-delay-66"
        x="16.3"
        y="4"
        width="3.7"
        height="11"
      />
    </svg>
  )
}
