import Head from "next/head";
import { Container } from "@mantine/core";

import { Breadcrumbs, Page } from "~/components";
import { getNowPlaying } from "~/lib";

export default function Playground({ nowPlaying }) {
  return (
    <Page>
      <Head>
        <title>Morten Broesby-Olsen :: Playground</title>
      </Head>

      <Container pt={20} pb={20}>
        <Breadcrumbs
          items={[
            { title: "Home", href: "/" },
            { title: "Playground", href: "/playground" },
          ]}
        />
      </Container>
    </Page>
  );
}

export async function getStaticProps() {
  const response = await getNowPlaying();

  if (response.status === 204 || response.status > 400) {
    return {
      props: {
        nowPlaying: {
          isPlaying: false,
        },
      },
    };
  }

  return {
    props: {
      nowPlaying: await response.json(),
    },
  };
}
