"use client";

import Modal from "@/components/modal";
import { PATHS } from "@/constants";
import { ArrowRightIcon, DefaultProfileIcon, MyKakaoIcon } from "@/icons/index";
import { useMyPage } from "app/_hooks/auth/use-mypage";
import { useUserStore } from "app/_stores/useUserStore";
import Loading from "app/loading";
import { useRouter } from "next/navigation";
import { useState } from "react";
interface MyPageStatProps {
  label: string;
  value?: number | string;
}
function MyPageStat({ label, value }: MyPageStatProps) {
  return (
    <div className="py-5">
      <p className="caption-1-medium text-gray-400">{label}</p>
      <p className="body-2-semibold mt-2 text-gray-200">{value}</p>
    </div>
  );
}
export default function MyPage() {
  const { data, isLoading, isError } = useMyPage();
  const router = useRouter();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return (
      <div className="flex h-screen items-center justify-center text-red-500">
        데이터를 불러오지 못했습니다. 다시 시도해주세요.
      </div>
    );
  }

  return (
    <div className="min-h-screen px-5 text-white">
      <h1 className="title-1-semibold pt-6 pb-7.5">마이페이지</h1>
      <div className="mb-5 flex items-center gap-4">
        <div className="border-red-main flex h-20 w-20 items-center justify-center rounded-full border-2">
          {data?.profileImage ? (
            <img
              src={data.profileImage}
              alt="프로필"
              className="h-18 w-18 rounded-full"
            />
          ) : (
            <DefaultProfileIcon className="h-18 w-18 rounded-full" />
          )}
        </div>
        <div>
          <p className="text-lg font-semibold">{data?.username}</p>
          {/* <p className="body-3-medium text-gray-500">{data?.userType}</p> */}
          <p className="body-3-medium text-gray-500">유저타입</p>
          <p className="caption-1-medium text-gray-500">
            {data?.certificationEmail}
          </p>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="mb-3 flex h-21.75 w-84 justify-around rounded-xl bg-gray-950 text-center">
          <MyPageStat label="모집경험" value={data?.hostExperienceCount} />
          <MyPageStat
            label="참여경험"
            value={data?.participationExperienceCount}
          />
          <MyPageStat label="티켓" value={0} />
        </div>
      </div>
      <ul className="body-3-medium pl-2 text-gray-100">
        {[
          { label: "서비스이용약관", onClick: () => router.push(PATHS.TOS) },
          {
            label: "개인정보처리방침",
            onClick: () => router.push(PATHS.PRIVACY_POLICY),
          },
          {
            label: "무비부키 평가 및 피드백",
            onClick: () => router.push(PATHS.FEEDBACK),
          },
          { label: "로그아웃", onClick: () => setShowLogoutModal(true) },
          {
            label: "회원탈퇴",
            onClick: () => router.push(PATHS.WITHDRAWAL),
          },
        ].map((item) => (
          <li
            key={item.label}
            className="flex cursor-pointer items-center justify-between py-4"
            onClick={item.onClick}
            role="button"
          >
            <span>{item.label}</span>
            <ArrowRightIcon size={16} className="text-gray-400" />
          </li>
        ))}
        <li
          className="flex cursor-pointer items-center justify-between py-4"
          onClick={() => router.push(PATHS.SOCIAL_ACCOUNTS)}
          role="button"
        >
          <span className="flex items-center gap-2">
            연결된 소셜 계정 <MyKakaoIcon />
          </span>
          <ArrowRightIcon size={16} className="text-gray-400" />
        </li>
      </ul>
      {showLogoutModal && (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/70">
          <Modal
            iconType="alert"
            title="로그아웃"
            description="정말 로그아웃 하시겠습니까?"
            confirmText="확인"
            cancelText="취소"
            onConfirm={() => {
              setShowLogoutModal(false);
              console.log("로그아웃 로직 실행");
            }}
            onCancel={() => setShowLogoutModal(false)}
          />
        </div>
      )}{" "}
    </div>
  );
}
