import { defineConfig, devices } from "@playwright/test";

const browserChannel =
  process.env.PLAYWRIGHT_BROWSER_CHANNEL === "chrome" ? "chrome" : undefined;
const rawE2ePort = process.env.PLAYWRIGHT_PORT ?? "3000";
const e2ePort = Number(rawE2ePort);

if (!Number.isInteger(e2ePort) || e2ePort < 1 || e2ePort > 65_535) {
  throw new Error(`Invalid PLAYWRIGHT_PORT: ${rawE2ePort}`);
}

const baseURL = `http://localhost:${e2ePort}`;

export default defineConfig({
  testDir: "tests/e2e",
  timeout: 60_000,
  expect: { timeout: 10_000 },
  reporter: [["html", { open: "never" }]],

  use: {
    baseURL,
    browserName: "chromium",
    viewport: { width: 390, height: 844 }, // 모바일 화면 사이즈
    trace: "retain-on-failure",
    video: browserChannel ? "off" : "retain-on-failure",
    screenshot: "only-on-failure",
    storageState: "tests/e2e/.auth/user.json",
  },

  webServer: {
    command: `pnpm build && pnpm start -p ${e2ePort}`,
    url: baseURL,
    timeout: 120_000,
    reuseExistingServer: !process.env.CI,
  },
  globalSetup: require.resolve("./tests/global-setup"),
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 390, height: 844 },
        channel: browserChannel,
        storageState: "tests/e2e/.auth/user.json",
      },
    },
  ],
});
