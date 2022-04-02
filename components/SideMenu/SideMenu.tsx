import React, { useEffect, useRef } from "react";
import {
  Box,
  createStyles,
  Group,
  Navbar,
  useMantineColorScheme,
} from "@mantine/core";
import { animated, Transition } from "react-spring";
import { useScrollLock } from "@mantine/hooks";

import { availablePages } from "../../content/pages";
import { useRefClicked } from "./useRefClicked";
import { HEADER_HEIGHT } from "../Header";
import { Sun, MoonStars } from "tabler-icons-react";
import { Link } from "../Link";

const useStyles = createStyles((theme, _params, getRef) => {
  const icon = getRef("icon");

  return {
    root: {
      position: "fixed",
      top: HEADER_HEIGHT,
      right: 0,
      left: 0,
      bottom: 0,
      background: theme.fn.rgba(theme.black, 0.8),
      zIndex: 100,
    },

    menuWrapper: {
      position: "absolute",
      top: 0,
      width: "100%",
      height: "100vh",
      background: "none",
      zIndex: 101,
      pointerEvents: "none",
    },

    menu: {
      position: "absolute",
      zIndex: 101,
      top: 0,
      left: 0,
      pointerEvents: "all",
    },

    footer: {
      paddingTop: theme.spacing.md,
      marginTop: theme.spacing.md,
      borderTop: `1px solid ${
        theme.colorScheme === "dark"
          ? theme.fn.rgba(theme.white, 0.2)
          : theme.fn.rgba(theme.black, 0.2)
      }`,
    },

    linkIcon: {
      ref: icon,
      color:
        theme.colorScheme === "dark"
          ? theme.colors.yellow[4]
          : theme.colors.blue[6],
      opacity: 0.75,
      marginRight: theme.spacing.sm,
    },

    link: {
      ...theme.fn.focusStyles(),
      display: "flex",
      alignItems: "center",
      textDecoration: "none",
      fontSize: theme.fontSizes.md,
      color:
        theme.colorScheme === "dark"
          ? theme.colors.dark[1]
          : theme.colors.gray[7],
      padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
      borderRadius: theme.radius.sm,
      fontWeight: 500,
      cursor: "pointer",

      "&:hover": {
        backgroundColor:
          theme.colorScheme === "dark"
            ? theme.colors.dark[6]
            : theme.colors.gray[0],
        color: theme.colorScheme === "dark" ? theme.white : theme.black,
      },
    },
  };
});

interface SideMenuProps {
  isOpen: boolean;
  onCloseMenu: () => void;
}

export function SideMenu(properties: SideMenuProps) {
  const { isOpen, onCloseMenu } = properties;

  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const [_, setScrollLocked] = useScrollLock();

  const ref = useRef<HTMLDivElement>(null);
  useRefClicked(ref, () => onCloseMenu());

  useEffect(() => {
    setScrollLocked(isOpen);
  }, [isOpen]);

  const { classes } = useStyles();

  const fadeConfig = {
    mass: 1,
    tension: 120,
    friction: 14,
    clamp: true,
  };

  const slideConfig = {
    mass: 1,
    tension: 120,
    friction: 20,
    clamp: false,
  };

  const toggleColor = () => {
    toggleColorScheme();
  };

  const avaliableLinks = availablePages.map(({ title, href }, index) => {
    return <Link title={title} href={href} key={index} />;
  });

  const navbar = (
    <Navbar width={{ xs: 300 }} p="md" className={classes.menu}>
      <Navbar.Section>
        <Group direction="column">{avaliableLinks}</Group>
      </Navbar.Section>

      <Navbar.Section className={classes.footer}>
        <Group direction="column">
          <a className={classes.link} onClick={toggleColor}>
            {colorScheme === "dark" ? (
              <Sun size={18} className={classes.linkIcon} />
            ) : (
              <MoonStars size={18} className={classes.linkIcon} />
            )}

            <span>{colorScheme === "dark" ? "Light" : "Dark"} theme</span>
          </a>
        </Group>
      </Navbar.Section>
    </Navbar>
  );

  return (
    <Transition
      items={isOpen}
      from={{ opacity: 0 }}
      enter={{ opacity: 1 }}
      leave={{ opacity: 0 }}
      reverse={isOpen}
      config={fadeConfig}
    >
      {(styles, item) =>
        item && (
          <animated.div style={styles}>
            <Box id="overlay" className={classes.root} ref={ref}>
              <Transition
                items={isOpen}
                from={{ left: -300 }}
                enter={{ left: 0 }}
                leave={{ left: -300 }}
                reverse={isOpen}
                config={slideConfig}
              >
                {(styles, item) =>
                  item && (
                    <animated.div
                      className={classes.menuWrapper}
                      style={styles}
                    >
                      {navbar}
                    </animated.div>
                  )
                }
              </Transition>
            </Box>
          </animated.div>
        )
      }
    </Transition>
  );
}
