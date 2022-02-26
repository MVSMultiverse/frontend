export enum NftPoolInitializationState {
  UNINITIALIZED = 'UNINITIALIZED',
  INITIALIZED = 'INITIALIZED',
  ERROR = 'ERROR',
}

export enum NftPoolLoadingState {
  LOADING = 'LOADING',
  FULFILLED = 'FULFILLED',
  REJECTED = 'REJECTED',
}

export interface State {
  initializationState: NftPoolInitializationState
  loadingState: NftPoolLoadingState
  data: {
    nFtInfo: nFtInfo
    userBagNftTokenIds: TokenIds[]
    userStakeNfts: UserStakeNfts
  }
}

export interface UserStakeNfts {
  initializationState: NftPoolInitializationState
  tokenIds: string[]
  nftPoolList: any[]
  isLoading: boolean
  numberOfPoolNftVisible?: number
}

interface nFtInfo {
  data: NftInfo[]
}

export interface Image {
  original: string
  thumbnail: string
  mp4?: string
  webm?: string
  gif?: string
}

export interface NftInfo {
  nftId: string
  collectionId: string
  collectionAddress: string
  collectionName: string
  bunnyId: string
  bunnyName: string,
  name: string,
  description?: string
  creator: string
  metadataJSON: string
  tokenURI: string
  blindboxId: string
  probability: string,
  supply: string,
  createdAt: string,
  updatedAt: string
  attributes?: NftAttribute[],
  image?: Image
  rarity: string
}



export interface NftAttribute {
  traitType: string
  value: string | number
  displayType: string
  bunnyId?: string
}

export interface TokenIds {
  tokenId: string
  collectionAddress: string
}
