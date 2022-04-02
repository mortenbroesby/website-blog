import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemoteProps } from "next-mdx-remote";

const contentDirectory = path.join(process.cwd(), "content");

const postsDirectory = path.join(contentDirectory, "posts");
const snippetsDirectory = path.join(contentDirectory, "snippets");

export interface Frontmatter {
  title: string;
  date: string;
  published: boolean;
}

export interface Metadata extends Frontmatter {
  id: string;
}

type ContentType = "snippets" | "posts";

const contentMap = {
  snippets: snippetsDirectory,
  posts: postsDirectory,
};

export function getSortedContentData(contentType: ContentType) {
  // Get target directory
  const targetDirectory = contentMap[contentType];
  if (!targetDirectory) {
    throw new Error("Invalid content type");
  }

  // Get file names under target directory
  const fileNames = fs.readdirSync(targetDirectory);

  const allContentData: Metadata[] = fileNames.map((fileName) => {
    // Remove ".mdx" from file name to get id
    const id = fileName.replace(/\.mdx$/, "");

    // Read markdown file as string
    const fullPath = path.join(targetDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // Use gray-matter to parse the snippet metadata section
    const matterResult = matter(fileContents) as any;

    // Combine the data with the id
    const snippetData = {
      id,
      ...matterResult.data,
    };

    return snippetData;
  });

  // Sort content by date
  return allContentData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getAllContentIds(contentType: ContentType) {
  // Get target directory
  const targetDirectory = contentMap[contentType];
  if (!targetDirectory) {
    throw new Error("Invalid content type");
  }

  const fileNames = fs.readdirSync(targetDirectory);

  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.mdx$/, ""),
      },
    };
  });
}

export interface MDXSourceProps extends MDXRemoteProps {}

export interface ContentData extends Frontmatter {
  id: string;
  source: MDXSourceProps;
}

export async function getContentData(
  contentType: ContentType,
  id: string
): Promise<ContentData> {
  // Get target directory
  const targetDirectory = contentMap[contentType];
  if (!targetDirectory) {
    throw new Error("Invalid content type");
  }

  const fullPath = path.join(targetDirectory, `${id}.mdx`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  // Use gray-matter to parse the content metadata section
  const matterResult = matter(fileContents) as any;

  // Use next-mdx-remote to process the MDX
  const mdxSource = await serialize(fileContents, {
    parseFrontmatter: true,
  });

  // Combine the data with the id and contentHtml
  return {
    id,
    source: mdxSource,
    ...matterResult.data,
  };
}
