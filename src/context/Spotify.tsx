import axios from "axios";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { LocalStorage } from "~/utils";
import {
  getDefaultNowPlaying,
  NowPlaying,
  NowPlayingResponse,
  Track,
} from "~/data";

const defaultNowPlaying = getDefaultNowPlaying();

interface ContextProps {
  isLoading: boolean;
  nowPlaying: NowPlaying;
  lastPlayed: Track;
  recentlyPlayed: Track[];
}

const SpotifyContext = createContext<ContextProps>({
  isLoading: true,
  nowPlaying: getDefaultNowPlaying(),
  lastPlayed: getDefaultNowPlaying().track,
  recentlyPlayed: [],
});

export const useSpotify = () => useContext(SpotifyContext);

let nowPlayingTimer;
let recentlyPlayedTimer;

const getLastPlayed: () => { track: Track } = () => {
  const lastPlayed = LocalStorage.getItem("lastPlayed");
  return lastPlayed ? JSON.parse(lastPlayed) : defaultNowPlaying;
};

export const SpotifyProvider = ({ children }: any) => {
  const [isLoading, setIsLoading] = useState(true);
  const [nowPlaying, setNowPlaying] = useState<NowPlaying>(defaultNowPlaying);
  const [recentlyPlayed, setRecentlyPlayed] = useState<Track[]>([]);
  const [lastPlayed, setLastPlayed] = useState<Track>(getLastPlayed().track);

  async function fetchNowPlaying() {
    try {
      const response = await axios.get("/api/now-playing");

      if (isLoading) {
        setIsLoading(false);
      }

      const fallback = { nowPlaying: defaultNowPlaying };
      const data = (response?.data ?? fallback) as NowPlayingResponse;

      const { nowPlaying: currentlyPlaying } = data;

      const trackHasChanged =
        currentlyPlaying.track.title !== nowPlaying.track.title;

      const stateHasChanged =
        currentlyPlaying.isPlaying !== nowPlaying.isPlaying;

      const shouldUpdateState = trackHasChanged || stateHasChanged;

      if (shouldUpdateState) {
        setNowPlaying(currentlyPlaying);
      }
    } catch (error) {
      console.log("fetchNowPlaying error: ", error);
    }
  }

  async function fetchRecentlyPlayed() {
    try {
      const response = await axios.get("/api/recently-played");
      const { tracks = [] } = response?.data ?? {};
      const lastPlayed = tracks[0];

      setRecentlyPlayed(tracks);
      setLastPlayed(lastPlayed);

      LocalStorage.setItem("lastPlayed", JSON.stringify(lastPlayed));
    } catch (error) {
      console.log("fetchRecentlyPlayed error: ", error);
    }
  }

  useEffect(() => {
    const fetchNowPlayingJob = async () => {
      await fetchNowPlaying();

      clearTimeout(nowPlayingTimer);
      nowPlayingTimer = setTimeout(() => {
        fetchNowPlayingJob();
      }, 3 * 1000);
    };

    const fetchRecentlyPlayedJob = async () => {
      await fetchRecentlyPlayed();

      clearTimeout(recentlyPlayedTimer);
      recentlyPlayedTimer = setTimeout(() => {
        fetchNowPlayingJob();
      }, 60 * 1000);
    };

    fetchNowPlaying();
    fetchRecentlyPlayed();

    return () => {
      clearTimeout(nowPlayingTimer);
      clearTimeout(recentlyPlayedTimer);
    };
  }, []);

  const ProviderValue = useMemo(
    () => ({
      isLoading,
      nowPlaying,
      lastPlayed,
      recentlyPlayed,
    }),
    [isLoading, nowPlaying, lastPlayed, recentlyPlayed]
  );

  return (
    <SpotifyContext.Provider value={ProviderValue}>
      {children}
    </SpotifyContext.Provider>
  );
};
