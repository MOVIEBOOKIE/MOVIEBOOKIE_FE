import { FixedLayout, StepHeader } from "@/components";
import { DefaultProfileIcon } from "@/icons/index";
import { useRouter } from "next/navigation";
import Loading from "app/loading";
import { formatPhoneNumberToBasic } from "@/utils/format-phone";
import { useUserInfo } from "app/_hooks/use-user-info";

export default function VerifyFlow() {
  const router = useRouter();

  const { data: userInfo, isLoading, isError } = useUserInfo();
  if (isLoading) {
    return <Loading />;
  }

  return (
    <FixedLayout
      title="프로필 설정"
      onButtonClick={() => {
        router.push(`/trait`);
      }}
      buttonText="확인했어요"
    >
      <StepHeader
        StepHeader="3/3"
        title={
          <>
            무비부키에서 사용할 <br />
            프로필을 확인해 주세요
          </>
        }
        description={
          <>
            입력한 전화번호, 이메일 정보와 <br />
            카톡 프로필 사진, 닉네임을 최종 확인해주세요
          </>
        }
      />

      <div className="mt-14">
        {isError && (
          <div className="text-center text-red-500">
            유저 정보를 불러오는 데 실패했어요.
          </div>
        )}

        {userInfo && (
          <div className="flex flex-col items-center">
            <div className="border-red-main flex h-31.75 w-31.75 items-center justify-center rounded-full border-2">
              {userInfo.profileImage ? (
                <img
                  src={userInfo.profileImage}
                  alt="프로필"
                  className="h-28 w-28 rounded-full object-cover"
                />
              ) : (
                <DefaultProfileIcon className="h-28 w-28 rounded-full" />
              )}
            </div>

            <div className="title-3-semibold mt-4 text-gray-200">
              {userInfo.username}
            </div>
            <div className="caption-1-medium mt-1 text-gray-500">
              {userInfo.email}
            </div>
            <div className="caption-1-medium mt-1 text-gray-500">
              {formatPhoneNumberToBasic(userInfo.phoneNumber)}
            </div>
          </div>
        )}
      </div>
    </FixedLayout>
  );
}
