import React from 'react'
import Page from 'components/Layout/Page'
import { Route, useParams } from 'react-router'
import { nftsBaseUrl } from 'views/Nft/market/constants'
// import ActivityHistory from './components/ActivityHistory'
// import SubMenu from './components/SubMenu'
import useNftsForAddress from './hooks/useNftsForAddress'
import UnconnectedProfileNfts from './components/UnconnectedProfileNfts'

const UnconnectedProfile = () => {
  const { accountAddress } = useParams<{ accountAddress: string }>()
  const { nfts, isLoading: isNftLoading } = useNftsForAddress(accountAddress)

  return (
    <>
      <Page style={{ minHeight: 'auto' }}>
        {/* <Route path={`${nftsBaseUrl}/bag/:accountAddress/activity`}>
          <SubMenu />
          <ActivityHistory />
        </Route> */}
        <Route exact path={`${nftsBaseUrl}/bag/:accountAddress`}>
          {/* <SubMenu /> */}
          <UnconnectedProfileNfts nfts={nfts} isLoading={isNftLoading} />
        </Route>
      </Page>
    </>
  )
}

export default UnconnectedProfile
