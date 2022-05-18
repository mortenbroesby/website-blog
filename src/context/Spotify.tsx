import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { getDefaultNowPlaying, NowPlaying, Track } from "~/data";
import { getRandomItemFromArray } from "~/utils";

interface ContextProps {
  isLoading: boolean;
  nowPlaying: NowPlaying;
  lastPlayed: Track;
  recentlyPlayed: Track[];
}

const SpotifyContext = createContext({} as ContextProps);

const defaultNowPlaying = getDefaultNowPlaying();

export const SpotifyProvider = ({ children }: any) => {
  const [isLoading, setIsLoading] = useState(true);
  const [nowPlaying, setNowPlaying] = useState<NowPlaying>(defaultNowPlaying);
  const [lastPlayed, setLastPlayed] = useState<Track>(defaultNowPlaying.track);
  const [recentlyPlayed, setRecentlyPlayed] = useState<Track[]>([]);

  const fetchNowPlaying = async () => {
    try {
      const response = await axios.get("/api/now-playing");
      const { nowPlaying } = response?.data ?? {};

      setNowPlaying(nowPlaying);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchRecentlyPlayed = async () => {
    try {
      const response = await axios.get("/api/recently-played");
      const { tracks = [] } = response?.data ?? {};
      const lastPlayed = getRandomItemFromArray(tracks);

      setRecentlyPlayed(tracks);
      setLastPlayed(lastPlayed);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let nowPlayingTimer;
    let recentlyPlayedTimer;

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

    fetchNowPlayingJob();
    fetchRecentlyPlayedJob();

    return () => {
      clearTimeout(nowPlayingTimer);
      clearTimeout(recentlyPlayedTimer);
    };
  }, []);

  return (
    <SpotifyContext.Provider
      value={{
        isLoading,
        nowPlaying,
        lastPlayed,
        recentlyPlayed,
      }}
    >
      {children}
    </SpotifyContext.Provider>
  );
};

export const useSpotify = () => useContext(SpotifyContext);
