import "@/styles/globals.css"

interface RootLayoutProps {
  children: React.ReactNode
}

export const metadata = {
  title: {
    default: "Title",
    template: `%s | Title`,
  },
  description: "Description",
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
      <body>{children}</body>
    </html>
  )
}
