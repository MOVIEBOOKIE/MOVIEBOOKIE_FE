import { apiPost } from "../methods";

export interface SubmitFeedbackPayload {
  isSatisfied: boolean;
  feedback: string;
  comment: string;
  eventId?: number;
}

export const postFeedback = async (payload: SubmitFeedbackPayload) => {
  return await apiPost("/feedbacks", payload);
};
