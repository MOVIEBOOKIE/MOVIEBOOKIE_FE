import { DETAIL_SCENARIOS } from "../__fixtures__/detail-scenarios";

describe("상세 페이지 18개 상태 시나리오 정의", () => {
  it("11개 기획 단계를 역할별 18개 시안으로 정의한다", () => {
    expect(DETAIL_SCENARIOS).toHaveLength(18);
    expect(new Set(DETAIL_SCENARIOS.map(({ stage }) => stage)).size).toBe(11);
  });

  it("각 시안은 중복되지 않는 ID를 갖는다", () => {
    const scenarioIds = DETAIL_SCENARIOS.map(({ id }) => id);

    expect(new Set(scenarioIds).size).toBe(scenarioIds.length);
  });

  it("모든 시안에 기대 상태 태그와 허용 행동이 정의되어 있다", () => {
    DETAIL_SCENARIOS.forEach((scenario) => {
      expect(scenario.statusTag).toBeTruthy();
      expect(scenario.action).toBeTruthy();
    });
  });

  it("모든 시안은 API 상태와 CTA 활성화 기대값을 갖는다", () => {
    DETAIL_SCENARIOS.forEach(({ api, expected }) => {
      expect(api.eventState).toBeTruthy();
      expect(typeof expected.ctaDisabled).toBe("boolean");
    });
  });

  it("모든 시안의 하단 CTA에는 표시할 문구가 있다", () => {
    DETAIL_SCENARIOS.forEach(({ api }) => {
      expect(api.buttonState?.trim()).toBeTruthy();
    });
  });

  it("확인이 필요한 API 버튼 상태를 명시적으로 표시한다", () => {
    DETAIL_SCENARIOS.forEach(({ api }) => {
      if (api.buttonState === null) {
        expect(api.needsConfirmation).toBe(true);
      }
    });
  });
});
