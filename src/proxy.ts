import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Skip middleware if it's the login page itself
  if (pathname === "/admin/shesvla") {
    return NextResponse.next();
  }

  // 2. Protect all other /admin routes
  if (pathname.startsWith("/admin")) {
    const authCookie = request.cookies.get("admin_access");

    if (authCookie?.value !== process.env.ADMIN_PASSWORD) {
      return NextResponse.redirect(new URL("/admin/shesvla", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/admin/:path*",
};
