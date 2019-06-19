const jsonFetch = url => fetch(url).then(res => res.json());

const ETHERSCAN_API_KEY = 'MCYN63TV6KGFD9V48VN1ZRNP2FGFEA7RER'

export const ethToUSD = async () => {
  const json = await jsonFetch(
    `https://api.etherscan.io/api?module=stats&action=ethprice&apikey=${ETHERSCAN_API_KEY}`
  );
  return json.result.ethusd;
};

export const eth24Hr = async () => {
  const json24Hrs = await jsonFetch(
    'https://min-api.cryptocompare.com/data/histohour?fsym=ETH&tsym=USD&limit=24'
  );

  const jsonCurrent = await jsonFetch(
    'https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD'
  )

  const return24Hr = jsonCurrent['USD'] / (json24Hrs['Data'][0]['close'])

  return return24Hr - 1;
}