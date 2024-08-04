import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { LoadingProvider } from "./loading";
import useLoading from "@hooks/useLoading";
import userEvent from "@testing-library/user-event";

describe("LoadingProvider", () => {
  it("provides default value for isLoading", () => {
    const TestComponent = () => {
      const { isLoading } = useLoading();
      return <div>{isLoading ? "Loading" : "Not Loading"}</div>;
    };

    render(
      <LoadingProvider>
        <TestComponent />
      </LoadingProvider>
    );

    expect(screen.getByText("Not Loading")).toBeInTheDocument();
  });

  it("allows updating isLoading value", async () => {
    const user = userEvent.setup();

    const TestComponent = () => {
      const { isLoading, setIsLoading } = useLoading();
      if (isLoading) {
        return (
          <div>
            <span>{"Loading"}</span>
            <button onClick={() => setIsLoading(true)}>Set Loading</button>
          </div>
        );
      }
      return (
        <div>
          <span>{"Not Loading"}</span>
          <button onClick={() => setIsLoading(true)}>Set Loading</button>
        </div>
      );
    };

    render(
      <LoadingProvider>
        <TestComponent />
      </LoadingProvider>
    );

    expect(screen.getByText("Not Loading")).toBeInTheDocument();
    const button = screen.getByRole("button");
    await user.click(button);
    expect(screen.getByText("Loading")).toBeInTheDocument();
  });
});
