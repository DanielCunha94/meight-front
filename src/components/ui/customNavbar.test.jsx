import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import CustomNavbar from "./customNabbar";
import { BrowserRouter } from "react-router-dom";

test("NavBar full rendering", async () => {
  render(<CustomNavbar />, { wrapper: BrowserRouter });
  expect(screen.getByText(/Meight./i)).toBeInTheDocument();
  expect(screen.getAllByText(/vehicles/i)[0]).toBeInTheDocument();
  expect(screen.getAllByText(/orders/i)[0]).toBeInTheDocument();
});
