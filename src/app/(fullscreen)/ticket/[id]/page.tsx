import { Header } from "@/components";
import Image from "next/image";
import { PATH_IMAGES } from "@/constants";
import TicketPage from "../components/client";

export default function Ticket() {
  return (
    <div className="relative h-full w-full">
      <Image
        src={PATH_IMAGES.CUSTOM_BG}
        alt="배경"
        fill
        className="object-cover"
        priority
      />
      <div className="relative z-10 flex h-full w-full flex-col items-center">
        <Header className="bg-transparent" />
        <TicketPage />
      </div>
    </div>
  );
}
