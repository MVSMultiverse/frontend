import { ethers } from 'ethers'
import { simpleRpcProvider } from 'utils/providers'
import tokens from 'config/constants/tokens'

// Addresses
import {
  getMulticallAddress,
  getMasterChefAddress,
  getNftMarketAddress,
  getMvsTokenAddress,
  getMvsNftPoolAddress,
  getMvsBlindBox01Address,
  getMvsNftAddress,
  getmvsDividendPoolAddress,
  getmvsDividendPoolUpgradeableAddress,
  getMvsBlindBox02Address,
  getMvsBlindBox03Address,
  getMvsBlindBox04Address,
} from 'utils/addressHelpers'

// ABI
import cakeAbi from 'config/abi/cake.json'
import masterChef from 'config/abi/masterchef.json'
import MultiCallAbi from 'config/abi/Multicall.json'

import bep20Abi from 'config/abi/erc20.json'
import erc721Abi from 'config/abi/erc721.json'
import erc721CollctionAbi from 'config/abi/erc721collection.json'

import nftMarketAbi from 'config/abi/nftMarket.json'
import mvsTokenAbi from 'config/abi/mvsToken.json'
import mvsNftAbi from 'config/abi/mvsNft.json'
import mvsBlindBoxAbi from 'config/abi/mvsBlindBox.json'
import mvsBlindBox02Abi from 'config/abi/mvsBlindBox02.json'
import mvsNftPoolAbi from 'config/abi/mvsNftPool.json'
import mvsDividendPoolAbi from 'config/abi/mvsDividendPool.json'
import mvsDividendPoolUpgradeableAbi from 'config/abi/mvsDividendPoolUpgradeable.json'

const getContract = (abi: any, address: string, signer?: ethers.Signer | ethers.providers.Provider) => {
  const signerOrProvider = signer ?? simpleRpcProvider
  return new ethers.Contract(address, abi, signerOrProvider)
}
export const getBep20Contract = (address: string, signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(bep20Abi, address, signer)
}
export const getErc721Contract = (address: string, signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(erc721Abi, address, signer)
}

export const getCakeContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(cakeAbi, tokens.cake.address, signer)
}

export const getMulticallContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(MultiCallAbi, getMulticallAddress(), signer)
}

export const getErc721CollectionContract = (signer?: ethers.Signer | ethers.providers.Provider, address?: string) => {
  return getContract(erc721CollctionAbi, address, signer)
}

export const getMasterchefContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(masterChef, getMasterChefAddress(), signer)
}

/**
 * @returns the address of the deployed contract
 */
export const getNftMarketContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(nftMarketAbi, getNftMarketAddress(), signer)
}

export const getMvsTokenContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(mvsTokenAbi, getMvsTokenAddress(), signer)
}

export const getMvsNftContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  const signerOrProvider = signer ?? simpleRpcProvider
  return getContract(mvsNftAbi, getMvsNftAddress(), signerOrProvider)
}

export const getMvsBlindBox01Contract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  const signerOrProvider = signer ?? simpleRpcProvider
  return getContract(mvsBlindBoxAbi, getMvsBlindBox01Address(), signerOrProvider)
}

export const getMvsBlindBox02Contract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  const signerOrProvider = signer ?? simpleRpcProvider
  return getContract(mvsBlindBox02Abi, getMvsBlindBox02Address(), signerOrProvider)
}

export const getMvsBlindBox03Contract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  const signerOrProvider = signer ?? simpleRpcProvider
  return getContract(mvsBlindBox02Abi, getMvsBlindBox03Address(), signerOrProvider)
}

export const getMvsBlindBox04Contract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  const signerOrProvider = signer ?? simpleRpcProvider
  return getContract(mvsBlindBox02Abi, getMvsBlindBox04Address(), signerOrProvider)
}

export const getMvsNftPoolContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  const signerOrProvider = signer ?? simpleRpcProvider
  return getContract(mvsNftPoolAbi, getMvsNftPoolAddress(), signerOrProvider)
}

export const getMvsDividendPoolContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  const signerOrProvider = signer ?? simpleRpcProvider
  return getContract(mvsDividendPoolAbi, getmvsDividendPoolAddress(), signerOrProvider)
}

export const getMvsDividendPoolUpgradeableContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  const signerOrProvider = signer ?? simpleRpcProvider
  return getContract(mvsDividendPoolUpgradeableAbi, getmvsDividendPoolUpgradeableAddress(), signerOrProvider)
}
