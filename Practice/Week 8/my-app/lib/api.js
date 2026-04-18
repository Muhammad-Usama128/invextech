import axios from "axios";

const api = axios.create({
  baseURL: typeof window === "undefined" ? "http://localhost:3000" : "/api",
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);
export default api;

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error.config;

    // Retry up to 3 times on network errors or 503
    const shouldRetry = !error.response || error.response.status === 503;

    config._retryCount = config._retryCount || 0;

    if (shouldRetry && config._retryCount < 3) {
      config._retryCount++;

      // Exponential backoff: 1s, 2s, 4s
      const delay = 1000 * 2 ** (config._retryCount - 1);
      await new Promise((res) => setTimeout(res, delay));

      return api(config);
    }

    return Promise.reject(error);
  },
);
