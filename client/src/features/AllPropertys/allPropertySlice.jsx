import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { getAllPropertysThunk } from './allPropertyThunk';

// const initialFiltersState = {
//   search: '',
//   sort: 'latest',
//   sortOptions: ['Mais recente', 'Mais antigo', 'a-z', 'z-a'],
// };

const initialState = {
  isLoading: true,
  propertys: [],
};

export const getAllPropertys = createAsyncThunk(
  'allPropertys/getPropertys',
  getAllPropertysThunk,
);

const allPropertysSlice = createSlice({
  name: 'allPropertys',
  initialState,
  reducers: {
    showLoading: (state) => {
      state.isLoading = true;
    },
    hideLoading: (state) => {
      state.isLoading = false;
    },
  },
  extraReducers: {
    [getAllPropertys.pending]: (state) => {
      state.isLoading = true;
    },
    [getAllPropertys.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.propertys = payload;
    },
    [getAllPropertys.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
  },
});

export const { showLoading, hideLoading, handleChange } =
  allPropertysSlice.actions;

export default allPropertysSlice.reducer;
