"use client";

export const dynamic = "force-dynamic";

import { Suspense } from "react";
import TraitResultContent from "./content";

export default function TraitResultPage() {
  return (
    <Suspense fallback={<div />}>
      <TraitResultContent />
    </Suspense>
  );
}
