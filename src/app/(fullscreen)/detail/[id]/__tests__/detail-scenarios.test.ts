import { DETAIL_SCENARIOS } from "./fixtures/detail-scenarios";

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
});
