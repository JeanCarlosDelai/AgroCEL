import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import {
  createCropThunk,
  deleteCropThunk,
  editCropThunk,
  getAllCropsThunk,
  getOneCropThunk,
} from './cropThunk';

const initialState = {
  isLoading: false,
  name: '',
  species: '',
  quantity: 0,
  crop_date: '',
  crop_time: '',
  isEditing: false,
  property_id: '',
  areaId: '',
  areas: [],
  selectedAreaData: '',
  selectedAreaName: '',
};

export const getAllCrops = createAsyncThunk('crop/getCrops', getAllCropsThunk);

export const getOneCrop = createAsyncThunk('crop/getCrop', getOneCropThunk);

export const createCrop = createAsyncThunk('crop/createCrop', createCropThunk);

export const deleteCrop = createAsyncThunk('crop/deleteCrop', deleteCropThunk);

export const editCrop = createAsyncThunk('crop/editCrop', editCropThunk);

const cropSlice = createSlice({
  name: 'crop',
  initialState,
  reducers: {
    showLoading: (state) => {
      state.isLoading = true;
    },
    hideLoading: (state) => {
      state.isLoading = false;
    },
    handleChange: (state, { payload: { name, value } }) => {
      if (name === 'price') {
        value = parseFloat(value);
      }
      state[name] = value;
    },
    clearValues: () => {
      return {
        ...initialState,
      };
    },
    setEditCrop: (state, { payload }) => {
      return { ...state, isEditing: true, ...payload };
    },
  },

  // Manipuladores de ações assíncronas
  extraReducers: (builder) => {
    builder
      .addCase(createCrop.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCrop.fulfilled, (state) => {
        state.isLoading = false;
        toast.success('Area criada');
      })
      .addCase(createCrop.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(deleteCrop.fulfilled, () => {
        toast.success('Area excluída..');
      })
      .addCase(deleteCrop.rejected, (state, { payload }) => {
        toast.error(payload);
      })
      .addCase(editCrop.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editCrop.fulfilled, (state) => {
        state.isLoading = false;
        toast.success('Area modificada...');
      })
      .addCase(editCrop.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(getAllCrops.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllCrops.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.areas = payload;
      })
      .addCase(getAllCrops.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(getOneCrop.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOneCrop.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.selectedAreaData = payload;
      })
      .addCase(getOneCrop.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      });
  },
});

export const {
  handleChange,
  clearValues,
  setEditCrop,
  showLoading,
  hideLoading,
} = cropSlice.actions;

export default cropSlice.reducer;
