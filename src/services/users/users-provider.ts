import { apiKey, baseUrl, headers } from '@app/utils/apiConfig';
import axios from 'axios';

const API_URL = 'https://example.com/api/users';

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
  data: User
}

export const detailUser = async (id: number): Promise<UserDetail> => {
  const API_URL = `${baseUrl}users/actions/${id}/`
  const response = await axios.get<UserDetail>(API_URL, { headers });
  return response.data;
};

export const fetchUsers = async (): Promise<UsersResponse> => {
  const API_URL = baseUrl + 'users/list/'
  const response = await axios.get<UsersResponse>(API_URL, { headers });
  return response.data;
};

export const fetchTypeUsers = async (type_users: any): Promise<UsersResponse> => {
  const API_URL = baseUrl + 'users/select/list/'
  const response = await axios.post<UsersResponse>(API_URL, type_users, { headers });
  return response.data;
};

export const fetchTeacher = async (): Promise<any> => {
  const API_URL = baseUrl + 'teachers/list/'
  const response = await axios.get<any>(API_URL, { headers });
  return response.data;
};

export const createUser = async (user: Omit<User, 'id'>): Promise<User> => {
  const response = await axios.post<User>(API_URL, user);
  return response.data;
};

export const updateUser = async (id: number, updatedUser: Partial<Omit<User, 'id'>>): Promise<User> => {
  const API_URL = `${baseUrl}users/actions/${id}/`
  const response = await axios.put<User>(API_URL, updatedUser, { headers });
  return response.data;
};

export const deleteUser = async (id: number): Promise<User> => {
  const API_URL = `${baseUrl}users/actions/${id}/`
  const response = await axios.delete<User>(API_URL, { headers });
  return response.data;
};
