import React, { useContext } from "react";
import { render, screen } from "@testing-library/react";
import { ToastProvider, ToastContext, Toast } from "./toasts";
import { expect, test } from "vitest";
import userEvent from "@testing-library/user-event";

const TestComponent: React.FC = () => {
  const toastContext = useContext(ToastContext);

  if (!toastContext) {
    return null;
  }

  const { toasts, addToast, removeToast } = toastContext;

  function handleAddToast() {
    const newToast: Toast = { message: "Test Toast", type: "green" };
    addToast(newToast);
  }
  function handleRemoveToast() {
    removeToast(0);
  }

  return (
    <div>
      <button onClick={handleAddToast}>Add Toast</button>
      <button onClick={handleRemoveToast}>Remove Toast</button>
      <ul>
        {toasts.map((toast, index) => (
          <li key={index}>
            {toast.type}: {toast.message}
          </li>
        ))}
      </ul>
    </div>
  );
};

test("ToastProvider toasts", async () => {
  const user = userEvent.setup();
  render(
    <ToastProvider>
      <TestComponent />
    </ToastProvider>
  );
  expect(screen.queryByText("green: Test Toast")).toBeNull();

  const addButton = screen.getByText("Add Toast");
  await user.click(addButton);
  expect(screen.getByText("green: Test Toast")).toBeInTheDocument();

  const removeButton = screen.getByText("Remove Toast");
  await user.click(removeButton);
  expect(screen.queryByText("green: Test Toast")).toBeNull();
});
