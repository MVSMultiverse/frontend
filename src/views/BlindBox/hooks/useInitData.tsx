/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState, useMemo } from 'react'
import {
  useMvsBlindBox01Contract,
  useMvsBlindBox02Contract,
  useMvsBlindBox03Contract,
  useMvsBlindBox04Contract,
} from 'hooks/useContract'
import useParsedQueryString from 'hooks/useParsedQueryString'
import useRefresh from 'hooks/useRefresh'
import { data } from '../config'

export const useBoxInfo = () => {
  const [blindboxLatestData, setBlindboxLatestData] = useState(null)

  useEffect(() => {
    setBlindboxLatestData(data.data)
  }, [])
  return blindboxLatestData
}

export const useBoxBalanceAward = () => {
  const parsedQs = useParsedQueryString()
  const blindboxId = useMemo(() => parsedQs?.blindboxId || '2', [parsedQs])
  const contract = useMvsBlindBox03Contract()

  const { fastRefresh } = useRefresh()
  const [balanceAward, setBalanceAward] = useState<string>(null)
  const [price, setPrice] = useState(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [isStart, setIsStart] = useState<boolean>(false)

  useEffect(() => {
    let isUnmount = false
    const getBlindboxLatestInfo = async () => {
      try {
        const contractResult = await contract.balanceAward()
        const isStartResult = await contract.isStart()
        const contractPriceResult = await contract.price()
        if (contractResult && !isUnmount) {
          if (blindboxId === '1') {
            setBalanceAward('0')
            setPrice('50000000000000000')
            setIsStart(true)
          } else {
            setBalanceAward(contractResult.toString())
            setPrice(contractPriceResult.toString())
            setIsStart(isStartResult)
          }

          setLoading(false)
        }
      } catch (error) {
        console.error('error:', error)
      }
    }
    if (contract) getBlindboxLatestInfo()
    return () => {
      isUnmount = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fastRefresh, contract, parsedQs])

  return { balanceAward, price, isStart, loading }
}
