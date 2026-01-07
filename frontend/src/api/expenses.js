import { API_ENDPOINTS } from "./index";

export async function fetchExpenses(token) {
  const res = await fetch(API_ENDPOINTS.EXPENSES, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Failed to fetch expenses");
  return res.json();
}

export async function createExpense(token, data) {
  const res = await fetch(API_ENDPOINTS.EXPENSES, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to create expense");
  return res.json();
}

export async function updateExpense(token, id, data) {
  const res = await fetch(`${API_ENDPOINTS.EXPENSES}${id}/`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to update expense");
  return res.json();
}

export async function deleteExpense(token, id) {
  const res = await fetch(`${API_ENDPOINTS.EXPENSES}${id}/`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Failed to delete expense");
}
