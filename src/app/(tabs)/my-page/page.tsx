"use client";

import Modal from "@/components/modal";
import { PATHS } from "@/constants";
import { ArrowRightIcon, DefaultProfileIcon, MyKakaoIcon } from "@/icons/index";
import { useLogout, useLogoutHandler } from "app/_hooks/auth/use-logout";
import { useToastStore } from "app/_stores/use-toast-store";
import { useUserStore } from "app/_stores/useUserStore";
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
  const user = useUserStore((state) => state.user);
  const router = useRouter();
  const { mutate: logout } = useLogout();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const { handleLogout } = useLogoutHandler(() => setShowLogoutModal(false));

  return (
    <div className="min-h-screen px-5 text-white">
      <h1 className="title-1-semibold pt-6 pb-7.5">마이페이지</h1>
      <div className="mb-5 flex items-center gap-4">
        <div className="border-red-main flex h-20 w-20 items-center justify-center rounded-full border-2">
          {user?.profileImage ? (
            <img
              src={user.profileImage}
              alt="프로필"
              className="h-18 w-18 rounded-full"
            />
          ) : (
            <DefaultProfileIcon className="h-18 w-18 rounded-full" />
          )}
        </div>
        <div>
          <p className="text-lg font-semibold">{user?.nickname}</p>
          <p className="body-3-medium text-gray-500">{user?.userTypeTitle}</p>
          <p className="caption-1-medium text-gray-500">{user?.email}</p>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="mb-3 flex h-21.75 w-84 justify-around rounded-xl bg-gray-950 text-center">
          <MyPageStat label="모집경험" value={user?.hostExperienceCount} />
          <MyPageStat
            label="참여경험"
            value={user?.participationExperienceCount}
          />
          <MyPageStat label="티켓" value={user?.ticketCount} />
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
        <Modal
          iconType="alert"
          title="로그아웃"
          description="정말 로그아웃 하시겠습니까?"
          confirmText="확인"
          cancelText="취소"
          onConfirm={handleLogout}
          onCancel={() => setShowLogoutModal(false)}
        />
      )}
    </div>
  );
}
