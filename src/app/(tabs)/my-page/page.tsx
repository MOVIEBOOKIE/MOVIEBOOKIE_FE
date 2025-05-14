"use client";

import { ArrowRightIcon, MyKakaoIcon } from "@/icons/index";

export default function MyPage() {
  return (
    <div className="min-h-screen px-5 text-white">
      <h1 className="title-1-semibold pt-6 pb-7.5">마이페이지</h1>

      <div className="mb-5 flex items-center gap-4">
        <div className="border-red-main h-20 w-20 rounded-full border-2 bg-gray-800" />
        <div>
          <p className="text-lg font-semibold">서현</p>
          <p className="title-3-medium text-gray-500">
            디테일 수집형 영화 덕후러
          </p>
          <p className="caption-1-medium text-gray-500">aoeidenkim@gmail.com</p>
        </div>
      </div>

      <div className="mb-3 flex justify-around rounded-xl bg-gray-950 py-5 text-center">
        <div>
          <p className="caption-1-medium text-gray-400">모집경험</p>
          <p className="body-2-semibold mt-2 text-gray-200">0</p>
        </div>
        <div>
          <p className="caption-1-medium text-gray-400">참여경험</p>
          <p className="body-2-semibold mt-2 text-gray-200">8</p>
        </div>
        <div>
          <p className="caption-1-medium text-gray-400">티켓</p>
          <p className="body-2-semibold mt-2 text-gray-200">4</p>
        </div>
      </div>

      <ul className="body-2-medium px-2 text-gray-300">
        {[
          "서비스이용약관",
          "개인정보처리방침",
          "무비부키 평가 및 피드백",
          "로그아웃",
          "회원탈퇴",
        ].map((label) => (
          <li key={label} className="flex items-center justify-between py-4">
            <span>{label}</span>
            <ArrowRightIcon size={16} className="text-gray-400" />
          </li>
        ))}

        <li className="flex items-center justify-between">
          <span>
            연결된 소셜 계정{" "}
            <span className="ml-2 inline-block py-4 align-middle">
              <MyKakaoIcon />
            </span>
          </span>
          <ArrowRightIcon size={16} className="text-gray-400" />
        </li>
      </ul>
    </div>
  );
}
