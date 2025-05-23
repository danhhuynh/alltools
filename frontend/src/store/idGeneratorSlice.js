import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { generateId } from '../services/apiService';

// Async thunk for generating IDs
export const generateIdAsync = createAsyncThunk(
  'idGenerator/generateId',
  async ({ type, prefix }, { rejectWithValue }) => {
    try {
      return await generateId(type, prefix);
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to generate ID');
    }
  }
);

const initialState = {
  generatedId: '',
  idType: '',
  loading: false,
  error: ''
};

const idGeneratorSlice = createSlice({
  name: 'idGenerator',
  initialState,
  reducers: {
    clearIdGeneratorError: (state) => {
      state.error = '';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(generateIdAsync.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(generateIdAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.generatedId = action.payload.id;
        state.idType = action.meta.arg.type;
      })
      .addCase(generateIdAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to generate ID';
      });
  }
});

export const { clearIdGeneratorError } = idGeneratorSlice.actions;
export default idGeneratorSlice.reducer;