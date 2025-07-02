"use client";

import { useEffect, useRef, useState } from "react";

export default function DebugLogger() {
  const [logs, setLogs] = useState<string[]>([]);
  const [visible, setVisible] = useState(false);
  const logEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const originalLog = console.log;

    console.log = (...args: any[]) => {
      const message = args
        .map((arg) =>
          typeof arg === "object" ? JSON.stringify(arg) : String(arg),
        )
        .join(" ");
      setLogs((prev) => [...prev.slice(-50), message]);
      originalLog(...args);
    };

    return () => {
      console.log = originalLog;
    };
  }, []);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  return (
    <>
      <button
        onClick={() => setVisible((prev) => !prev)}
        className="fixed top-4 left-4 z-[10000] rounded bg-black px-3 py-2 text-sm text-white shadow-lg hover:bg-gray-800"
      >
        {visible ? " 로그 숨기기" : "로그 버튼"}
      </button>
      {visible && (
        <div
          id="debug-log"
          className="fixed bottom-12 left-0 z-[9999] max-h-[200px] w-full overflow-y-auto bg-black/80 p-2 font-mono text-xs whitespace-pre-wrap text-green-300"
        >
          {logs.map((log, idx) => (
            <div key={idx}>{log}</div>
          ))}
          <div ref={logEndRef} />
        </div>
      )}
    </>
  );
}
