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

  // Public routes (do NOT protect these)
  const isPublicRoute =
    url.pathname.startsWith("/signup") ||
    url.pathname.startsWith("/login") ||
    url.pathname.startsWith("/onboarding") ||
    url.pathname.startsWith("/api/auth")

  // Redirect unauthenticated users to YOUR signup page
  if (!isLoggedIn && !isPublicRoute) {
    return NextResponse.redirect(
      new URL("/signup", url.origin)
    )
  }

  // Allow request to continue
  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*", "/app/:path*", "/onboarding"],
}
