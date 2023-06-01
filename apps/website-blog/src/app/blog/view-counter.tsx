"use client"

import { HTMLProps, useEffect } from "react"
import useSWR from "swr"

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
  ...properties
}) => {
  const { data } = useSWR<PostView[]>("/api/views", fetcher)

  const viewsForSlug = data && data.find((view) => view.slug === slug)
  const views = new Number(viewsForSlug?.count || 0)

  const viewsLabel = views == 1 ? "view" : "views"

  useEffect(() => {
    const registerView = () =>
      fetch(`/api/views/${slug}`, {
        method: "POST",
      })

    if (trackView) {
      registerView()
    }
  }, [slug])

  return (
    <p {...properties}>
      {data ? `${views.toLocaleString()} ${viewsLabel}` : "​"}
    </p>
  )
}

export default ViewCounter
