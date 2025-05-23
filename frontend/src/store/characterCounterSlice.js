import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { countCharacters } from '../services/apiService';

// Async thunk for counting characters
export const countCharactersAsync = createAsyncThunk(
  'characterCounter/countCharacters',
  async (text, { rejectWithValue }) => {
    try {
      return await countCharacters(text);
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to count characters');
    }
  }
);

const initialState = {
  result: null,
  loading: false,
  error: ''
};

const characterCounterSlice = createSlice({
  name: 'characterCounter',
  initialState,
  reducers: {
    clearCharacterCounterError: (state) => {
      state.error = '';
    },
    clearCharacterCounterResult: (state) => {
      state.result = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(countCharactersAsync.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(countCharactersAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.result = action.payload;
      })
      .addCase(countCharactersAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to count characters';
      });
  }
});

export const { clearCharacterCounterError, clearCharacterCounterResult, setError } = characterCounterSlice.actions;
export default characterCounterSlice.reducer;
