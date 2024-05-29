import { baseUrl, headers } from '@app/utils/apiConfig';
import axios from 'axios';
import { User } from '../users/users-provider';


export interface Teacher {
    id: number;
    uuid: string;
    user: User;
    profession: string;
    is_full_time: boolean;
}

export interface AcademicGroupsInterface {
  id: number;
  teachers: Teacher[];
  degress_display: string;
  degress: string;
  name: string;
  code: string | null;
}

export interface AcademicGroupsResponse {
  code_transaction: string;
  data: {
    count: number;
    next: string | null;
    previous: string | null;
    results: AcademicGroupsInterface[];
  };
}

export interface AcademicGroupsDetail {
  code_transaction: string;
  data: AcademicGroupsInterface
}


export const detailAcademicGroups = async (id: number): Promise<AcademicGroupsDetail> => {
  const API_URL = `${baseUrl}academic_group/actions/${id}/`
  const response = await axios.get<AcademicGroupsDetail>(API_URL, { headers });
  return response.data;
};

export const fetchAcademicGroups = async (): Promise<AcademicGroupsResponse> => {
  const API_URL = baseUrl + 'academic_groups/list/'
  const response = await axios.get<AcademicGroupsResponse>(API_URL, { headers });
  return response.data;
};

export const createAcademicGroups = async (academic: Partial<AcademicGroupsInterface>): Promise<any> => {
  const API_URL = baseUrl + 'academic_group/create/'
  const response = await axios.post<AcademicGroupsInterface>(API_URL, academic, {headers});
  return response.data;
};

export const updateAcademicGroups = async (id: number, updatedUser: Partial<Omit<AcademicGroupsInterface, 'id'>>): Promise<AcademicGroupsInterface> => {
  const API_URL = `${baseUrl}academic_group/actions/${id}/`
  const response = await axios.put<AcademicGroupsInterface>(API_URL, updatedUser, { headers });
  return response.data;
};

export const deleteAcademicGroups = async (id: number): Promise<AcademicGroupsInterface> => {
  const API_URL = `${baseUrl}academic_group/actions/${id}/`
  const response = await axios.delete<AcademicGroupsInterface>(API_URL, { headers });
  return response.data;
};
