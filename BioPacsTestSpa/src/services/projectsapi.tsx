import axios, { AxiosResponse } from 'axios';
import { apiUrl } from '../settings';
import { BaseResponse, CreateProjectResponse, LoginResult, Project, ProjectData } from '../types';

const getAuthorizationKey = () => localStorage.getItem('bearer');
const getAuthorizationHeaders = () => ({
    "Access-Control-Allow-Origin": "*",
        "Authorization": `Bearer ${getAuthorizationKey()}`
});

export const getProjects = () => axios.get<BaseResponse<Project[]>>(`${apiUrl}/Projects`,
    {
        headers: getAuthorizationHeaders()
    });

export async function authentication(login: string, password: string) : Promise<AxiosResponse<BaseResponse<LoginResult>>> {
    return await axios.post<BaseResponse<LoginResult>>(`${apiUrl}/Authentication?login=${login}&password=${password}`);
}

export const createProject = async (project: ProjectData): Promise<AxiosResponse<BaseResponse<CreateProjectResponse>>> => {
    return await axios.post<BaseResponse<LoginResult>>(`${apiUrl}/Project`, project, { headers: getAuthorizationHeaders() });
};
