import axios from 'axios';
import config from '../../env.json';

const api = (method, API_NAME, data, token) => {
    return axios({ method: method, url: `${API_NAME}`})
        .then((res) => { return res; })
        .catch((err) => { throw err; });
}

export const getData = (endpoint,data) => api('get', endpoint, data).then((res) => { return res.data }).catch((err) => { throw err; });

export const postData = (endpoint,data) => api('post', endpoint, data).then((res) => { return res.data }).catch((err) => { throw err; });
