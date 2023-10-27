import { showLoading, hideLoading } from '../crop/cropSlice';
import customFetch, { checkForUnauthorizedResponse } from '../../utils/axios';
import { clearValues, getAllCrops } from './cropSlice';

export const createCropThunk = async ({ area_id, crop }, thunkAPI) => {
  console.log(crop);
  try {
    const resp = await customFetch.post(`/crop/${area_id}`, crop);
    thunkAPI.dispatch(clearValues());
    thunkAPI.dispatch(getAllCrops(area_id));
    return resp.data.msg;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};
export const deleteCropThunk = async ({ id, area_id }, thunkAPI) => {
  thunkAPI.dispatch(showLoading());
  try {
    const resp = await customFetch.delete(`/crop/${id}/area/${area_id}`);
    thunkAPI.dispatch(getAllCrops(area_id));
    return resp.data.msg;
  } catch (error) {
    thunkAPI.dispatch(hideLoading());
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};
export const editCropThunk = async ({ crop_id, area_id, area }, thunkAPI) => {
  try {
    const resp = await customFetch.put(
      `/crop/${crop_id}/area/${area_id}`,
      area,
    );
    thunkAPI.dispatch(clearValues());
    thunkAPI.dispatch(getAllCrops(area_id));
    return resp.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

export const getAllCropsThunk = async (areaId, thunkAPI) => {
  let url = `/crop/${areaId}`;
  try {
    const resp = await customFetch.get(url);
    // console.log(resp.data);
    return resp.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

export const getOneCropThunk = async ({ property_id, area_id }, thunkAPI) => {
  let url = `/crop/${property_id}/area/${area_id}`;
  try {
    const resp = await customFetch.get(url);
    return resp.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};
