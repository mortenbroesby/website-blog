"use client"

import { HTMLProps, useEffect, useState } from "react"
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
  const { data: initialData, mutate } = useSWR<PostView[]>(
    "/api/views",
    fetcher
  )

  const [data, setData] = useState<PostView[]>(initialData || [])

  const viewsForSlug = data.find((view) => view.slug === slug)
  const views = new Number(viewsForSlug?.count || 0)

  const viewsLabel = views === 1 ? "view" : "views"

  useEffect(() => {
    const registerView = async () => {
      const response = await fetch(`/api/views/${slug}`, {
        method: "POST",
      })

      const postData = await response.json()

      mutate()
    }

    if (trackView) {
      registerView()
    }
  }, [slug, trackView])

  useEffect(() => {
    setData(initialData || [])
  }, [initialData])

  return (
    <p {...properties}>
      {data.length > 0 ? `${views.toLocaleString()} ${viewsLabel}` : "​"}
    </p>
  )
}

export default ViewCounter
