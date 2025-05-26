import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { uploadCsv } from '../services/apiService';

// Async thunk for uploading CSV files
export const uploadCsvAsync = createAsyncThunk(
  'csvUploader/uploadCsv',
  async (file, { rejectWithValue }) => {
    try {
      return await uploadCsv(file);
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to upload CSV file');
    }
  }
);

const initialState = {
  uploadResult: null,
  loading: false,
  error: ''
};

const csvUploaderSlice = createSlice({
  name: 'csvUploader',
  initialState,
  reducers: {
    clearCsvUploaderError: (state) => {
      state.error = '';
    },
    clearResult: (state) => {
      state.uploadResult = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadCsvAsync.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(uploadCsvAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.uploadResult = action.payload;
      })
      .addCase(uploadCsvAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to upload CSV file';
      });
  }
});

export const { clearCsvUploaderError, clearResult, setError } = csvUploaderSlice.actions;
export default csvUploaderSlice.reducer;