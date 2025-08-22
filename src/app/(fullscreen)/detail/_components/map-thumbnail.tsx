"use client";

import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

interface MapThumbnailProps {
  latitude: number; // 위도
  longitude: number; // 경도
  width?: number;
  height?: number;
  locationName: string;
  address: string;
  zoomLevel?: number;
}

const MapThumbnail = ({
  latitude,
  longitude,
  width = 600,
  height = 344,
  locationName,
  address,
  zoomLevel = 16,
}: MapThumbnailProps) => {
  const buildApiUrl = () => {
    const qs = new URLSearchParams({
      lat: String(latitude),
      lng: String(longitude),
      w: String(width),
      h: String(height),
      level: String(zoomLevel),
      _cb: String(Math.floor(Date.now() / (1000 * 60))),
    });
    return `/api/naver-map?${qs.toString()}`;
  };

  const mapApiUrl = buildApiUrl();

  const {
    data: blob,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["naver-map", latitude, longitude, width, height, zoomLevel],
    queryFn: async ({ signal }) => {
      const res = await fetch(mapApiUrl, { signal, cache: "no-store" });
      if (!res.ok) {
        let detail = "";
        try {
          detail = await res.text();
        } catch {}
        throw new Error(detail || "네이버 지도 API 호출 실패");
      }
      return await res.blob();
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
    enabled: Number.isFinite(latitude) && Number.isFinite(longitude),
    retry: 1,
  });

  const [objectUrl, setObjectUrl] = useState<string | null>(null);
  const currentUrlRef = useRef<string | null>(null);

  useEffect(() => {
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    setObjectUrl(url);
    currentUrlRef.current = url;
    return () => {
      if (currentUrlRef.current) {
        URL.revokeObjectURL(currentUrlRef.current);
        currentUrlRef.current = null;
      }
    };
  }, [blob]);

  const naverMapUrl =
    `https://map.naver.com/?lng=${longitude}&lat=${latitude}` +
    `&title=${encodeURIComponent(locationName)}`;

  return (
    <a
      href={naverMapUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="block"
    >
      <div className="relative w-full" style={{ aspectRatio: "335 / 192" }}>
        {objectUrl && !isLoading && !isError && (
          <Image
            src={objectUrl}
            alt="map-thumbnail"
            className="rounded-[10px] object-cover"
            loading="lazy"
            fill
          />
        )}

        <div className="pointer-events-none absolute bottom-0 w-full rounded-b-[10px] bg-gray-900 p-4">
          <p className="body-3-medium text-gray-200">{locationName}</p>
          <p className="caption-1-medium mt-1 text-gray-600">{address}</p>
        </div>
      </div>
    </a>
  );
};

export default MapThumbnail;
