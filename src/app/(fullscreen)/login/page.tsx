"use client";

import { useState } from "react";
import BackIcon from "@/icons/common/back.svg";

export default function Verify() {
  const [phone, setPhone] = useState("");

  const isValidPhone = /^010-\d{4}-\d{4}$/.test(phone);

  return (
    <div className="px-5 pt-11 text-white">
      <header className="relative flex h-12 items-center justify-center">
        <button className="absolute top-2.5 left-0">
          <BackIcon className="h-full w-full" />
        </button>
        <h1 className="pt-4.25 pb-2.75 text-base font-semibold text-white">
          회원가입
        </h1>
      </header>

      <p className="body-1-semibold mt-9.25 text-gray-400">1/3</p>

      <h2 className="title-3-semibold mt-1.5">
        무비부키 시작을 위해 <br />
        전화번호를 입력해 주세요
      </h2>

      <p className="caption-1-medium mt-1.5 text-gray-500">
        전화번호는 주최자와 원활한 연락을 위해 사용되며, <br />
        여러분의 소중한 정보는 안전하게 보호돼요
      </p>

      <div className="mt-13">
        <label className="body-2-medium text-gray-400">전화번호</label>
        <input
          type="tel"
          inputMode="tel"
          placeholder="ex) 010-1234-5678"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full border-b border-gray-700 bg-transparent pt-4.25 pb-1.5 text-white placeholder-gray-600 focus:outline-none"
        />
      </div>

      <button
        disabled={!isValidPhone}
        className={`mt-10 w-full rounded-xl py-3 text-sm font-medium ${
          isValidPhone ? "bg-white text-black" : "bg-gray-800 text-gray-500"
        }`}
      >
        인증번호 보내기
      </button>
    </div>
  );
}
