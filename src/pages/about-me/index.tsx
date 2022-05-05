import Head from "next/head";
import { Container } from "@mantine/core";

import { Breadcrumbs, Page } from "~/components";

import AboutMe from "~/components/Content/about-me.mdx";

export default function Tags() {
  return (
    <Page>
      <Head>
        <title>Morten Broesby-Olsen :: About Me</title>
      </Head>

      <Container pt={20} pb={20}>
        <Breadcrumbs
          items={[
            { title: "Home", href: "/" },
            { title: "About me", href: "/about-me" },
          ]}
        />

        <AboutMe />
      </Container>
    </Page>
  );
}
