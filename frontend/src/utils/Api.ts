import axios, { AxiosRequestConfig, AxiosResponse,  } from 'axios';
import { toast } from 'react-toastify';
 

interface RequestOptions {
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
    url: string;
    data?: any;
    config?: AxiosRequestConfig;
}

export interface ApiResponse {
    data: any;
    status: number;
    statusText: string;
    headers: any;
    config: AxiosRequestConfig;
}

const api = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
        'Content-Type': 'application/json',
    },
});

const handleApiRequest = async (
    method: RequestOptions['method'],
    url: RequestOptions['url'],
    data?: RequestOptions['data'],
    config?: RequestOptions['config']
): Promise<ApiResponse> => {
    try {
        const response: AxiosResponse = await api({
            method,
            url,
            data,
            ...config,
        });

        return response;
    } catch (error: any) {

        const { response }: { response: AxiosResponse } = error;
        if (response) {
            if (response.data.error?.error) {
                toast.error(response.data.error.error,)
                throw new Error(response.data.error.error)
            }
            throw new Error(response.data.message || response.statusText);
        } else {
            throw new Error('Network error. Please try again later.');
        }
    }
};

const get = async (
    url: RequestOptions['url'],
    config?: RequestOptions['config']
): Promise<ApiResponse> => {

    return handleApiRequest('GET', url, null, config);
};

const post = async (
    url: RequestOptions['url'],
    data: RequestOptions['data'],
    config?: RequestOptions['config']
): Promise<ApiResponse> => {
    return handleApiRequest('POST', url, data, config);
};

const put = async (
    url: RequestOptions['url'],
    data: RequestOptions['data'],
    config?: RequestOptions['config']
): Promise<ApiResponse> => {
    return handleApiRequest('PUT', url, data, config);
};

const patch = async (
    url: RequestOptions['url'],
    data: RequestOptions['data'],
    config?: RequestOptions['config']
): Promise<ApiResponse> => {
    return handleApiRequest('PATCH', url, data, config);
};

const deleteRequest = async (
    url: RequestOptions['url'],
    data?: RequestOptions['data'],
    config?: RequestOptions['config']
): Promise<ApiResponse> => {
    return handleApiRequest('DELETE', url, data, config);
};

export { get, post, put, patch, deleteRequest };