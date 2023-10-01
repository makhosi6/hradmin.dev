import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  if (!isAuthenticated(request)) {
    return Response.json(
      { success: false, message: "authentication failed" },
      { status: 401 }
    );
  }
}

export const config = {
  matcher: "/api/:path*",
};
function isAuthenticated(request: NextRequest) {
  const token = request.headers.get("Authorization");

  /// if token matches
  return token && token.includes("Bearer");
}
