import React from "react"
import Image from "next/image"

const Avatar = ({ src, alt, ...properties }) => {
  return (
    <div {...properties}>
      <Image
        className="rounded-full"
        src={src}
        alt={alt}
        priority
        width={200}
        height={200}
      />
    </div>
  )
}

Avatar.displayName = "Avatar"

export { Avatar }
