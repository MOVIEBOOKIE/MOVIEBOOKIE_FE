"use client";

import { useState, useEffect } from "react";

export default function EmailStep({ onNext }: { onNext: () => void }) {
  const [email, setEmail] = useState("");
  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  useEffect(() => {
    const button = document.querySelector("button");
    if (button) button.disabled = !isValidEmail;
  }, [isValidEmail]);

  return (
    <div className="mt-13">
      <label className="body-2-medium text-gray-400">이메일 주소</label>
      <input
        type="email"
        placeholder="example@gmail.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full border-b border-gray-700 bg-transparent pt-4.25 pb-1.5 text-white placeholder-gray-600 focus:outline-none"
      />
    </div>
  );
}
