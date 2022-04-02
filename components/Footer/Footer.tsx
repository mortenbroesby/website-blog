import React from "react";
import { createStyles, Text, Container, Group } from "@mantine/core";
import {
  BrandInstagram,
  BrandGithub,
  BrandLinkedin,
  BrandFacebook,
} from "tabler-icons-react";

import { AvatarLink } from "../AvatarLink";

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
}));

export function Footer() {
  const { classes } = useStyles();

  return (
    <footer className={classes.footer}>
      <Container className={classes.afterFooter}>
        <Text color="dimmed" size="sm">
          © 2022 Morten Broesby-Olsen. All rights reserved.
        </Text>

        <Group spacing={4} className={classes.social} position="right" noWrap>
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
      </Container>
    </footer>
  );
}
