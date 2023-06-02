import Link from "next/link"
import { Page } from "@/components"
import { formatDate } from "@/utils"
import { allPosts } from "contentlayer/generated"
import { compareDesc } from "date-fns"

import ViewCounter from "../../components/view-counter"

export const metadata = {
  title: "Blog",
}

export default async function BlogPage() {
  const posts = allPosts
    .filter((post) => post.published)
    .sort((a, b) => {
      return compareDesc(new Date(a.date), new Date(b.date))
    })

  const targetDescription =
    descriptions[Math.floor(Math.random() * descriptions.length)]

  return (
    <Page>
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8 text-center">
        <div className="flex-1 space-y-4">
          <h1>My Blog</h1>

          <p className="text-l italic text-muted-foreground">
            {targetDescription}
          </p>
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

              <div>
                {post.description && (
                  <p className="text-muted-foreground">{post.description}</p>
                )}
              </div>

              <ViewCounter
                className="text-muted-foreground text-xs"
                slug={post.slugAsParams}
                trackView={false}
              >
                <p className="text-muted-foreground text-xs">
                  {formatDate(post.date)}
                </p>
              </ViewCounter>

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

const descriptions = [
  "Unveiling the world of tech, games, and life through captivating blog entries.",
  "A digital journey through the realms of tech, games, and life, one blog entry at a time.",
  "Discovering the wonders of tech, games, and life through thought-provoking blog entries.",
  "Navigating the realms of tech, games, and life through my personal blog entries.",
  "Delving into the fascinating realms of tech, games, and life through my insightful blog.",
  "Embark on a captivating adventure exploring tech, games, and life through my blog entries.",
  "Insights, reflections, and discoveries in the world of tech, games, and life captured in my blog.",
  "Sharing my perspectives on tech, games, and life through engaging blog entries.",
  "A harmonious blend of tech, games, and life showcased in my enlightening blog entries.",
  "Dive into a world of tech, games, and life as I chronicle my experiences in this captivating blog.",
  "Exploring the endless possibilities of tech, games, and life through my enriching blog entries.",
  "Unraveling the mysteries of tech, games, and life in my engaging and informative blog.",
  "An immersive dive into the realms of tech, games, and life through my captivating blog.",
  "Embark on a captivating journey through tech, games, and life in my insightful blog entries.",
  "Unlocking the secrets of tech, games, and life through my thought-provoking blog.",
  "Sharing my passion for tech, games, and life through enlightening and entertaining blog entries.",
  "Discover the intersections of tech, games, and life through my engaging blog entries.",
  "Exploring the depths of tech, games, and life with a touch of creativity in my blog.",
  "Insights and inspiration on tech, games, and life conveyed through my captivating blog entries.",
  "Join me on an exciting exploration of tech, games, and life through my thought-provoking blog.",
]
