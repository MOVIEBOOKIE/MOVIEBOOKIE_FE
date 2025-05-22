"use client";

import dynamic from "next/dynamic";

const Client = dynamic(() => import("./_components/client"), { ssr: false });

export default function Success() {
  return <Client />;
}
