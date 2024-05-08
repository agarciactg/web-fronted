import { apiKey, baseUrl, headers } from '@app/utils/apiConfig';
import axios from 'axios';

const API_URL = 'https://example.com/api/users';

export interface User {
  id: number;
  type_user: string;
  first_name: string;
  last_name: string;
  username: string;
  type_document: number | null;
  document_number: number | null;
  email: string;
  avatar: string | null;
  avatar_url: string | null;
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


export const fetchUsers = async (): Promise<UsersResponse> => {
  const API_URL = baseUrl + 'users/list/'
  const response = await axios.get<UsersResponse>(API_URL, { headers });
  return response.data;
};

export const createUser = async (user: Omit<User, 'id'>): Promise<User> => {
  const response = await axios.post<User>(API_URL, user);
  return response.data;
};

export const updateUser = async (id: number, updatedUser: Omit<User, 'id'>): Promise<User> => {
  const response = await axios.put<User>(`${API_URL}/${id}`, updatedUser);
  return response.data;
};

export const deleteUser = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};
