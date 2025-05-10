import type { MetadataRoute } from "next";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    name: "무비부키",
    short_name: "무비부키",
    description: "당신의 일상을 영화처럼",
    start_url: "/",
    display: "standalone",
    background_color: "#0E0E0E",
    theme_color: "#0E0E0E",
    icons: [
      {
        src: "/images/favicon.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  });
}
