import axios from 'axios';
export const api = axios.create({
  baseURL: 'https://notehub-api.goit.study',
  withCredentials: true,
});
const base =
  (process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000').replace(/\/$/, '');

export const apiClient = axios.create({
  baseURL: `${base}/api`,
  withCredentials: true, 
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});