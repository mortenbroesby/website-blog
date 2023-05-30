"use client"

import { SpotifyProvider } from "./spotify"
import { ThemeProvider } from "./theme"

interface RootProviderProps {
  children: React.ReactNode
}

export function RootProvider({ children, ...props }: RootProviderProps) {
  return (
    <SpotifyProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        {...props}
      >
        {children}
      </ThemeProvider>
    </SpotifyProvider>
  )
}
