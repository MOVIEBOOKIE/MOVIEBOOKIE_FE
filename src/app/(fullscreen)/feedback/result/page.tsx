import { Suspense } from "react";
import FeedbackPage from "./components/feedbackpage";

export default function FeedbackResultPage() {
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <FeedbackPage />
    </Suspense>
  );
}
