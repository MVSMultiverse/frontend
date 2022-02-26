/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { Card, CardBody, Text, Heading, Skeleton, Flex, useMatchBreakpoints } from '@pancakeswap/uikit'
import { DIVIDENDPOOL_BANNER } from 'config'
import { useTranslation } from 'contexts/Localization'
import { useBNBBusdTickerPrice } from 'state/ticker/hooks'
import { formatNumber } from 'utils/formatBalance'
import { DividendPoolInfo } from '../../types'
import { Container, StyledBannerImage } from '../shared/styles'

interface BannerCard {
  mvsDividendPoolInfo?: DividendPoolInfo
}

const BannerCard: React.FC<BannerCard> = ({ mvsDividendPoolInfo }) => {
  const { t } = useTranslation()
  const { isMobile } = useMatchBreakpoints()
  const bnbBusdPrice = useBNBBusdTickerPrice()
  const priceInUsd = bnbBusdPrice.times(mvsDividendPoolInfo?.totalAward).toNumber()

  return (
    <Card>
      <StyledBannerImage src={DIVIDENDPOOL_BANNER}>
        <CardBody>
          <Container flexDirection={['column', null, 'column']} justifyContent="center">
            <Flex justifyContent="space-between" flexWrap="wrap">
              <Heading scale="md" color="white">
                {t('Multiverse Divedend Pool')}
              </Heading>
            </Flex>
            <Heading scale="xl" color="white">
              {mvsDividendPoolInfo?.totalAward ? (
                <>{mvsDividendPoolInfo?.totalAward} BNB</>
              ) : (
                <Skeleton width="200px" height={48} />
              )}
            </Heading>

            <Flex justifyContent="space-between" flexWrap="wrap">
              {priceInUsd ? (
                <Text fontSize="16px" color="white">
                  {`≈ $${formatNumber(priceInUsd, 2, 2)}`}
                </Text>
              ) : (
                <Skeleton width="86px" height="12px" mt="4px" />
              )}
              {!isMobile && (
                <Heading scale="md" color="white">
                  {t('For SR,SSR NFT Holders')}
                </Heading>
              )}
            </Flex>
          </Container>
        </CardBody>
      </StyledBannerImage>
    </Card>
  )
}

export default BannerCard
