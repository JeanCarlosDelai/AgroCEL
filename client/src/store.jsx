import { configureStore } from '@reduxjs/toolkit';
import userSlice from './features/user/userSlice';
import propertySlice from './features/property/propertySlice';
import areaSlice from './features/area/areaSlice';
import cropSlice from './features/crop/cropSlice';
export const store = configureStore({
  reducer: {
    user: userSlice,
    property: propertySlice,
    area: areaSlice,
    crop: cropSlice,
  },
});
