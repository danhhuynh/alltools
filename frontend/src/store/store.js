import { configureStore } from '@reduxjs/toolkit';
import idGeneratorReducer from './idGeneratorSlice';
import characterCounterReducer from './characterCounterSlice';
import csvUploaderReducer from './csvUploaderSlice';

const store = configureStore({
  reducer: {
    idGenerator: idGeneratorReducer,
    characterCounter: characterCounterReducer,
    csvUploader: csvUploaderReducer,
  },
});

export default store;
