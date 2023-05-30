"use client"

import * as React from "react"
import { useTheme } from "next-themes"

import { Button } from "@/components/button"
import { Icons } from "@/components/icons"

export function ModeToggle() {
  const { setTheme } = useTheme()

  return (
    <Button variant="ghost" size="sm" className="h-8 w-8 px-0">
      <Icons.sun
        className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
        onClick={() => setTheme("dark")}
      />
      <Icons.moon
        className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
        onClick={() => setTheme("light")}
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
