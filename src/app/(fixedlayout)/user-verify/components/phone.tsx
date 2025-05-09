"use client";

import { useState, useEffect } from "react";
import { formatPhoneNumber } from "@/utils/format-phone";

export default function PhoneStep({ onNext }: { onNext: () => void }) {
  const [phone, setPhone] = useState("");
  const isValidPhone = /^010-\d{4}-\d{4}$/.test(phone);

  useEffect(() => {
    const button = document.querySelector("button");
    if (button) button.disabled = !isValidPhone;
  }, [isValidPhone]);

  return (
    <div className="mt-13">
      <label className="body-2-medium text-gray-400">전화번호</label>
      <input
        type="tel"
        placeholder="010-1234-5678"
        value={phone}
        onChange={(e) => setPhone(formatPhoneNumber(e.target.value))}
        className="w-full border-b border-gray-700 bg-transparent pt-4.25 pb-1.5 text-white placeholder-gray-600 focus:outline-none"
      />
    </div>
  );
}
