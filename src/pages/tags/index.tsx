import Head from "next/head";
import { Container } from "@mantine/core";

import { Breadcrumbs, Page } from "~/components";

export default function Tags() {
  return (
    <>
      <Page>
        <Head>
          <title>Morten Broesby-Olsen :: Tags</title>
        </Head>

        <Container pt={20} pb={20}>
          <Breadcrumbs
            items={[
              { title: "Home", href: "/" },
              { title: "Tags", href: "/tags" },
            ]}
          />
        </Container>
      </Page>
    </>
  );
}
