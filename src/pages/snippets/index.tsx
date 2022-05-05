import { Container, Divider, Group } from "@mantine/core";
import Head from "next/head";

import { getSortedContentData, Metadata } from "~/lib";
import { Page, Card, Breadcrumbs } from "~/components";

export default function Snippets({ data }: { data: Metadata[] }) {
  const snippetCards = data.map((data, index) => {
    const { id, metadata } = data;
    const { date, title } = metadata;

    return (
      <Card title={title} href={`/snippets/${id}`} date={date} key={index} />
    );
  });

  const blogPostCards = data.map((data, index) => {
    const { id, metadata } = data;
    const { date, title } = metadata;

    return (
      <Card
        title={title}
        href={`/snippets/${id}`}
        date={date}
        key={index}
      ></Card>
    );
  });

  return (
    <Page>
      <Head>
        <title>Morten Broesby-Olsen :: Snippets</title>
      </Head>

      <Container pt={20} pb={20}>
        <Breadcrumbs
          items={[
            { title: "Home", href: "/" },
            { title: "Snippets", href: "/snippets" },
          ]}
        />

        <Divider mt={20} mb={20} />

        <h2>Code Snippets 💾</h2>

        <Group direction="column" mt={20}>
          {snippetCards}
        </Group>
      </Container>
    </Page>
  );
}

export async function getStaticProps() {
  const data = getSortedContentData("snippets");

  return {
    props: {
      data,
    },
  };
}
