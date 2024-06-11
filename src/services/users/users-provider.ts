import { apiKey, baseUrl, headers } from '@app/utils/apiConfig';
import axios from 'axios';

export interface User {
  id: number;
  type_user: string;
  first_name: string;
  last_name: string;
  username: string;
  type_document: string | null;
  document_number: number | null;
  email: string;
  avatar: string | null;
  avatar_url: string | null;
  get_full_name: string;
  is_active: boolean;
}

export interface UsersResponse {
  code_transaction: string;
  data: {
    count: number;
    next: string | null;
    previous: string | null;
    results: User[];
  };
}

export interface UserDetail {
  code_transaction: string;
  data: User;
}

const API_URL = `${baseUrl}users/`;

const handleRequest = async <T>(request: Promise<any>): Promise<T> => {
  try {
    const response = await request;
    return response.data;
  } catch (error) {
    console.error('API request error:', error);
    throw error;
  }
};

export const detailUser = async (id: number): Promise<UserDetail> => {
  const request = axios.get<UserDetail>(`${API_URL}actions/${id}/`, { headers });
  return handleRequest<UserDetail>(request);
};

export const fetchUsers = async (): Promise<UsersResponse> => {
  const request = axios.get<UsersResponse>(`${API_URL}list/`, { headers });
  return handleRequest<UsersResponse>(request);
};

export const fetchTypeUsers = async (type_users: any): Promise<UsersResponse> => {
  const request = axios.post<UsersResponse>(`${API_URL}select/list/`, type_users, { headers });
  return handleRequest<UsersResponse>(request);
};

export const fetchTeacher = async (): Promise<any> => {
  const request = axios.get<any>(`${baseUrl}teachers/list/`, { headers });
  return handleRequest<any>(request);
};

export const createUser = async (user: Partial<User>): Promise<User> => {
  const request = axios.post<User>(`${API_URL}create/`, user, { headers });
  return handleRequest<User>(request);
};

export const createUserTeacher = async (user: Partial<User>): Promise<User> => {
  const request = axios.post<User>(`${baseUrl}teacher/create/`, user, { headers });
  return handleRequest<User>(request);
};

export const updateUser = async (id: number, updatedUser: Partial<Omit<User, 'id'>>): Promise<User> => {
  const request = axios.put<User>(`${API_URL}actions/${id}/`, updatedUser, { headers });
  return handleRequest<User>(request);
};

export const deleteUser = async (id: number): Promise<User> => {
  const request = axios.delete<User>(`${API_URL}actions/${id}/`, { headers });
  return handleRequest<User>(request);
};
