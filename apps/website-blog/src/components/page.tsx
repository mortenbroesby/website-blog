import * as React from "react"

import { websiteConfig } from "../infrastructure"
import { Footer } from "./footer"
import { Header } from "./header"

export function Page({ children }: React.HTMLAttributes<HTMLElement>) {
  return (
    <div className="flex min-h-screen flex-col space-y-6">
      <Header items={websiteConfig.mainNav} />

      <div className="container">{children}</div>

      <Footer />
    </div>
  )
}
