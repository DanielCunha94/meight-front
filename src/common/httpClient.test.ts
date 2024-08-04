import { beforeEach, expect, MockedFunction, test, vi } from "vitest";
import { get, post, put } from "./httpClient";

globalThis.fetch = vi.fn();

beforeEach(() => {
  vi.clearAllMocks();
});

test("GET request should return data", async () => {
  const mockResponse = { id: 1, name: "Test Item" };
  (fetch as MockedFunction<typeof fetch>).mockResolvedValue({
    ok: true,
    json: async () => mockResponse,
  } as Response);

  const data = await get<{ id: number; name: string }>("/data");
  expect(data).toEqual(mockResponse);
});

test("POST request should send data and return response", async () => {
  const mockResponse = { success: true };
  (fetch as MockedFunction<typeof fetch>).mockResolvedValue({
    ok: true,
    json: async () => mockResponse,
  } as Response);

  const response = await post("/data", {
    name: "New Item",
  });
  expect(response).toEqual(mockResponse);
});

test("PUT request should update data and return response", async () => {
  const mockResponse = { success: true };
  (fetch as MockedFunction<typeof fetch>).mockResolvedValue({
    ok: true,
    json: async () => mockResponse,
  } as Response);

  const response = await put("/data/1", {
    name: "Updated Item",
  });
  expect(response).toEqual(mockResponse);
});

test("GET request should throw error on failure", async () => {
  (fetch as MockedFunction<typeof fetch>).mockResolvedValue({
    ok: false,
    statusText: "Not Found",
    text: async () => "Error details",
  } as Response);

  await expect(get<{ id: number; name: string }>("/data")).rejects.toThrow(
    "Error: Not Found - Error details"
  );
});
