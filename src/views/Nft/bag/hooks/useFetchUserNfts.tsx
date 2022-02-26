import { useEffect } from 'react'
import isEmpty from 'lodash/isEmpty'
import { useAppDispatch } from 'state'
import { fetchUserNfts } from 'state/nftMarket/reducer'
import { useGetCollections, useUserNfts } from 'state/nftMarket/hooks'
import { UserNftInitializationState } from 'state/nftMarket/types'
import { useWeb3React } from '@web3-react/core'

const useFetchUserNfts = () => {
  const dispatch = useAppDispatch()
  const { account } = useWeb3React()
  const { userNftsInitializationState } = useUserNfts()
  const collections = useGetCollections()

  // Fetch on first load when profile fetch is resolved
  const shouldFetch = account && userNftsInitializationState === UserNftInitializationState.UNINITIALIZED

  // Fetch on account change
  const hasAccountSwitched = account

  useEffect(() => {
    if ((shouldFetch || hasAccountSwitched) && !isEmpty(collections)) {
      // if (shouldFetch && !isEmpty(collections)) {
      dispatch(fetchUserNfts({ account, collections }))
    }
  }, [dispatch, account, shouldFetch, hasAccountSwitched, collections])
  // }, [dispatch, account, shouldFetch, collections])
}

export default useFetchUserNfts
