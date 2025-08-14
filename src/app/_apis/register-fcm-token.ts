import axios from "axios";

export const registerFCMToken = async (token: string) => {
  const res = await axios.post(
    "/api/notifications/register-token",
    { token },
    {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  return res.data;
};
