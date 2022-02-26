/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useAppDispatch } from 'state'
import { useWeb3React } from '@web3-react/core'
import { getMvsNftAddress } from 'utils/addressHelpers'
import { fetchNftInfoForApi, fetchStakeNfts, fetchCollectionsTokenIds } from './reducer'
import { State } from '../types'

export const useFetchNftInfo = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchNftInfoForApi())
  }, [dispatch])
}

export const useFetchCollectionsTokenIds = (collections: string) => {
  const dispatch = useAppDispatch()
  const { account } = useWeb3React()

  useEffect(() => {
    if (collections && account) dispatch(fetchCollectionsTokenIds({ account, collections }))
  }, [dispatch, account, collections])
}

export const useGetUserBagNftTokenIds = (collectionAddress: string) => {
  const userBagNftTokenIds = useSelector((state: State) => state.nftPool.data.userBagNftTokenIds)
  return userBagNftTokenIds.filter(it => it.collectionAddress === collectionAddress)
}


export const useGetNftInfo = () => {
  return useSelector((state: State) => state.nftPool.data.nFtInfo.data)
}

export const useLoadingState = () => {
  return useSelector((state: State) => state.nftPool.loadingState)
}


export const useGetStakeNftTokenIds = () => {
  return useSelector((state: State) => state.nftPool.data.userStakeNfts.tokenIds)
}

export const useFetchStakeNfts = (fetchIndex, NUMBER_OF_NFTPOOL_VISIBLE) => {
  const dispatch = useAppDispatch()
  const collectionAddress = getMvsNftAddress()
  const stakeNftTokenIds = useGetStakeNftTokenIds()
  const _stakeNftTokenIds = JSON.parse(JSON.stringify(stakeNftTokenIds))
  const stakeNftsInPoolTotal = useGetUserNftPoolList()

  const isRequestApi = stakeNftTokenIds.length > 0 && stakeNftTokenIds.length !== stakeNftsInPoolTotal.length

  const from = _stakeNftTokenIds
    ?.splice(fetchIndex, NUMBER_OF_NFTPOOL_VISIBLE)
    ?.map(item => ({ tokenId: item, collectionAddress }))

  useEffect(() => {
    if (isRequestApi) {
      dispatch(fetchStakeNfts(from))
    }
  }, [dispatch, isRequestApi, NUMBER_OF_NFTPOOL_VISIBLE, fetchIndex])
}


export const useGetIsLoading = () => {
  return useSelector((state: State) => state.nftPool.data.userStakeNfts.isLoading)
}

export const useGetUserNftPoolList = () => {
  return useSelector((state: State) => state.nftPool.data.userStakeNfts.nftPoolList)
}