"use client";

import { CheckboxIcon, AlertIcon } from "@/icons/index";
import FixedLayout from "./fixed-layout";
import { motion, AnimatePresence } from "framer-motion";
import { textUp } from "@/utils/text-motion";

interface CompleteProps {
  status: "success" | "fail" | string;
  action: string;
  buttonText: string;
  onButtonClick(): void;
}

export default function Complete({
  status,
  action,
  buttonText,
  onButtonClick,
}: CompleteProps) {
  const isSuccess = status === "success";

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.05 },
    },
    exit: { opacity: 0, transition: { duration: 0.2 } },
  };

  const iconVar = {
    hidden: { opacity: 0, scale: 0.85, y: 8 },
    show: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: "spring", stiffness: 420, damping: 24 },
    },
  };

  return (
    <FixedLayout
      isHeader={false}
      buttonText={buttonText}
      onButtonClick={onButtonClick}
      state="full"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={`${status}-${action}`}
          variants={container}
          initial="hidden"
          animate="show"
          exit="exit"
          className="flex h-[calc(100vh-126px)] flex-col items-center justify-center gap-3"
          data-testid="complete-container"
        >
          <motion.div variants={iconVar} className="mb-2">
            {isSuccess ? (
              <CheckboxIcon width={45} height={45} />
            ) : (
              <AlertIcon width={45} height={45} />
            )}
          </motion.div>

          <motion.p
            variants={textUp}
            className="title-1-bold text-gray-white"
            data-testid="complete-message"
          >
            {action}이 {isSuccess ? "완료됐어요!" : "실패했어요"}
          </motion.p>

          <motion.p
            variants={textUp}
            className="body-3-regular text-center text-gray-500"
            data-testid="complete-description"
          >
            {isSuccess ? (
              <>
                모집 기간 내 인원 미달성시,
                <br />
                이벤트 진행이 취소될 수 있어요
              </>
            ) : (
              <>
                해당 이벤트가 진행될 영화관이 <br />
                이미 예약되었어요
              </>
            )}
          </motion.p>
        </motion.div>
      </AnimatePresence>
    </FixedLayout>
  );
}
