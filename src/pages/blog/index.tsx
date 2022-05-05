import { Container, Divider, Group } from "@mantine/core";
import Head from "next/head";

import { getSortedContentData, Metadata } from "~/lib";
import { Page, Breadcrumbs, Card } from "~/components";

export default function Blog({
  blogData,
  snippetData,
}: {
  blogData: Metadata[];
  snippetData: Metadata[];
}) {
  const blogPostCards = blogData.map((data, index) => {
    const { id, metadata } = data;
    const { date, title } = metadata;

    return <Card title={title} href={`/blog/${id}`} date={date} key={index} />;
  });

  const snippetCards = snippetData.map((data, index) => {
    const { id, metadata } = data;
    const { date, title } = metadata;

    return (
      <Card title={title} href={`/snippets/${id}`} date={date} key={index} />
    );
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

        <h2>Blog Posts 📖</h2>

        <Group direction="column" mt={20}>
          {blogPostCards}
        </Group>

        <h2>Code Snippets 💾</h2>

        <Group direction="column" mt={20}>
          {snippetCards}
        </Group>
      </Container>
    </Page>
  );
}

export async function getStaticProps() {
  const blogData = getSortedContentData("posts");
  const snippetData = getSortedContentData("snippets");

  return {
    props: {
      blogData,
      snippetData,
    },
  };
}
