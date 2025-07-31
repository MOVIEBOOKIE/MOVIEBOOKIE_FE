import { useQuery } from "@tanstack/react-query";
import { getMyPageInfo } from "app/_apis/auth/mypage";
import { useUserStore } from "app/_stores/use-user-store";

export const useMyPage = () => {
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);

  return useQuery({
    queryKey: ["my-page"],
    queryFn: async () => {
      const res = await getMyPageInfo();
      if (res) {
        setUser({
          email: res.email,
          certificationEmail: res.certificationEmail,
          nickname: res.username,
          profileImage: res.profileImage,
          userTypeTitle: res.userTypeTitle,
          hostExperienceCount: res.hostExperienceCount,
          participationExperienceCount: res.participationExperienceCount,
          ticketCount: res.ticketCount,
          phoneNumber: res.phoneNumber,
        });
      }
      return res;
    },
    enabled: !user,
  });
};
