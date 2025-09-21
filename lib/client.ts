import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, "") || "";

export const api = axios.create({
  baseURL,
  withCredentials: true, // allow cookies if backend uses them
});

// Attach JWT if present
api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token"); // or use cookies
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  // Debug logs
  const fullUrl = `${config.baseURL || ""}${config.url || ""}`;
  console.debug("[API ->]", config.method?.toUpperCase(), fullUrl, config.data || "");
  return config;
});

// Log responses & errors
api.interceptors.response.use(
  (res) => {
    console.debug("[API <-]", res.status, res.config.url, res.data);
    return res;
  },
  (err) => {
    const status = err?.response?.status;
    console.error("[API ERROR]", status, err?.response?.data || err.message);
    // Optional: redirect on 401
    // if (status === 401 && typeof window !== "undefined") window.location.href = "/login";
    return Promise.reject(err);
  }
);
