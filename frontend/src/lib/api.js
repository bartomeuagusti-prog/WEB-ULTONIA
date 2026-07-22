import axios from "axios";

// URL del backend. En Emergent/producció s'injecta amb REACT_APP_BACKEND_URL.
// En local, si no hi és, s'assumeix el mateix host al port 8001.
const BACKEND_URL =
  process.env.REACT_APP_BACKEND_URL || "http://localhost:8001";

export const api = axios.create({
  baseURL: `${BACKEND_URL}/api`,
});

// Afegeix el token d'admin (si n'hi ha) a cada petició.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("admin_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export { BACKEND_URL };
