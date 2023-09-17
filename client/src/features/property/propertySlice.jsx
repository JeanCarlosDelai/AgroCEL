import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { getUserFromLocalStorage } from '../../utils/localStorage';
import {
  createPropertyThunk,
  deletePropertyThunk,
  editPropertyThunk,
} from './propertyThunk';
const initialState = {
  isLoading: false,
  name: '',
  city: '',
  state: '',
  total_area: 0,
  cultivated_area: 0,
  isEditing: false,
  editPropertyId: '',
};

export const createProperty = createAsyncThunk(
  'propertyl/createProperty',
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
        toast.success('Viagem modificada...');
      })
      .addCase(editProperty.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      });
  },
});

export const { handleChange, clearValues, setEditProperty } =
  propertySlice.actions;

export default propertySlice.reducer;
