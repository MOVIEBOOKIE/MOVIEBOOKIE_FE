import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { EventData } from "app/_types/event";
import type { UserProfile } from "app/_types/user-profile";

const mockPush = jest.fn();
const mockReplace = jest.fn();
const mockShowToast = jest.fn();
const mockApply = jest.fn();
const mockCancelApplication = jest.fn();
const mockCancelRecruitment = jest.fn();
const mockSelectVenue = jest.fn();

let mockCurrentUser: UserProfile | null;
let mockEventData: EventData;
let mockTicketData: { ticketId: number } | undefined;

jest.mock("next/navigation", () => ({
  useParams: () => ({ id: "12" }),
  useRouter: () => ({
    push: mockPush,
    replace: mockReplace,
  }),
  useSearchParams: () => ({
    toString: () => "",
  }),
}));

jest.mock("app/_stores/use-user-store", () => ({
  useUserStore: (selector: (state: { user: UserProfile | null }) => unknown) =>
    selector({ user: mockCurrentUser }),
}));

jest.mock("app/_stores/use-toast-store", () => {
  const useToastStore = (
    selector: (state: { showToast: typeof mockShowToast }) => unknown,
  ) => selector({ showToast: mockShowToast });

  useToastStore.getState = () => ({ showToast: mockShowToast });

  return { useToastStore };
});

jest.mock("app/_hooks/events/use-events", () => ({
  useGetEvent: () => ({
    data: mockEventData,
    isPending: false,
  }),
  usePostEventRegister: () => ({ mutate: mockApply }),
  useDeleteEvent: () => ({ mutate: mockCancelApplication }),
  useDeleteEventsRecruit: () => ({ mutate: mockCancelRecruitment }),
  usePostEventsVenue: () => ({ mutate: mockSelectVenue }),
}));

jest.mock("app/_hooks/use-anonymous-events", () => ({
  useGetAnonymousEvent: () => ({
    data: mockEventData,
    isPending: false,
  }),
}));

jest.mock("app/_hooks/ticket/use-ticket", () => ({
  useGetToTicket: () => ({ data: mockTicketData }),
}));

jest.mock("@/components", () => ({
  Button: ({
    children,
    isLoading: _isLoading,
    variant: _variant,
    ...props
  }: React.ButtonHTMLAttributes<HTMLButtonElement> & {
    isLoading?: boolean;
    variant?: string;
  }) => <button {...props}>{children}</button>,
}));

jest.mock("@/components/detail-content", () => () => (
  <div data-testid="detail-content" />
));

jest.mock("../../_components/top-bar", () => () => (
  <div data-testid="top-bar" />
));

jest.mock("@/components/modal", () => (props: any) => (
  <div role="dialog">
    <h2>{props.title}</h2>
    <div>{props.children}</div>
    {props.onConfirm && (
      <button type="button" onClick={props.onConfirm}>
        {props.confirmText}
      </button>
    )}
    {props.onCancel && (
      <button type="button" onClick={props.onCancel}>
        {props.cancelText}
      </button>
    )}
  </div>
));

jest.mock("@/components/complete", () => (props: any) => (
  <div>
    <p>{props.action} 완료</p>
    <button type="button" onClick={props.onButtonClick}>
      {props.buttonText}
    </button>
  </div>
));

jest.mock("@/utils/dev-logger", () => ({
  devError: jest.fn(),
}));

import DetailClient from "../detail-client";

const loggedInUser: UserProfile = {
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

const createEventData = (overrides: Partial<EventData> = {}): EventData => ({
  eventId: 12,
  mediaType: "MOVIE",
  mediaTitle: "라라랜드",
  eventTitle: "라라랜드 단관",
  description: "같이 영화를 봐요",
  estimatedPrice: 20000,
  eventDate: "2026-07-01",
  eventTime: "19:00",
  recruitmentDate: "2026-06-01 - 2026-06-30",
  d_day: "D-8",
  minParticipants: 10,
  maxParticipants: 30,
  currentParticipants: 12,
  recruitmentRate: 40,
  posterImageUrl: "/poster.png",
  buttonState: "신청하기",
  username: "호스트",
  recruitment: 12,
  locationName: "테스트 영화관",
  address: "서울시",
  locationImageUrl: "/location.png",
  userImageUrl: "/user.png",
  longitude: 127,
  latitude: 37,
  eventState: "모집 중",
  userRole: "참여자",
  ...overrides,
});

describe("DetailClient CTA 사용자 행동", () => {
  beforeEach(() => {
    mockPush.mockReset();
    mockReplace.mockReset();
    mockShowToast.mockReset();
    mockApply.mockReset();
    mockCancelApplication.mockReset();
    mockCancelRecruitment.mockReset();
    mockSelectVenue.mockReset();

    mockCancelRecruitment.mockImplementation(
      (_eventId: number, options: { onSettled?: () => void }) =>
        options.onSettled?.(),
    );
    mockSelectVenue.mockImplementation(
      (_params: unknown, options: { onSettled?: () => void }) =>
        options.onSettled?.(),
    );

    mockCurrentUser = loggedInUser;
    mockEventData = createEventData();
    mockTicketData = undefined;
  });

  it("비로그인 사용자가 신청하면 로그인 안내 후 로그인 페이지로 연결한다", async () => {
    mockCurrentUser = null;
    const user = userEvent.setup();

    render(<DetailClient />);
    await user.click(screen.getByRole("button", { name: "신청하기" }));

    const dialog = screen.getByRole("dialog");
    expect(
      within(dialog).getByRole("heading", {
        name: /이벤트 신청은\s*로그인 후에 가능해요/,
      }),
    ).toBeInTheDocument();

    await user.click(
      within(dialog).getByRole("button", { name: "로그인하기" }),
    );

    expect(mockReplace).toHaveBeenCalledWith(
      "/login?next=%2Fverify%2Fphone%3Fnext%3D%252Fdetail%252F12",
    );
  });

  it("전화번호 미인증 사용자는 인증 페이지로 이동한다", async () => {
    mockCurrentUser = { ...loggedInUser, phoneNumber: "" };
    const user = userEvent.setup();

    render(<DetailClient />);
    await user.click(screen.getByRole("button", { name: "신청하기" }));

    expect(mockReplace).toHaveBeenCalledWith(
      "/verify/phone?next=%2Fdetail%2F12",
    );
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("신청 확인 후 신청 API를 호출하고 성공 화면을 보여준다", async () => {
    mockApply.mockImplementation(
      (_eventId: number, options: { onSuccess: () => void }) =>
        options.onSuccess(),
    );
    const user = userEvent.setup();

    render(<DetailClient />);
    await user.click(screen.getByRole("button", { name: "신청하기" }));
    await user.click(
      within(screen.getByRole("dialog")).getByRole("button", {
        name: "신청하기",
      }),
    );

    expect(mockApply).toHaveBeenCalledWith(12, expect.any(Object));
    expect(screen.getByText("이벤트 신청 완료")).toBeInTheDocument();
  });

  it("중복 참여 오류가 발생하면 안내 토스트를 보여준다", async () => {
    mockApply.mockImplementation(
      (_eventId: number, options: { onError: (error: unknown) => void }) =>
        options.onError({
          response: { data: { code: "PARTICIPATION_404" } },
        }),
    );
    const user = userEvent.setup();

    render(<DetailClient />);
    await user.click(screen.getByRole("button", { name: "신청하기" }));
    await user.click(
      within(screen.getByRole("dialog")).getByRole("button", {
        name: "신청하기",
      }),
    );

    expect(mockShowToast).toHaveBeenCalledWith(
      "해당 날짜에 이미 참여 중인 이벤트가 있어요",
      "checkbox",
    );
  });

  it("신청 취소 확인 후 신청 취소 API를 호출한다", async () => {
    mockEventData = createEventData({ buttonState: "신청 취소" });
    const user = userEvent.setup();

    render(<DetailClient />);
    await user.click(screen.getByRole("button", { name: "신청 취소" }));
    await user.click(
      within(screen.getByRole("dialog")).getByRole("button", {
        name: "신청 취소",
      }),
    );

    expect(mockCancelApplication).toHaveBeenCalledWith(12, expect.any(Object));
  });

  it("모집 취소 확인 후 모집 취소 API를 호출한다", async () => {
    mockEventData = createEventData({
      buttonState: "모집 취소",
      userRole: "주최자",
    });
    const user = userEvent.setup();

    render(<DetailClient />);
    await user.click(screen.getByRole("button", { name: "모집 취소" }));
    await user.click(
      within(screen.getByRole("dialog")).getByRole("button", {
        name: "모집 취소",
      }),
    );

    expect(mockCancelRecruitment).toHaveBeenCalledWith(12, expect.any(Object));
  });

  it.each([
    ["대관 신청하기", 0],
    ["대관 취소하기", 1],
  ])("대관 선택에서 %s를 누르면 type=%i로 요청한다", async (label, type) => {
    mockEventData = createEventData({
      eventState: "모집 완료",
      buttonState: "대관 신청하기",
      userRole: "주최자",
    });
    const user = userEvent.setup();

    render(<DetailClient />);
    await user.click(screen.getByRole("button", { name: "대관 신청하기" }));
    await user.click(
      within(screen.getByRole("dialog")).getByRole("button", { name: label }),
    );

    expect(mockSelectVenue).toHaveBeenCalledWith(
      { eventId: 12, type },
      expect.any(Object),
    );
  });

  it("티켓이 발급된 경우 티켓 상세 페이지로 이동한다", async () => {
    mockEventData = createEventData({
      eventState: "대관 확정",
      buttonState: "티켓으로 이동",
    });
    mockTicketData = { ticketId: 99 };
    const user = userEvent.setup();

    render(<DetailClient />);
    await user.click(screen.getByRole("button", { name: "티켓으로 이동" }));

    expect(mockPush).toHaveBeenCalledWith("/ticket/99");
  });

  it("동작할 수 없는 CTA는 비활성화한다", () => {
    mockEventData = createEventData({
      eventState: "모집 완료",
      buttonState: "신청 마감",
    });

    render(<DetailClient />);

    expect(screen.getByRole("button", { name: "신청 마감" })).toBeDisabled();
  });
});
