import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { getUserFromLocalStorage } from '../../utils/localStorage';
import {
  createPropertyThunk,
  deletePropertyThunk,
  editPropertyThunk,
  getAllPropertysThunk,
} from './propertyThunk';
const initialState = {
  isLoading: false,
  name: '',
  city: '',
  state: '',
  total_area: 0,
  cultivated_area: 0,
  isEditing: false,
  propertyId: '',
  propertys: [],
};

export const getAllPropertys = createAsyncThunk(
  'property/getPropertys',
  getAllPropertysThunk,
);

export const createProperty = createAsyncThunk(
  'property/createProperty',
  createPropertyThunk,
);

export const deleteProperty = createAsyncThunk(
  'property/deleteProperty',
  deletePropertyThunk,
);

export const editProperty = createAsyncThunk(
  'property/editProperty',
  editPropertyThunk,
);

const propertySlice = createSlice({
  name: 'property',
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
        location: getUserFromLocalStorage()?.location || '',
      };
    },
    setEditProperty: (state, { payload }) => {
      return { ...state, isEditing: true, ...payload };
    },
  },

  // Manipuladores de ações assíncronas
  extraReducers: (builder) => {
    builder
      .addCase(createProperty.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createProperty.fulfilled, (state) => {
        state.isLoading = false;
        toast.success('Propriedade criada');
      })
      .addCase(createProperty.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(deleteProperty.fulfilled, (state, { payload }) => {
        toast.success('Propriedade excluída..');
      })
      .addCase(deleteProperty.rejected, (state, { payload }) => {
        toast.error(payload);
      })
      .addCase(editProperty.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editProperty.fulfilled, (state) => {
        state.isLoading = false;
        toast.success('Propriedade modificada...');
      })
      .addCase(editProperty.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(getAllPropertys.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllPropertys.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.propertys = payload;
      })
      .addCase(getAllPropertys.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      });
  },
});

export const {
  handleChange,
  clearValues,
  setEditProperty,
  showLoading,
  hideLoading,
} = propertySlice.actions;

export default propertySlice.reducer;
