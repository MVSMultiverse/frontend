import { FETCH_PRICE, X_API_KEY } from 'config/index'


export const fetchTickerPrice = async (): Promise<any[]> => {
  const address = [
    {
      address: "0x98afac3b663113d29dc2cd8c2d1d14793692f110",
      name: "Multiverse",
      symbol: "MVS"
    },
    {
      address: "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c",
      name: "Binance Coin",
      symbol: "BNB"
    }
  ]

  const fetchFun = async (item) => {
    try {
      const res = await fetch(FETCH_PRICE(item.address), {
        headers: { 'X-API-Key': X_API_KEY },
      })
      if (res.ok) {
        const json = await res.json()
        return {
          address: item.address,
          createdAt: "",
          decimals: 18,
          name: item.name,
          priceAt: "",
          symbol: item.symbol,
          usdPrice: json.usdPrice
        }

      }
      return {}
    } catch (error) {
      return {}
    }
  }

  const data = await Promise.all(address.map(it => fetchFun(it)))

  if (data) {
    return data
  }
  return []
}
