import { notFound } from "next/navigation"
import { buttonVariants, Mdx } from "@/components"
import { allAuthors, allPosts } from "contentlayer/generated"

import "@/styles/mdx.css"

import { Metadata } from "next"
import Link from "next/link"
import { env } from "~/env.mjs"
import { cn, formatDate } from "~/src/utils"

interface PostPageProps {
  params: {
    slug: string[]
  }
}

async function getPostFromParams(params) {
  const slug = params?.slug?.join("/")
  const post = allPosts.find((post) => post.slugAsParams === slug)

  if (!post) {
    null
  }

  return post
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const post = await getPostFromParams(params)

  if (!post) {
    return {}
  }

  return {
    title: post.title,
    description: post.description,
    authors: post.authors.map((author) => ({
      name: author,
    })),
  }
}

export async function generateStaticParams(): Promise<
  PostPageProps["params"][]
> {
  return allPosts.map((post) => ({
    slug: post.slugAsParams.split("/"),
  }))
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await getPostFromParams(params)

  if (!post) {
    notFound()
  }

  const authors = post.authors.map((author) =>
    allAuthors.find(({ slug }) => slug === `/authors/${author}`)
  )

  return (
    <article className="container relative max-w-3xl py-6 lg:py-10">
      <div>
        {post.date && (
          <time
            dateTime={post.date}
            className="text-muted-foreground block text-sm"
          >
            Published on {formatDate(post.date)}
          </time>
        )}

        <h1>{post.title}</h1>

        {post.description && <h2>{post.description}</h2>}

        {authors?.length ? (
          <div className="mt-4 flex space-x-4">
            {authors?.length ? (
              <div>
                {authors.map((author) =>
                  author ? <p>{author.name}</p> : null
                )}
              </div>
            ) : null}
          </div>
        ) : null}
      </div>

      <Mdx code={post.body.code} />

      <hr className="mt-12" />

      <div className="flex justify-center py-6 lg:py-10">
        <Link href="/blog" className={cn(buttonVariants({ variant: "ghost" }))}>
          See all posts
        </Link>
      </div>
    </article>
  )
}
