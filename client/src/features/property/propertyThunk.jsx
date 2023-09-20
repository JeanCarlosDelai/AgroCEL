import {
  showLoading,
  hideLoading,
  getAllPropertys,
} from '../property/propertySlice';
import customFetch, { checkForUnauthorizedResponse } from '../../utils/axios';
import { clearValues } from './propertySlice';
import {
  removePropertyFromLocalStorage,
  addPropertyToLocalStorage,
} from '../../utils/localStorage';

export const createPropertyThunk = async (property, thunkAPI) => {
  try {
    const resp = await customFetch.post('/property', property);
    thunkAPI.dispatch(clearValues());
    return resp.data.msg;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};
export const deletePropertyThunk = async (propertyId, thunkAPI) => {
  thunkAPI.dispatch(showLoading());
  try {
    const resp = await customFetch.delete(`/property/${propertyId}`);
    removePropertyFromLocalStorage();
    window.location.reload();
    return resp.data.msg;
  } catch (error) {
    thunkAPI.dispatch(hideLoading());
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};
export const editPropertyThunk = async (
  { property_id, property },
  thunkAPI,
) => {
  try {
    const resp = await customFetch.put(`/property/${property_id}`, property);
    thunkAPI.dispatch(clearValues());
    addPropertyToLocalStorage(property_id, property.name);
    return resp.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

export const getAllPropertysThunk = async (_, thunkAPI) => {
  let url = `/property/user`;
  try {
    const resp = await customFetch.get(url);
    return resp.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};
