import axios, { Method } from 'axios';

import { isEmpty } from '@lib/index';

const client = axios.create({
    baseURL: process.env.API_BASE_URL,
});

client.defaults.timeout = 20000;
client.interceptors.response.use(
    (config) => config,
    (error: any) => {
        const expectedError =
            error.response && error.response.status >= 400 && error.response.status < 500;

        if (!expectedError) {
            console.log('🚀 ~ file: api.ts ~ line 18 ~ expectedError', expectedError);
        }
        if (error.response.status === 401) {
            //  TODO  store.dispatch(logout());
        }

        return Promise.reject(error);
    },
);

const call = async <T>(method: Method, url: string, data: any = {}): Promise<T> => {
    const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    };

    const request: any = { headers, method, url };

    if (!isEmpty(data)) {
        if (method === 'get') {
            request.params = data;
        } else {
            request.data = data;
        }
    }

    try {
        const response = await client(request);
        return Promise.resolve(response.data);
    } catch (error: any) {
        let err = null;
        if (error.response) {
            err = error.response;
        } else if (error.request) {
            err = { message: error.request._response };
        } else {
            err = error;
        }
        return Promise.reject(err);
    }
};

const file = async <T>(
    url: string,
    data: FormData,
    onUploadProgress?: ((event: ProgressEvent) => void) | undefined,
): Promise<T> => {
    try {
        const headers = {
            Accept: 'application/json',
        };
        client.defaults.headers.common['Content-Type'] = 'multipart/form-data';
        const response = await client({
            url,
            data,
            method: 'post',
            headers,
            onUploadProgress,
        });

        return Promise.resolve(response.data);
    } catch (error: any) {
        return Promise.reject(error.response);
    }
};
export default {
    delete: <T, D = any>(url: string, data?: D | null) => call<T>('delete', url, data),
    get: <T, D = any>(url: string, data?: D | null) => call<T>('get', url, data),
    patch: <T, D = any>(url: string, data?: D | null) => call<T>('patch', url, data),
    post: <T, D = any>(url: string, data?: D | null) => call<T>('post', url, data),
    put: <T, D = any>(url: string, data?: D | null) => call<T>('put', url, data),
    file: <T>(
        url: string,
        data: FormData,
        onUploadProgress: ((event: ProgressEvent) => void) | undefined,
    ) => file<T>(url, data, onUploadProgress),
};
