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
        className="items-center text-black inline-flex whitespace-nowrap text-left"
        {...properties}
      >
        <div className="mr-2">
          <Image
            src={avatar}
            className="bg-zinc-100 h-8 w-8 rounded-full text-clip"
            alt={title}
            width={32}
            height={32}
          />
        </div>

        <span className="text-[0.90rem] flex flex-col justify:start">
          <span className="font-semibold">{name}</span>
          <span className="text-sky-600 cursor-pointer text-[0.75rem]">
            @{github}
          </span>
        </span>
      </div>
    </Link>
  )
}

Author.displayName = "Author"

export { Author }
