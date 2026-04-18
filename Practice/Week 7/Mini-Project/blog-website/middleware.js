import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("session")?.value;

  if (!token) {
    const loginUrl = new URL("/contact", request.url);
    // Preserve the original destination so you can redirect back after login
    // loginUrl.searchParams.set("from", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

// Only run middleware on these paths
export const config = {
  matcher: ["/", "/blogs/:path*"],
};
