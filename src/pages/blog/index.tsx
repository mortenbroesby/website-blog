import {
  Card,
  Container,
  createStyles,
  Divider,
  Group,
  Text,
} from "@mantine/core";
import Head from "next/head";
import Link from "next/link";

import { getSortedContentData, Metadata } from "~/lib";
import { Page, Date, Breadcrumbs } from "~/components";

const useStyles = createStyles((theme) => ({
  card: {
    cursor: "pointer",
    width: "100%",
  },
}));

const BlogCard = ({ data }: { data: Metadata }) => {
  const { id, metadata } = data;
  const { date, title } = metadata;

  const { classes } = useStyles();

  return (
    <Link href={`/blog/${id}`}>
      <Card shadow="sm" p="xl" className={classes.card}>
        <Text weight={600} size="lg">
          {title}
        </Text>

        <Date dateString={date} />
      </Card>
    </Link>
  );
};

export default function Blog({ data }: { data: Metadata[] }) {
  const blogPostCards = data.map((data, index) => (
    <BlogCard data={data} key={index}></BlogCard>
  ));

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
