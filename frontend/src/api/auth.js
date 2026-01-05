import { API_ENDPOINTS } from "./index";

export async function loginUser(credentials) {
  const res = await fetch(API_ENDPOINTS.LOGIN, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  if (!res.ok) {
    throw new Error("Login failed");
  }

  return res.json();
}

export async function registerUser(data) {
  const res = await fetch(API_ENDPOINTS.REGISTER, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Registration failed");
  }

  return res.json();
}
