import * as React from "react"

import { ModeToggle } from "@/components/mode-toggle"

import { Spotify } from "./spotify"

export function Footer() {
  return (
    <footer>
      <div className="container bg-background border-t">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col items-center justify-between gap-4 pt-10 md:h-24 md:flex-row md:py-0">
            <Spotify />

            <ModeToggle />
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
