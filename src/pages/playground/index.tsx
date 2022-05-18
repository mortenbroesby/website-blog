import Head from "next/head";
import { Container } from "@mantine/core";

import { Breadcrumbs, Page } from "~/components";

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
