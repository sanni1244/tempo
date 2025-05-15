import axios from 'axios';

if (!process.env.NEXT_PUBLIC_API_URL ) {
  console.warn('Warning: API_BASE_URL is not defined. Defaulting to http://localhost:5000/api');
}

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Optionally add interceptors for auth
// api.interceptors.request.use(config => {
//   const token = localStorage.getItem('token');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

/* === IDENTITIES === */
export const getIdentities = () => api.get('/identities');
export const getIdentitiesByManagerId = (managerId: string) => api.get(`/identities?managerId=${managerId}`);
export const getIdentityById = (id: string) => api.get(`/identities/${id}`);
export const createIdentity = (data: any) => api.post('/identities', data);
export const updateIdentity = (id: string, data: any) => api.put(`/identities/${id}`, data);
export const deleteIdentity = (id: string) => api.delete(`/identities/${id}`);

