import { Container, Divider, Group } from "@mantine/core";
import Head from "next/head";

import { getSortedContentData, Metadata } from "~/lib";
import { Page, Breadcrumbs, Card } from "~/components";

export default function Blog({ data }: { data: Metadata[] }) {
  const blogPostCards = data.map((data, index) => {
    const { id, metadata } = data;
    const { date, title } = metadata;

    return <Card title={title} href={`/blog/${id}`} date={date} key={index} />;
  });

  return (
    <Page>
      <Head>
        <title>Morten Broesby-Olsen :: Blog</title>
      </Head>

      <Container pt={20} pb={20}>
        <Breadcrumbs
          items={[
            { title: "Home", href: "/" },
            { title: "Blog", href: "/blog" },
          ]}
        />

        <Divider mt={20} mb={20} />

        <h1>Blog</h1>

        <Group direction="column" mt={20}>
          {blogPostCards}
        </Group>
      </Container>
    </Page>
  );
}

export async function getStaticProps() {
  const data = getSortedContentData("posts");

  return {
    props: {
      data,
    },
  };
}
