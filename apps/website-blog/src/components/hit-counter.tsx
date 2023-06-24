"use client"

import { HTMLProps, useEffect } from "react"
import useSWR from "swr"

import { cn } from "../utils"

type PostView = {
  slug: string
  count: string
}

async function fetcher<JSON = any>(
  input: RequestInfo,
  init?: RequestInit
): Promise<JSON> {
  const res = await fetch(input, init)
  return res.json()
}

type HitCounterProps = HTMLProps<HTMLParagraphElement> & {
  slug: string
  trackView: boolean
}

const HitCounter: React.FC<HitCounterProps> = ({
  slug,
  trackView,
  className,
}) => {
  const {
    data = [],
    mutate,
    isLoading,
  } = useSWR<PostView[]>("/api/views", fetcher)

  const viewsForSlug = data?.find((view) => view.slug === slug)
  const views = new Number(viewsForSlug?.count || 0)

  const viewsLabel = views === 1 ? "view" : "views"

  useEffect(() => {
    const registerView = async () => {
      const response = await fetch(`/api/views/${slug}`, {
        method: "POST",
      })

      const formattedResponse = await response.json()

      console.debug({ formattedResponse })

      mutate()
    }

    if (trackView) {
      registerView()
    }
  }, [slug, trackView])

  if (isLoading) {
    return null
  }

  const digits = views.toString().padStart(3, "0").split("").map(Number)

  return (
    <div className={cn("flex flex-col items-center", className)}>
      <span className={cn("text-xs uppercase my-4", className)}>HITS</span>
      <div className="flex flex-row">
        {digits.map((digit, index) => (
          <span
            key={index}
            className={cn(
              "text-muted-foreground text-xs bg-gray-200 px-1 mx-1 rounded",
              className
            )}
          >
            {digit}
          </span>
        ))}
      </div>
    </div>
  )
}

export { HitCounter }
