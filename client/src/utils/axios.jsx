import axios from 'axios';
import { clearStore } from '../features/user/userSlice';
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
    thunkAPI.dispatch(clearStore());
    return thunkAPI.rejectWithValue('Não autorizado! Deslogando...');
  }
  return thunkAPI.rejectWithValue(error.response.data.msg);
};

export const createProperty = async (property, thunkAPI) => {
  try {
    const response = await customFetch.post('/property', property);
    return response.data.msg;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

export const updateProperty = async ({ property_id, property }, thunkAPI) => {
  try {
    const response = await customFetch.put(
      `/property/${property_id}`,
      property,
    );
    addPropertyToLocalStorage(property_id, property.name);
    return response.data.msg;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

export const deletePropertys = async (property_id, thunkAPI) => {
  try {
    await customFetch.delete(`/property/${property_id}`);
    thunkAPI.dispatch(useFetchProperty());
    return resp.data.msg;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

export const getPropertys = async (_, thunkAPI) => {
  try {
    const response = await customFetch.get('/property/user');
    return response.data.msg;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

export const registerUser = async (url, user, thunkAPI) => {
  try {
    const response = await customFetch.post(url, user);
    return response.data.msg;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const loginUser = async (url, user, thunkAPI) => {
  try {
    const response = await customFetch.post(url, user);
    return response.data.msg;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const updateUser = async (url, user, thunkAPI) => {
  try {
    const response = await customFetch.put(url, user);
    return response.data.msg;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

export default customFetch;
