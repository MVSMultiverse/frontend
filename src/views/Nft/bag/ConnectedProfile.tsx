import React from 'react'
// import { useWeb3React } from '@web3-react/core'
import Page from 'components/Layout/Page'
import Container from 'components/Layout/Container'
import { Route } from 'react-router'
// import { useUserNfts } from 'state/nftMarket/hooks'
import { nftsBaseUrl } from 'views/Nft/market/constants'
import useFetchUserNfts from './hooks/useFetchUserNfts'
// import ActivityHistory from './components/ActivityHistory'
// import SubMenu from './components/SubMenu'
import UserNfts from './components/UserNfts'

const ConnectedProfile = () => {
  // const { account } = useWeb3React()
  // const { userNftsInitializationState, nfts: userNfts } = useUserNfts()
  useFetchUserNfts()
  return (
    <>
      <Page style={{ minHeight: 'auto' }}>
        <Container>
          {/* <Route path={`${nftsBaseUrl}/bag/:accountAddress/activity`}>
            <SubMenu />
            <ActivityHistory />
          </Route> */}
          <Route exact path={`${nftsBaseUrl}/bag/:accountAddress`}>
            {/* <SubMenu /> */}
            <UserNfts />
          </Route>
        </Container>
      </Page>
    </>
  )
}

export default ConnectedProfile
