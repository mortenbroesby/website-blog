import type { NextApiRequest, NextApiResponse } from "next"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const viewCounts = await prisma.viewCounter.groupBy({
      by: ["slug"],
      _sum: {
        count: true,
      },
    })

    const transformedViewCounts = viewCounts.map((item) => ({
      slug: item.slug,
      count: item._sum.count || 0,
    }))

    return res.status(200).json(transformedViewCounts)
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: error.message,
    })
  }
}
