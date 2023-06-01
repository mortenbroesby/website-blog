import type { NextApiRequest, NextApiResponse } from "next"
import { PrismaClient } from "@prisma/client"
import requestIp from "request-ip"
import { v4 as uuidv4 } from "uuid"

const prisma = new PrismaClient()

function getIPAddress(req: NextApiRequest): string {
  let ipAddress: string | undefined

  const requestedIp = requestIp.getClientIp(req)
  if (requestedIp) {
    return requestedIp
  }

  if (req.headers["x-forwarded-for"]) {
    const forwardedFor = req.headers["x-forwarded-for"] as string
    ipAddress = forwardedFor.split(",").map((ip) => ip.trim())[0]
  } else if (req.headers["x-real-ip"]) {
    ipAddress = req.headers["x-real-ip"] as string
  } else {
    ipAddress = req.socket.remoteAddress
  }

  if (ipAddress === undefined) {
    return uuidv4()
  }

  return ipAddress.replaceAll(" ", "")
}

function getSlugValue(slug: string | string[]): string {
  return Array.isArray(slug) ? slug.join("/") : (slug as string)
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { slug } = req.query

    if (!slug) {
      return res.status(400).json({ message: "Slug is required." })
    }

    const ipAddress = getIPAddress(req)
    const slugValue = getSlugValue(slug)

    await prisma.viewCounter.create({
      data: { ipAddress, slug: slugValue, count: 1 },
    })

    const viewCounts = await prisma.viewCounter.findMany({
      where: { slug: slugValue },
      select: { count: true },
    })

    const totalCount = viewCounts.reduce((total, view) => total + view.count, 0)

    return res.status(200).json({
      total: totalCount,
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: error.message,
    })
  }
}
