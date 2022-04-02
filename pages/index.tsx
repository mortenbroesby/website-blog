import Head from "next/head";
import { Container } from "@mantine/core";

import { Page } from "../components/Page";
import { Introduction } from "../components/Introduction";

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
