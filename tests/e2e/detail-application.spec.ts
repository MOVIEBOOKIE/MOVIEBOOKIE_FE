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

function getScenario(id: DetailScenario["id"]) {
  const scenario = DETAIL_SCENARIOS.find((item) => item.id === id);

  if (!scenario) {
    throw new Error(`상세 시나리오를 찾을 수 없습니다: ${id}`);
  }

  return scenario;
}

async function setLoggedInUser(
  page: Page,
  user: typeof loggedInUser = loggedInUser,
) {
  await page.addInitScript((storedUser) => {
    localStorage.setItem(
      "userProfile",
      JSON.stringify({ state: { user: storedUser }, version: 0 }),
    );
  }, user);
}

function successResponse(message: string) {
  return {
    httpStatus: "OK",
    code: "SUCCESS",
    message,
    result: null,
  };
}

async function expectScenarioPage(
  page: Page,
  scenarioId: DetailScenario["id"],
) {
  const scenario = getScenario(scenarioId);
  const cta = page.getByTestId("detail-bottom-cta");

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

  await expect(cta).toHaveText(scenario.api.buttonState ?? "");
  if (scenario.expected.ctaDisabled) {
    await expect(cta).toBeDisabled();
  } else {
    await expect(cta).toBeEnabled();
  }
}

async function confirmModal(page: Page, title: string, buttonName: string) {
  const modal = page.getByRole("heading", { name: title }).locator("..");
  await expect(modal).toBeVisible();
  await modal.getByRole("button", { name: buttonName }).click();
}

async function expectTicketNavigation(page: Page) {
  const ticketNavigation = page.waitForRequest((request) => {
    const pathname = new URL(request.url()).pathname;
    return (
      pathname === `/ticket/${ticketId}` || pathname === `/ticket/${ticketId}/`
    );
  });

  await page.getByTestId("detail-bottom-cta").click();
  await ticketNavigation;
}

async function mockDetailJourney(
  page: Page,
  initialScenarioId: DetailScenario["id"],
) {
  let currentScenario = getScenario(initialScenarioId);

  const detailResponse = () => ({
    ...eventResponse,
    result: {
      ...eventResponse.result,
      eventState: currentScenario.api.eventState,
      buttonState: currentScenario.api.buttonState,
      userRole: currentScenario.api.userRole,
    },
  });

  await page.route(
    new RegExp(`/api/events/anonymous/${eventId}/?$`),
    async (route) => {
      await route.fulfill({ json: detailResponse() });
    },
  );

  await page.route(new RegExp(`/api/events/${eventId}/?$`), async (route) => {
    await route.fulfill({ json: detailResponse() });
  });

  await page.route(
    new RegExp(`/api/events/${eventId}/register/?$`),
    async (route) => {
      const method = route.request().method();

      if (method === "POST") {
        currentScenario = getScenario("0-C-PARTICIPANT");
      } else if (method === "DELETE") {
        currentScenario = getScenario("0-A-PARTICIPANT");
      }

      await route.fulfill({
        json: successResponse(
          method === "POST" ? "신청 완료" : "신청 취소 완료",
        ),
      });
    },
  );

  await page.route(
    new RegExp(`/api/events/${eventId}/recruit/?$`),
    async (route) => {
      currentScenario = getScenario("0-B-COMMON");
      await route.fulfill({
        json: successResponse("모집 취소 완료"),
      });
    },
  );

  await page.route(
    new RegExp(`/api/events/${eventId}/venue(?:\\?.*)?$`),
    async (route) => {
      const type = new URL(route.request().url()).searchParams.get("type");
      currentScenario = getScenario(type === "0" ? "2-A-HOST" : "2-B-HOST");
      await route.fulfill({
        json: successResponse("대관 선택 완료"),
      });
    },
  );

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

  return {
    async show(scenarioId: DetailScenario["id"]) {
      currentScenario = getScenario(scenarioId);
      await page.goto(`/detail/${eventId}`);
      await expectScenarioPage(page, scenarioId);
    },
  };
}

test.describe("사진 기반 상세 페이지 상태 전이 여정", () => {
  test.beforeEach(async ({ page }) => {
    await setLoggedInUser(page);
  });

  test("참여자 신청 → 신청 완료 → 신청 취소", async ({ page }) => {
    const journey = await mockDetailJourney(page, "0-A-PARTICIPANT");
    await journey.show("0-A-PARTICIPANT");

    await page.getByTestId("detail-bottom-cta").click();
    await confirmModal(page, "이벤트를 신청할까요?", "신청하기");
    await expect(page.getByText("이벤트 신청이 완료됐어요!")).toBeVisible();

    await journey.show("0-C-PARTICIPANT");
    await page.getByTestId("detail-bottom-cta").click();
    await confirmModal(page, "이벤트 신청을 취소할까요?", "신청 취소");
    await expect(page.getByText("이벤트 신청이 취소됐어요")).toBeVisible();
    await expectScenarioPage(page, "0-A-PARTICIPANT");
  });

  test("주최자 모집 취소 → 공통 모집 취소 상태", async ({ page }) => {
    const journey = await mockDetailJourney(page, "0-A-HOST");
    await journey.show("0-A-HOST");

    await page.getByTestId("detail-bottom-cta").click();
    await confirmModal(page, "정말 이벤트 모집을 취소할까요?", "모집 취소");
    await expect(page.getByText("이벤트 모집이 취소됐어요")).toBeVisible();
    await expectScenarioPage(page, "0-B-COMMON");
  });

  test("참여자 모집 성공 → 대관 진행 → 대관 확정 → 상영 완료", async ({
    page,
  }) => {
    const journey = await mockDetailJourney(page, "0-C-PARTICIPANT");
    await journey.show("0-C-PARTICIPANT");
    await journey.show("1-B-PARTICIPANT");
    await journey.show("2-A-PARTICIPANT");
    await journey.show("3-A-PARTICIPANT");
    await expectTicketNavigation(page);
    await journey.show("4-A-COMMON");
  });

  test("주최자 모집 성공 → 대관 신청 → 대관 확정 → 상영 완료", async ({
    page,
  }) => {
    const journey = await mockDetailJourney(page, "0-A-HOST");
    await journey.show("0-A-HOST");
    await journey.show("0-C-HOST");
    await journey.show("1-B-HOST");

    await page.getByTestId("detail-bottom-cta").click();
    await confirmModal(page, "대관 신청 여부를 선택해주세요", "대관 신청하기");
    await expect(page.getByText("영화관 대관 신청이 완료됐어요")).toBeVisible();
    await expectScenarioPage(page, "2-A-HOST");

    await journey.show("3-A-HOST");
    await expectTicketNavigation(page);
    await journey.show("4-A-COMMON");
  });

  test("모집 인원 미달 → 참여자와 주최자 모집 취소 상태", async ({ page }) => {
    const journey = await mockDetailJourney(page, "0-C-PARTICIPANT");
    await journey.show("0-C-PARTICIPANT");
    await journey.show("1-A-PARTICIPANT");
    await journey.show("0-C-HOST");
    await journey.show("1-A-HOST");
  });

  test("주최자 대관 거절 → 참여자와 주최자 대관 취소 상태", async ({
    page,
  }) => {
    const journey = await mockDetailJourney(page, "1-B-HOST");
    await journey.show("1-B-HOST");

    await page.getByTestId("detail-bottom-cta").click();
    await confirmModal(page, "대관 신청 여부를 선택해주세요", "대관 취소하기");
    await expectScenarioPage(page, "2-B-HOST");
    await journey.show("1-B-PARTICIPANT");
    await journey.show("2-B-PARTICIPANT");
  });

  test("영화사 대관 불가 → 공통 대관 취소 상태", async ({ page }) => {
    const journey = await mockDetailJourney(page, "2-A-HOST");
    await journey.show("2-A-HOST");
    await journey.show("3-B-COMMON");
  });

  test("대관 확정 후 상영 취소 → 공통 상영 취소 상태", async ({ page }) => {
    const journey = await mockDetailJourney(page, "3-A-PARTICIPANT");
    await journey.show("3-A-PARTICIPANT");
    await journey.show("4-B-COMMON");
  });
});

test.describe("상세 페이지 인증·오류 예외 흐름", () => {
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

  test("전화번호 미인증 사용자는 신청 시 인증 페이지로 이동한다", async ({
    page,
  }) => {
    const unverifiedUser = { ...loggedInUser, phoneNumber: "" };
    await setLoggedInUser(page, unverifiedUser);
    await mockDetailApis(page, unverifiedUser, getScenario("0-A-PARTICIPANT"));

    await page.goto(`/detail/${eventId}`);
    await page.getByTestId("detail-bottom-cta").click();

    await expect(page).toHaveURL((url) => {
      return (
        ["/verify/phone", "/verify/phone/"].includes(url.pathname) &&
        url.searchParams.get("next") === `/detail/${eventId}`
      );
    });
  });

  test("신청 API가 중복 참여 오류를 반환하면 안내 토스트를 보여준다", async ({
    page,
  }) => {
    await setLoggedInUser(page);
    await mockDetailApis(page, loggedInUser, getScenario("0-A-PARTICIPANT"));

    await page.route(
      new RegExp(`/api/events/${eventId}/register/?$`),
      async (route) => {
        await route.fulfill({
          status: 409,
          json: {
            httpStatus: "CONFLICT",
            code: "PARTICIPATION_404",
            message: "중복 참여",
            result: null,
          },
        });
      },
    );

    await page.goto(`/detail/${eventId}`);
    await page.getByTestId("detail-bottom-cta").click();
    await confirmModal(page, "이벤트를 신청할까요?", "신청하기");

    await expect(
      page.getByText("해당 날짜에 이미 참여 중인 이벤트가 있어요"),
    ).toBeVisible();
    await expect(page.getByText("이벤트 신청이 완료됐어요!")).not.toBeVisible();
  });
});
