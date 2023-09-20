import { showLoading, hideLoading, getAllAreas } from '../area/areaSlice';
import customFetch, { checkForUnauthorizedResponse } from '../../utils/axios';
import { clearValues } from './areaSlice';
// import {
//   removePropertyFromLocalStorage,
//   addPropertyToLocalStorage,
// } from '../../utils/localStorage';

export const createAreaThunk = async ({ property_id, area }, thunkAPI) => {
  try {
    const resp = await customFetch.post(`/area/${property_id}`, area);
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
export const editAreaThunk = async (
  { property_id, areaId, area },
  thunkAPI,
) => {
  console.log(areaId);
  try {
    const resp = await customFetch.put(
      `/area/${property_id}/put/${areaId}`,
      area,
    );
    thunkAPI.dispatch(clearValues());
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

export const getOneAreaThunk = async ({ property_id, area_id }, thunkAPI) => {
  let url = `/area/${property_id}/property/${area_id}`;
  try {
    const resp = await customFetch.get(url);
    return resp.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};
