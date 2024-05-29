import { baseUrl, headers } from "@app/utils/apiConfig";
import axios from "axios";

export interface AcademicGroup {
  id: number,
  name: string
}

export interface Subject {
  id: number,
  name: string;
}

export interface Student {
  id: number;
  get_full_name: string;
}

export interface EnrollmentInterface {
    id: number,
    academic_groups: AcademicGroup,
    subjects: Subject[],
    student: Student,
    date_created: string
}

export interface EnrollmentEditInterface {
  id: number,
  academic_groups: number,
  subjects: number[],
  student: number,
  date_created: string
}

export interface EnrollmentResponse {
    code_transaction: string;
    data: {
      count: number;
      next: string | null;
      previous: string | null;
      results: EnrollmentInterface[];
    };
}

export interface EnrollmentDetail {
  code_transaction: string;
  data: EnrollmentInterface
}

export const detailEnrollment = async (id: number): Promise<EnrollmentDetail> => {
  const API_URL = `${baseUrl}enrollment/actions/${id}/` 
  const response = await axios.get<EnrollmentDetail>(API_URL, { headers });
  return response.data;
}

export const fetchEnrollment = async (): Promise<EnrollmentResponse> => {
    const API_URL = baseUrl + 'enrollment/list/'
    const response = await axios.get<EnrollmentResponse>(API_URL, { headers });
    return response.data;
}

export const updatedEnrollment = async (id: number, updatedEnrollment: Partial<Omit<EnrollmentInterface, 'id'>>): Promise<EnrollmentInterface> => {
  const API_URL = `${baseUrl}enrollment/actions/${id}/` 
  const response = await axios.put<EnrollmentInterface>(API_URL, updatedEnrollment, { headers });
  return response.data;
}

export const deleteEnrollment = async (id: number): Promise<EnrollmentInterface> => {
  const API_URL = `${baseUrl}enrollment/actions/${id}/`
  const response = await axios.delete<EnrollmentInterface>(API_URL, { headers });
  return response.data;
}
