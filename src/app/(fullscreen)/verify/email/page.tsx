"use client";

import { useState } from "react";
import { ArrowDownIcon } from "@/icons/index";
import { useRouter } from "next/navigation";
import { FixedLayout, StepHeader } from "@/components";
import { useSendEmail } from "app/_hooks/onboarding/use-send-code";
import { motion, AnimatePresence } from "framer-motion";
import {
  dropdownVariants,
  arrowVariants,
  optionVariants,
} from "../_components/motion-drop-down";
import { useToastStore } from "app/_stores/use-toast-store";

const EMAIL_DOMAINS = ["naver.com", "gmail.com"] as const;
type EmailDomain = (typeof EMAIL_DOMAINS)[number];

export default function EmailStep() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [emailDomain, setEmailDomain] = useState("naver.com");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { showToast } = useToastStore();

  const fullEmail = `${email}@${emailDomain}`;
  const isValidEmail = /^[a-zA-Z0-9._%+-]+@(naver\.com|gmail\.com)$/.test(
    fullEmail,
  );
  const { mutate: sendEmailCode } = useSendEmail();

  const handleSendCode = () => {
    if (!isValidEmail || submitting) return;
    setSubmitting(true);
    sendEmailCode(fullEmail, {
      onSuccess: () => {
        setTimeout(() => setSubmitting(false), 500);
        router.push(`/verify/verify-number?type=email&target=${fullEmail}`);
      },
      onError: () => {
        setSubmitting(false);
        showToast("이메일 발송에 실패했어요. 다시 시도해 주세요", "alert");
      },
    });
  };
  return (
    <FixedLayout
      title="회원가입"
      isButtonDisabled={!isValidEmail}
      onButtonClick={handleSendCode}
      isLoading={submitting}
    >
      <StepHeader
        StepHeader="2/3"
        title={
          <>
            자주 사용하는 이메일을 <br /> 입력해 주세요
          </>
        }
        description={
          <>
            입력하신 이메일은 대관 관련 중요한 소식 안내에 사용되며, <br />
            여러분의 소중한 정보는 안전하게 보호돼요
          </>
        }
      />
      <div className="mt-13">
        <label className="body-2-medium text-gray-400">이메일</label>
        <div className="flex gap-6 pt-4.25">
          <input
            type="text"
            placeholder="ex) moviebookie"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="off"
            className="w-43.25 border-b border-gray-700 bg-transparent pb-1.5 text-gray-100 placeholder-gray-600 focus:outline-none"
          />
          <div className="relative w-35">
            <button
              type="button"
              onClick={() => setDropdownOpen((prev) => !prev)}
              className="flex w-full items-center justify-between border-b border-gray-700 bg-transparent pr-2 pb-1.5 text-left text-gray-100"
              aria-haspopup="listbox"
              aria-expanded={dropdownOpen}
            >
              @ {emailDomain}
              <motion.div
                variants={arrowVariants}
                animate={dropdownOpen ? "open" : "closed"}
                transition={{ duration: 0.2, ease: "easeInOut" }}
              >
                <ArrowDownIcon className="h-1.7 text-gray-400" />
              </motion.div>
            </button>
            <AnimatePresence>
              {dropdownOpen && (
                <motion.ul
                  className="absolute z-10 mt-1.5 w-full overflow-hidden rounded-md bg-gray-900"
                  role="listbox"
                  tabIndex={-1}
                  variants={dropdownVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  {EMAIL_DOMAINS.map((domain, index) => {
                    const selected = domain === emailDomain;
                    return (
                      <motion.li
                        key={domain}
                        variants={optionVariants}
                        initial="hidden"
                        animate="visible"
                        custom={index}
                      >
                        <button
                          type="button"
                          role="option"
                          aria-selected={selected}
                          onClick={() => {
                            setEmailDomain(domain as EmailDomain);
                            setDropdownOpen(false);
                          }}
                          className={`flex w-full items-center justify-between px-4 py-2 text-left whitespace-nowrap transition-colors duration-150 hover:bg-gray-800 ${
                            selected
                              ? "bg-gray-800 text-white"
                              : "text-gray-400"
                          }`}
                        >
                          <span>@ {domain}</span>
                        </button>
                      </motion.li>
                    );
                  })}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </FixedLayout>
  );
}
