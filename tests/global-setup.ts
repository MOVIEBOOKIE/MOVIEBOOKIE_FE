import { FullConfig, chromium } from "@playwright/test";
import * as dotenv from "dotenv";
dotenv.config({ path: ".env.test" });

async function globalSetup(config: FullConfig) {
  const browser = await chromium.launch();
  const context = await browser.newContext();

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
  const page = await context.newPage();
  await page.goto("http://localhost:3000");

  await context.storageState({ path: "tests/e2e/.auth/user.json" });

  await browser.close();
}

export default globalSetup;
