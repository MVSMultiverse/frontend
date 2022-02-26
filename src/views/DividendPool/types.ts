import BigNumber from 'bignumber.js'

export interface BigNumberToJson {
  type: 'BigNumber'
  hex: string
}

export type SerializedBigNumber = string

export interface DeserializedFarmUserData {
  allowance: BigNumber
  tokenBalance: BigNumber
  stakedBalance: BigNumber
  earnings: BigNumber
}

export interface PoolInfo {
  tokenAddress: string
  nftAddress: string

  bscBlockTime: string
  blocksPerYear: string
  halvingPeriod: string
  rewardPerBlock: string

  totalNftsInPool: string
  totalShareInPool: string
  totalRewardsInPool: string
  totalMiningInPool: string
  lockRewardsInPool: string
  resetRewardsInPool: string

  startBlock: string
  endBlock: string
  lastUpdatedBlock: string
  lastRewardBlock: string

  accRewardPerShare: string
}

export interface DividendPoolInfo {
  ssrCount: string[]
  srCount: string[]
  startBlock: string
  endBlock: string
  totalAward: string
  totalPower: string
  avgPowerAward: string
}

export interface UserPoolInfo {
  ssrCount: string[]
  srCount: string[]
  stakePower: string
  bunnyIds: string[]
  tokenIds: string[]
  historyAward: string
  predictAward: string
  harvestedAward: string
}