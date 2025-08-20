import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button from "./button";

describe("Button", () => {
  it("children 텍스트를 렌더링한다", () => {
    render(<Button>확인</Button>);
    expect(screen.getByText("확인")).toBeInTheDocument();
  });

  it("클릭 이벤트가 잘 호출된다", async () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    await userEvent.click(screen.getByRole("button", { name: "Click" }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("isLoading=true일 때 스피너가 보이고 children은 보이지 않는다", () => {
    render(<Button isLoading>로딩중</Button>);
    expect(screen.queryByText("로딩중")).not.toBeInTheDocument();
    expect(screen.getByRole("button").firstChild).toHaveClass("animate-spin");
    expect(screen.getByRole("button")).toBeDisabled();
  });
});
