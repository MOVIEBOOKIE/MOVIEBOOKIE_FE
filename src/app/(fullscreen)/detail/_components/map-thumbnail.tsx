import Image from "next/image";

interface MapThumbnailProps {
  latitude: number;
  longitude: number;
  width?: number;
  height?: number;
  locationName: string;
  address: string;
}

const MapThumbnail = ({
  latitude,
  longitude,
  width = 600,
  height = 300,
  locationName,
  address,
}: MapThumbnailProps) => {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const mapSrc = `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=16&size=${width}x${height}&markers=color:red%7C${latitude},${longitude}&key=${apiKey}`;

  return (
    <div className="relative w-full" style={{ aspectRatio: "335 / 192" }}>
      <Image
        src={mapSrc}
        alt="map-thumbnail"
        width={width}
        height={height}
        className="rounded-[10px]"
      />
      <div className="absolute bottom-0 w-full rounded-b-[10px] bg-gray-800 p-4">
        <p className="body-3-medium">{locationName}</p>
        <p className="caption-1-medium mt-1 text-gray-500">{address}</p>
      </div>
    </div>
  );
};

export default MapThumbnail;
