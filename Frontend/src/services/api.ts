import axios from "axios";

// Single axios instance so the base URL only lives in one place.
// If you deploy this, just change baseURL (or read it from an env var).
const api = axios.create({
  baseURL: "http://localhost:3001/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
