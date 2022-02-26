import { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { useAppDispatch } from 'state'
import useIsWindowVisible from 'hooks/useIsWindowVisible'
import BigNumber from 'bignumber.js'
import { setTicker } from '.'
import { State } from '../types'
import { fetchTickerPrice } from './helpers'

export const useTickerAndPrices = (refreshTime = 1000 * 6 * 50) => {
  const timer = useRef(null)
  const dispatch = useAppDispatch()
  const isWindowVisible = useIsWindowVisible()

  useEffect(() => {
    if (isWindowVisible) {
      timer.current = setInterval(async () => {
        const tickerAndPrices = await fetchTickerPrice()
        dispatch(setTicker(tickerAndPrices))
      }, refreshTime)
    } else {
      clearInterval(timer.current)
    }

    return () => clearInterval(timer.current)
  }, [dispatch, timer, isWindowVisible, refreshTime])
}

export const useTickerAndPricesInstance = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    const init = async () => {
      const tickerAndPrices = await fetchTickerPrice()
      dispatch(setTicker(tickerAndPrices))
    }
    init()
  }, [dispatch])
}

export const useTicker = () => {
  return useSelector((state: State) => state.ticker)
}

export const useBNBBusdTickerPrice = () => {
  const tickers = useSelector((state: State) => state.ticker)
  return new BigNumber(tickers.data.find((ticker) => ticker.symbol === 'BNB')?.usdPrice)
}

export const useMVSBusdTickerPrice = () => {
  const tickers = useSelector((state: State) => state.ticker)
  return new BigNumber(tickers.data.find((ticker) => ticker.symbol === 'MVS')?.usdPrice) || undefined
}
