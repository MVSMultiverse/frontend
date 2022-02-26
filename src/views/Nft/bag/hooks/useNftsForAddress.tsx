import { useEffect, useState } from 'react'
import isEmpty from 'lodash/isEmpty'
import { useGetCollections } from 'state/nftMarket/hooks'
import { NftToken } from 'state/nftMarket/types'
import { getCompleteAccountNftData } from 'state/nftMarket/helpers'

const useNftsForAddress = (account: string) => {
  const [combinedNfts, setCombinedNfts] = useState<NftToken[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const collections = useGetCollections()

  useEffect(() => {
    const getNfts = async () => {
      const completeNftData = await getCompleteAccountNftData(account, collections)
      setCombinedNfts(completeNftData)
      setIsLoading(false)
    }

    if (!isEmpty(collections)) {
      setIsLoading(true)
      getNfts()
    }
  }, [account, collections])

  return { nfts: combinedNfts, isLoading }
}

export default useNftsForAddress
