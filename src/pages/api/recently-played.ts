import { getRecentlyPlayed } from "~/lib";
import { NextApiRequest, NextApiResponse } from "next/types";

export default async function fetchRecentlyPlayed(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const response = await getRecentlyPlayed();

  const infoNotAvailable = response.status === 204 || response.status > 400;
  if (infoNotAvailable) {
    return res.status(200).json({
      tracks: [],
    });
  }

  const { items = [] } = await response.json();

  const tracks = items.map((recentlyPlayed) => {
    const { track } = recentlyPlayed ?? {};

    return {
      title: track?.name,
      artist: track?.artists?.map((_artist) => _artist.name).join(", ") ?? "",
      songUrl: track?.external_urls?.spotify ?? "",
    };
  });

  return res.status(200).json({ tracks });
}
