import React from 'react'
import styled from 'styled-components'
import { useTranslation } from 'contexts/Localization'
import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router'
import { DEFAULT_META } from 'config/constants/meta'
import { useMVSBusdTickerPrice } from 'state/ticker/hooks'
import Container from './Container'

const StyledPage = styled(Container)`
  min-height: calc(100vh - 64px);
  padding-top: 16px;
  padding-bottom: 16px;

  ${({ theme }) => theme.mediaQueries.sm} {
    padding-top: 24px;
    padding-bottom: 24px;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    padding-top: 32px;
    padding-bottom: 32px;
  }
`

export const PageMeta: React.FC<{ symbol?: string }> = ({ symbol }) => {
  const { t } = useTranslation()
  const { pathname } = useLocation()
  const mvsPriceUsd = useMVSBusdTickerPrice()
  const mvsPriceUsdDisplay = mvsPriceUsd.toNumber() ? `${mvsPriceUsd.toFixed(5)}` : '...'

  // const pageMeta = getCustomMeta(pathname, t) || {}
  const { title, description, image } = DEFAULT_META
  let pageTitle = mvsPriceUsdDisplay ? [title, mvsPriceUsdDisplay].join(' - ') : title
  if (symbol) {
    pageTitle = [symbol, title].join(' - ')
  }

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
    </Helmet>
  )
}

interface PageProps extends React.HTMLAttributes<HTMLDivElement> {
  symbol?: string
}

const Page: React.FC<PageProps> = ({ children, symbol, ...props }) => {
  return (
    <>
      <PageMeta symbol={symbol} />
      <StyledPage {...props}>{children}</StyledPage>
    </>
  )
}

export default Page
