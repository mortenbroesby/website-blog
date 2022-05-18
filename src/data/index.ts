export interface PageProps {
  title: string;
  href: string;
}

export const AVAILABLE_PAGES: PageProps[] = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Blog",
    href: "/blog",
  },
  {
    title: "Uses",
    href: "/uses",
  },
];

export interface NowPlaying {
  isPlaying: boolean;
  track: Track;
}

export const getDefaultNowPlaying = () => {
  const defaultProps = {
    isPlaying: false,
    track: {
      title: "Unknown track",
      artist: "Spotify",
      songUrl: "https://open.spotify.com/",
    },
  };

  return defaultProps;
};

export interface Track {
  title: string;
  artist: string;
  songUrl: string;
}
