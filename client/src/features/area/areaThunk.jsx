import { showLoading, hideLoading, getAllAreas } from '../area/areaSlice';
import customFetch, { checkForUnauthorizedResponse } from '../../utils/axios';
import { clearValues } from './areaSlice';
// import {
//   removePropertyFromLocalStorage,
//   addPropertyToLocalStorage,
// } from '../../utils/localStorage';

export const createAreaThunk = async (propertyId, area, thunkAPI) => {
  try {
    const resp = await customFetch.post(`/area/${propertyId}`, area);
    thunkAPI.dispatch(clearValues());
    return resp.data.msg;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};
export const deleteAreaThunk = async ({ id, property_id }, thunkAPI) => {
  thunkAPI.dispatch(showLoading());
  try {
    const resp = await customFetch.delete(`/area/${property_id}/delete/${id}`);
    return resp.data.msg;
  } catch (error) {
    thunkAPI.dispatch(hideLoading());
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};
export const editAreaThunk = async ({ areaId, area }, propertyId, thunkAPI) => {
  try {
    const resp = await customFetch.put(
      `/area/${propertyId}/put/${areaId}`,
      area,
    );
    thunkAPI.dispatch(clearValues());
    window.location.reload();
    return resp.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

export const getAllAreasThunk = async (propertyId, thunkAPI) => {
  let url = `/area/${propertyId}`;
  try {
    const resp = await customFetch.get(url);
    return resp.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};
