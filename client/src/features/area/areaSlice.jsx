import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
// import { getUserFromLocalStorage } from '../../utils/localStorage';
import {
  createAreaThunk,
  deleteAreaThunk,
  editAreaThunk,
  getAllAreasThunk,
  getOneAreaThunk,
} from './areaThunk';
const initialState = {
  isLoading: false,
  name: '',
  species: '',
  variety: '',
  driving_system: '',
  rookstock_type: '',
  cultivated_area: 0,
  geographic_coordinates: '',
  implementation_date: '',
  number_rows: 0,
  distance_between_rows: 0,
  distance_between_plants: 0,
  number_plants: 0,
  isEditing: false,
  property_id: '',
  areaId: '',
  areas: [],
  selectedAreaData: '',
  selectedAreaName: '',
};

export const getAllAreas = createAsyncThunk('area/getAreas', getAllAreasThunk);

export const getOneArea = createAsyncThunk('area/getArea', getOneAreaThunk);

export const createArea = createAsyncThunk('area/createArea', createAreaThunk);

export const deleteArea = createAsyncThunk('area/deleteArea', deleteAreaThunk);

export const editArea = createAsyncThunk('area/editArea', editAreaThunk);

const areaSlice = createSlice({
  name: 'area',
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
    setEditArea: (state, { payload }) => {
      return { ...state, isEditing: true, ...payload };
    },
  },

  // Manipuladores de ações assíncronas
  extraReducers: (builder) => {
    builder
      .addCase(createArea.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createArea.fulfilled, (state) => {
        state.isLoading = false;
        toast.success('Area criada');
      })
      .addCase(createArea.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(deleteArea.fulfilled, (state, { payload }) => {
        toast.success('Area excluída..');
      })
      .addCase(deleteArea.rejected, (state, { payload }) => {
        toast.error(payload);
      })
      .addCase(editArea.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editArea.fulfilled, (state) => {
        state.isLoading = false;
        toast.success('Area modificada...');
      })
      .addCase(editArea.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(getAllAreas.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllAreas.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.areas = payload;
      })
      .addCase(getAllAreas.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(getOneArea.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOneArea.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.selectedAreaData = payload;
      })
      .addCase(getOneArea.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      });
  },
});

export const {
  handleChange,
  clearValues,
  setEditArea,
  showLoading,
  hideLoading,
} = areaSlice.actions;

export default areaSlice.reducer;
