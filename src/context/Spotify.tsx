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

      const updatedState = {
        ...getDefaultNowPlaying(),
        ...nowPlaying,
      };

      setNowPlaying(updatedState);
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
    fetchNowPlaying();
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
