import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  statusHome: 'idle',
  resultData: [],
  currentPage: 'home',
};

export const fetchCurrentStock = createAsyncThunk(
  'home/fetchCurrentStock',
  async (url) => {
    const response = await fetch(url)
      .then((res) => res.json());
    return response;
  },
);

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    page: (state, action) => ({
      ...state,
      currentPage: action.payload,
    }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentStock.pending, (state) => ({
        ...state,
        statusHome: 'loading',
      }))
      .addCase(fetchCurrentStock.fulfilled, (state, action) => {
        let obj = {};
        const data = action.payload[0];
        if (action.payload[0]) {
          const {
            symbol: company,
            price: stockPrice,
            volume: stockVolume,
          } = data;
          const newData = {
            company,
            stockPrice,
            stockVolume,
          };
          console.log('one dispatch', newData);
          obj = {
            ...state,
            resultData: [...state.resultData, newData],
            statusHome: 'fulfilled',
          };
        } else {
          const urlString = action.meta.arg;
          const companyStr = urlString.substr(0, urlString.indexOf('?')).substr(53);
          console.log(companyStr);
          const newData = {
            company: companyStr,
            stockPrice: 'currently not available',
            stockVolume: 'please try again',
          };
          console.log(action.payload);
          obj = {
            ...state,
            resultData: [...state.resultData, newData],
            statusHome: 'fulfilled',
          };
        }
        return obj;
      });
  },
});

export const selectResultData = (state) => state.home.resultData;
export const selectStatusHome = (state) => state.home.statusHome;
export const selectTotal = (state) => state.home.total;
export const selectPageState = (state) => state.home.currentPage;

export const { page } = homeSlice.actions;

export default homeSlice.reducer;
