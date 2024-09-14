import axios from 'axios';
import { apiUrl } from '../settings';
import { BaseResponse, Project } from '../types';

const getAuthorizationKey = () => localStorage.getItem('bearer');
const getAuthorizationHeaders = () => ({
    "Access-Control-Allow-Origin": "*",
        "Authorization": `Bearer ${getAuthorizationKey()}`
});

export const getProjects = () => axios.get<BaseResponse<Project[]>>(apiUrl,
    {
        headers: getAuthorizationHeaders()
    });