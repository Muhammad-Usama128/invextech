import axios from "axios";

const useApi = axios.create({
  baseURL: "http://localhost:3001",
  withCredentials: true,
});

let refreshPromise = null;

useApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error.config;

    // Handle 401 Unauthorized - attempt to refresh token
    if (error.response?.status === 401 && config && !config._retry) {
      config._retry = true; // Ensure we only try to refresh once for this request

      // If a refresh is not already in progress, start one
      if (!refreshPromise) {
        refreshPromise = useApi.get("/refresh").finally(() => {
          refreshPromise = null; // Clear the promise when done (success or fail)
        });
      }

      try {
        // Wait for the refresh request (either the one we just started, or an ongoing one)
        await refreshPromise;
        console.log("Access token refreshed successfully");

        // Retry the original failed request
        return useApi(config);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    // Handle 403 Forbidden - refresh token invalid/expired, redirect to login
    if (error.response?.status === 403) {
      if (typeof window !== "undefined") {
        const currentPath = window.location.pathname;
        if (currentPath !== "/login") {
          window.location.href = "/login";
        }
      }
    }

    const shouldRetry = !error.response || error.response.status === 503;

    if (config) {
      config._retryCount = config._retryCount || 0;

      if (shouldRetry && config._retryCount < 3) {
        config._retryCount++;

        // Exponential backoff: 1s, 2s, 4s
        const delay = 1000 * 2 ** (config._retryCount - 1);
        await new Promise((res) => setTimeout(res, delay));

        return useApi(config);
      }
    }

    return Promise.reject(error);
  },
);

export default useApi;
