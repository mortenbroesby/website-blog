import "../styles/reset.css";
import "../styles/nprogress.css";

import Head from "next/head";
import { useState } from "react";

import {
  MantineProvider,
  ColorSchemeProvider,
  ColorScheme,
  Box,
  createStyles,
  TypographyStylesProvider,
} from "@mantine/core";

import { NProgress } from "../components/Progress";

const useStyles = createStyles((theme) => ({
  root: {
    position: "absolute",
    top: "0",
    left: "0",
    height: "100%",
    width: "100%",
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontFamily: "Inter, sans-serif",
  },
}));

const RootComponents = ({ Component, pageProps }) => {
  const { classes } = useStyles();

  return (
    <Box className={classes.root}>
      <NProgress />

      <Component {...pageProps} />
    </Box>
  );
};

const AppWithMantine = (properties) => {
  const [colorScheme, setColorScheme] = useState<ColorScheme>("light");

  const toggleColorScheme = (value?: ColorScheme) => {
    const targetValue = value || (colorScheme === "dark" ? "light" : "dark");
    setColorScheme(targetValue);
  };

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme,
          fontFamily: "Inter, sans-serif",
          fontFamilyMonospace: "Monaco, Courier, monospace",
          headings: {
            fontFamily: "Inter, sans-serif",
          },
        }}
      >
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
          />
        </Head>

        <TypographyStylesProvider>
          <RootComponents {...properties} />
        </TypographyStylesProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
};

export default AppWithMantine;
