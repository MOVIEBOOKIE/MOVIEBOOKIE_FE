"use client";

export default function DebugLogger() {
  return (
    <div
      id="debug-log"
      className="fixed bottom-25 left-0 z-[9999] max-h-[200px] w-full overflow-y-auto bg-black/80 p-2 font-mono text-xs whitespace-pre-wrap text-green-300"
    >
      📋 디버그 로그...
    </div>
  );
}
