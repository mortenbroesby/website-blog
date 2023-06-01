import type { NextApiRequest, NextApiResponse } from "next"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const viewCounts = await prisma.viewCounter.findMany({
      select: {
        slug: true,
        count: true,
      },
    })

    return res.status(200).json(viewCounts)
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: error.message,
    })
  }
}
