import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { NewOrder } from "./newOrder";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { LoadingProvider } from "@store/loading";
import { ToastProvider } from "@store/toasts";
import orderService from "@services/order";

vi.mock("@services/order");

describe("NewOrder Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renders the NewOrder component", () => {
    render(
      <ToastProvider>
        <LoadingProvider>
          <NewOrder />
        </LoadingProvider>
      </ToastProvider>
    );
    expect(screen.getByText(/Create Order/)).toBeInTheDocument();
  });

  test("handles input changes", () => {
    render(
      <ToastProvider>
        <LoadingProvider>
          <NewOrder />
        </LoadingProvider>
      </ToastProvider>
    );

    fireEvent.click(screen.getByText(/Create Order/));

    fireEvent.change(screen.getByPlaceholderText(/latitude/), {
      target: { value: "45" },
    });
    expect(
      screen.getByPlaceholderText<HTMLInputElement>(/latitude/).value
    ).toBe("45");

    fireEvent.change(screen.getByPlaceholderText(/longitude/), {
      target: { value: "45" },
    });
    expect(
      screen.getByPlaceholderText<HTMLInputElement>(/longitude/).value
    ).toBe("45");

    fireEvent.change(screen.getByPlaceholderText(/weigh/), {
      target: { value: "2000" },
    });
    expect(screen.getByPlaceholderText<HTMLInputElement>(/weight/).value).toBe(
      "2000"
    );
  });

  test("shows validation errors", async () => {
    render(
      <ToastProvider>
        <LoadingProvider>
          <NewOrder />
        </LoadingProvider>
      </ToastProvider>
    );

    fireEvent.click(screen.getByText(/Create Order/));

    fireEvent.click(screen.getByText(/Confirm/));

    expect(await screen.findByText(/Invalid longitude/i)).toBeInTheDocument();
    expect(await screen.findByText(/Invalid latitude/i)).toBeInTheDocument();
    expect(await screen.findByText(/Invalid weight/i)).toBeInTheDocument();
  });

  test("submits valid data", async () => {
    render(
      <ToastProvider>
        <LoadingProvider>
          <NewOrder />
        </LoadingProvider>
      </ToastProvider>
    );

    fireEvent.click(screen.getByText(/Create Order/));

    fireEvent.change(screen.getByPlaceholderText(/latitude/), {
      target: { value: "45" },
    });

    fireEvent.change(screen.getByPlaceholderText(/longitude/), {
      target: { value: "45" },
    });

    fireEvent.change(screen.getByPlaceholderText(/weight/), {
      target: { value: "2000" },
    });

    fireEvent.change(screen.getByPlaceholderText(/observations/), {
      target: { value: "test" },
    });

    fireEvent.click(screen.getByText(/Confirm/));

    await waitFor(() => {
      expect(orderService.create).toHaveBeenCalledWith({
        id: null,
        latitude: 45,
        longitude: 45,
        observations: "test",
        weight: 2000,
        assignmentID: null,
        isCompleted: false,
      });
    });
  });
});
