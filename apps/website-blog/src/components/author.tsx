import React from "react"
import Image from "next/image"
import Link from "next/link"

function Author({
  author,
  ...properties
}: {
  author: {
    title: string
    name: string
    avatar: string
    github: string
  }
}) {
  const { title, name, avatar, github } = author

  return (
    <Link href={`https://github.com/${github}`}>
      <div
        className="items-center inline-flex whitespace-nowrap text-left"
        {...properties}
      >
        <div className="mr-2">
          <Image
            src={avatar}
            className="bg-zinc-100 h-11 w-11 rounded-full text-clip"
            alt={title}
            width={44}
            height={44}
          />
        </div>

        <div className="text-[0.90rem] flex flex-col justify:start">
          <p className="font-semibold">{name}</p>
          <p className="text-sky-600 cursor-pointer text-[0.75rem]">
            @{github}
          </p>
        </div>
      </div>
    </Link>
  )
}

Author.displayName = "Author"

export { Author }
