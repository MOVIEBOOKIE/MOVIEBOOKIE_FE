// 테스트에 필요한 모듈들을 임포트합니다.
// `render`: 컴포넌트를 가상 DOM에 렌더링하는 함수
// `screen`: 렌더링된 컴포넌트의 DOM에 접근하는 객체
// `userEvent`: 사용자의 행동(클릭, 입력 등)을 시뮬레이션하는 라이브러리

import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// ------------------- 모듈 모킹 (Mocking) -------------------
// Jest의 `jest.fn()`을 사용하여 가짜 함수를 만듭니다.
// 실제 함수가 호출되었는지, 어떤 인자로 호출되었는지 추적할 수 있습니다.
const mockPush = jest.fn();

// `next/navigation` 모듈을 가짜 모듈로 대체(모킹)합니다.
// 실제 페이지 이동 로직을 실행하는 대신, 위에서 만든 `mockPush` 함수를 사용하게 합니다.
jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
}));

// `next/image` 컴포넌트를 모킹합니다.
// 실제 이미지 컴포넌트 대신 간단한 `<img>` 태그를 반환하여 테스트 속도를 높입니다.
// 이미지 렌더링 자체를 테스트하는 것이 목적이 아니므로 불필요한 복잡성을 제거합니다.
jest.mock("next/image", () => (props: any) => <img {...props} />);

// 애플리케이션의 상수(constants) 파일을 모킹합니다.
// 테스트 시 경로를 하드코딩하지 않고, 모킹된 상수를 사용하여 경로의 일관성을 유지합니다.
jest.mock("@/constants", () => ({
  PATHS: {
    TRAIT_RESULT: "/trait-result",
    TICKETLIST: "/mypage/tickets",
    FEEDBACK: "/feedback",
    TOS: "/tos",
    PRIVACY_POLICY: "/privacy",
    WITHDRAWAL: "/withdrawal",
    SOCIAL_ACCOUNTS: "/social",
  },
}));

// 테스트에 사용할 가짜 사용자 데이터를 정의합니다.
// `useUserStore` 훅이 항상 이 데이터를 반환하게 하여 테스트 시나리오를 고정합니다.
const mockUser = {
  nickname: "혜련",
  userTypeTitle: "영화덕후",
  email: "hyeryeon@example.com",
  participationExperienceCount: 3,
  hostExperienceCount: 1,
  ticketCount: 5,
  profileImage: "",
};

// 사용자 정보를 가져오는 전역 스토어를 모킹합니다.
// `useUserStore`를 호출하면 위에서 정의한 `mockUser` 데이터를 반환하도록 설정합니다.
jest.mock("app/_stores/use-user-store", () => ({
  useUserStore: (selector: any) => selector({ user: mockUser }),
}));

// 로그아웃 핸들러 훅을 모킹합니다.
// 실제 로그아웃 로직 대신 `mockHandleLogout` 가짜 함수를 반환합니다.
const mockHandleLogout = jest.fn();
jest.mock("app/_hooks/auth/use-logout", () => ({
  useLogoutHandler: () => ({ handleLogout: mockHandleLogout }),
}));

// 모달 컴포넌트를 모킹합니다.
// 복잡한 모달 UI 대신 간단한 `div`와 버튼으로 대체하여 모달이 뜨는지,
// 버튼 클릭 시 이벤트가 발생하는지 쉽게 테스트합니다.
jest.mock("@/components/modal", () => (props: any) => (
  <div role="dialog">
    <h2>{props.title}</h2>
    <p>{props.children}</p>
    <button onClick={props.onConfirm}>{props.confirmText}</button>
    <button onClick={props.onCancel}>{props.cancelText}</button>
  </div>
));

// 아이콘 컴포넌트들을 모킹합니다.
// 실제 아이콘 대신 `data-testid`가 있는 `<span>` 태그를 반환하여
// 아이콘이 화면에 렌더링되었는지 쉽게 찾을 수 있도록 합니다.
jest.mock("@/icons/index", () => ({
  ArrowRightIcon: (p: any) => <span data-testid="ArrowRightIcon" {...p} />,
  DefaultProfileIcon: (p: any) => (
    <span data-testid="DefaultProfileIcon" {...p} />
  ),
  MyKakaoIcon: (p: any) => <span data-testid="MyKakaoIcon" {...p} />,
  MyPageFeedbackIcon: (p: any) => (
    <span data-testid="MyPageFeedbackIcon" {...p} />
  ),
  MyPageTicketIcon: (p: any) => <span data-testid="MyPageTicketIcon" {...p} />,
}));

// ------------------- 테스트 대상 임포트 -------------------
// 테스트하려는 MyPage 컴포넌트를 임포트합니다.
import MyPage from "../page";

// ------------------- 테스트 스위트 -------------------
// `describe`를 사용하여 'MyPage' 컴포넌트에 대한 테스트 그룹을 정의합니다.
describe("MyPage", () => {
  // 각 테스트(it)가 실행되기 전에 실행되는 함수입니다.
  // 이전에 발생한 호출 기록을 초기화하여 테스트 간 독립성을 보장합니다.
  beforeEach(() => {
    mockPush.mockClear();
    mockHandleLogout.mockClear();
  });

  // ------------------- 개별 테스트 케이스 -------------------
  // `it`을 사용하여 '사용자 정보가 올바르게 렌더링된다'는 특정 테스트 케이스를 정의합니다.
  it("사용자 정보(닉네임/타입/이메일)를 렌더링한다", () => {
    // MyPage 컴포넌트를 가상 DOM에 렌더링합니다.
    render(<MyPage />);
    // `screen.getByText`를 사용하여 "혜련"이라는 텍스트가 화면에 있는지 확인합니다.
    // `.toBeInTheDocument()`는 Jest의 매처(Matcher)로, 해당 요소가 DOM에 존재하는지 검증합니다.
    expect(screen.getByText("혜련")).toBeInTheDocument();
    expect(screen.getByText("영화덕후")).toBeInTheDocument();
    expect(screen.getByText("hyeryeon@example.com")).toBeInTheDocument();
  });

  it("상단 프로필 영역 클릭 시 성향 결과 페이지로 이동한다", async () => {
    // `userEvent.setup()`으로 사용자의 행동을 설정합니다.
    const user = userEvent.setup();
    render(<MyPage />);

    // `screen.getByText`로 텍스트를 찾고, `.closest`로 가장 가까운 버튼 요소를 찾습니다.
    const profileButton = screen.getByText("혜련").closest('[role="button"]');
    // 사용자가 이 버튼을 클릭하는 것을 시뮬레이션합니다.
    await user.click(profileButton as Element);

    // 모킹된 `mockPush` 함수가 올바른 경로와 함께 호출되었는지 검증합니다.
    // 이 검증을 통해 컴포넌트의 클릭 이벤트 핸들러가 의도대로 작동했음을 확인합니다.
    expect(mockPush).toHaveBeenCalledWith("/trait-result");
  });

  it("참여경험/주최경험/티켓 수치를 보여준다", () => {
    render(<MyPage />);
    // `getByText`로 숫자 텍스트가 화면에 존재하는지 확인합니다.
    expect(screen.getByText("3")).toBeInTheDocument(); // 참여경험
    expect(screen.getByText("1")).toBeInTheDocument(); // 주최경험
    expect(screen.getByText("5")).toBeInTheDocument(); // 티켓
  });

  it("내 티켓 버튼 클릭 시 티켓 리스트로 이동한다", async () => {
    const user = userEvent.setup();
    render(<MyPage />);

    // `getByRole`을 사용하여 '내 티켓'이라는 접근성 이름을 가진 버튼을 찾습니다.
    // 이는 사용자가 스크린 리더를 사용할 때와 유사한 방식으로 요소를 찾기 때문에 접근성 테스트에도 도움이 됩니다.
    await user.click(screen.getByRole("button", { name: "내 티켓" }));
    expect(mockPush).toHaveBeenCalledWith("/mypage/tickets");
  });

  it("평가 및 피드백 버튼 클릭 시 피드백 페이지로 이동한다", async () => {
    const user = userEvent.setup();
    render(<MyPage />);

    await user.click(screen.getByRole("button", { name: "평가 및 피드백" }));
    expect(mockPush).toHaveBeenCalledWith("/feedback");
  });

  it("하단 메뉴 클릭: 약관/개인정보/탈퇴 네비게이션이 동작한다", async () => {
    const user = userEvent.setup();
    render(<MyPage />);

    await user.click(screen.getByRole("button", { name: "서비스이용약관" }));
    expect(mockPush).toHaveBeenCalledWith("/tos");

    await user.click(screen.getByRole("button", { name: "개인정보처리방침" }));
    expect(mockPush).toHaveBeenCalledWith("/privacy");

    await user.click(screen.getByRole("button", { name: "회원탈퇴" }));
    expect(mockPush).toHaveBeenCalledWith("/withdrawal");
  });

  it("연결된 소셜 계정 클릭 시 소셜 연결 페이지로 이동한다", async () => {
    const user = userEvent.setup();
    render(<MyPage />);

    // 정규식을 사용하여 `연결된 소셜 계정`이라는 텍스트를 포함하는 버튼을 찾습니다.
    await user.click(screen.getByRole("button", { name: /연결된 소셜 계정/ }));
    expect(mockPush).toHaveBeenCalledWith("/social");
  });

  it("로그아웃 클릭 시 모달이 뜨고, 확인을 누르면 handleLogout이 호출된다", async () => {
    const user = userEvent.setup();
    render(<MyPage />);

    // 1) 하단 '로그아웃' 목록 아이템 클릭 -> 모달 열림
    const logoutListItem = screen.getByRole("button", { name: "로그아웃" });
    await user.click(logoutListItem);

    // 2) 모달 범위로 스코프를 좁혀서 제목/버튼을 찾는다
    const dialog = await screen.findByRole("dialog");

    // 제목은 heading role로 검증(텍스트 중복 피함)
    expect(
      within(dialog).getByRole("heading", { name: "로그아웃" }),
    ).toBeInTheDocument();

    // 3) 모달 안의 '로그아웃'(확인 버튼) 클릭
    const confirmBtn = within(dialog).getByRole("button", { name: "로그아웃" });
    await user.click(confirmBtn);

    // 4) handleLogout 호출 확인
    expect(mockHandleLogout).toHaveBeenCalledTimes(1);
  });
});
