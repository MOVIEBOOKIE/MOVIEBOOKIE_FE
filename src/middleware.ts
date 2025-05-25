import { PATHS } from "@/constants";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("accessToken")?.value;

  if (!token && req.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL(PATHS.LOGIN, req.url));
  }

  return NextResponse.next();
}
