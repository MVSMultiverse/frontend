import React, { lazy } from 'react'
import './fonts/fonts.css'
import { Router, Redirect, Route, Switch } from 'react-router-dom'
import { ResetCSS } from '@pancakeswap/uikit'
import { useWeb3React } from '@web3-react/core'
import BigNumber from 'bignumber.js'
import useEagerConnect from 'hooks/useEagerConnect'
import useUserAgent from 'hooks/useUserAgent'
// import { usePollBlockNumber } from 'state/block/hooks'
// import { usePollCoreFarmData } from 'state/farms/hooks'
import { useTickerAndPrices, useTickerAndPricesInstance } from 'state/ticker/hooks'
import useScrollOnRouteChange from 'hooks/useScrollOnRouteChange'
import { useFetchNftInfo } from 'state/nftPool/hooks'
import { nftsBaseUrl } from 'views/Nft/market/constants'
import GlobalStyle from './style/Global'
import Menu from './components/Menu'
import SuspenseWithChunkError from './components/SuspenseWithChunkError'
import { ToastListener } from './contexts/ToastsContext'
import PageLoader from './components/Loader/PageLoader'
import history from './routerHistory'

// Views included in the main bundle
// import Swap from './views/Swap-2.0/Swap'
// import {
//   RedirectDuplicateTokenIds,
//   RedirectOldAddLiquidityPathStructure,
//   RedirectToAddLiquidity,
// } from './views/Swap-2.0/AddLiquidity/redirects'
// import RedirectOldRemoveLiquidityPathStructure from './views/Swap-2.0/RemoveLiquidity/redirects'
// import { RedirectPathToSwapOnly, RedirectToSwap } from './views/Swap-2.0/Swap/redirects'
// Route-based code splitting
// Only pool is included in the main bundle because of it's the most visited page
// const AddLiquidity = lazy(() => import('./views/Swap-2.0/AddLiquidity'))
// const Liquidity = lazy(() => import('./views/Swap-2.0/Pool'))
// const PoolFinder = lazy(() => import('./views/Swap-2.0/PoolFinder'))
// const RemoveLiquidity = lazy(() => import('./views/Swap-2.0/RemoveLiquidity'))

const NotFound = lazy(() => import('./views/NotFound'))
const NftMarket = lazy(() => import('./views/Nft/market'))
// Route-based Times Metaverse
const BlindBox = lazy(() => import('./views/BlindBox'))
const BlindBoxPastRecords = lazy(() => import('./views/BlindBox/list'))
const NftPool = lazy(() => import('./views/NftPool'))
const DividendPool = lazy(() => import('./views/DividendPool'))
const DevLabs = lazy(() => import('./views/DevLabs'))

// This config is required for number formatting
BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

const App: React.FC = () => {
  const { account } = useWeb3React()
  // usePollBlockNumber()
  // usePollCoreFarmData()
  useEagerConnect()
  useScrollOnRouteChange()
  useUserAgent()
  useFetchNftInfo()
  useTickerAndPricesInstance()
  useTickerAndPrices()

  return (
    <Router history={history}>
      <ResetCSS />
      <GlobalStyle />
      <Menu>
        <SuspenseWithChunkError fallback={<PageLoader />}>
          <Switch>
            {/* <Route path="/" exact>
              <Home />
            </Route> */}
            {/* BlindBox */}
            <Route exact strict path="/nft-museum">
              <BlindBox />
            </Route>
            <Route exact strict path="/nft-museum/past-records">
              <BlindBoxPastRecords />
            </Route>
            {/* NftPool */}
            <Route path="/nft-pool">
              <NftPool />
            </Route>
            {/* DividendPool */}
            <Route path="/dividend-pool">
              <DividendPool />
            </Route>
            {/* NFT */}
            <Route path="/nfts">
              <NftMarket />
            </Route>
            {/* DevLabs */}
            <Route path="/dev-labs">
              <DevLabs />
            </Route>
            {/* Using this format because these components use routes injected props. We need to rework them with hooks */}
            {/* 
            <Route exact strict path="/swap" component={Swap} />
            <Route exact strict path="/swap/:outputCurrency" component={RedirectToSwap} />
            <Route exact strict path="/send" component={RedirectPathToSwapOnly} />
            <Route exact strict path="/find" component={PoolFinder} />
            <Route exact strict path="/liquidity" component={Liquidity} />
            <Route exact strict path="/create" component={RedirectToAddLiquidity} />
            <Route exact path="/add" component={AddLiquidity} />
            <Route exact path="/add/:currencyIdA" component={RedirectOldAddLiquidityPathStructure} />
            <Route exact path="/add/:currencyIdA/:currencyIdB" component={RedirectDuplicateTokenIds} />
            <Route exact path="/create" component={AddLiquidity} />
            <Route exact path="/create/:currencyIdA" component={RedirectOldAddLiquidityPathStructure} />
            <Route exact path="/create/:currencyIdA/:currencyIdB" component={RedirectDuplicateTokenIds} />
            <Route exact strict path="/remove/:tokens" component={RedirectOldRemoveLiquidityPathStructure} />
            <Route exact strict path="/remove/:currencyIdA/:currencyIdB" component={RemoveLiquidity} /> 
            */}
            {/* Redirect */}
            <Route path="/bag">
              <Redirect to={`${nftsBaseUrl}/bag/${account?.toLowerCase() || ''}`} />
            </Route>
            <Route path="">
              <Redirect to="/nft-pool" />
            </Route>
            <Route path="/">
              <Redirect to="/nft-pool" />
            </Route>
            {/* 404 */}
            <Route component={NotFound} />
          </Switch>
        </SuspenseWithChunkError>
      </Menu>
      <ToastListener />
    </Router>
  )
}

export default React.memo(App)
