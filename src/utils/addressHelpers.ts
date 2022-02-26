import { ChainId } from '@pancakeswap/sdk'
import addresses from 'config/constants/contracts'
import { Address } from 'config/constants/types'

export const getAddress = (address: Address): string => {
  const chainId = process.env.REACT_APP_CHAIN_ID
  return address[chainId] ? address[chainId] : address[ChainId.MAINNET]
}

export const getMasterChefAddress = () => {
  return getAddress(addresses.masterChef)
}

export const getMulticallAddress = () => {
  return getAddress(addresses.multiCall)
}

export const getCakeVaultAddress = () => {
  return getAddress(addresses.cakeVault)
}

export const getChainlinkOracleAddress = () => {
  return getAddress(addresses.chainlinkOracle)
}

/**
 * @returns the address of the deployed contract
 */
export const getNftMarketAddress = () => {
  return localStorage.getItem('Dev_nftMarketAddress') || getAddress(addresses.nftMarket)
}

export const getMvsTokenAddress = () => {
  return localStorage.getItem('Dev_mvsTokenAddress') || getAddress(addresses.mvsToken)
}

export const getMvsNftAddress = () => {
  return localStorage.getItem('Dev_mvsNFTAddress') || getAddress(addresses.mvsNft)
}

export const getMvsNftPoolAddress = () => {
  return localStorage.getItem('Dev_mvsNftPoolAddress') || getAddress(addresses.mvsNftPool)
}

export const getmvsDividendPoolAddress = () => {
  return localStorage.getItem('Dev_mvsDividendPoolAddress') || getAddress(addresses.mvsDividendPool)
}

export const getmvsDividendPoolUpgradeableAddress = () => {
  return localStorage.getItem('Dev_mvsDividendPoolUpgradeableAddress') || getAddress(addresses.mvsDividendPoolUpgradeable)
}

export const getMvsBlindBox01Address = () => {
  return localStorage.getItem('Dev_mvsbBindBox01Address') || getAddress(addresses.mvsBlindBox01)
}

export const getMvsBlindBox02Address = () => {
  return localStorage.getItem('Dev_mvsbBindBox02Address') || getAddress(addresses.mvsBlindBox02)
}

export const getMvsBlindBox03Address = () => {
  return localStorage.getItem('Dev_mvsbBindBox03Address') || getAddress(addresses.mvsBlindBox03)
}

export const getMvsBlindBox04Address = () => {
  return localStorage.getItem('Dev_mvsbBindBox04Address') || getAddress(addresses.mvsBlindBox04)
}
