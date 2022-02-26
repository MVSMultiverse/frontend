import React from 'react'
import Page from 'components/Layout/Page'
import { getMvsNftAddress } from 'utils/addressHelpers'
import { useFetchCollectionsTokenIds } from 'state/nftPool/hooks'
import StakeNftPanel from './components/StakeNftPanel'
import BannerNftPoolCard from './components/BannerNftPoolCard'
import NftPoolEntry from './components/NftPoolEntry'
import { useFetchPoolAndUserInfo } from './hooks/useFetchPoolAndUserInfo'

const Pools = () => {
  const { poolStruct, userPoolStruct } = useFetchPoolAndUserInfo()
  const collectionAddress = getMvsNftAddress()
  useFetchCollectionsTokenIds(collectionAddress)
  const isFetchEnd = userPoolStruct?.userNfts !== undefined

  return (
    <>
      <Page>
        <BannerNftPoolCard poolStruct={poolStruct} />
        <NftPoolEntry poolStruct={poolStruct} userPoolStruct={userPoolStruct} />
        <StakeNftPanel isFetchEnd={isFetchEnd} />
      </Page>
    </>
  )
}

export default Pools
