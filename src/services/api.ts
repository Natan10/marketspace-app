import axios from 'axios';


export const api = axios.create({
	baseURL: 'http://localhost:8000/v1',
});

export const staticURI = api.defaults.baseURL?.split('/v1')[0];