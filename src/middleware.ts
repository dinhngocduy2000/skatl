import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { COOKIE_KEYS } from "./lib/enum/cookie-keys";
import { ROUTE_PATH } from "./lib/enum/route-path";

const publicRoutes = ["/login", "/signup"];

export async function middleware(request: NextRequest) {
  const token = request.cookies.get(COOKIE_KEYS.ACCESS_TOKEN)?.value;
  console.log(`CHECK TOKEN: ${token}`);
  const { pathname } = request.nextUrl;
  // Allow public routes
  if (publicRoutes.includes(pathname)) {
    if (token) {
      return NextResponse.redirect(new URL(ROUTE_PATH.HOME, request.url));
    }
    return NextResponse.next();
  }

  console.log(`CHECK TOKEN: ${token}`);
  // Check if token is missing or expired
  if (!token) {
    console.log("NO TOKEN or EXPIRED for:", pathname);

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
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
