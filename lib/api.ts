// lib/api.ts
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function apiRequest(
  endpoint: string,
  method: string,
  data?: any,
  token?: string
) {
  const headers: HeadersInit = {
    Authorization: token ? `Bearer ${token}` : "",
  };

  if (method !== "GET" && method !== "HEAD") {
    headers["Content-Type"] = "application/json";
  }

  const options: RequestInit = {
    method,
    headers,
  };

  if (data && method !== "GET" && method !== "HEAD") {
    options.body = JSON.stringify(data);
  }

  console.log(`API Request: ${method} ${API_BASE_URL}/${endpoint}`, options);

  const res = await fetch(`${API_BASE_URL}/${endpoint}`, options);

  if (!res.ok) throw new Error(`API Error: ${res.statusText}`);
  return res.json();
}
