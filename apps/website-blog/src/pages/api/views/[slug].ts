import type { NextApiRequest, NextApiResponse } from "next"
import { PrismaClient } from "@prisma/client"
import requestIp from "request-ip"
import { v4 as uuidv4 } from "uuid"

const prisma = new PrismaClient()

function isValidIPAddress(ipAddress: string): boolean {
  // Regular expressions to match IPv4 and IPv6 addresses
  const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/
  const ipv6Regex = /^([0-9A-Fa-f]{1,4}:){7}[0-9A-Fa-f]{1,4}$/

  // Check if the IP address matches either IPv4 or IPv6 format
  return ipv4Regex.test(ipAddress) || ipv6Regex.test(ipAddress)
}

async function getAsyncIPAddress(): Promise<string | undefined> {
  try {
    const response = await fetch("https://api.ipify.org/?format=json")
    const data = await response.json()
    return data.ip
  } catch (error) {
    console.log("Error retrieving IP address:", error)
    return undefined
  }
}

async function getIPAddress(req: NextApiRequest): Promise<string> {
  if (req.headers["x-real-ip"]) {
    const realIP = req.headers["x-real-ip"] as string
    if (isValidIPAddress(realIP)) {
      return realIP
    }
  }

  const remoteAddress = req.socket.remoteAddress
  if (remoteAddress && isValidIPAddress(remoteAddress)) {
    return remoteAddress
  }

  if (req.headers["x-forwarded-for"]) {
    const forwardedFor = req.headers["x-forwarded-for"] as string
    const ips = forwardedFor.split(",").map((ip) => ip.trim())
    const validIPs = ips.filter((ip) => isValidIPAddress(ip))
    if (validIPs.length > 0) {
      return validIPs[0]
    }
  }

  const asyncUserIPAddress = await getAsyncIPAddress()
  if (asyncUserIPAddress && isValidIPAddress(asyncUserIPAddress)) {
    return asyncUserIPAddress
  }

  const requestedIp = requestIp.getClientIp(req)
  if (requestedIp && isValidIPAddress(requestedIp)) {
    return requestedIp
  }

  return uuidv4()
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
      return res.status(400).json({
        message: "Slug is required.",
      })
    }

    const ipAddress = await getIPAddress(req)
    const slugValue = getSlugValue(slug)

    const existingView = await prisma.viewCounter.findFirst({
      where: {
        ipAddress,
        slug: slugValue,
      },
    })

    // IP address and slug combination already exists, do nothing
    if (existingView) {
      return res.status(200).json({
        message: `View already exists - '${slugValue}'@${ipAddress}`,
      })
    }

    try {
      await prisma.viewCounter.create({
        data: { ipAddress, slug: slugValue, count: 1 },
      })
    } catch (error) {
      console.log("Error creating view counter:", error)
    }

    return res.status(200).json({
      message: "Success",
    })
  } catch (error) {
    console.log(error)

    return res.status(500).json({
      message: error.message,
    })
  }
}
