export interface Project extends ProjectData {
    id: string;
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
    imageType: ImageType
}

export interface CreateProjectResponse {
    projectId: string
}

export enum ImageType {
    None = 0,
    Jpg = 1,
    DICOM = 2
}

