import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { getAllPropertysThunk } from './allPropertyThunk';

const initialFiltersState = {
  search: '',
  sort: 'latest',
  sortOptions: ['Mais recente', 'Mais antigo', 'a-z', 'z-a'],
};

const initialState = {
  isLoading: true,
  travels: [],
  totalTravels: 0,
  numOfPages: 1,
  page: 1,
  monthlyApplications: [],
  ...initialFiltersState,
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
    handleChange: (state, { payload: { name, value } }) => {
      state.page = 1;
      state[name] = value;
    },
    clearFilters: (state) => {
      return { ...state, ...initialFiltersState };
    },
    clearAllTravelsState: (state) => initialState,
  },
  extraReducers: {
    [getAllPropertys.pending]: (state) => {
      state.isLoading = true;
    },
    [getAllPropertys.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.propertys = payload.propertys;
      state.numOfPages = payload.numOfPages;
      state.totalPropertys = payload.totalPropertys;
    },
    [getAllPropertys.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
  },
});

export const {
  showLoading,
  hideLoading,
  handleChange,
  clearFilters,
  clearAllTravelsState,
} = allPropertysSlice.actions;

export default allPropertysSlice.reducer;
