import React, { useState } from "react";
import { AppShell, useMantineTheme, createStyles, Box } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import { Header, HEADER_HEIGHT } from "../Header";
import { Footer } from "../Footer";
import { SideMenu } from "../SideMenu";

const useStyles = createStyles((theme) => ({
  content: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },

  mainContent: {
    marginTop: HEADER_HEIGHT,
    marginBottom: 30,
  },
}));

interface PageProps {
  children: React.ReactNode;
}

export function Page(properties: PageProps) {
  const { children } = properties;

  const theme = useMantineTheme();
  const { classes } = useStyles();

  const [isMenuOpen, handlers] = useDisclosure(false);

  return (
    <AppShell
      header={
        <Header
          isMenuOpen={isMenuOpen}
          onOpenMenu={() => {
            handlers.open();
          }}
          onCloseMenu={() => {
            handlers.close();
          }}
        />
      }
      styles={{
        root: {
          height: "100%",
          display: "flex",
          flexDirection: "column",
        },
        body: {
          flexGrow: 1,
        },
        main: {
          padding: 0,
          overflowX: "hidden",
          background:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      }}
    >
      <Box className={classes.content}>
        <Box className={classes.mainContent}>{children}</Box>
        <Footer />
        <SideMenu isOpen={isMenuOpen} onCloseMenu={() => handlers.close()} />
      </Box>
    </AppShell>
  );
}
