import Head from "next/head";
import { Container } from "@mantine/core";

import { Page, Introduction } from "~/components";

export default function Home() {
  return (
    <Page>
      <Head>
        <title>Morten Broesby-Olsen</title>
      </Head>

      <Container>
        <Introduction />
      </Container>
    </Page>
  );
}
