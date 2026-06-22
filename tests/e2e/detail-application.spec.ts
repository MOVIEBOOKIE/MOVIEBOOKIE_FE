import { expect, test, type Page } from "@playwright/test";
import {
  DETAIL_SCENARIOS,
  type DetailScenario,
} from "../../src/app/(fullscreen)/detail/[id]/__fixtures__/detail-scenarios";

const eventId = 12;
const ticketId = 99;

const eventResponse = {
  httpStatus: "OK",
  code: "SUCCESS",
  message: "성공",
  result: {
    eventId,
    mediaType: "영화",
    mediaTitle: "라라랜드",
    eventTitle: "라라랜드 단관",
    description: "같이 영화를 봐요",
    estimatedPrice: 20000,
    eventDate: "2026. 07. 01",
    eventTime: "19시 00분",
    recruitmentDate: "2026. 06. 01 - 2026. 06. 30",
    d_day: "D-8",
    minParticipants: 10,
    maxParticipants: 30,
    currentParticipants: 12,
    recruitmentRate: 40,
    posterImageUrl: "/images/thumbnail.png",
    buttonState: "신청하기",
    username: "테스트 호스트",
    recruitment: 3,
    locationName: "테스트 영화관",
    address: "서울시 강남구",
    locationImageUrl: "/images/thumbnail.png",
    userImageUrl: "",
    longitude: 127.060337,
    latitude: 37.511483,
    eventState: "모집 중",
    userRole: "참여자",
  },
};

const loggedInUser = {
  email: "user@example.com",
  certificationEmail: "user@example.com",
  nickname: "무비부키",
  profileImage: "",
  userTypeTitle: "영화덕후",
  hostExperienceCount: 1,
  participationExperienceCount: 2,
  ticketCount: 1,
  phoneNumber: "01012345678",
};

async function mockDetailApis(
  page: Page,
  user: typeof loggedInUser | null = null,
  scenario?: DetailScenario,
) {
  const scenarioResult = scenario
    ? {
        ...eventResponse.result,
        eventState: scenario.api.eventState,
        buttonState: scenario.api.buttonState,
        userRole: scenario.api.userRole,
      }
    : eventResponse.result;
  const response = { ...eventResponse, result: scenarioResult };

  await page.route(
    new RegExp(`/api/events/anonymous/${eventId}/?$`),
    async (route) => {
      await route.fulfill({ json: response });
    },
  );

  await page.route(new RegExp(`/api/events/${eventId}/?$`), async (route) => {
    await route.fulfill({ json: response });
  });

  await page.route("**/api/auth/user**", async (route) => {
    await route.fulfill({
      json: {
        httpStatus: "OK",
        code: "SUCCESS",
        message: "성공",
        result: user,
      },
    });
  });

  await page.route("**/api/naver-map?**", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "image/png",
      body: Buffer.from(
        "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=",
        "base64",
      ),
    });
  });

  await page.route(
    new RegExp(`/api/tickets/${eventId}/to-ticket/?$`),
    async (route) => {
      await route.fulfill({
        json: {
          httpStatus: "OK",
          code: "SUCCESS",
          message: "성공",
          result: { ticketId },
        },
      });
    },
  );
}

const statusMessageByEventState = {
  "모집 완료": "모집이 완료된 이벤트입니다.",
  "모집 취소": "모집이 취소된 이벤트입니다.",
  "대관 확정": "대관이 확정된 이벤트입니다.",
  "대관 취소": "대관이 취소된 이벤트입니다.",
  "상영 완료": "상영이 완료된 이벤트입니다.",
  "상영 취소": "상영이 취소된 이벤트입니다.",
} as const;

async function expectScenarioAction(page: Page, scenario: DetailScenario) {
  const cta = page.getByTestId("detail-bottom-cta");

  if (scenario.action === "NONE") {
    await expect(cta).toBeDisabled();
    return;
  }

  await expect(cta).toBeEnabled();

  if (scenario.action === "MOVE_TO_TICKET") {
    const ticketNavigation = page.waitForRequest((request) => {
      const pathname = new URL(request.url()).pathname;
      return (
        pathname === `/ticket/${ticketId}` ||
        pathname === `/ticket/${ticketId}/`
      );
    });

    await cta.click();
    await ticketNavigation;
    return;
  }

  await cta.click();

  switch (scenario.action) {
    case "APPLY_EVENT":
      await expect(
        page.getByRole("heading", { name: "이벤트를 신청할까요?" }),
      ).toBeVisible();
      break;
    case "CANCEL_APPLICATION":
      await expect(
        page.getByRole("heading", { name: "이벤트 신청을 취소할까요?" }),
      ).toBeVisible();
      break;
    case "CANCEL_RECRUITMENT":
      await expect(
        page.getByRole("heading", {
          name: "정말 이벤트 모집을 취소할까요?",
        }),
      ).toBeVisible();
      break;
    case "SELECT_VENUE":
      await expect(
        page.getByRole("heading", {
          name: "대관 신청 여부를 선택해주세요",
        }),
      ).toBeVisible();
      break;
  }
}

test.describe("상세 페이지 18개 상태", () => {
  for (const scenario of DETAIL_SCENARIOS) {
    test(`${scenario.id} · ${scenario.perspective}`, async ({ page }) => {
      await page.addInitScript((user) => {
        localStorage.setItem(
          "userProfile",
          JSON.stringify({ state: { user }, version: 0 }),
        );
      }, loggedInUser);
      await mockDetailApis(page, loggedInUser, scenario);

      await page.goto(`/detail/${eventId}`);

      await expect(
        page.getByText(eventResponse.result.mediaTitle, { exact: true }),
      ).toBeVisible();

      if (scenario.api.eventState === "모집 중") {
        await expect(page.getByText("모집 달성률")).toBeVisible();
        await expect(
          page.getByText(`${eventResponse.result.recruitmentRate}%`),
        ).toBeVisible();
      } else {
        await expect(
          page.getByText(statusMessageByEventState[scenario.api.eventState]),
        ).toBeVisible();
      }

      const cta = page.getByTestId("detail-bottom-cta");
      await expect(cta).toHaveText(scenario.api.buttonState ?? "");

      if (scenario.expected.ctaDisabled) {
        await expect(cta).toBeDisabled();
      } else {
        await expect(cta).toBeEnabled();
      }

      await expectScenarioAction(page, scenario);
    });
  }
});

test.describe("상세 페이지 신청 플로우", () => {
  test("비로그인 사용자는 신청 시 로그인 안내를 받는다", async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.removeItem("userProfile");
    });
    await mockDetailApis(page);

    await page.goto(`/detail/${eventId}`);
    await page.getByRole("button", { name: "신청하기" }).click();

    await expect(
      page.getByRole("heading", {
        name: /이벤트 신청은\s*로그인 후에 가능해요/,
      }),
    ).toBeVisible();

    await page.getByRole("button", { name: "로그인하기" }).click();

    await expect(page).toHaveURL((url) => {
      return (
        ["/login", "/login/"].includes(url.pathname) &&
        url.searchParams.get("next") ===
          `/verify/phone?next=${encodeURIComponent(`/detail/${eventId}`)}`
      );
    });
  });

  test("로그인 사용자는 이벤트 신청을 완료한다", async ({ page }) => {
    await page.addInitScript((user) => {
      localStorage.setItem(
        "userProfile",
        JSON.stringify({ state: { user }, version: 0 }),
      );
    }, loggedInUser);
    await mockDetailApis(page, loggedInUser);

    let registerRequestCount = 0;
    await page.route(
      new RegExp(`/api/events/${eventId}/register/?$`),
      async (route) => {
        registerRequestCount += 1;
        await route.fulfill({
          json: {
            httpStatus: "OK",
            code: "SUCCESS",
            message: "신청 완료",
            result: null,
          },
        });
      },
    );

    await page.goto(`/detail/${eventId}`);
    await page.getByRole("button", { name: "신청하기" }).click();

    const applyModal = page
      .getByRole("heading", { name: "이벤트를 신청할까요?" })
      .locator("..");

    await expect(applyModal).toBeVisible();
    await applyModal.getByRole("button", { name: "신청하기" }).click();

    await expect(page.getByText("이벤트 신청이 완료됐어요!")).toBeVisible();
    await expect(
      page.getByRole("button", { name: "신청목록 확인하기" }),
    ).toBeVisible();
    expect(registerRequestCount).toBe(1);
  });
});
