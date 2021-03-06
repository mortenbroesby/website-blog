import React from "react";
import Link from "next/link";
import { createStyles, Text, Container, Group, keyframes } from "@mantine/core";
import {
  BrandInstagram,
  BrandGithub,
  BrandLinkedin,
  BrandFacebook,
} from "tabler-icons-react";

import { AvatarLink } from "~/components";
import { useSpotify } from "~/context";
import { SpotifySvg } from "./SpotifySvg";
import { EqualiserSvg } from "./EqualiserSvg";

export const bounce = keyframes({
  "10%": {
    transform: "transform: scaleY(0.3)",
  },
  "30%": {
    transform: "transform: scaleY(1)",
  },
  "60%": {
    transform: "transform: scaleY(0.5)",
  },
  "80%": {
    transform: "transform: scaleY(0.75)",
  },
  "100%": {
    transform: "transform: scaleY(0.6)",
  },
});

const useStyles = createStyles((theme) => ({
  footer: {
    marginTop: "auto",
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.white,
    borderTop: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },

  description: {
    marginTop: 5,

    [theme.fn.smallerThan("sm")]: {
      marginTop: theme.spacing.xs,
      textAlign: "center",
    },
  },

  inner: {
    display: "none",
  },

  groups: {
    display: "flex",
    flexWrap: "wrap",
    marginLeft: "auto",

    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  wrapper: {
    width: 160,
  },

  link: {
    display: "block",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[1]
        : theme.colors.gray[6],
    fontSize: theme.fontSizes.sm,
    paddingTop: 3,
    paddingBottom: 3,

    "&:hover": {
      textDecoration: "underline",
    },
  },

  title: {
    fontSize: theme.fontSizes.lg,
    fontWeight: 700,
    marginBottom: theme.spacing.xs / 2,
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
  },

  afterFooter: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,

    [theme.fn.smallerThan("sm")]: {
      flexDirection: "column",
    },
  },

  social: {
    [theme.fn.smallerThan("sm")]: {
      marginTop: theme.spacing.xs,
    },
  },

  nowPlaying: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    flex: 1,
    paddingBottom: 20,
    fontSize: theme.fontSizes.xs,
    cursor: "pointer",

    [theme.fn.smallerThan("sm")]: {
      flexDirection: "column",
      alignItems: "center",
    },
  },

  inline: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    maxWidth: "100vw",
    textAlign: "start",
  },

  container: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },

  content: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,

    flexDirection: "row",
    [theme.fn.smallerThan("sm")]: {
      flexDirection: "column",
    },
  },

  iconWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    gap: 2,
  },

  spotifyIcon: {
    width: 26,
    height: 26,
    minWidth: 26,
    minHeight: 26,
  },

  playingIcon: {
    width: 22,
    height: 26,
    minWidth: 26,
    minHeight: 26,
    fill: "orange",
  },

  spacer: {
    paddingLeft: 6,
    paddingRight: 6,
  },

  artist: {
    color: theme.colorScheme === "dark" ? theme.white : theme.colors.gray[6],
  },

  column: {
    display: "flex",
    flexDirection: "column",
  },
}));

const lastFallback = {
  title: "Not Playing",
  artist: "Spotify",
  songUrl: "https://open.spotify.com/",
};

export function Footer() {
  const { classes } = useStyles();
  const { isLoading, nowPlaying, lastPlayed } = useSpotify();

  const { isPlaying, track: currentTrack } = nowPlaying;
  const fallbackTrack = lastPlayed ?? lastFallback;

  const displayTitle = isPlaying ? currentTrack.title : fallbackTrack.title;
  const displayArtist = isPlaying ? currentTrack.artist : fallbackTrack.artist;
  const songUrl = isPlaying ? currentTrack.songUrl : fallbackTrack.songUrl;

  const playingIcon = isPlaying ? (
    <>
      <SpotifySvg className={classes.spotifyIcon} />
      <EqualiserSvg className={classes.playingIcon} />
    </>
  ) : (
    <SpotifySvg className={classes.spotifyIcon} />
  );

  const playingElement = (
    <Link href={songUrl}>
      <div className={classes.nowPlaying}>
        <div className={classes.inline}>
          <div className={classes.iconWrapper}>{playingIcon}</div>

          <div className={classes.column}>
            <div>{isPlaying ? "Currently playing: " : "Last played: "}</div>
            <div>
              {displayTitle}
              <span className={classes.spacer}>???</span>
              <span className={classes.artist}>{displayArtist}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );

  return (
    <footer className={classes.footer}>
      <Container className={classes.afterFooter}>
        <div className={classes.container}>
          {isLoading ? null : playingElement}

          <div className={classes.content}>
            <Text color="dimmed" size="xs">
              ?? 2022-present Morten Broesby-Olsen. All rights reserved.
            </Text>

            <Group
              spacing={4}
              className={classes.social}
              position="right"
              noWrap
            >
              <AvatarLink href="https://github.com/mortenbroesby">
                <BrandGithub />
              </AvatarLink>

              <AvatarLink href="https://www.linkedin.com/in/morten-broesby-olsen/">
                <BrandLinkedin />
              </AvatarLink>

              <AvatarLink href="https://www.instagram.com/mortenbroesby/">
                <BrandInstagram />
              </AvatarLink>

              <AvatarLink href="https://www.facebook.com/mortenbroesby">
                <BrandFacebook />
              </AvatarLink>
            </Group>
          </div>
        </div>
      </Container>
    </footer>
  );
}
