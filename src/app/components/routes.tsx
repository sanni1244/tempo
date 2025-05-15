import { api } from '@/lib/api';

import { Managerdetails, Identity, Job, Template, Form, Response, ApplicantResponse, ResponsesData} from '@/app/types/api';

const managerId = '606c6fc0-cc53-4543-8eb7-ae2f6353ca4d';


export const FetchManager = async (): Promise<Managerdetails> => {
  try {
    const response = await api.get(`/managers/${managerId}`);
    return response.data;
  } catch {
    throw new Error('Failed to fetch manager.');
  }
};


export const FetchIdentities = async (): Promise<Identity[]> => {
  try {
    const response = await api.get(`/identities?managerId=${managerId}`);
    console.log(response.data.identities)
    return response.data.identities;
  } catch (err) {
    throw new Error('Failed to fetch identities.');
  }
};

export const FetchJobs = async (): Promise<Job[]> => {
  try {
    const response = await api.get(`/jobs?managerId=${managerId}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch jobs:', error);
    throw new Error('Failed to fetch jobs.');
  }
};


export const FetchTemplates = async (): Promise<Template[]> => {
  try {
    const response = await api.get(`/form-templates?managerId=${managerId}`);
    return response.data;
  } catch (err) {
    console.error('Failed to fetch templates:', err);
    throw new Error('Failed to fetch templates.');
  }
};


export const FetchAction = async (jobId: string): Promise<Form[]> => {
  try {
    const response = await api.get(`/forms?${jobId}&managerId=${managerId}`);
    return response.data;
  } catch (err) {
    console.error('Failed to fetch templates:', err);
    throw new Error('Failed to fetch templates.');
  }
};


export const FetchResponses = async (formId: string): Promise<ResponsesData> => {
  try {
    const response = await api.get(`/forms-responses/${formId}?managerId=${managerId}`);
    return response.data;
  } catch (err) {
    console.error('Failed to fetch responses:', err);
    throw new Error('Failed to fetch responses.');
  }
};

// Types for the response
