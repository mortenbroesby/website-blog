import "@/styles/globals.css"

import { Inter, Josefin_Sans } from "next/font/google"
import { TailwindIndicator } from "@/components"
import { RootProvider } from "@/infrastructure"
import { cn } from "@/utils"

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

export const metadata = {
  title: {
    default: "Morten Broesby-Olsen",
    template: `%s | Morten Broesby-Olsen`,
  },
  description:
    "Website & Blog of Morten Broesby-Olsen. A software engineer, a programmer, a hobbyist.",
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
        <RootProvider>
          <>{children}</>
          <TailwindIndicator />
        </RootProvider>
      </body>
    </html>
  )
}
