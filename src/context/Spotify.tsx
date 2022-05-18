import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { getDefaultNowPlaying, NowPlaying } from "~/data";

interface ContextProps {
  nowPlaying: NowPlaying;
}

const SpotifyContext = createContext({} as ContextProps);

export const SpotifyProvider = ({ children }: any) => {
  const [nowPlaying, setNowPlaying] = useState<NowPlaying>(
    getDefaultNowPlaying()
  );

  const fetchNowPlaying = async () => {
    try {
      const response = await axios.get("/api/spotify");

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

  useEffect(() => {
    fetchNowPlaying();
  }, []);

  return (
    <SpotifyContext.Provider
      value={{
        nowPlaying,
      }}
    >
      {children}
    </SpotifyContext.Provider>
  );
};

export const useSpotify = () => useContext(SpotifyContext);
