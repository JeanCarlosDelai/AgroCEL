import axios from 'axios';
import {
  getUserFromLocalStorage,
  getTokenFromLocalStorage,
} from './localStorage';

const customFetch = axios.create({
  baseURL: 'http://localhost:3333/',
});

customFetch.interceptors.request.use((config) => {
  const user = getUserFromLocalStorage();
  const token = getTokenFromLocalStorage();

  if (user && token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

export const checkForUnauthorizedResponse = (error, thunkAPI) => {
  if (error.response.status === 401) {
    return thunkAPI.rejectWithValue('Não autorizado! Deslogando...');
  }
  return thunkAPI.rejectWithValue(error.response.data.msg);
};

export default customFetch;
