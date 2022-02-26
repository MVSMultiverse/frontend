import { useEffect, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useAppDispatch } from 'state'
import { useWeb3React } from '@web3-react/core'
import { pancakeBunniesAddress } from 'views/Nft/market/constants'
import { fetchCollection, fetchCollections, fetchNewPBAndUpdateExisting, fetchCollectionsTokenIds } from './reducer'
import { State } from '../types'
import { NftFilter, NftFilterLoadingState, NftToken, UserNftsState } from './types'

const MAX_GEN0_ID = 4

export const useFetchCollections = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchCollections())
  }, [dispatch])
}

export const useFetchCollectionsTokenIds = (collections: string) => {
  const dispatch = useAppDispatch()
  const { account } = useWeb3React()

  useEffect(() => {
    if (collections && account) dispatch(fetchCollectionsTokenIds({ account, collections }))
  }, [dispatch, account, collections])
}

export const useFetchCollection = (collectionAddress: string) => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchCollection(collectionAddress))
  }, [dispatch, collectionAddress])
}

// Returns a function that fetches more NFTs for specified bunny id
// as well as updating existing PB NFTs in state
// Note: PancakeBunny specific
export const useFetchByBunnyIdAndUpdate = (bunnyId: string) => {
  const dispatch = useAppDispatch()

  const { latestPancakeBunniesUpdateAt, isUpdatingPancakeBunnies } = useSelector(
    (state: State) => state.nftMarket.data.loadingState,
  )

  // Extra guard in case market data shifts
  // we don't wanna fetch same tokens multiple times
  const existingBunniesInState = useGetAllBunniesByBunnyId(bunnyId)
  const existingTokensWithBunnyId = existingBunniesInState ? existingBunniesInState.map((nft) => nft.tokenId) : []

  const allPancakeBunnies = useNftsFromCollection(pancakeBunniesAddress)
  const allExistingPBTokenIds = allPancakeBunnies ? allPancakeBunnies.map((nft) => nft.tokenId) : []

  const firstBunny = existingBunniesInState.length > 0 ? existingBunniesInState[0] : null

  // If we already have NFT with this bunny id in state - we can reuse its metadata without making API request
  const existingMetadata = useMemo(() => {
    return firstBunny
      ? {
        name: firstBunny.name,
        description: firstBunny.description,
        collection: { name: firstBunny.collectionName },
        image: firstBunny.image,
      }
      : null
  }, [firstBunny])

  // This fetches more bunnies when called
  const fetchMorePancakeBunnies = (orderDirection: 'asc' | 'desc') => {
    dispatch(
      fetchNewPBAndUpdateExisting({
        bunnyId,
        existingTokensWithBunnyId,
        allExistingPBTokenIds,
        existingMetadata,
        orderDirection,
      }),
    )
  }

  return { isUpdatingPancakeBunnies, latestPancakeBunniesUpdateAt, fetchMorePancakeBunnies }
}

export const useLoadingState = () => {
  return useSelector((state: State) => state.nftMarket.data.loadingState)
}

export const useGetCollections = () => {
  return useSelector((state: State) => state.nftMarket.data.collections)
}

export const useGetCollection = (collectionAddress: string) => {
  const collections = useGetCollections()
  return collections[collectionAddress]
}

export const useNftsFromCollection = (collectionAddress: string) => {
  const nfts: NftToken[] = useSelector((state: State) => state.nftMarket.data.nfts[collectionAddress])
  return nfts
}

export const useGetAllBunniesByBunnyId = (bunnyId: string) => {
  const nfts: NftToken[] = useSelector((state: State) => state.nftMarket.data.nfts[pancakeBunniesAddress])
  return nfts ? nfts.filter((nft) => nft.attributes[0].value === bunnyId && nft.marketData.isTradable) : []
}

export const useGetNFTInitializationState = () => {
  return useSelector((state: State) => state.nftMarket.initializationState)
}

export const useUserNfts = (): UserNftsState => {
  return useSelector((state: State) => state.nftMarket.data.user)
}

export const useHasGen0Nfts = (): boolean => {
  const userNfts = useSelector((state: State) => state.nftMarket.data.user)
  return userNfts.nfts.some((nft) => nft.attributes && Number(nft.attributes[0]?.value) <= MAX_GEN0_ID)
}

export const useGetNftFilters = (collectionAddress: string) => {
  const collectionFilter: NftFilter = useSelector((state: State) => state.nftMarket.data.filters[collectionAddress])
  return collectionFilter ? collectionFilter.activeFilters : {}
}

export const useGetNftFilterLoadingState = (collectionAddress: string) => {
  const collectionFilter: NftFilter = useSelector((state: State) => state.nftMarket.data.filters[collectionAddress])
  return collectionFilter ? collectionFilter.loadingState : NftFilterLoadingState.IDLE
}

export const useGetNftOrdering = (collectionAddress: string) => {
  const collectionFilter: NftFilter = useSelector((state: State) => state.nftMarket.data.filters[collectionAddress])
  return collectionFilter ? collectionFilter.ordering : { field: 'currentAskPrice', direction: 'asc' as 'asc' | 'desc' }
}

export const useGetNftShowOnlyOnSale = (collectionAddress: string) => {
  const collectionFilter: NftFilter = useSelector((state: State) => state.nftMarket.data.filters[collectionAddress])
  return collectionFilter ? collectionFilter.showOnlyOnSale : true
}

export const useGetCollectionsTokenIds = (collectionAddress: string) => {
  // return useSelector((state: State) => state.nftMarket.data.user.tokenIds.filter(it => it.collectionAddress === collectionAddress))
  const userBagTokenIds = useSelector((state: State) => state.nftMarket.data.user.tokenIds)
  return userBagTokenIds.filter(it => it.collectionAddress === collectionAddress)
}
