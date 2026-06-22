import { DETAIL_SCENARIOS } from "../__fixtures__/detail-scenarios";
import { resolveDetailCTA } from "../_utils/resolve-detail-cta";

describe("상세 페이지 CTA 분기", () => {
  it.each(DETAIL_SCENARIOS)(
    "$id 시나리오의 CTA 상태와 행동을 반환한다",
    ({ api, action, expected }) => {
      const result = resolveDetailCTA({
        eventState: api.eventState,
        buttonState: api.buttonState,
        userRole: api.userRole,
        loggedIn: true,
        phoneVerified: true,
      });

      expect(result).toEqual({
        label: api.buttonState ?? "",
        disabled: expected.ctaDisabled,
        action,
      });
    },
  );

  it("비로그인 사용자의 활성 CTA는 로그인 안내로 연결한다", () => {
    expect(
      resolveDetailCTA({
        eventState: "모집 중",
        buttonState: "신청하기",
        userRole: "참여자",
        loggedIn: false,
        phoneVerified: false,
      }),
    ).toEqual({
      label: "신청하기",
      disabled: false,
      action: "LOGIN_REQUIRED",
    });
  });

  it("전화번호 미인증 사용자의 활성 CTA는 전화번호 인증으로 연결한다", () => {
    expect(
      resolveDetailCTA({
        eventState: "모집 중",
        buttonState: "신청하기",
        userRole: "참여자",
        loggedIn: true,
        phoneVerified: false,
      }),
    ).toEqual({
      label: "신청하기",
      disabled: false,
      action: "VERIFY_PHONE",
    });
  });

  it("로딩 중인 CTA는 중복 요청을 막기 위해 비활성화한다", () => {
    expect(
      resolveDetailCTA({
        eventState: "모집 중",
        buttonState: "신청하기",
        userRole: "참여자",
        loggedIn: true,
        phoneVerified: true,
        isLoading: true,
      }),
    ).toEqual({
      label: "신청하기",
      disabled: true,
      action: "NONE",
    });
  });

  it("정의되지 않은 API 상태는 동작시키지 않는다", () => {
    expect(
      resolveDetailCTA({
        eventState: "알 수 없는 상태",
        buttonState: "알 수 없는 버튼",
        userRole: "참여자",
        loggedIn: true,
        phoneVerified: true,
      }),
    ).toEqual({
      label: "알 수 없는 버튼",
      disabled: true,
      action: "NONE",
    });
  });
});
