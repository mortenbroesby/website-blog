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
  const album = song?.item?.album?.name;
  const albumImageUrl = song?.item?.album?.images?.[0]?.url;
  const songUrl = song?.item?.external_urls?.spotify;

  return res.status(200).json({
    nowPlaying: {
      isPlaying: isPlaying ?? defaultProps.isPlaying,
      title: title ?? defaultProps.title,
      artist: artist ?? defaultProps.artist,
      album: album ?? defaultProps.album,
      albumImageUrl: albumImageUrl ?? defaultProps.albumImageUrl,
      songUrl: songUrl ?? defaultProps.songUrl,
    },
  });
}
