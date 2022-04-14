/* eslint-disable react/no-unescaped-entities */
import Head from "next/head";
import { Container, Divider } from "@mantine/core";
import { Breadcrumbs, Link, Page } from "~/components";

export default function FourZeroFour() {
  return (
    <Page>
      <Head>
        <title>Morten Broesby-Olsen :: 404</title>
      </Head>

      <Container pt={20} pb={20}>
        <Breadcrumbs items={[{ title: "Home", href: "/" }]} />

        <Divider mt={20} mb={20} />

        <h1>404 :: Page not found</h1>

        <p>Sorry, this page was not found.</p>

        <Link title="Go to home." href="/" />
      </Container>
    </Page>
  );
}
