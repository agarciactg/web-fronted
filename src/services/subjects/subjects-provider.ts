import { apiKey, baseUrl, headers } from '@app/utils/apiConfig';
import axios from 'axios';
import { Teacher } from '../academic-groups/academic-groups';


export interface SubjectsInterface {
  id: number;
  teacher: Teacher
  name: string;
  description: string;
  credis: number;
  hours: string;
}

export interface SubjectsResponse {
  code_transaction: string;
  data: {
    count: number;
    next: string | null;
    previous: string | null;
    results: SubjectsInterface[];
  };
}

export interface SubjectsDetail {
  code_transaction: string;
  data: SubjectsInterface
}

export const detailSubjects = async (id: number): Promise<SubjectsDetail> => {
  const API_URL = `${baseUrl}subject/actions/${id}/`
  const response = await axios.get<SubjectsDetail>(API_URL, { headers });
  return response.data;
};

export const fetchSubjects = async (): Promise<SubjectsResponse> => {
  const API_URL = baseUrl + 'subject/list/'
  const response = await axios.get<SubjectsResponse>(API_URL, { headers });
  return response.data;
};

export const createSubjects = async (subjects: Partial<SubjectsInterface>): Promise<any> => {
  const API_URL = baseUrl + 'subject/create/'
  const response = await axios.post<SubjectsInterface>(API_URL, subjects, { headers });
  return response.data;
};

export const updateSubjects = async (id: number, updatedUser: Partial<Omit<SubjectsInterface, 'id'>>): Promise<SubjectsInterface> => {
  const API_URL = `${baseUrl}subject/actions/${id}/`
  const response = await axios.put<SubjectsInterface>(API_URL, updatedUser, { headers });
  return response.data;
};

export const deleteSubjects = async (id: number): Promise<SubjectsInterface> => {
  const API_URL = `${baseUrl}subject/actions/${id}/`
  const response = await axios.delete<SubjectsInterface>(API_URL, { headers });
  return response.data;
};
