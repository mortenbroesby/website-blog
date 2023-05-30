"use client"

import React from "react"
import Link from "next/link"
import { useSpotify } from "~/src/infrastructure"

import { EqualiserSvg } from "./EqualiserSvg"
import { SpotifySvg } from "./SpotifySvg"

const notPlaying = {
  title: "Not Playing",
  artist: "Spotify",
  songUrl: "https://open.spotify.com/",
}

export function Spotify() {
  const { isLoading, nowPlaying, lastPlayed } = useSpotify()

  const { isPlaying, track: currentTrack } = nowPlaying

  const inactiveTrack = lastPlayed ?? notPlaying

  const displayTitle = isPlaying ? currentTrack.title : inactiveTrack.title
  const displayArtist = isPlaying ? currentTrack.artist : inactiveTrack.artist
  const songUrl = isPlaying ? currentTrack.songUrl : inactiveTrack.songUrl

  const playingIcon = isPlaying ? (
    <div className="flex flex-row">
      <div className="min-w-24 min-h-24">
        <SpotifySvg />
      </div>
      <div className="min-w-24 min-h-24">
        <EqualiserSvg />
      </div>
    </div>
  ) : (
    <SpotifySvg />
  )

  const playingElement = (
    <Link href={songUrl}>
      <div className="flex items-center justify-start flex-1 text-xs cursor-pointer">
        <div className="flex items-center">
          <div className="mr-2">{playingIcon}</div>

          <div className="flex flex-col">
            <div className="font-semibold">
              {isPlaying ? "Currently playing" : "Last played"}
            </div>
            <div>
              {displayTitle}
              <span className="px-1">—</span>
              <span className="text-gray-600">{displayArtist}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )

  return <div>{isLoading ? null : playingElement}</div>
}
