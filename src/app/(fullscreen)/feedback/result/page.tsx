import { Suspense } from "react";
import FeedbackPage from "./components/feedbackpage";
import Loading from "app/loading";

export default function FeedbackResultPage() {
  return (
    <Suspense fallback={<Loading />}>
      <FeedbackPage />
    </Suspense>
  );
}
