import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { NewVehicle } from "./newVehicle";
import vehicleService from "@services/vehicle";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { LoadingProvider } from "@store/loading";
import { ToastProvider } from "@store/toasts";

vi.mock("@services/vehicle");

describe("NewVehicle Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renders the NewVehicle component", () => {
    render(
      <ToastProvider>
        <LoadingProvider>
          <NewVehicle />
        </LoadingProvider>
      </ToastProvider>
    );
    expect(screen.getByText(/Create Vehicle/)).toBeInTheDocument();
  });

  test("handles input changes", () => {
    render(
      <ToastProvider>
        <LoadingProvider>
          <NewVehicle />
        </LoadingProvider>
      </ToastProvider>
    );

    fireEvent.click(screen.getByText(/Create Vehicle/));

    fireEvent.change(screen.getByPlaceholderText(/plate/), {
      target: { value: "ABC123" },
    });
    expect(screen.getByPlaceholderText<HTMLInputElement>(/plate/).value).toBe(
      "ABC123"
    );

    fireEvent.change(screen.getByPlaceholderText(/Max weight capacity/), {
      target: { value: "2000" },
    });
    expect(
      screen.getByPlaceholderText<HTMLInputElement>(/Max weight capacity/).value
    ).toBe("2000");
  });

  test("shows validation errors", async () => {
    render(
      <ToastProvider>
        <LoadingProvider>
          <NewVehicle />
        </LoadingProvider>
      </ToastProvider>
    );

    fireEvent.click(screen.getByText(/Create Vehicle/));

    fireEvent.click(screen.getByText(/Confirm/));

    expect(await screen.findByText(/Invalid plate/i)).toBeInTheDocument();
    expect(
      await screen.findByText(/Invalid max weight capacity/i)
    ).toBeInTheDocument();
  });

  test("submits valid data", async () => {
    render(
      <ToastProvider>
        <LoadingProvider>
          <NewVehicle />
        </LoadingProvider>
      </ToastProvider>
    );

    fireEvent.click(screen.getByText(/Create Vehicle/));

    fireEvent.change(screen.getByPlaceholderText(/plate/), {
      target: { value: "ABC123" },
    });

    fireEvent.change(screen.getByPlaceholderText(/Max weight capacity/), {
      target: { value: "2000" },
    });

    fireEvent.click(screen.getByText(/Confirm/));

    await waitFor(() => {
      expect(vehicleService.create).toHaveBeenCalledWith({
        id: null,
        plate: "ABC123",
        maxWeightCapacity: 2000,
      });
    });
  });
});
