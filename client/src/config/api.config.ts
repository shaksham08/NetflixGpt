import axios from "axios";

const API_CONFIG = {
  baseURL: (import.meta as any).env?.VITE_API_URL || "http://localhost:3000",
  version: (import.meta as any).env?.VITE_API_VERSION || "v1",
  endpoints: {
    auth: {
      login: "/user/login",
      signup: "/user/signup",
      logout: "/user/logout",
      resetPassword: "/user/reset-password",
      validateResetToken: "/user/validate-reset-token",
      updatePassword: "/user/update-password",
    },
    user: {
      profile: "/user/profile",
      update: "/user/update",
    },
  },
};

export const getApiUrl = (endpoint) => {
  return `${API_CONFIG.baseURL}${endpoint}`;
};

// Create centralized API client with default config
export const apiClient = axios.create({
  baseURL: API_CONFIG.baseURL,
  withCredentials: true, // 👈 Default for all requests
  headers: {
    "Content-Type": "application/json",
  },
});

// Auth-specific API methods
export const authAPI = {
  login: (data) => apiClient.post(API_CONFIG.endpoints.auth.login, data),
  signup: (data) => apiClient.post(API_CONFIG.endpoints.auth.signup, data),
  logout: () => apiClient.post(API_CONFIG.endpoints.auth.logout),
  resetPassword: (data) =>
    apiClient.post(API_CONFIG.endpoints.auth.resetPassword, data),
  validateResetToken: (data) =>
    apiClient.post(API_CONFIG.endpoints.auth.validateResetToken, data),
  updatePassword: (data) =>
    apiClient.post(API_CONFIG.endpoints.auth.updatePassword, data),
};

export default API_CONFIG;
