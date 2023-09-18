import { configureStore } from '@reduxjs/toolkit';
import userSlice from './features/user/userSlice';
import propertySlice from './features/property/propertySlice';
import areaSlice from './features/area/areaSlice';
export const store = configureStore({
  reducer: {
    user: userSlice,
    property: propertySlice,
    area: areaSlice,
  },
});
