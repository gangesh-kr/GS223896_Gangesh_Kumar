import { configureStore } from '@reduxjs/toolkit';
import storeReducer from './storeSlice';
import skuReducer from './skuSlice';
import planningReducer from './planningSlice';
import calendarReducer from './calendarSlice';

export const store = configureStore({
  reducer: {
    stores: storeReducer,
    skus: skuReducer,
    planning: planningReducer,
    calendar: calendarReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;