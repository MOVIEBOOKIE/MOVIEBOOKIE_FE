"use client";

import { useEffect, useRef, useState } from "react";

type LogEntry = {
  type: "log" | "error";
  message: string;
};

export default function DebugLogger() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [visible, setVisible] = useState(false);
  const logEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const originalConsole = {
      log: console.log,
      error: console.error,
      warn: console.warn,
      info: console.info,
    };

    const capture = (type: LogEntry["type"], args: any[]) => {
      const message = args
        .map((arg) =>
          typeof arg === "object" ? JSON.stringify(arg) : String(arg),
        )
        .join(" ");
      setLogs((prev) => [...prev.slice(-50), { type, message }]);
      originalConsole[type](...args);
    };

    console.log = (...args) => capture("log", args);
    console.error = (...args) => capture("error", args);

    return () => {
      console.log = originalConsole.log;
      console.error = originalConsole.error;
      console.warn = originalConsole.warn;
      console.info = originalConsole.info;
    };
  }, []);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  return (
    <>
      <button
        onClick={() => setVisible((prev) => !prev)}
        className="fixed top-4 right-4 z-[10000] rounded bg-black px-3 py-2 text-sm text-white shadow-lg hover:bg-gray-800"
      >
        {visible ? "로그 숨기기" : "로그 보기"}
      </button>

      {visible && (
        <div
          id="debug-log"
          className="fixed bottom-18 left-0 z-[9999] max-h-[150px] w-full overflow-y-auto bg-black/80 p-2 font-mono text-xs whitespace-pre-wrap text-green-300"
        >
          {logs.map((log, idx) => (
            <div
              key={idx}
              className={
                log.type === "error" ? "text-red-400" : "text-green-300"
              }
            >
              [{log.type.toUpperCase()}] {log.message}
            </div>
          ))}
          <div ref={logEndRef} />
        </div>
      )}
    </>
  );
}
