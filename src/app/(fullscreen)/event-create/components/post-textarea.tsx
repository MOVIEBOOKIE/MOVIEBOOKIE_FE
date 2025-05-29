"use client";

import { useFormContext } from "react-hook-form";

export default function PostTextArea() {
  const { register } = useFormContext();

  return (
    <>
      <label className="body-3-medium mb-3 block text-gray-300">
        모집글 작성
      </label>
      <div className="mb-9 h-80 space-y-4 rounded-2xl border border-gray-900 p-5 text-white">
        <input
          {...register("eventTitle")}
          type="text"
          placeholder="모집글의 제목을 입력해 주세요"
          className="body-2-medium w-full border-b border-gray-950 bg-transparent pb-3 text-gray-300 placeholder-gray-700 outline-none"
        />

        <textarea
          {...register("description")}
          rows={4}
          placeholder={`모집 게시물에 올릴 홍보글을 작성해주세요`}
          className="body-3-regular w-full resize-none bg-transparent text-gray-300 placeholder-gray-700 outline-none"
        />
      </div>
    </>
  );
}
