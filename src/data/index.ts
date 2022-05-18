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
  title: string;
  artist: string;
  album: string;
  albumImageUrl: string;
  songUrl: string;
}

export const getDefaultNowPlaying = () => {
  const defaultProps = {
    isPlaying: false,
    title: "Not Playing",
    artist: "Spotify",
    album: "",
    albumImageUrl: "",
    songUrl: "",
  };

  return defaultProps;
};

export interface TopTrack {
  title: string;
  artist: string;
  songUrl: string;
}
