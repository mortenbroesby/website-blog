import Image from "next/image"
import Link from "next/link"
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
    <div>
      {posts?.length ? (
        <div>
          {posts.map((post, index) => (
            <article key={post._id}>
              <h2>{post.title}</h2>
              {post.description && <p>{post.description}</p>}
              {post.date && <p>{post.date}</p>}
              <Link href={post.slug}>
                <span>View Article</span>
              </Link>
            </article>
          ))}
        </div>
      ) : (
        <p>No posts published.</p>
      )}
    </div>
  )
}
