import { PATHS } from "@/constants";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const config = {
  matcher: ["/", "/login"],
};

export function middleware(req: NextRequest) {
  const token = req.cookies.get("accessToken")?.value;
  const pathname = req.nextUrl.pathname;
  if (!token && pathname === "/") {
    return NextResponse.redirect(new URL(PATHS.LOGIN, req.url));
  }
  return NextResponse.next();
}
