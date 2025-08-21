import type { Metadata } from "next";
import DetailClient from "./detail-client";

//절대 경로로 바꿔주는 함수
function absolutize(src?: string) {
  if (!src) return undefined;
  try {
    return new URL(
      src,
      process.env.NEXT_PUBLIC_BASE_URL ?? "https://movie-bookie.shop",
    ).toString();
  } catch {
    return undefined;
  }
}

async function fetchEventMeta(id: string) {
  const base = process.env.NEXT_PUBLIC_API_URL;
  const url = `${base}/api/events/anonymous/${id}`;

  const res = await fetch(url, {
    next: { revalidate: 120 },
  });

  if (!res.ok) return null;

  const data = (await res.json()) as { result: any };
  if (!data?.result) return null;

  const eventdata = data.result;
  return {
    id: eventdata.eventId,
    title: eventdata.eventTitle || eventdata.mediaTitle || "무비부키 이벤트",
    description: eventdata.description,
    image:
      absolutize(eventdata.posterImageUrl) ??
      absolutize(eventdata.locationImageUrl),
  };
}

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const meta = await fetchEventMeta(params.id);

  if (!meta) {
    const title = "이벤트를 찾을 수 없어요 | 무비부키";
    const description = "해당 이벤트가 존재하지 않거나 만료되었습니다.";
    const url = `/event/${params.id}`;
    const image = "/images/thumbnail.png";

    return {
      title,
      description,
      alternates: { canonical: url },
      openGraph: {
        type: "website",
        url,
        title,
        description,
        images: [{ url: image, width: 1200, height: 630 }],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [image],
      },
      robots: { index: true, follow: true },
    };
  }

  const title = meta.title;
  const description =
    meta.description?.slice(0, 120) || "영화관 모임을 시작해보세요.";
  const url = `/event/${meta.id}`;
  const image = meta.image ?? "/images/thumbnail.png";

  return {
    title: `${title} | 무비부키`,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      title,
      description,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    robots: { index: true, follow: true },
  };
}

export default function Page() {
  return <DetailClient />;
}
