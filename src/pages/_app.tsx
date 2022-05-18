import Head from "next/head";
import { useEffect, useState } from "react";
import {
  MantineProvider,
  ColorSchemeProvider,
  ColorScheme,
  Box,
  createStyles,
  TypographyStylesProvider,
  Global,
} from "@mantine/core";
import { SpotifyProvider } from "~/context";
import { GetServerSidePropsContext } from "next";
import { getCookie, setCookies } from "cookies-next";
import { AppProps } from "next/app";
import Script from "next/script";
import { useRouter } from "next/router";

import { NProgress } from "~/components";
import * as gtag from "~/lib/gtag";

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

const defaultTitle = "Morten Broesby-Olsen";
const defaultDescription =
  "Website & Blog of Morten Broesby-Olsen. A software engineer, a programmer, a hobbyist.";

const RootComponents = ({ Component, pageProps }) => {
  const { classes } = useStyles();

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="language" content="english" />
        <meta httpEquiv="content-type" content="text/html" />
        <meta name="author" content={defaultTitle} />
        <meta name="designer" content={defaultTitle} />
        <meta name="publisher" content={defaultTitle} />
        <meta name="description" content={defaultDescription} />

        <meta name="og:title" content={defaultTitle} />
        <meta name="og:type" content="site" />
        <meta name="og:url" content="https://morten-website-blog.vercel.app/" />
        <meta name="og:image" content={"/icons/share.png"} />
        <meta name="og:site_name" content="" />
        <meta name="og:description" content={defaultDescription} />

        <meta
          name="keywords"
          content="blog,snippets,website,software engineer"
        />
        <meta name="robots" content="index,follow" />
        <meta name="distribution" content="web" />

        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        />
      </Head>

      <Box className={classes.root}>
        <NProgress />

        <Component {...pageProps} />
      </Box>

      <Global
        styles={(theme) => ({
          "*, *::before, *::after": {
            boxSizing: "border-box",
          },

          "html, body": {
            height: "100%",
          },

          body: {
            ...theme.fn.fontStyles(),
            color: theme.colorScheme === "dark" ? theme.white : theme.black,
            minHeight: "100%",
            minWidth: "100%",
          },

          "#root, #__next": {
            position: "absolute",
            top: 0,
            left: 0,
            height: "100%",
            width: "100%",
          },

          html: {
            WebkitFontSmoothing: "antialiased",
            WebkitTextSizeAdjust: "100%",
            lineHeight: "1.5",

            [theme.fn.largerThan("sm")]: {
              overflowY: "scroll",
            },
          },

          "#nprogress": {
            pointerEvents: "none",
          },

          "#nprogress .bar": {
            position: "fixed",
            zIndex: "2000",
            top: "0",
            left: "0",
            width: "100%",
            height: "3px",
            background:
              theme.colorScheme === "dark"
                ? theme.colors.blue[2]
                : theme.colors.blue[6],
          },
        })}
      />
    </>
  );
};

const TrackingProvider = (properties: ApplicationProps) => {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      gtag.pageview(url);
    };

    router.events.on("routeChangeComplete", handleRouteChange);
    router.events.on("hashChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
      router.events.off("hashChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];

            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', '${gtag.GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
      <RootComponents {...properties} />
    </>
  );
};

/**
 * COOKIE
 * seconds * minutes * hours * days
 */
const COOKIE_AGE = 60 * 60 * 24 * 30;
const COOKIE_KEY = "mantine-color-scheme";

type ApplicationProps = AppProps & {
  colorScheme: ColorScheme;
};

const Application = (properties: ApplicationProps) => {
  const [colorScheme, setColorScheme] = useState<ColorScheme>(
    properties.colorScheme
  );

  const toggleColorScheme = (value?: ColorScheme) => {
    const targetValue = value || (colorScheme === "dark" ? "light" : "dark");

    setColorScheme(targetValue);

    setCookies(COOKIE_KEY, targetValue, {
      maxAge: COOKIE_AGE,
    });
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
            fontFamily: "Josefin Sans, Inter, sans-serif",
          },
        }}
      >
        <TypographyStylesProvider>
          <SpotifyProvider>
            <TrackingProvider {...properties} />
          </SpotifyProvider>
        </TypographyStylesProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
};

type ApplicationInitialProps = {
  ctx: GetServerSidePropsContext;
};

Application.getInitialProps = ({ ctx }: ApplicationInitialProps) => ({
  colorScheme: getCookie(COOKIE_KEY, ctx) ?? "light",
});

export default Application;
