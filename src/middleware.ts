import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { COOKIE_KEYS } from "./lib/enum/cookie-keys";

const publicRoutes = ["/login", "/signup"];

async function refreshToken(request: NextRequest): Promise<string | null> {
  const refreshToken = request.cookies.get(COOKIE_KEYS.REFRESH_TOKEN)?.value;

  if (!refreshToken) return null;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/refresh`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: `refresh_token=${refreshToken}`, // Pass refresh token
        },
      }
    );

    if (!response.ok) throw new Error("Refresh failed");

    const { access_token, expires_at } = await response.json();
    const newResponse = NextResponse.next();
    newResponse.cookies.set(COOKIE_KEYS.ACCESS_TOKEN, access_token, {
      httpOnly: true,
    });
    newResponse.cookies.set(COOKIE_KEYS.EXPIRES_AT, expires_at.toString(), {
      httpOnly: true,
    });
    return access_token;
  } catch (error) {
    console.error("Token refresh failed:", error);
    return null;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  // Allow public routes
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  //   // Only check token for API routes
  //   if (!pathname.startsWith("/api/")) {
  //     return NextResponse.next(); // Skip non-API routes
  //   }

  const token = request.cookies.get(COOKIE_KEYS.ACCESS_TOKEN)?.value;
  const expiresAt = request.cookies.get(COOKIE_KEYS.EXPIRES_AT)?.value;

  // Check if token is missing or expired
  if (!token || !expiresAt || Date.now() > Number(expiresAt)) {
    console.log("NO TOKEN or EXPIRED for:", pathname);

    // Attempt to refresh token
    const newToken = await refreshToken(request);
    if (newToken) {
      // Token refreshed successfully, proceed with updated cookies
      const response = NextResponse.next();
      response.headers.set("X-Refreshed-Token", newToken); // Optional: Inform downstream
      return response;
    }

    // Refresh failed, redirect to login
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Token is valid, proceed
  console.log("Valid token for:", pathname);
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|icon.ico).*)",
  ],
};
