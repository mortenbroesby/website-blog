import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { getDefaultNowPlaying, NowPlaying, TopTrack } from "~/data";

interface ContextProps {
  nowPlaying: NowPlaying;
  topTracks: TopTrack[];
}

const SpotifyContext = createContext({} as ContextProps);

export const SpotifyProvider = ({ children }: any) => {
  const [nowPlaying, setNowPlaying] = useState<NowPlaying>(
    getDefaultNowPlaying()
  );

  const [topTracks, setTopTracks] = useState<TopTrack[]>([]);

  const fetchNowPlaying = async () => {
    try {
      const response = await axios.get("/api/now-playing");

      const { nowPlaying } = response?.data ?? {};
      const { isPlaying } = nowPlaying ?? {};

      console.log(
        `Currently playing: ${isPlaying ? nowPlaying.title : "Nothing"}`
      );

      setNowPlaying(nowPlaying);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTopTracks = async () => {
    try {
      const response = await axios.get("/api/top-tracks");

      const { tracks } = response?.data ?? {};

      setTopTracks(tracks);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let timer;

    const fetchWithTimeout = async () => {
      await fetchNowPlaying();

      clearTimeout(timer);
      timer = setTimeout(() => {
        fetchWithTimeout();
      }, 3000);
    };

    fetchWithTimeout();

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <SpotifyContext.Provider
      value={{
        nowPlaying,
        topTracks,
      }}
    >
      {children}
    </SpotifyContext.Provider>
  );
};

export const useSpotify = () => useContext(SpotifyContext);
