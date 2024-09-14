export interface Project {
    id: string;
    name: string;
}

export interface BaseResponse<T> {
    ok: boolean,
    result: T
}

export interface Credentials {
    login: string;
    password: string;
}

export interface LoginResult {
    accessToken: string
}

export interface ProjectData {
    name: string,
    isEnabled: boolean,
    acceptNewVisits: boolean,
    imageType: number
}

export interface CreateProjectResponse {
    projectId: string
}