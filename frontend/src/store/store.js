import { configureStore } from '@reduxjs/toolkit';
import idGeneratorReducer from './idGeneratorSlice';
import characterCounterReducer from './characterCounterSlice';

const store = configureStore({
  reducer: {
    idGenerator: idGeneratorReducer,
    characterCounter: characterCounterReducer,
  },
});

export default store;