import { baseUrl, headers } from "@app/utils/apiConfig";
import axios from "axios";

export interface SettingsInterface {
    id: number;
    type_user: number;
    first_name: string;
    last_name: string;
    username: string;
    type_document: number;
    document_number: number;
    email: string;
    avatar: string;
    avatar_url: string | null;
    is_active: boolean;
}

export interface SettingsResponse {
    code_transaction: string;
    data: {
      count: number;
      next: string | null;
      previous: string | null;
      results: SettingsInterface[];
    };
}

export interface SettingsDetail {
  code_transaction: string;
  data: SettingsInterface
}

export const detailSettings = async (settings: Partial<any>): Promise<any> => {
  const API_URL = `${baseUrl}users/updated-personal/`;
  const response = await axios.post<any>(API_URL, settings, { headers });
  return response.data;
}

export const updatedSettings = async (id: number, updatedSettings: Partial<Omit<SettingsInterface, 'id'>>): Promise<SettingsInterface> => {
  const API_URL = `${baseUrl}users/updated-personal/${id}/`;
  const response = await axios.put<SettingsInterface>(API_URL, updatedSettings, { headers });
  return response.data;
}
