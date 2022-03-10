import generateReducer from '../../app/reducerGenerator';

const { fetchStock: fetchStockPrice, reducer } = generateReducer('currentStockPrice', 'quote-short');

export { fetchStockPrice };
export default reducer;
