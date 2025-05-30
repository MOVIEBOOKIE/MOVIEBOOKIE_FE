export const devLog = (...args: any[]) => {
  if (typeof window === "undefined") return;
  console.log(...args); // 개발자 도구에서도 볼 수 있게

  const logBox = document.getElementById("debug-log");
  if (logBox) {
    const msg = args
      .map((arg) =>
        typeof arg === "object" ? JSON.stringify(arg, null, 2) : String(arg),
      )
      .join(" ");
    const line = document.createElement("div");
    line.textContent = msg;
    logBox.appendChild(line);
    logBox.scrollTop = logBox.scrollHeight; // 자동 스크롤
  }
};
