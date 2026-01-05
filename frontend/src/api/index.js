const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://127.0.0.1:8000";

export const API_ENDPOINTS = {
  LOGIN: `${BASE_URL}/api/auth/login/`,
  REGISTER: `${BASE_URL}/api/auth/register/`,
  REFRESH: `${BASE_URL}/api/auth/refresh/`,
  ME: `${BASE_URL}/api/auth/me/`,
};

export default BASE_URL;
