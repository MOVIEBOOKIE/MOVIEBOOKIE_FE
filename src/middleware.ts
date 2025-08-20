import { PATHS } from "@/constants";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const config = {
  matcher: ["/", "/login", "/login/:path*"],
};

export function middleware(req: NextRequest) {
  const token = req.cookies.get("accessToken")?.value;
  const pathname = req.nextUrl.pathname;
  const host = req.headers.get("host") || "";
  if (!token && pathname === "/") {
    return NextResponse.redirect(new URL(PATHS.LOGIN, req.url));
  }
  if (token && pathname === PATHS.LOGIN) {
    return NextResponse.redirect(new URL(PATHS.EVENT ?? "/", req.url));
  }
  if (host.startsWith("www.")) {
    const url = new URL(req.url);
    url.host = host.replace(/^www\./, "");
    return NextResponse.redirect(url, 301);
  }
  return NextResponse.next();
}
