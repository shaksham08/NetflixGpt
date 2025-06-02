const API_CONFIG = {
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000",
  version: import.meta.env.VITE_API_VERSION || "v1",
  endpoints: {
    auth: {
      login: "/user/login",
      signup: "/user/signup",
      logout: "/user/logout",
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
