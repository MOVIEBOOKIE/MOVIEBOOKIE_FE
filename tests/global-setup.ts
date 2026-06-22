import type { FullConfig } from "@playwright/test";
import * as dotenv from "dotenv";
import fs from "fs";
import path from "path";

dotenv.config({ path: ".env.test" });

async function globalSetup(_config: FullConfig) {
  const accessToken = process.env.TEST_ACCESS_TOKEN;
  const storageStatePath = path.resolve("tests/e2e/.auth/user.json");
  fs.mkdirSync(path.dirname(storageStatePath), { recursive: true });

  fs.writeFileSync(
    storageStatePath,
    JSON.stringify({
      cookies: accessToken
        ? [
            {
              name: "accessToken",
              value: accessToken,
              domain: "localhost",
              path: "/",
              expires: -1,
              httpOnly: true,
              secure: false,
              sameSite: "Lax",
            },
          ]
        : [],
      origins: [],
    }),
  );
}

export default globalSetup;
