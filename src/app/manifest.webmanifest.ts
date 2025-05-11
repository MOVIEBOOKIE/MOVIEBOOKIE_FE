export const dynamic = "force-static";

export default function handler() {
  return new Response(
    JSON.stringify({
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
    }),
    {
      headers: {
        "Content-Type": "application/manifest+json",
      },
    },
  );
}
