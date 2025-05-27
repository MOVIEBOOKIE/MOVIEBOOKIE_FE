import { PATHS } from "@/constants";
import { useMutation } from "@tanstack/react-query";
import { postLogout } from "app/_apis/auth/auth";
import { useToastStore } from "app/_stores/use-toast-store";
import { useUserStore } from "app/_stores/useUserStore";
import { useRouter } from "next/navigation";

export const useLogout = () => {
  return useMutation({
    mutationFn: postLogout,
  });
};

export const useLogoutHandler = (onClose?: () => void) => {
  const router = useRouter();
  const { clearUser } = useUserStore();
  const { showToast } = useToastStore();
  const { mutate: logout } = useLogout();

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        clearUser();
        router.push(PATHS.LOGIN);
        showToast("로그아웃 되었습니다");
        onClose?.();
      },
      onError: () => {
        showToast("로그아웃에 실패했습니다", "alert");
        onClose?.();
      },
    });
  };

  return { handleLogout };
};
