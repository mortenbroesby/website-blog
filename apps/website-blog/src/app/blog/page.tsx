import Link from "next/link"
import { Page } from "@/components"
import { formatDate } from "~/src/utils"
import { allPosts } from "contentlayer/generated"
import { compareDesc } from "date-fns"

export const metadata = {
  title: "Blog",
}

export default async function BlogPage() {
  const posts = allPosts
    .filter((post) => post.published)
    .sort((a, b) => {
      return compareDesc(new Date(a.date), new Date(b.date))
    })

  return (
    <Page>
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
        <div className="flex-1 space-y-4">
          <h1>Blog</h1>
        </div>
      </div>

      <hr className="my-8" />

      {posts?.length ? (
        <div className="grid gap-10">
          {posts.map((post) => (
            <article
              key={post._id}
              className="group relative flex flex-col space-y-2"
            >
              <h2>{post.title}</h2>

              {post.description && (
                <p className="text-muted-foreground">{post.description}</p>
              )}

              {post.date && (
                <p className="text-muted-foreground text-sm">
                  {formatDate(post.date)}
                </p>
              )}

              <Link href={post.slug} className="absolute inset-0">
                <span className="sr-only">View Article</span>
              </Link>
            </article>
          ))}
        </div>
      ) : (
        <p>No posts published.</p>
      )}
    </Page>
  )
}
