import { baseUrl, headers } from '@app/utils/apiConfig';
import axios from 'axios';


export interface DashboardData {
    all_users: number;
    all_subjects: number;
    all_academic: number;
    all_enrollment: number;
}

export interface DashboardResponse {
    code_transaction: string;
    data: DashboardData;
}

export const fetchGetCountModel = async (): Promise<any> => {
    const API_URL = baseUrl + 'get_all_model/'
    const response = await axios.get<DashboardResponse>(API_URL, { headers });
    return response.data;
}
