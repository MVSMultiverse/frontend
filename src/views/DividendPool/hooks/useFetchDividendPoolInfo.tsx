import { useEffect, useState } from 'react'
import { useMvsDividendPoolUpgradeableContract } from 'hooks/useContract'
import { getFullDisplayBalance } from 'utils/formatBalance'
import useRefresh from 'hooks/useRefresh'
import { useWeb3React } from '@web3-react/core'
import { UserPoolInfo, DividendPoolInfo } from '../types'

export const useFetchDividendPoolInfo = () => {
  const [isLoading, setIsLoading] = useState(true)
  const { slowRefresh } = useRefresh()
  const { account } = useWeb3React()

  const [mvsDividendPoolInfo, setMvsDividendPoolInfo] = useState<DividendPoolInfo>(null)
  const [mvsDividendUserPoolInfo, setMvsDividendUserPoolInfo] = useState<UserPoolInfo>(null)
  const mvsDividendPoolContract = useMvsDividendPoolUpgradeableContract()

  useEffect(() => {
    let isUnmount = false
    const getMvsDividendPool = async () => {
      const nowCycle = await mvsDividendPoolContract.cycle()
      const dividendPool = await mvsDividendPoolContract.getPoolInfo(nowCycle.toString())
      if (dividendPool) {
        setMvsDividendPoolInfo({
          ssrCount: dividendPool[0]?.toString(),
          srCount: dividendPool[1]?.toString(),
          startBlock: dividendPool[2]?.toString(),
          endBlock: dividendPool[3]?.toString(),
          totalAward: getFullDisplayBalance(dividendPool[4]?.toString(), 18, 2),
          totalPower: dividendPool[5]?.toString(),
          avgPowerAward: getFullDisplayBalance(dividendPool[6]?.toString(), 18, 2),
        })
      }
      // Fetch on account connected or change
      if (account) {
        const userPoolInfo = await mvsDividendPoolContract.fullAddressInfo(account)
        setMvsDividendUserPoolInfo({
          ssrCount: userPoolInfo[0]?.toString(),
          srCount: userPoolInfo[1]?.toString(),
          stakePower: userPoolInfo[2]?.toString(),
          tokenIds: stringToArray(userPoolInfo[3]?.toString()),
          bunnyIds: stringToArray(userPoolInfo[4]?.toString()),
          historyAward: getFullDisplayBalance(userPoolInfo[5].toString(), 18, 6),
          predictAward: getFullDisplayBalance(userPoolInfo[6].toString(), 18, 6),
          harvestedAward: getFullDisplayBalance(userPoolInfo[7].toString(), 18, 6),
        })
      }
      setIsLoading(false)
    }

    if (!isUnmount) {
      setIsLoading(true)
      getMvsDividendPool()
    }

    return () => {
      isUnmount = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slowRefresh])

  return { isLoading, mvsDividendPoolInfo, mvsDividendUserPoolInfo }
}

const stringToArray = (str) => {
  return str && str.length > 0 ? str?.split(',') : []
}
