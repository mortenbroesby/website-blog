import * as React from "react"

import { websiteConfig } from "../infrastructure"
import { SiteFooter } from "./footer"
import { MainNav } from "./navigation"

export function Page({ children }: React.HTMLAttributes<HTMLElement>) {
  return (
    <div className="flex min-h-screen flex-col space-y-6">
      <header className="bg-background sticky top-0 z-40 border-b">
        <div className="container flex h-16 items-center justify-between py-4">
          <MainNav items={websiteConfig.mainNav} />
        </div>
      </header>
      <div className="container grid flex-1 gap-12">
        <main className="flex w-full flex-1 flex-col overflow-hidden">
          {children}
        </main>
      </div>

      <SiteFooter />
    </div>
  )
}
