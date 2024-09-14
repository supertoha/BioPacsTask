import axios, { AxiosResponse } from 'axios';
import { apiUrl } from '../settings';
import { BaseResponse, CreateProjectResponse, Project, ProjectData } from '../types';
import { getAuthorizationHeaders } from './authenticator';

export const getProjects = () => axios.get<BaseResponse<Project[]>>(`${apiUrl}/Projects`, { headers: getAuthorizationHeaders() });

export const getProject = (id: string) => axios.get<BaseResponse<Project>>(`${apiUrl}/Project?id=${id}`, { headers: getAuthorizationHeaders() });

export const createProject = async (project: ProjectData): Promise<AxiosResponse<BaseResponse<CreateProjectResponse>>> => {
    return await axios.post<BaseResponse<CreateProjectResponse>>(`${apiUrl}/Project`, project, { headers: getAuthorizationHeaders() });
};



