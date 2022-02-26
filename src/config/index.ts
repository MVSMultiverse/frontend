import { ChainId } from '@pancakeswap/sdk'
import BigNumber from 'bignumber.js/bignumber'
import { BIG_TEN } from 'utils/bigNumber'
import { API_GATEWAY } from 'config/constants/endpoints'

BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

export const BSC_BLOCK_TIME = 3

export const BASE_BSC_SCAN_URLS = {
  [ChainId.MAINNET]: 'https://bscscan.com',
  [ChainId.TESTNET]: 'https://testnet.bscscan.com',
}

// CAKE_PER_BLOCK details
// 40 CAKE is minted per block
// 20 CAKE per block is sent to Burn pool (A farm just for burning cake)
// 10 CAKE per block goes to CAKE syrup pool
// 9 CAKE per block goes to Yield farms
// CAKE_PER_BLOCK in config/index.ts = 40 as we only change the amount sent to the burn pool which is effectively a farm.
// CAKE/Block in src/views/Home/components/CakeDataRow.tsx = 15 (40 - Amount sent to burn pool)
export const CAKE_PER_BLOCK = 40
export const BLOCKS_PER_YEAR = (60 / BSC_BLOCK_TIME) * 60 * 24 * 365 // 10512000
export const CAKE_PER_YEAR = CAKE_PER_BLOCK * BLOCKS_PER_YEAR
export const BASE_URL = 'https://mvscoin.org'
export const PANCAKE_BASE_URL = 'https://pancakeswap.finance'
export const BASE_ADD_LIQUIDITY_URL = `${BASE_URL}/add`
export const BASE_BSC_SCAN_URL = BASE_BSC_SCAN_URLS[ChainId.MAINNET]
export const DEFAULT_TOKEN_DECIMAL = BIG_TEN.pow(18)
export const DEFAULT_GAS_LIMIT = 200000
export const AUCTION_BIDDERS_TO_FETCH = 500
export const RECLAIM_AUCTIONS_TO_FETCH = 500
export const AUCTION_WHITELISTED_BIDDERS_TO_FETCH = 500
export const IPFS_GATEWAY = 'https://ipfs.io/ipfs'
// In reality its 10000 because of fast refresh, a bit less here to cover for possible long request times
export const PANCAKE_BUNNIES_UPDATE_FREQUENCY = 8000

export const NFTPOOL_BANNER = 'https://d2tauiodk94ll0.cloudfront.net/frontend/mvs-pool-banner.png'
export const DIVIDENDPOOL_BANNER = 'https://d2tauiodk94ll0.cloudfront.net/frontend/sr-ssr-banner.png'
export const TO_DIVIDENDPOOL_BACKGROUND = 'https://d2tauiodk94ll0.cloudfront.net/frontend/sr-ssr-banner.png'
export const NFTMARKET_SLIDES = [
  'https://d2tauiodk94ll0.cloudfront.net/frontend/nft-market-s1.png',
  'https://d2tauiodk94ll0.cloudfront.net/frontend/nft-market-b3.png',
  'https://d2tauiodk94ll0.cloudfront.net/frontend/nft-market-b7.png',
]

export const NFT_FILTER = {
  R: [1, 4],
  SR: [2, 5],
  SSR: [3, 6],
}

export const X_API_KEY = "tb1Q4gzmX1iievJzhoXpOkL82Q00PKyKpB6GbpfBqnT8amg8cs7PgK1x98We09Q0"
export const FETCH_PRICE = (address: string) => `https://deep-index.moralis.io/api/v2/erc20/${address}/price?chain=bsc&exchange=pancakeswap`

const chainId = process.env.REACT_APP_CHAIN_ID
export const APPLICATION_ID = {
  [ChainId.MAINNET]: 'mH9aSXjjbpI8sROBj6W3XWH3MysK0kcz98zGGaQj',
  [ChainId.TESTNET]: 'WCobjWUIzreJxJoTxM9nXAKUBztF2utzkgZeNjiE',
}
export const BASE_BAPI_GATEWAY_URL = (str) => `${API_GATEWAY}/${str}?_ApplicationId=${APPLICATION_ID[chainId]}`