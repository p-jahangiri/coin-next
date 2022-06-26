import api from './api';

const uploadFile = {};

const home = {
    home: () => api.get('/home'),
};

export default {
    ...uploadFile,
    ...home,
};
