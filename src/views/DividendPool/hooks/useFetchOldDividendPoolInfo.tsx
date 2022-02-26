import { useEffect, useState } from 'react'
import { useMvsDividendPoolContract } from 'hooks/useContract'
import { getFullDisplayBalance } from 'utils/formatBalance'
import useRefresh from 'hooks/useRefresh'
import { useWeb3React } from '@web3-react/core'

export const useFetchOldDividendPoolInfo = () => {
  const [isLoading, setIsLoading] = useState(true)
  const { slowRefresh } = useRefresh()
  const { account } = useWeb3React()

  const [mvsDividendUserPoolInfo, setMvsDividendUserPoolInfo] = useState<any>(null)
  const mvsDividendPoolContract = useMvsDividendPoolContract()

  useEffect(() => {
    let isUnmount = false
    const getMvsDividendPool = async () => {
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

  return { isLoading, mvsDividendUserPoolInfo }
}

const stringToArray = (str) => {
  return str && str.length > 0 ? str?.split(',') : []
}
