import { FullConfig, chromium } from "@playwright/test";

//TODO: npx playwright codegen http://localhost:3000 --save-storage=tests/e2e/.auth/user.json

async function globalSetup(config: FullConfig) {
  const browser = await chromium.launch();
  const context = await browser.newContext();

  await context.addCookies([
    {
      name: "accessToken",
      value:
        "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhaHIwMjA1MzJAZ21haWwuY29tIiwiY2F0ZWdvcnkiOiJhY2Nlc3MiLCJpYXQiOjE3NTc0MTczOTcsImV4cCI6MTc1ODAyMjE5N30.S5MPocMNhTPJr_qwCvvvmQp_Ut8NMgW3JkMljFho1C61_8yFmH72a_WSt6576HMftLDgbTatNG3OQJFcyF7WHw",
      domain: "localhost",
      path: "/",
      httpOnly: true,
      sameSite: "Lax",
    },
  ]);

  // 쿠키가 적용되도록 페이지를 한번 로드
  const page = await context.newPage();
  await page.goto("http://localhost:3000");

  await context.storageState({ path: "tests/e2e/.auth/user.json" });

  await browser.close();
}

export default globalSetup;
