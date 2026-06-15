import axios from "axios";


export const publicApi = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_API,
    withCredentials: true,
})

export const protectedApi = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_API,
    withCredentials: true,

})

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error) => {
  failedQueue.forEach(p => {
    error ? p.reject(error) : p.resolve();
  });
  failedQueue = [];
};


protectedApi.interceptors.response.use(
  (res) => res,

  async (error) => {
    const originalRequest = error.config;
    const status = error.response?.status;

    // 401 = token expired
    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(() => protectedApi(originalRequest));
      }

      isRefreshing = true;

      try {
        // refresh يعتمد على cookie
        await axios.put(
          "/auth/refresh-token",
          {},
          { withCredentials: true }
        );

        processQueue(null);

        return protectedApi(originalRequest);
      } catch (err) {
        processQueue(err);
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);