import { FullConfig, chromium } from "@playwright/test";
import * as dotenv from "dotenv";
dotenv.config({ path: ".env.test" });

async function globalSetup(config: FullConfig) {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  // 인증 쿠키 설정
  // 이 브라우저는 notification api 지원하지 않으니
  // 다른 fcm테스트를 mock으로 대체 해야함

  await context.addCookies([
    {
      name: "accessToken",
      value: process.env.TEST_ACCESS_TOKEN!,
      domain: "localhost",
      path: "/",
      httpOnly: true,
      sameSite: "Lax",
    },
  ]);

  // 쿠키가 적용되도록 페이지를 한번 로드
  //그리고 인증상태를 스토리지에 저장

  const page = await context.newPage();
  await page.goto("http://localhost:3000");

  await context.storageState({ path: "tests/e2e/.auth/user.json" });

  await browser.close();
}

export default globalSetup;
