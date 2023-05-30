"use client"

import * as React from "react"
import Link from "next/link"
import { useSelectedLayoutSegment } from "next/navigation"
import { cn } from "@/utils"

import { MainNavItem } from "types"
import { useClickInside } from "@/hooks/use-click-inside"
import { useLockBody } from "@/hooks/use-lock-body"

import { Icons } from "./icons"

export function Header({
  items,
  children,
}: {
  items?: MainNavItem[]
  children?: React.ReactNode
}) {
  const segment = useSelectedLayoutSegment()

  const [showMobileMenu, setShowMobileMenu] = React.useState<boolean>(false)

  const hasItems = items?.length ?? false

  const onCloseRef = React.useRef<() => void>(() => {
    setShowMobileMenu(false)
  })

  return (
    <header className="bg-background sticky top-0 z-40 border-b">
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex gap-6 md:gap-10">
          <Link href="/" className="hidden items-center space-x-2 md:flex">
            <h3 className="hidden font-bold sm:inline-block">@mortenbroesby</h3>
          </Link>

          {hasItems && (
            <nav className="hidden gap-6 md:flex">
              {items?.map((item, index) => (
                <Link
                  key={index}
                  href={item.disabled ? "#" : item.href}
                  className={cn(
                    "hover:text-foreground/80 flex items-center text-lg font-medium transition-colors sm:text-sm",
                    item.href.startsWith(`/${segment}`)
                      ? "text-foreground"
                      : "text-foreground/60",
                    item.disabled && "cursor-not-allowed opacity-80"
                  )}
                >
                  {item.title}
                </Link>
              ))}
            </nav>
          )}

          <button
            className="flex items-center space-x-2 md:hidden"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          >
            {showMobileMenu ? <Icons.close /> : <Icons.menu />}
            <span className="font-bold">Menu</span>
          </button>

          {showMobileMenu && hasItems && (
            <MobileNav items={items} onCloseRef={onCloseRef}>
              {children}
            </MobileNav>
          )}
        </div>
      </div>
    </header>
  )
}

function MobileNav({
  items,
  children,
  onCloseRef,
}: {
  items?: MainNavItem[]
  children?: React.ReactNode
  onCloseRef: React.MutableRefObject<() => void>
}) {
  const clickRef = React.useRef<HTMLDivElement>(null)

  useClickInside(onCloseRef.current, clickRef)

  useLockBody()

  return (
    <div
      ref={clickRef}
      className={cn(
        "animate-in slide-in-from-bottom-80 fixed inset-0 top-16 z-50 grid h-[calc(100vh-4rem)] grid-flow-row auto-rows-max overflow-auto p-6 pb-32 shadow-md md:hidden",
        "bg-black/40"
      )}
    >
      <div className="bg-popover text-popover-foreground relative z-20 grid gap-4 rounded-md p-4 shadow-md">
        <Link href="/" className="flex items-center space-x-2">
          <span className="font-bold">@mortenbroesby</span>
        </Link>

        <nav className="grid grid-flow-row auto-rows-max text-sm">
          {items?.map((item, index) => (
            <Link
              key={index}
              href={item.disabled ? "#" : item.href}
              className={cn(
                "flex w-full items-center rounded-md p-2 text-sm font-medium hover:underline",
                item.disabled && "cursor-not-allowed opacity-60"
              )}
            >
              {item.title}
            </Link>
          ))}
        </nav>
        {children}
      </div>
    </div>
  )
}
