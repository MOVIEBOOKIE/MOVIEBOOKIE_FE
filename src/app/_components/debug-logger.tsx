"use client";

import { useEffect, useRef, useState } from "react";

export default function DebugLogger() {
  const [logs, setLogs] = useState<string[]>([]);
  const logEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const originalLog = console.log;

    console.log = (...args: any[]) => {
      const message = args
        .map((arg) =>
          typeof arg === "object" ? JSON.stringify(arg) : String(arg),
        )
        .join(" ");
      setLogs((prev) => [...prev.slice(-50), message]); // 최근 50개 유지
      originalLog(...args);
    };

    return () => {
      console.log = originalLog;
    };
  }, []);

  // 새 로그가 추가되면 맨 아래로 스크롤
  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  return (
    <div
      id="debug-log"
      className="fixed bottom-20 left-0 z-[9999] max-h-[200px] w-full overflow-y-auto bg-black/80 p-2 font-mono text-xs whitespace-pre-wrap text-green-300"
    >
      {logs.map((log, idx) => (
        <div key={idx}>{log}</div>
      ))}
      <div ref={logEndRef} />
    </div>
  );
}
