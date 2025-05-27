import { useMutation } from "@tanstack/react-query";
import {
  postFeedback,
  SubmitFeedbackPayload,
} from "app/_apis/auth/submit-feedback";

export const useSubmitFeedback = () => {
  return useMutation({
    mutationFn: (payload: SubmitFeedbackPayload) => postFeedback(payload),
  });
};
