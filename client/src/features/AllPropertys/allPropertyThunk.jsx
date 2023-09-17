import customFetch, { checkForUnauthorizedResponse } from '../../utils/axios';

export const getAllPropertysThunk = async (_, thunkAPI) => {
  let url = `/property/user`;
  try {
    const resp = await customFetch.get(url);
    // console.log(resp);
    return resp.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};
