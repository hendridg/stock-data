const abbreviations = [
  'MSFT',
  'GOOGL',
  'AAPL',
  'AMZN',
  'TSLA',
  'FB',
];

const getStockData = async (endpoint) => {
  const stockData = [];

  /* for (const company of abbreviations) {
    const baseURL = `https://financialmodelingprep.com/api/v3/${endpoint}/${company}?apikey=52fdd430ffd03a27128580af9ddc7381`;
    console.log(baseURL);
    const response = await fetch(baseURL);
    const info = await response.json();
    console.log(info);
    stockData.push(info);
  } */

  await Promise.all(abbreviations.map(async (company) => {
    const baseURL = `https://www.financialmodelingprep.com/api/v3/${endpoint}/${company}?apikey=52fdd430ffd03a27128580af9ddc7381`;
    console.log(baseURL);
    const response = await fetch(baseURL);
    const info = await response.json();
    console.log(info);
    stockData.push(info);
  }));

  /* abbreviations.map(async (company) => {
    const baseURL = `https://www.financialmodelingprep.com/api/v3/${endpoint}/${company}?apikey=52fdd430ffd03a27128580af9ddc7381`;
    console.log(baseURL);
    const response = await fetch(baseURL);
    const info = await response.json();
    console.log(info);
    stockData.push(info);
  }); */

  console.log(stockData);
  return stockData;
};

export default getStockData;
