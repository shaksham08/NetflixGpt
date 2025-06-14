const API_CONFIG = {
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000",
  version: import.meta.env.VITE_API_VERSION || "v1",
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

export default API_CONFIG;
