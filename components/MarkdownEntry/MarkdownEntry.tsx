import { Divider } from "@mantine/core";
import { MDXRemote } from "next-mdx-remote";

import { ContentData } from "../../lib/data";
import { parseDate } from "../../utils";

import { Code } from "../Code";
import { EditableCode } from "../EditableCode";

const components = {
  Code,
  EditableCode,
};

export const MarkdownEntry = ({ data }: { data: ContentData }) => {
  const { title, date, source } = data;

  return (
    <>
      <h1>{title}</h1>
      <p>{parseDate(date)}</p>

      <Divider />

      <MDXRemote {...source} components={components} />

      <div dangerouslySetInnerHTML={{ __html: "" }} />
    </>
  );
};
