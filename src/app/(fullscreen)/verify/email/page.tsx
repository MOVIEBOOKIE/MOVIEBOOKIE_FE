"use client";

import { useState } from "react";
import { ArrowDownIcon } from "@/icons/index";
import { useRouter } from "next/navigation";
import FixedLayout from "@/components/fixedlayout";
import { StepHeader } from "@/components";

const EMAIL_DOMAINS = ["naver.com", "gmail.com"];

export default function EmailStep() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [emailDomain, setEmailDomain] = useState("naver.com");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const isValidEmail = /^[a-zA-Z0-9._%+-]+$/.test(email);
  const fullEmail = `${email}@${emailDomain}`;
  const otherDomain = EMAIL_DOMAINS.find((d) => d !== emailDomain)!;

  return (
    <FixedLayout
      title="회원가입"
      isButtonDisabled={!isValidEmail}
      onButtonClick={() => {
        router.push(`/verify/verify-number?type=email&target=${fullEmail}`);
      }}
    >
      <StepHeader
        StepHeader="2/3"
        title={
          <>
            자주 사용하는 이메일을 <br />
            입력해 주세요
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
            >
              @ {emailDomain}
              <ArrowDownIcon className="h-1.7 text-gray-400" />
            </button>

            {dropdownOpen && (
              <ul className="absolute z-10 mt-1.5 w-full rounded-md bg-gray-900">
                <li>
                  <button
                    type="button"
                    onClick={() => {
                      setEmailDomain(otherDomain);
                      setDropdownOpen(false);
                    }}
                    className="w-full px-4 py-2 text-left text-gray-400"
                  >
                    @ {otherDomain}
                  </button>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </FixedLayout>
  );
}
