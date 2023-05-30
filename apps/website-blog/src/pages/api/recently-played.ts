import { NextApiRequest, NextApiResponse } from "next/types"
import { getRecentlyPlayed } from "~/src/lib/spotify"

export default async function fetchRecentlyPlayed(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const response = await getRecentlyPlayed()

  const infoNotAvailable = response.status === 204 || response.status > 400
  if (infoNotAvailable) {
    return res.status(200).json({
      tracks: [],
    })
  }

  const { items = [] } = await response.json()

  const tracks = items.map((recentlyPlayed) => {
    const { track } = recentlyPlayed ?? {}

    return {
      title: track?.name,
      artist: track?.artists?.map((_artist) => _artist.name).join(", ") ?? "",
      songUrl: track?.external_urls?.spotify ?? "",
    }
  })

  res.setHeader(
    "Cache-Control",
    "public, s-maxage=60, stale-while-revalidate=30"
  )

  return res.status(200).json({ tracks })
}
