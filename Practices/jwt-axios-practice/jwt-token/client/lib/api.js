import axios from "https://cdn.jsdelivr.net/npm/axios@1.6.7/+esm";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error.config;
    if (error.response?.status === 401) {
      const currentPath = window.location.pathname;
      if (currentPath !== "/login.html") {
        window.location.href = "/login.html";
      }
    }
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

export default api;
