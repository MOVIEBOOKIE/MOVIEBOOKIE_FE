"use client";

import { ArrowRightIcon, MyKakaoIcon } from "@/icons/index";
import { useRouter } from "next/navigation";
interface MyPageStatProps {
  label: string;
  value: number | string;
}

function MyPageStat({ label, value }: MyPageStatProps) {
  return (
    <div>
      <p className="caption-1-medium text-gray-400">{label}</p>
      <p className="body-2-semibold mt-2 text-gray-200">{value}</p>
    </div>
  );
}
export default function MyPage() {
  const router = useRouter();
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
        <MyPageStat label="모집경험" value={0} />
        <MyPageStat label="참여경험" value={8} />
        <MyPageStat label="티켓" value={4} />
      </div>

      <ul className="body-2-medium px-2 text-gray-300">
        {[
          { label: "서비스이용약관" },
          { label: "개인정보처리방침" },
          {
            label: "무비부키 평가 및 피드백",
            // onClick: () => router.push("/feedback"),
          },
          { label: "로그아웃" },
          { label: "회원탈퇴" },
        ].map((item) => (
          <li
            key={item.label}
            className="flex cursor-pointer items-center justify-between py-4"
            // onClick={item.onClick}
            role="button"
          >
            <span>{item.label}</span>
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
