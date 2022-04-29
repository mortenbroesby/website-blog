import Head from "next/head";
import { Container } from "@mantine/core";

import { Breadcrumbs, Page } from "~/components";

import Uses from "~/components/Uses/uses.mdx";

export default function Tags() {
  return (
    <>
      <Page>
        <Head>
          <title>Morten Broesby-Olsen :: About</title>
        </Head>

        <Container pt={20} pb={20}>
          <Breadcrumbs
            items={[
              { title: "Home", href: "/" },
              { title: "About", href: "/about" },
            ]}
          />

          <Uses />
        </Container>
      </Page>
    </>
  );
}
