interface HttpOptions extends RequestInit {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body?: any;
}

function handleResponse<T>(response: Response): Promise<T> {
  return response.ok
    ? (response.json() as Promise<T>)
    : response.text().then((errorText) => {
        throw new Error(`Error: ${response.statusText} - ${errorText}`);
      });
}

function serializeParams(params: Record<string, string>): string {
  return new URLSearchParams(params).toString();
}

export async function get<T>(
  url: string,
  params?: Record<string, string>
): Promise<T> {
  const fullUrl = params ? `${url}?${serializeParams(params)}` : url;
  const response = await fetch(fullUrl);
  return handleResponse<T>(response);
}

export async function post<T, K>(
  url: string,
  body?: T,
  options?: HttpOptions
): Promise<K> {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    body: JSON.stringify(body),
    ...options,
  });

  return handleResponse<K>(response);
}

export async function put<T, K>(
  url: string,
  body?: T,
  options?: HttpOptions
): Promise<K> {
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    body: JSON.stringify(body),
    ...options,
  });
  return handleResponse<K>(response);
}

export async function patch<T, K>(
  url: string,
  body?: T,
  options?: HttpOptions
): Promise<K> {
  const response = await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    body: JSON.stringify(body),
    ...options,
  });
  return handleResponse<K>(response);
}
