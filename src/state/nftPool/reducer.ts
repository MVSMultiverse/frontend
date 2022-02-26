/* eslint-disable no-return-await */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchNftInfo } from './helpers'
import { getNftsFromDifferentCollectionsApi, fetchWalletTokenIdsForCollectionsAddresss } from '../nftMarket/helpers'
import { State, NftPoolInitializationState, NftPoolLoadingState, TokenIds } from './types'

const initialState: State = {
  initializationState: NftPoolInitializationState.UNINITIALIZED,
  loadingState: NftPoolLoadingState.LOADING,
  data: {
    nFtInfo: {
      data: [],
    },
    userBagNftTokenIds: [],
    userStakeNfts: {
      initializationState: NftPoolInitializationState.UNINITIALIZED,
      isLoading: false,
      tokenIds: [],
      nftPoolList: [],
      numberOfPoolNftVisible: 0
    }
  },
}

export const fetchNftInfoForApi = createAsyncThunk('nftPool/fetchNftInfoForApi', async () => {
  const nftInfo = await fetchNftInfo()
  return nftInfo
})

export const fetchStakeNfts = createAsyncThunk<any[], TokenIds[]>(
  'nftPool/fetchStakeNfts',
  async (from) => {
    return await getNftsFromDifferentCollectionsApi(from)
  },
)

/**
 * Fetch tokenIds in your backpack
 */
export const fetchCollectionsTokenIds = createAsyncThunk<any, { account: string, collections: string }>('nft/fetchWalletTokenIdsForCollectionsAddresss', async ({ account, collections }) => {
  return fetchWalletTokenIdsForCollectionsAddresss(account, collections)
})


export const NftPools = createSlice({
  name: 'nftPool',
  initialState,
  reducers: {
    setStakeNftTokenIds: (state, action) => {
      const isSet = state.data.userStakeNfts.initializationState === NftPoolInitializationState.UNINITIALIZED
      const copyState = [...state.data.userStakeNfts.tokenIds].sort()
      const ids = action.payload ? action.payload?.split(',').sort() : []
      if (ids.toString() !== copyState.toString() && isSet) {
        state.data.userStakeNfts.initializationState = NftPoolInitializationState.INITIALIZED
        state.data.userStakeNfts.tokenIds = ids
      }
    },
    removeUserPoolNfts: (state, action) => {
      const { nfts, collectionAddress } = action.payload
      const copyOfNftPoolList = [...state.data.userStakeNfts.nftPoolList]
      const nftToRemove = copyOfNftPoolList.find((nft) => nft.tokenId === nfts.tokenId)
      const indexInNftPoolList = copyOfNftPoolList.indexOf(nftToRemove)
      copyOfNftPoolList.splice(indexInNftPoolList, 1)

      state.data.userStakeNfts.nftPoolList = copyOfNftPoolList
      const copyOfNftPoolTokenIds = [...state.data.userStakeNfts.tokenIds]
      const idToRemove = copyOfNftPoolTokenIds.find((id) => id === nfts.tokenId)
      const indexInNftPoolTokenIds = copyOfNftPoolTokenIds.indexOf(idToRemove)
      copyOfNftPoolTokenIds.splice(indexInNftPoolTokenIds, 1)
      state.data.userStakeNfts.tokenIds = copyOfNftPoolTokenIds

      state.data.userBagNftTokenIds = [
        ...state.data.userBagNftTokenIds,
        { tokenId: nfts.tokenId, collectionAddress }
      ]
    },
    setUserPoolNfts: (state, action) => {
      const { nfts, collectionAddress } = action.payload
      state.data.userStakeNfts.nftPoolList = [
        ...state.data.userStakeNfts.nftPoolList,
        ...nfts,
      ]

      const copyOfState = [...state.data.userBagNftTokenIds]
      for (let i = 0; i < nfts.length; i++) {
        const nftToRemove = copyOfState.find((nft) => nft.tokenId === nfts[i].tokenId)
        const indexInState = copyOfState.indexOf(nftToRemove)
        copyOfState.splice(indexInState, 1)
      }
      state.data.userBagNftTokenIds = copyOfState
    },

    removeAllUserPoolNfts: (state, action) => {
      const { nfts, collectionAddress } = action.payload
      const copyNftPoolList = [...state.data.userStakeNfts.nftPoolList]
      for (let i = 0; i < nfts.length; i++) {
        const nftToRemove = copyNftPoolList.find((nft) => nft.tokenId === nfts[i].tokenId)
        const indexInState = copyNftPoolList.indexOf(nftToRemove)
        copyNftPoolList.splice(indexInState, 1)
      }
      state.data.userStakeNfts.nftPoolList = copyNftPoolList
      state.data.userStakeNfts.tokenIds = copyNftPoolList.map(it => it.tokenId)
      state.data.userBagNftTokenIds = [...state.data.userBagNftTokenIds, ...nfts.map(nft => ({ tokenId: nft.tokenId, collectionAddress }))]
    },

    clearAllState: (state) => {
      state.data.userStakeNfts.nftPoolList = []
      state.data.userStakeNfts.tokenIds = []
      state.data.userBagNftTokenIds = []
      state.data.userStakeNfts.initializationState = NftPoolInitializationState.UNINITIALIZED
    },



    setDividendPoolNfts: (state, action) => {
      const { nfts, collectionAddress } = action.payload

      const copyOfState = [...state.data.userBagNftTokenIds]
      for (let i = 0; i < nfts.length; i++) {
        const nftToRemove = copyOfState.find((nft) => nft.tokenId === nfts[i].tokenId)
        const indexInState = copyOfState.indexOf(nftToRemove)
        copyOfState.splice(indexInState, 1)
      }
      state.data.userBagNftTokenIds = copyOfState
    },

    removeDividendPoolNfts: (state, action) => {
      const { nfts, collectionAddress } = action.payload
      const copyOfNftPoolTokenIds = [...state.data.userStakeNfts.tokenIds]
      const idToRemove = copyOfNftPoolTokenIds.find((id) => id === nfts.tokenId)
      const indexInNftPoolTokenIds = copyOfNftPoolTokenIds.indexOf(idToRemove)
      copyOfNftPoolTokenIds.splice(indexInNftPoolTokenIds, 1)
      state.data.userStakeNfts.tokenIds = copyOfNftPoolTokenIds
      state.data.userBagNftTokenIds = [
        ...state.data.userBagNftTokenIds,
        { tokenId: nfts.tokenId, collectionAddress }
      ]
    },

    removeAllDividendPoolNfts: (state, action) => {
      const { tokenIds, collectionAddress } = action.payload
      state.data.userBagNftTokenIds = [...state.data.userBagNftTokenIds, ...tokenIds.map(id => ({ tokenId: id, collectionAddress }))]
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchNftInfoForApi.pending, (state) => {
      state.loadingState = NftPoolLoadingState.LOADING
    })
    builder.addCase(fetchNftInfoForApi.fulfilled, (state, action) => {
      state.data.nFtInfo.data = action.payload
      state.loadingState = NftPoolLoadingState.FULFILLED
    })
    builder.addCase(fetchNftInfoForApi.rejected, (state) => {
      state.loadingState = NftPoolLoadingState.REJECTED
    })

    builder.addCase(fetchStakeNfts.pending, (state) => {
      state.data.userStakeNfts.isLoading = true
    })
    builder.addCase(fetchStakeNfts.fulfilled, (state, action) => {
      state.data.userStakeNfts.isLoading = false
      const data = [...state.data.userStakeNfts.nftPoolList, ...action.payload]
      const copyTokenIds = [...state.data.userStakeNfts.tokenIds]
      if (data.length !== copyTokenIds.length) {
        const arr = []
        for (let i = 0; i < data.length; i++) {
          const ids = arr.map(it => it.tokenId)
          if (!ids.includes(data[i].tokenId)) {
            arr.push(data[i])
          }
        }
        state.data.userStakeNfts.nftPoolList = arr
      } else {
        state.data.userStakeNfts.nftPoolList = data
      }
    })
    builder.addCase(fetchStakeNfts.rejected, (state) => {
      state.data.userStakeNfts.isLoading = false
    })

    builder.addCase(fetchCollectionsTokenIds.fulfilled, (state, action) => {
      state.data.userBagNftTokenIds = action.payload
    })
  },
})

// Actions
export const {
  setStakeNftTokenIds,
  removeUserPoolNfts,
  removeAllUserPoolNfts,
  setUserPoolNfts,
  clearAllState,
  removeDividendPoolNfts,
  removeAllDividendPoolNfts,
  setDividendPoolNfts
} = NftPools.actions
export default NftPools.reducer

