import { createAsyncThunk, createReducer } from '@reduxjs/toolkit';
import getStockData from './handleAPI';

const generateReducer = (name, endpoint) => {
  const fetchStock = createAsyncThunk(
    `${name}/fetchStock`,
    async () => {
      const response = await getStockData(endpoint);
      return response;
    },
  );

  const reducer = createReducer({
    data: [],
    status: 'iddle',
  }, (builder) => {
    builder.addCase(fetchStock.fulfilled, (state, action) => ({
      data: action.payload,
      status: 'completed',
    }));
  });

  return { fetchStock, reducer };
};

export default generateReducer;
