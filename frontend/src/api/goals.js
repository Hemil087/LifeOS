import { API_ENDPOINTS } from "./index";

export async function fetchGoals(token) {
  const res = await fetch(API_ENDPOINTS.GOALS, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Failed to fetch goals");
  return res.json();
}

export async function createGoal(token, goalData) {
  const res = await fetch(API_ENDPOINTS.GOALS, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(goalData),
  });

  if (!res.ok) throw new Error("Failed to create goal");
  return res.json();
}

export async function updateGoal(token, id, data) {
  const res = await fetch(`${API_ENDPOINTS.GOALS}${id}/`, {
    method: "PATCH", // ✅ IMPORTANT
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to update goal");
  return res.json();
}


export async function deleteGoal(token, id) {
  const res = await fetch(`${API_ENDPOINTS.GOALS}${id}/`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Failed to delete goal");
}
