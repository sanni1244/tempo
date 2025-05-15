// services/apiClient.ts

export async function apiClient<T = any>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  const defaultHeaders = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  const config: RequestInit = {
    ...options,
    headers: defaultHeaders,
  };

  const res = await fetch(url, config);

  if (!res.ok) {
    const errorBody = await res.text();
    throw new Error(`API Error ${res.status}: ${errorBody}`);
  }

  // Safely attempt to parse as JSON
  try {
    return (await res.json()) as T;
  } catch {
    throw new Error('Failed to parse JSON response');
  }
}
