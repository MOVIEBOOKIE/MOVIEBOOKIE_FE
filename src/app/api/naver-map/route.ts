import { NextRequest } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  const w = searchParams.get("w") ?? "600";
  const h = searchParams.get("h") ?? "344";
  const level = searchParams.get("level") ?? "16";

  if (!lat || !lng) {
    return new Response(JSON.stringify({ error: "Missing lat/lng" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const ID = process.env.NAVER_CLIENT_ID;
  const KEY = process.env.NAVER_CLIENT_SECRET;
  if (!ID || !KEY) {
    console.error("❌ Missing NAVER_CLIENT_ID / NAVER_CLIENT_SECRET");
    return new Response(
      JSON.stringify({ error: "Server credentials missing" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  const marker = `type:d|size:mid|pos:${lng}%20${lat}`;

  const qs = new URLSearchParams({
    w,
    h,
    center: `${lng},${lat}`,
    level,
  });

  const apiUrl = `https://maps.apigw.ntruss.com/map-static/v2/raster?${qs.toString()}&markers=${marker}`;

  try {
    const upstream = await fetch(apiUrl, {
      headers: {
        "x-ncp-apigw-api-key-id": ID,
        "x-ncp-apigw-api-key": KEY,
      },
      cache: "no-store",
      next: { revalidate: 0 },
    });

    if (!upstream.ok) {
      const body = await upstream.text();
      console.error("❌ Naver API Error:", upstream.status, body);
      return new Response(body, {
        status: upstream.status,
        headers: {
          "Content-Type": upstream.headers.get("content-type") || "text/plain",
        },
      });
    }

    return new Response(upstream.body, {
      headers: {
        "Content-Type": upstream.headers.get("content-type") || "image/png",
        "Cache-Control": "no-store",
      },
    });
  } catch (e: any) {
    console.error("❌ Server Error:", e);
    return new Response(
      JSON.stringify({ error: "Server Error", detail: e?.message }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
}
