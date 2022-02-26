import { useEffect, useState } from 'react'
import { useMvsNftPoolContract } from 'hooks/useContract'
import { getFullDisplayBalance } from 'utils/formatBalance'
import { useAppDispatch } from 'state'
import useRefresh from 'hooks/useRefresh'
import { setStakeNftTokenIds } from 'state/nftPool/reducer'
import { useWeb3React } from '@web3-react/core'
import { UserPoolInfo, PoolInfo } from '../types'

export const useFetchPoolAndUserInfo = () => {
  const dispatch = useAppDispatch()
  const [isLoading, setIsLoading] = useState(true)
  const { slowRefresh } = useRefresh()
  const { account } = useWeb3React()

  const [poolStruct, setPoolStruct] = useState<PoolInfo>(null)
  const [userPoolStruct, setUserPoolStruct] = useState<UserPoolInfo>(null)
  const mvsNftPoolContract = useMvsNftPoolContract()

  useEffect(() => {
    let isUnmount = false

    const getMvsNftPool = async () => {
      const pool = await mvsNftPoolContract.getPoolInfo()
      if (pool) {
        setPoolStruct({
          tokenAddress: pool[0]?.toString(),
          nftAddress: pool[1]?.toString(),

          bscBlockTime: pool[2]?.toString(),
          blocksPerYear: pool[3]?.toString(),
          halvingPeriod: pool[4]?.toString(),
          rewardPerBlock: getFullDisplayBalance(pool[5].toString(), 18, 4),

          totalNftsInPool: pool[6]?.toString(),
          totalShareInPool: pool[7]?.toString(),
          totalRewardsInPool: getFullDisplayBalance(pool[8].toString(), 18, 4),
          lockRewardsInPool: getFullDisplayBalance(pool[9].toString(), 18, 4),
          totalMiningInPool: getFullDisplayBalance(pool[10].toString(), 18, 4),
          resetRewardsInPool: getFullDisplayBalance(pool[11].toString(), 18, 4),

          startBlock: pool[12]?.toString(),
          endBlock: pool[13]?.toString(),
          lastUpdatedBlock: pool[14]?.toString(),
          lastRewardBlock: pool[15]?.toString(),
          accRewardPerShare: getFullDisplayBalance(pool[16].toString(), 30, 4),
        })
      }
      // Fetch on account connected or change
      if (account) {
        const user = await mvsNftPoolContract.getFullUserInfo(account)
        setUserPoolStruct({
          allShare: user[0]?.toString(),
          userNfts: user[1]?.toString(),
          accReward: getFullDisplayBalance(user[2].toString(), 18, 4),
          unharvestReward: getFullDisplayBalance(user[3].toString(), 18, 4),
          userDebt: getFullDisplayBalance(user[4].toString(), 18, 4),
        })
        dispatch(setStakeNftTokenIds(user[1]?.toString()))
      }
      setIsLoading(false)
    }

    if (!isUnmount) {
      setIsLoading(true)
      getMvsNftPool()
    }

    return () => {
      isUnmount = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slowRefresh])

  return { isLoading, poolStruct, userPoolStruct }
}
