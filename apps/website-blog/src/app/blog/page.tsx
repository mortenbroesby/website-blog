import Link from "next/link"
import { Page, ViewCounter } from "@/components"
import { formatDate } from "@/utils"
import ErrorBoundary from "~/src/components/error-boundary"
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

              <ErrorBoundary>
                <ViewCounter
                  className="text-muted-foreground text-xs"
                  slug={post.slugAsParams}
                  trackView={false}
                >
                  <p className="text-muted-foreground text-xs">
                    {formatDate(post.date)}
                  </p>
                </ViewCounter>
              </ErrorBoundary>

              <Link href={post.slug} className="absolute inset-0">
                <span className="sr-only">View Article</span>
              </Link>

              <Link href={post.slug}>
                <div className="flex items-center gap-2">
                  <p className="text-blue-500">Read more</p>
                  <ArrowIcon />
                </div>
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

const ArrowIcon = () => (
  <svg
    width="36"
    height="12"
    viewBox="0 0 36 12"
    fill="none"
    className="text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-125 ease-in-out"
  >
    <path
      d="M0.75 6H11.25 M6 0.75L11.25 6L6 11.25"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></path>
    <path
      d="M15 10L19.5 5.5L15 1"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></path>
    <path
      d="M23 10L27.5 5.5L23 1"
      stroke="currentColor"
      strokeOpacity="0.66"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></path>
    <path
      d="M31 10L35.5 5.5L31 1"
      stroke="currentColor"
      strokeOpacity="0.35"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></path>
  </svg>
)

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
