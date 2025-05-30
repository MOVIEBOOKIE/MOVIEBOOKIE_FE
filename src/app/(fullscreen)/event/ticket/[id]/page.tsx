import { Header } from "@/components";
import Client from "../_components/client";
import Image from "next/image";

export default function Ticket() {
  return (
    <div className="relative h-screen w-full">
      <Image
        src="/images/custom-bg.png"
        alt="배경"
        fill
        className="object-cover"
        priority
      />
      <div className="relative z-10 flex h-full w-full flex-col items-center">
        <Header className="bg-transparent" title="티켓" />
        <Client />
      </div>
    </div>
  );
}
