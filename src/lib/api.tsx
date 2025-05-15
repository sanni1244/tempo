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

/* === MANAGERS === */
export const getManagers = () => api.get('/managers');
export const getManagerById = (id: string) => api.get(`/managers/${id}`);
export const createManager = (data: any) => api.post('/managers', data);
export const updateManager = (id: string, data: any) => api.put(`/managers/${id}`, data);
export const deleteManager = (id: string) => api.delete(`/managers/${id}`);

/* === JOBS === */
export const getJobs = () => api.get('/jobs');
export const getJobById = (id: string) => api.get(`/jobs/${id}`);
export const createJob = (data: any) => api.post('/jobs', data);
export const updateJob = (id: string, data: any) => api.put(`/jobs/${id}`, data);
export const deleteJob = (id: string) => api.delete(`/jobs/${id}`);

/* === IDENTITIES === */
export const getIdentities = () => api.get('/identities');
export const getIdentitiesByManagerId = (managerId: string) => api.get(`/identities?managerId=${managerId}`);
export const getIdentityById = (id: string) => api.get(`/identities/${id}`);
export const createIdentity = (data: any) => api.post('/identities', data);
export const updateIdentity = (id: string, data: any) => api.put(`/identities/${id}`, data);
export const deleteIdentity = (id: string) => api.delete(`/identities/${id}`);

/* === FORM ACTIONS === */
export const getFormActions = () => api.get('/formactions');
export const getFormActionById = (id: string) => api.get(`/formactions/${id}`);
export const createFormAction = (data: any) => api.post('/formactions', data);
export const updateFormAction = (id: string, data: any) => api.put(`/formactions/${id}`, data);
export const deleteFormAction = (id: string) => api.delete(`/formactions/${id}`);

/* === FORM RESPONSES === */
export const getFormResponses = () => api.get('/formresponses');
export const getFormResponseById = (id: string) => api.get(`/formresponses/${id}`);
export const createFormResponse = (data: any) => api.post('/formresponses', data);
export const updateFormResponse = (id: string, data: any) => api.put(`/formresponses/${id}`, data);
export const deleteFormResponse = (id: string) => api.delete(`/formresponses/${id}`);

/* === APPLICANTS === */
export const getApplicants = () => api.get('/applicants');
export const getApplicantById = (id: string) => api.get(`/applicants/${id}`);
export const createApplicant = (data: any) => api.post('/applicants', data);
export const updateApplicant = (id: string, data: any) => api.put(`/applicants/${id}`, data);
export const deleteApplicant = (id: string) => api.delete(`/applicants/${id}`);

/* === FILE MANAGEMENT === */

// Upload a file for a specific job (Manager upload)
export const uploadManagerFile = (formData: FormData) =>
  api.post('/files/manager-upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

// Upload a file from a form (Token-based form response)
export const uploadFormFile = (formData: FormData) =>
  api.post('/files/form-upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

// Get a presigned download URL for a file
export const getFileUrl = (fileId: string) =>
  api.get(`/files/${fileId}/url`);

/* === FORM LINKS (PUBLIC) === */

export const getPublicFormLinks = () => api.get('/form-links/public');
export const getPublicFormLinkById = (id: string) => api.get(`/form-links/public/${id}`);
export const createPublicFormLink = (formId: string) =>
  api.post('/form-links/public', { formId });
export const deletePublicFormLink = (id: string) =>
  api.delete(`/form-links/public/${id}`);

/* === EMAIL ACTIONS === */

// Create a new email action and queue emails for sending
export const createEmailAction = (data: any) =>
  api.post('/emails-actions', data);

// List all email actions for a given Job
export const getEmailActions = (jobId: string) =>
  api.get(`/emails-actions?jobId=${jobId}`);

// Retrieve an existing email action by ID
export const getEmailActionById = (id: string) =>
  api.get(`/emails-actions/${id}`);

// List all Emails for a given EmailAction
export const getEmailsForAction = (id: string) =>
  api.get(`/emails-actions/${id}/get-emails`);

/* === EMAILS === */
export const getEmailById = (id: string) => api.get(`/emails/${id}`);
export const deleteEmail = (id: string) => api.delete(`/emails/${id}`);

/* === EMAIL TEMPLATES === */
export const getEmailTemplates = (managerId?: string) =>
  api.get(`/email-templates${managerId ? `?managerId=${managerId}` : ''}`);

export const getEmailTemplateById = (id: string) =>
  api.get(`/email-templates/${id}`);

export const createEmailTemplate = (data: any) =>
  api.post('/email-templates', data);

export const updateEmailTemplate = (id: string, data: any) =>
  api.patch(`/email-templates/${id}`, data);

export const deleteEmailTemplate = (id: string) =>
  api.delete(`/email-templates/${id}`);

/* === LOG ANALYTICS === */
export const getAnalyticsStats = () => api.get('/analytics/stats');


