import { useMemo } from 'react'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import {
  getBep20Contract,
  getCakeContract,
  getErc721Contract,
  getErc721CollectionContract,
  getNftMarketContract,
  getMvsTokenContract,
  getMvsNftContract,
  getMvsNftPoolContract,
  getMvsDividendPoolContract,
  getMvsDividendPoolUpgradeableContract,
  getMvsBlindBox01Contract,
  getMvsBlindBox02Contract,
  getMvsBlindBox03Contract,
  getMvsBlindBox04Contract
} from 'utils/contractHelpers'
import { getMulticallAddress } from 'utils/addressHelpers'

// Imports below migrated from Exchange useContract.ts
import { Contract } from '@ethersproject/contracts'
import { ChainId, WETH } from '@pancakeswap/sdk'
import { abi as IUniswapV2PairABI } from '@uniswap/v2-core/build/IUniswapV2Pair.json'
import ENS_PUBLIC_RESOLVER_ABI from '../config/abi/ens-public-resolver.json'
import ENS_ABI from '../config/abi/ens-registrar.json'
import { ERC20_BYTES32_ABI } from '../config/abi/erc20'
import ERC20_ABI from '../config/abi/erc20.json'
import WETH_ABI from '../config/abi/weth.json'
import multiCallAbi from '../config/abi/Multicall.json'
import { getContract } from '../utils'

/**
 * Helper hooks to get specific contracts (by ABI)
 */

export const useERC20 = (address: string) => {
  const { library } = useActiveWeb3React()
  return useMemo(() => getBep20Contract(address, library.getSigner()), [address, library])
}

/**
 * @see https://docs.openzeppelin.com/contracts/3.x/api/token/erc721
 */
export const useERC721 = (address: string) => {
  const { library } = useActiveWeb3React()
  return useMemo(() => getErc721Contract(address, library.getSigner()), [address, library])
}

export const useCake = () => {
  const { library } = useActiveWeb3React()
  return useMemo(() => getCakeContract(library.getSigner()), [library])
}

export const useErc721CollectionContract = (collectionAddress: string) => {
  const { library } = useActiveWeb3React()
  return useMemo(() => {
    return getErc721CollectionContract(library.getSigner(), collectionAddress)
  }, [library, collectionAddress])
}

// Code below migrated from Exchange useContract.ts

// returns null on errors
function useContract(address: string | undefined, ABI: any, withSignerIfPossible = true): Contract | null {
  const { library, account } = useActiveWeb3React()

  return useMemo(() => {
    if (!address || !ABI || !library) return null
    try {
      return getContract(address, ABI, library, withSignerIfPossible && account ? account : undefined)
    } catch (error) {
      console.error('Failed to get contract', error)
      return null
    }
  }, [address, ABI, library, withSignerIfPossible, account])
}

export function useTokenContract(tokenAddress?: string, withSignerIfPossible?: boolean): Contract | null {
  return useContract(tokenAddress, ERC20_ABI, withSignerIfPossible)
}

export function useWETHContract(withSignerIfPossible?: boolean): Contract | null {
  const { chainId } = useActiveWeb3React()
  return useContract(chainId ? WETH[chainId].address : undefined, WETH_ABI, withSignerIfPossible)
}

export function useENSRegistrarContract(withSignerIfPossible?: boolean): Contract | null {
  const { chainId } = useActiveWeb3React()
  let address: string | undefined
  if (chainId) {
    // eslint-disable-next-line default-case
    switch (chainId) {
      case ChainId.MAINNET:
      case ChainId.TESTNET:
        address = '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e'
        break
    }
  }
  return useContract(address, ENS_ABI, withSignerIfPossible)
}

export function useENSResolverContract(address: string | undefined, withSignerIfPossible?: boolean): Contract | null {
  return useContract(address, ENS_PUBLIC_RESOLVER_ABI, withSignerIfPossible)
}

export function useBytes32TokenContract(tokenAddress?: string, withSignerIfPossible?: boolean): Contract | null {
  return useContract(tokenAddress, ERC20_BYTES32_ABI, withSignerIfPossible)
}

export function usePairContract(pairAddress?: string, withSignerIfPossible?: boolean): Contract | null {
  return useContract(pairAddress, IUniswapV2PairABI, withSignerIfPossible)
}

export function useMulticallContract(): Contract | null {
  return useContract(getMulticallAddress(), multiCallAbi, false)
}

/**
 * @returns the address of the deployed contract
 */
export const useNftMarketContract = () => {
  const { library } = useActiveWeb3React()
  return useMemo(() => getNftMarketContract(library.getSigner()), [library])
}

export const useMvsTokenContract = () => {
  const { library } = useActiveWeb3React()
  return useMemo(() => getMvsTokenContract(library.getSigner()), [library])
}

export const useMvsNftContract = (isAccount?: boolean) => {
  const { library } = useActiveWeb3React()
  return useMemo(() => getMvsNftContract(isAccount ? library.getSigner() : null), [library, isAccount])
}

export const useMvsNftPoolContract = (isAccount?: boolean) => {
  const { library } = useActiveWeb3React()
  return useMemo(() => getMvsNftPoolContract(isAccount ? library.getSigner() : null), [library, isAccount])
}

export const useMvsDividendPoolContract = (isAccount?: boolean) => {
  const { library } = useActiveWeb3React()
  return useMemo(() => getMvsDividendPoolContract(isAccount ? library.getSigner() : null), [library, isAccount])
}

export const useMvsDividendPoolUpgradeableContract = (isAccount?: boolean) => {
  const { library } = useActiveWeb3React()
  return useMemo(() => getMvsDividendPoolUpgradeableContract(isAccount ? library.getSigner() : null), [library, isAccount])
}

export const useMvsBlindBox01Contract = (isAccount?: boolean) => {
  const { library } = useActiveWeb3React()
  return useMemo(() => getMvsBlindBox01Contract(isAccount ? library.getSigner() : null), [library, isAccount])
}

export const useMvsBlindBox02Contract = (isAccount?: boolean) => {
  const { library } = useActiveWeb3React()
  return useMemo(() => getMvsBlindBox02Contract(isAccount ? library.getSigner() : null), [library, isAccount])
}

export const useMvsBlindBox03Contract = (isAccount?: boolean) => {
  const { library } = useActiveWeb3React()
  return useMemo(() => getMvsBlindBox03Contract(isAccount ? library.getSigner() : null), [library, isAccount])
}

export const useMvsBlindBox04Contract = (isAccount?: boolean) => {
  const { library } = useActiveWeb3React()
  return useMemo(() => getMvsBlindBox04Contract(isAccount ? library.getSigner() : null), [library, isAccount])
}
