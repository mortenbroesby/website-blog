import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import {
  createStyles,
  Header,
  Box,
  Group,
  Burger,
  useMantineTheme,
} from "@mantine/core";

import { ColorToggle } from "~/components";

import { AVAILABLE_PAGES } from "~/data";
import { noop } from "~/utils";

export const HEADER_HEIGHT = 84;

const useStyles = createStyles((theme) => ({
  header: {
    position: "fixed",
    top: 0,
    left: 0,
  },

  content: {
    height: HEADER_HEIGHT,
    display: "flex",
    alignItems: "center",
    justifyContent: "start",
    maxWidth: 960,
    margin: "0 auto",
  },

  menuEnd: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignContent: "center",
    marginLeft: "auto",
  },

  menu: {
    cursor: "pointer",
  },

  menuLarge: {
    "@media (max-width: 600px)": {
      display: "none",
    },
  },

  menuSmall: {
    "@media (min-width: 600px)": {
      display: "none",
    },
  },

  buttonContainer: {
    position: "relative",

    "@media (max-width: 961px)": {
      marginLeft: 20,
    },
  },

  button: {
    fontSize: "16px",
    color: theme.colorScheme === "dark" ? theme.white : theme.colors.gray[9],
    fontWeight: 400,
    padding: 10,
    lineHeight: 1,
    height: "auto",
    cursor: "pointer",
    borderRadius: "8px",

    "&:hover": {
      background:
        theme.colorScheme === "dark"
          ? theme.fn.rgba(theme.colors.gray[0], 0.4)
          : theme.fn.rgba(theme.colors.dark[0], 0.4),
    },

    "&:active": {
      transform: "translateY(1px)",
    },
  },

  link: {
    fontSize: 16,
    fontWeight: 700,

    [theme.fn.smallerThan("sm")]: {
      fontSize: 16,
    },

    "&:hover": {
      color: theme.colorScheme === "dark" ? theme.white : theme.black,
      textDecoration: "none",
    },
  },
}));

interface HeaderProps {
  isMenuOpen: boolean;
  onOpenMenu: (event: any) => void;
  onCloseMenu: (event: any) => void;
}

export function ApplicationHeader(properties: HeaderProps) {
  const {
    onOpenMenu = noop,
    onCloseMenu = noop,
    isMenuOpen = false,
  } = properties;

  const router = useRouter();
  const theme = useMantineTheme();
  const { classes } = useStyles();

  const hasActiveRoute = (route: string, activeRoute: string): boolean => {
    const itemRoute = route.replace(/\//g, "");
    const targetRoute = activeRoute.replace(/\//g, "");

    const hasActiveRoute = itemRoute !== "" && targetRoute.includes(itemRoute);
    return hasActiveRoute;
  };

  const availableLinks = AVAILABLE_PAGES.map((properties, index) => {
    const { title, href } = properties;

    const isHomeRoute = router.pathname === "/" && href === "/";
    const isActiveRoute = hasActiveRoute(href, router.pathname) || isHomeRoute;

    return (
      <Link href={href} key={index}>
        <Box
          className={classes.button}
          style={{
            fontWeight: isActiveRoute ? 700 : 400,
          }}
        >
          {title}
        </Box>
      </Link>
    );
  });

  return (
    <Header height={HEADER_HEIGHT} className={classes.header}>
      <Box className={classes.content}>
        <Group className={classes.buttonContainer}>
          <Group className={classes.menuLarge} spacing={2}>
            {availableLinks}
          </Group>

          <Burger
            size="sm"
            opened={isMenuOpen}
            onClick={isMenuOpen ? onCloseMenu : onOpenMenu}
            className={classes.menuSmall}
            color={
              theme.colorScheme === "dark"
                ? theme.colors.yellow[4]
                : theme.colors.blue[6]
            }
          />
        </Group>

        <div className={classes.menuEnd}>
          <Group>
            <Group className={classes.menu} mr={20}>
              <ColorToggle />
            </Group>
          </Group>
        </div>
      </Box>
    </Header>
  );
}

export { ApplicationHeader as Header };
