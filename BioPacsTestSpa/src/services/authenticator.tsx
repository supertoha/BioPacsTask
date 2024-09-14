import axios, { AxiosResponse } from 'axios';
import { apiUrl } from '../settings';
import { BaseResponse, LoginResult } from '../types';

const getAuthorizationKey = (): string | null => localStorage.getItem('bearer');

export const getAuthorizationHeaders = () => ({
    "Access-Control-Allow-Origin": "*",
    "Authorization": `Bearer ${getAuthorizationKey()}`
});

export async function authentication(login: string, password: string): Promise<AxiosResponse<BaseResponse<LoginResult>>> {
    return await axios.post<BaseResponse<LoginResult>>(`${apiUrl}/Authentication?login=${login}&password=${password}`);
}

export async function isAuthorized(): Promise<AxiosResponse<boolean> | null> {
    try {
        return await axios.get<boolean>(`${apiUrl}/Authentication`, { headers: getAuthorizationHeaders() });
    } catch {
        return null;
    }
}


