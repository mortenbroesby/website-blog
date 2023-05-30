import "@/styles/globals.css"

import { Inter, Josefin_Sans } from "next/font/google"
import { MainNav, TailwindIndicator } from "@/components"
import { ThemeProvider, websiteConfig } from "@/infrastructure"
import { cn } from "@/utils"

import { SiteFooter } from "@/components/footer"

const fontSans = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
})

const fontHeading = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-heading",
})

interface RootLayoutProps {
  children: React.ReactNode
}

const defaultDescription =
  "Website & Blog of Morten Broesby-Olsen. A software engineer, a programmer, a hobbyist."

export const metadata = {
  title: {
    default: "Morten Broesby-Olsen",
    template: `%s | Morten Broesby-Olsen`,
  },
  description: defaultDescription,
  keywords: [
    "Next.js",
    "React",
    "Tailwind CSS",
    "Server Components",
    "Radix UI",
  ],
  authors: [
    {
      name: "mortenbroesby",
      url: "https://morten.broesby.dk",
    },
  ],
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "bg-background min-h-screen font-sans antialiased",
          fontSans.variable,
          fontHeading.variable
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <PageLayout>{children}</PageLayout>
          <TailwindIndicator />
        </ThemeProvider>
      </body>
    </html>
  )
}

function PageLayout({ children }: RootLayoutProps) {
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
