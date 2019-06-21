const jsonFetch = url => fetch(url).then(res => res.json());

export const ethToUSD = async () => {
  const json = await jsonFetch(
    `https://api.etherscan.io/api?module=stats&action=ethprice&apikey=${
      process.env.REACT_APP_ETHERSCAN_API_KEY
    }`
  );
  return json.result.ethusd;
};

export const eth24Hr = async () => {
  const json24Hrs = await jsonFetch(
    "https://min-api.cryptocompare.com/data/histohour?fsym=ETH&tsym=USD&limit=24"
  );

  const jsonCurrent = await jsonFetch(
    "https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD"
  );

  const return24Hr = jsonCurrent["USD"] / json24Hrs["Data"][0]["close"];

  return return24Hr - 1;
};

export const fetchPastTransactions = async address => {
  const jsonResult = await jsonFetch(
    `http://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&sort=asc&apikey=${
      process.env.REACT_APP_ETHERSCAN_API_KEY
    }`
  );

  const pastTen = jsonResult.result.reverse().slice(0, 10)

  return pastTen;
};
