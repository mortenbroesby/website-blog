import type { NextApiRequest, NextApiResponse } from "next"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { slug } = req.query

    if (!slug) {
      return res.status(400).json({ message: "Slug is required." })
    }

    const ipAddress = req.headers["x-forwarded-for"] || req.socket.remoteAddress

    const existingCounter = await prisma.viewCounter.findUnique({
      where: { ipAddress, slug: slug as string },
    })

    if (!existingCounter) {
      await prisma.viewCounter.create({
        data: { ipAddress, slug: slug as string, count: 1 },
      })
    } else {
      await prisma.viewCounter.update({
        where: { ipAddress, slug: slug as string },
        data: { count: existingCounter.count + 1 },
      })
    }

    const viewCount = await prisma.viewCounter.findUnique({
      where: { slug: slug as string },
      select: { count: true },
    })

    if (!viewCount) {
      return res.status(404).json({
        message: "View count not found",
      })
    }

    return res.status(200).json({
      total: viewCount.count,
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: error.message,
    })
  }
}
