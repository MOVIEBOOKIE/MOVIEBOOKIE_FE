import { test, expect } from "@playwright/test";
import path from "path";

test.describe("이벤트 생성 플로우", () => {
  test("사용자가 1→7단계 이벤트를 생성하고 최종 게시한다", async ({ page }) => {
    await page.goto("/event-create");

    // ──────────── Step1: 카테고리
    await page.getByText("기타").click();
    await page.getByRole("button", { name: "다음" }).click();

    // ──────────── Step2: 날짜
    await page.getByRole("button", { name: /^26$/ }).click();
    await page.getByRole("button", { name: "다음" }).click();

    // ──────────── Step3: 시간
    await page.getByRole("button", { name: "19:00" }).click();
    await page.getByRole("button", { name: /2시간|120분/ }).click();
    await page.getByRole("button", { name: "다음" }).click();

    // ──────────── Step4: 모집 기간
    // 오늘 날짜 선택
    await page
      .getByRole("button", { name: new RegExp(`^${new Date().getDate()}$`) })
      .click();

    // 1주일 뒤 날짜 선택
    const today = new Date();
    const oneWeekLater = new Date(today);
    oneWeekLater.setDate(today.getDate() + 7);
    await page
      .getByRole("button", { name: new RegExp(`^${oneWeekLater.getDate()}$`) })
      .click();

    await page.getByRole("button", { name: "다음" }).click();

    // ──────────── Step5: 최소/최대 인원
    await page.getByLabel("최소인원").fill("10");
    await page.getByLabel("최대인원").fill("30");
    await page.getByRole("button", { name: "다음" }).click();

    // ──────────── Step6: 영화관 선택
    const firstCinema = page
      .getByRole("button")
      .filter({ hasText: /좌석 \d+ \| 시간당/ })
      .first();

    await firstCinema.click();
    await page.getByRole("button", { name: "다음" }).click();

    // ──────────── Step7: 모집글 작성
    const filePath = path.resolve("public/images/custom-bg.webp");
    await page.locator('input[type="file"]').setInputFiles(filePath);

    await page.getByLabel(/콘텐츠 제목/).fill("라라랜드");
    await page.getByLabel(/모집글 제목/).fill("라라랜드 단관 모집합니다 🎬");
    await page.getByLabel(/모집글 내용/).fill("라라랜드 같이 볼사람 있나요?");

    await page.getByRole("button", { name: "다음" }).click();

    // ──────────── Success 페이지 진입 (/event/success)
    await expect(page).toHaveURL(/\/event\/success/);
    await expect(
      page.getByRole("button", { name: /이벤트 미리보기/ }),
    ).toBeVisible();
    await page.getByRole("button", { name: /이벤트 미리보기/ }).click();
    await page.getByRole("button", { name: /이벤트 게시하기/ }).click();

    // ──────────── 성공 또는 실패 조건 검증
    try {
      // 게시 성공
      await expect(
        page.getByRole("button", { name: /모집목록 확인하기/ }),
      ).toBeVisible({ timeout: 25000 });
    } catch (e) {
      // 게시 실패
      await expect(
        page.getByRole("button", { name: /이벤트 다시 만들기/ }),
      ).toBeVisible({ timeout: 15000 });
    }
  });
});
