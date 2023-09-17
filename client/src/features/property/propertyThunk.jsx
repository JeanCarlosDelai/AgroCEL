import {
  showLoading,
  hideLoading,
  getAllPropertys,
} from '../AllPropertys/allPropertySlice';
import customFetch, { checkForUnauthorizedResponse } from '../../utils/axios';
import { clearValues } from './propertySlice';

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
    thunkAPI.dispatch(getAllPropertys());
    return resp.data.msg;
  } catch (error) {
    thunkAPI.dispatch(hideLoading());
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};
export const editPropertyThunk = async ({ propertyId, property }, thunkAPI) => {
  try {
    const resp = await customFetch.put(`/property/${propertyId}`, property);
    thunkAPI.dispatch(clearValues());
    return resp.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};
