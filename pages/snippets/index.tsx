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

import { getSortedContentData } from "../../lib/data";

import { Page } from "../../components/Page";
import { Date } from "../../components/Date";
import { Breadcrumbs } from "../../components/Breadcrumbs";

const useStyles = createStyles((theme) => ({
  card: {
    cursor: "pointer",
    width: "100%",
  },
}));

const SnippetCard = ({ data }) => {
  const { id, date, title } = data;
  const { classes } = useStyles();

  return (
    <Link href={`/snippets/${id}`}>
      <Card shadow="sm" p="xl" className={classes.card}>
        <Text weight={600} size="lg">
          {title}
        </Text>

        <Date dateString={date} />
      </Card>
    </Link>
  );
};

export default function Snippets({ allSnippetsData }) {
  const snippetCards = allSnippetsData.map((data, index) => (
    <SnippetCard data={data} key={index}></SnippetCard>
  ));

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

        <Group direction="column" mt={20}>
          {snippetCards}
        </Group>
      </Container>
    </Page>
  );
}

export async function getStaticProps() {
  const allSnippetsData = getSortedContentData("snippets");

  return {
    props: {
      allSnippetsData,
    },
  };
}
