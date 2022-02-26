import { ChainId } from '@pancakeswap/sdk'
import fetchNftInfoDevelopmentJSON from './fetchNftInfo.development.json'
import fetchNftInfoProductionJSON from './fetchNftInfo.production.json'
import getCollectionApiDevelopmentJSON from './getCollectionApi.development.json'
import getCollectionApiProductionJSON from './getCollectionApi.production.json'
import getCollectionsApiDevelopmentJSON from './getCollectionsApi.development.json'
import getCollectionsApiProductionJSON from './getCollectionsApi.production.json'

const chainId = process.env.REACT_APP_CHAIN_ID


const fetchNftInfoDevelopment = {
  [ChainId.MAINNET]: fetchNftInfoProductionJSON,
  [ChainId.TESTNET]: fetchNftInfoDevelopmentJSON,
}
export const FETCH_NFT_INFO_DEVELOPMENT_DATA = fetchNftInfoDevelopment[chainId]

const getCollectionApiProduction = {
  [ChainId.MAINNET]: getCollectionApiProductionJSON,
  [ChainId.TESTNET]: getCollectionApiDevelopmentJSON,
}
export const GET_COLLECTION_API_PRODUCTION_DATA = getCollectionApiProduction[chainId]

const getCollectionsApiProduction = {
  [ChainId.MAINNET]: getCollectionsApiProductionJSON,
  [ChainId.TESTNET]: getCollectionsApiDevelopmentJSON,
}
export const GET_COLLECTIONS_API_PRODUCTION_DATA = getCollectionsApiProduction[chainId]