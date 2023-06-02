"use client"

import { HTMLProps, useEffect, useState } from "react"
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

type ViewCounterProps = HTMLProps<HTMLParagraphElement> & {
  slug: string
  trackView: boolean
}

const ViewCounter: React.FC<ViewCounterProps> = ({
  slug,
  trackView,
  className,
  children,
  ...properties
}) => {
  const { data, mutate, isLoading } = useSWR<PostView[]>("/api/views", fetcher)

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
    return <div className="flex flex-row">{children}</div>
  }

  return (
    <div className="flex flex-row">
      {children}
      <p className={cn("text-muted-foreground text-xs mx-2", className)}>—</p>
      <p className={cn("text-muted-foreground text-xs", className)}>
        {data ? `${views.toLocaleString()} ${viewsLabel}` : "​"}
      </p>
    </div>
  )
}

export default ViewCounter
