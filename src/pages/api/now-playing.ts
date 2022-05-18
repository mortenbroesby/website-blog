import { getNowPlaying } from "~/lib";
import { getDefaultNowPlaying } from "~/data";
import { NextApiRequest, NextApiResponse } from "next/types";

export default async function fetchNowPlaying(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const response = await getNowPlaying();
  const defaultProps = getDefaultNowPlaying();

  const infoNotAvailable = response.status === 204 || response.status > 400;
  if (infoNotAvailable) {
    return res.status(200).json({
      nowPlaying: defaultProps,
    });
  }

  const song = await response.json();

  const isPlaying = song?.is_playing;
  const title = song?.item?.name;
  const artist = song?.item?.artists?.map((_artist) => _artist.name).join(", ");

  return res.status(200).json({
    nowPlaying: {
      isPlaying: isPlaying ?? defaultProps.isPlaying,
      track: {
        title: title ?? defaultProps.track.title,
        artist: artist ?? defaultProps.track.artist,
        songUrl:
          song?.item?.external_urls?.spotify ?? defaultProps.track.songUrl,
      },
    },
  });
}
