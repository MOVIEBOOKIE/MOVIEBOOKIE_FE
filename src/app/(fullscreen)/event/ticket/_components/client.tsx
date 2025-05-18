"use client";

import { useState } from "react";
import CardBack from "./card-back";
import CardFront from "./card-front";
import { RotateIcon } from "@/icons/index";

export default function Client() {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="flex h-full flex-col items-center justify-center gap-8.5">
      <div
        style={{ transformStyle: "preserve-3d" }}
        className={`transform-style-preserve-3d relative h-111.75 w-72.25 transition-transform duration-700 ${
          flipped ? "rotate-y-180" : ""
        }`}
      >
        <CardFront />
        <CardBack />
      </div>
      <button
        type="button"
        className="rounded-full bg-white/20"
        onClick={() => setFlipped(!flipped)}
      >
        <RotateIcon />
      </button>
    </div>
  );
}
