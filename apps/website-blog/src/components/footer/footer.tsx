import * as React from "react"
import Link from "next/link"

import { Icons } from "../icons"
import { Spotify } from "../spotify"
import { LinkedInSvg } from "./LinkedInSvg"

export function Footer() {
  return (
    <footer className="">
      <div className="border-t mt-10">
        <div className="container bg-background">
          <div className="flex flex-col items-center justify-between gap-4 pt-10 md:h-24 md:flex-row md:py-0">
            <Spotify />

            <div className="flex flex-row gap-2">
              <Link href="https://www.linkedin.com/in/morten-broesby-olsen/">
                <LinkedInSvg />
              </Link>

              <Link href="https://github.com/mortenbroesby">
                <Icons.github />
              </Link>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center py-10 md:flex-row md:justify-center">
            <p className="text-xs text-center md:inline md:mr-1">
              © 2022-present Morten Broesby-Olsen.
            </p>
            <p className="text-xs text-center md:inline md:ml-1">
              All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
