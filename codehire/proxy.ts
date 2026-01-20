import authConfig from "./auth.config"
import NextAuth from "next-auth"
import { NextResponse } from "next/server"

const { auth } = NextAuth(authConfig)

export async function proxy(request: Request) {
  // Wrap request with NextAuth auth()
  const reqAuth = await auth()

  // Parse the URL
  const url = new URL(request.url)
  const isLoggedIn = !!reqAuth

  // Redirect unauthenticated users to NextAuth signin
  if (!isLoggedIn) {
    const signInUrl = new URL("/api/auth/signin", url.origin)
    signInUrl.searchParams.set("callbackUrl", url.href) // preserve original URL
    return NextResponse.redirect(signInUrl)
  }

  // Allow request to continue
  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*", "/app/:path*"],
}
