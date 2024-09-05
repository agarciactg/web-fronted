import { baseUrl, headers } from "@app/utils/apiConfig";
import axios from "axios";

// Interface para la información del usuario
export interface UserInterface {
    id: number;
    type_user: string;
    first_name: string;
    last_name: string;
    type_document: number;
    document_number: number;
    get_full_name: string;
}

// Interface para la información del candidato
export interface CandidateInterface {
    id: number;
    user: UserInterface;
    place_of_bird: string;
    date_of_bird: string;
    years: number;
    gender: number | null;
    laterality: number;
    degrees: number;
    elective_year: number;
    address: string;
    city: string;
    neighborhood: string;
    stratum: number;
    phone: string | null;
    email: string;
}

// Interface para la respuesta completa de la API
export interface CandidatesResponse {
    code_transaction: string;
    data: {
        candiate: CandidateInterface;
    }[];
}

const API_URL = `${baseUrl}student/`;

const handleRequest = async <T>(request: Promise<any>): Promise<T> => {
    try {
      const response = await request;
      return response.data;
    } catch (error) {
      console.error('API request error:', error);
      throw error;
    }
  };

export const fetchStudentActive = async (): Promise<any> => {
    const request = axios.get<any>(`${API_URL}list/`, { headers });
    return handleRequest<any>(request);
};
