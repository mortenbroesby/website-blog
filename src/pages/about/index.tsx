import Head from "next/head";
import { Container, Divider, Group } from "@mantine/core";

import { Breadcrumbs, Card, Page } from "~/components";

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

          <Divider mt={20} mb={20} />

          <h1>About</h1>

          <Group direction="column" mt={20}>
            <Card title="Uses" href="/about/uses" date="2022-04-29" />
          </Group>
        </Container>
      </Page>
    </>
  );
}
