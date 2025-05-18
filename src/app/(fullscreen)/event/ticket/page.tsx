import { Header } from "@/components";
import Client from "./_components/client";

export default function Ticket() {
  return (
    <div className="flex h-screen w-full flex-col items-center bg-[url('/images/custom-bg.png')] bg-cover bg-center">
      <Header className="bg-transparent" title="티켓" />
      <Client />
    </div>
  );
}
