import { getResponseNewsData } from '@interfaces/news/news.interface';
import { getResponseUsersDataType } from '@interfaces/users';

import { getResponseReporterDataType } from './../interfaces/reporter/index';
import api from './api';

const gets = {
    getNews: () => api.get<getResponseNewsData[]>('news'),

    getReporters: () => api.get<getResponseReporterDataType[]>('person'),
    getReporterById: (id?: string | string[]) =>
        api.get<getResponseReporterDataType>(`person/${id}`),
    deleteReporter: (id: string) => api.delete(`person/${id}`),
};

const users = {
    getUsers: () => api.get<getResponseUsersDataType[]>('user'),
    getUserById: (id?: string | string[]) => api.get<getResponseUsersDataType>(`user/${id}`),
    deleteUserById: (id: string) => api.delete(`user/${id}`),
};
const posts = {
    postSignup: (data: any) => api.post('signup', data),
};
export default {
    ...gets,
    ...posts,
    ...users,
};
