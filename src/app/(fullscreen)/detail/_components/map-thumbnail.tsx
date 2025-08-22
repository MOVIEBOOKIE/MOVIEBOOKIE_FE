"use client";

import { useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";

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

  const lastUrlRef = useRef<string | null>(null);
  useEffect(() => {
    return () => {
      if (lastUrlRef.current) URL.revokeObjectURL(lastUrlRef.current);
    };
  }, []);

  const {
    data: mapUrl,
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
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      if (lastUrlRef.current) URL.revokeObjectURL(lastUrlRef.current);
      lastUrlRef.current = url;
      return url;
    },
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    enabled: Number.isFinite(latitude) && Number.isFinite(longitude),
    retry: 1,
  });

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
        {mapUrl && !isLoading && !isError && (
          <img
            src={mapUrl}
            alt="map-thumbnail"
            width={width}
            height={height}
            className="rounded-[10px] object-cover"
            loading="lazy"
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
