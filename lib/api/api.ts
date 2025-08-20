import axios from 'axios';
const base = (process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000').replace(/\/$/, '');
export const apiClient = axios.create({
  baseURL: `${base}/api`,
  withCredentials: true,
});