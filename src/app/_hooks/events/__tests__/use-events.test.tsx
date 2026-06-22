import { act, renderHook } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";
import {
  DeleteEventsRecruit,
  DeleteEventsRegister,
  postEventsRegister,
  PostEventsVenue,
} from "app/_apis/events/events";
import {
  useDeleteEvent,
  useDeleteEventsRecruit,
  usePostEventRegister,
  usePostEventsVenue,
} from "../use-events";

const mockShowToast = jest.fn();

jest.mock("app/_apis/events/events", () => ({
  DeleteEventsRecruit: jest.fn(),
  DeleteEventsRegister: jest.fn(),
  postEventsRegister: jest.fn(),
  PostEventsVenue: jest.fn(),
  getEvents: jest.fn(),
  GetEventsSearch: jest.fn(),
}));

jest.mock("app/_stores/use-toast-store", () => ({
  useToastStore: () => ({
    showToast: mockShowToast,
  }),
}));

const mockDeleteEventsRecruit = jest.mocked(DeleteEventsRecruit);
const mockDeleteEventsRegister = jest.mocked(DeleteEventsRegister);
const mockPostEventsRegister = jest.mocked(postEventsRegister);
const mockPostEventsVenue = jest.mocked(PostEventsVenue);

function createTestEnvironment() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });
  const invalidateQueries = jest.spyOn(queryClient, "invalidateQueries");

  const wrapper = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  return { queryClient, invalidateQueries, wrapper };
}

describe("이벤트 mutation 훅", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("이벤트 신청 성공 시 상세 Query를 무효화한다", async () => {
    mockPostEventsRegister.mockResolvedValue(undefined);
    const { invalidateQueries, wrapper } = createTestEnvironment();
    const { result } = renderHook(() => usePostEventRegister(), { wrapper });

    await act(async () => {
      await result.current.mutateAsync(12);
    });

    expect(mockPostEventsRegister).toHaveBeenCalledWith(12);
    expect(invalidateQueries).toHaveBeenCalledWith({ queryKey: ["event"] });
  });

  it("이벤트 신청 실패 시 상세 Query를 무효화하지 않는다", async () => {
    mockPostEventsRegister.mockRejectedValue(new Error("신청 실패"));
    const { invalidateQueries, wrapper } = createTestEnvironment();
    const { result } = renderHook(() => usePostEventRegister(), { wrapper });

    await expect(
      act(async () => {
        await result.current.mutateAsync(12);
      }),
    ).rejects.toThrow("신청 실패");

    expect(invalidateQueries).not.toHaveBeenCalled();
  });

  it("신청 취소 성공 시 상세 Query를 무효화하고 완료 토스트를 보여준다", async () => {
    mockDeleteEventsRegister.mockResolvedValue(undefined);
    const { invalidateQueries, wrapper } = createTestEnvironment();
    const { result } = renderHook(() => useDeleteEvent(), { wrapper });

    await act(async () => {
      await result.current.mutateAsync(12);
    });

    expect(mockDeleteEventsRegister).toHaveBeenCalledWith(12);
    expect(invalidateQueries).toHaveBeenCalledWith({ queryKey: ["event"] });
    expect(mockShowToast).toHaveBeenCalledWith(
      "이벤트 신청이 취소됐어요",
      "checkbox",
    );
  });

  it("신청 취소 실패 시 Query와 성공 토스트를 갱신하지 않는다", async () => {
    mockDeleteEventsRegister.mockRejectedValue(new Error("취소 실패"));
    const { invalidateQueries, wrapper } = createTestEnvironment();
    const { result } = renderHook(() => useDeleteEvent(), { wrapper });

    await expect(
      act(async () => {
        await result.current.mutateAsync(12);
      }),
    ).rejects.toThrow("취소 실패");

    expect(invalidateQueries).not.toHaveBeenCalled();
    expect(mockShowToast).not.toHaveBeenCalled();
  });

  it("모집 취소 성공 시 상세 Query를 무효화하고 완료 토스트를 보여준다", async () => {
    mockDeleteEventsRecruit.mockResolvedValue(undefined);
    const { invalidateQueries, wrapper } = createTestEnvironment();
    const { result } = renderHook(() => useDeleteEventsRecruit(), { wrapper });

    await act(async () => {
      await result.current.mutateAsync(12);
    });

    expect(mockDeleteEventsRecruit).toHaveBeenCalledWith(12);
    expect(invalidateQueries).toHaveBeenCalledWith({ queryKey: ["event"] });
    expect(mockShowToast).toHaveBeenCalledWith(
      "이벤트 모집이 취소됐어요",
      "checkbox",
    );
  });

  it("모집 취소 실패 시 Query와 성공 토스트를 갱신하지 않는다", async () => {
    mockDeleteEventsRecruit.mockRejectedValue(new Error("모집 취소 실패"));
    const { invalidateQueries, wrapper } = createTestEnvironment();
    const { result } = renderHook(() => useDeleteEventsRecruit(), { wrapper });

    await expect(
      act(async () => {
        await result.current.mutateAsync(12);
      }),
    ).rejects.toThrow("모집 취소 실패");

    expect(invalidateQueries).not.toHaveBeenCalled();
    expect(mockShowToast).not.toHaveBeenCalled();
  });

  it("대관 선택 성공 시 요청값을 전달하고 상세 Query와 토스트를 갱신한다", async () => {
    mockPostEventsVenue.mockResolvedValue(undefined);
    const { invalidateQueries, wrapper } = createTestEnvironment();
    const { result } = renderHook(() => usePostEventsVenue(), { wrapper });

    await act(async () => {
      await result.current.mutateAsync({ eventId: 12, type: 0 });
    });

    expect(mockPostEventsVenue).toHaveBeenCalledWith({ eventId: 12, type: 0 });
    expect(invalidateQueries).toHaveBeenCalledWith({ queryKey: ["event"] });
    expect(mockShowToast).toHaveBeenCalledWith(
      "영화관 대관 신청이 완료됐어요",
      "checkbox",
    );
  });

  it("대관 선택 실패 시 Query와 성공 토스트를 갱신하지 않는다", async () => {
    mockPostEventsVenue.mockRejectedValue(new Error("대관 선택 실패"));
    const { invalidateQueries, wrapper } = createTestEnvironment();
    const { result } = renderHook(() => usePostEventsVenue(), { wrapper });

    await expect(
      act(async () => {
        await result.current.mutateAsync({ eventId: 12, type: 0 });
      }),
    ).rejects.toThrow("대관 선택 실패");

    expect(invalidateQueries).not.toHaveBeenCalled();
    expect(mockShowToast).not.toHaveBeenCalled();
  });
});
