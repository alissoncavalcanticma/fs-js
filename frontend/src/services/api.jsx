import axios from 'axios';

import { getToken } from './auth';


const api = axios.create({
    baseURL: 'http://localhost:3000'
});

//Função para incluir o otken na request antes de executar
api.interceptors.request.use(async(config) => {
    const token = getToken();

    if(token){
        config.headers['x-access-token'] = token
    }

    return config;
})

export default api;