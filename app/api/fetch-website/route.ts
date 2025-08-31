import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const url = searchParams.get("url")

  if (!url) {
    return NextResponse.json({ error: "URL is required" }, { status: 400 })
  }

  let normalizedUrl: string
  try {
    // Ensure URL has protocol
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      normalizedUrl = `https://${url}`
    } else {
      normalizedUrl = url
    }

    // Validate URL format
    new URL(normalizedUrl)
  } catch {
    return NextResponse.json({ error: "Invalid URL format" }, { status: 400 })
  }

  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 15000) // Increased timeout to 15 seconds

    let currentUrl = normalizedUrl
    let redirectCount = 0
    const maxRedirects = 10

    while (redirectCount < maxRedirects) {
      const response = await fetch(currentUrl, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
          Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
          "Accept-Language": "en-US,en;q=0.9",
          "Accept-Encoding": "gzip, deflate, br",
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
          "Sec-Fetch-Dest": "document",
          "Sec-Fetch-Mode": "navigate",
          "Sec-Fetch-Site": "none",
          "Sec-Fetch-User": "?1",
          "Upgrade-Insecure-Requests": "1",
        },
        signal: controller.signal,
        redirect: "manual", // Handle redirects manually
      })

      console.log(`[v0] Response status: ${response.status}`)

      // If it's a redirect, follow it manually
      if (response.status >= 300 && response.status < 400) {
        const location = response.headers.get("location")
        if (location) {
          console.log(`[v0] Redirect detected to: ${location}`)
          // Make location absolute if it's relative
          currentUrl = location.startsWith("http") ? location : new URL(location, currentUrl).href
          redirectCount++
          continue
        }
      }

      // If we get here, it's not a redirect or we have the final response
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const html = await response.text()
      console.log(`[v0] Successfully fetched HTML, length: ${html.length}`)

      const titleMatch =
        html.match(/<title[^>]*>([^<]+)<\/title>/i) ||
        html.match(/<meta[^>]*property=["']og:title["'][^>]*content=["']([^"']+)["']/i) ||
        html.match(/<h1[^>]*>([^<]+)<\/h1>/i)
      const title = titleMatch
        ? titleMatch[1]
            .trim()
            .replace(/&[^;]+;/g, " ")
            .trim()
        : null

      const descriptionMatch =
        html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i) ||
        html.match(/<meta[^>]*content=["']([^"']+)["'][^>]*name=["']description["']/i) ||
        html.match(/<meta[^>]*property=["']og:description["'][^>]*content=["']([^"']+)["']/i) ||
        html.match(/<meta[^>]*name=["']twitter:description["'][^>]*content=["']([^"']+)["']/i)
      const description = descriptionMatch
        ? descriptionMatch[1]
            .trim()
            .replace(/&[^;]+;/g, " ")
            .trim()
        : null

      const faviconMatch =
        html.match(/<link[^>]*rel=["'](?:icon|shortcut icon)["'][^>]*href=["']([^"']+)["']/i) ||
        html.match(/<link[^>]*href=["']([^"']+)["'][^>]*rel=["'](?:icon|shortcut icon)["']/i) ||
        html.match(/<link[^>]*rel=["']apple-touch-icon["'][^>]*href=["']([^"']+)["']/i) ||
        html.match(/<link[^>]*rel=["']apple-touch-icon-precomposed["'][^>]*href=["']([^"']+)["']/i)

      let favicon = faviconMatch ? faviconMatch[1] : "/favicon.ico"

      // Make favicon URL absolute
      if (favicon && !favicon.startsWith("http")) {
        const urlObj = new URL(currentUrl)
        favicon = favicon.startsWith("/") ? `${urlObj.origin}${favicon}` : `${urlObj.origin}/${favicon}`
      }

      const result = {
        title: title || "Untitled Project",
        description: description || "A web project",
        favicon: favicon || `${new URL(currentUrl).origin}/favicon.ico`,
      }

      console.log(`[v0] Extracted data:`, result)
      clearTimeout(timeoutId)
      return NextResponse.json(result)
    }

    // If we've exceeded max redirects
    throw new Error("Too many redirects")
  } catch (error) {
    console.error("[v0] Error fetching website data:", error)

    const urlObj = new URL(normalizedUrl)
    const domain = urlObj.hostname.replace("www.", "")
    const projectName = domain.split(".")[0]

    const fallbackData = {
      title: `${projectName.charAt(0).toUpperCase() + projectName.slice(1)} Project`,
      description: `A project hosted at ${domain}`,
      favicon: `${urlObj.origin}/favicon.ico`,
    }

    console.log(`[v0] Using fallback data:`, fallbackData)
    return NextResponse.json(fallbackData)
  }
}
