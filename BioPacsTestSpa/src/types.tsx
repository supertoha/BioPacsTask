export interface Project {
    id: string;
    name: string;
}

export interface BaseResponse<T> {
    ok: boolean,
    result: T
}