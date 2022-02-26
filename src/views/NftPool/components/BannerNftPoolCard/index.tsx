import React from 'react'
import { Card, CardBody, Text, Heading, Skeleton } from '@pancakeswap/uikit'
import BigNumber from 'bignumber.js'
import history from 'routerHistory'
import { NFTPOOL_BANNER } from 'config'
import { useTranslation } from 'contexts/Localization'
import { useMVSBusdTickerPrice } from 'state/ticker/hooks'
import { formatNumber } from 'utils/formatBalance'
import { PoolInfo } from '../../types'
import { Container, StyledBannerImage } from '../shared/styles'

interface BannerNftPoolCard {
  poolStruct?: PoolInfo
}

const BannerNftPoolCard: React.FC<BannerNftPoolCard> = ({ poolStruct }) => {
  const { t } = useTranslation()
  const mvsBusdPrice = useMVSBusdTickerPrice()
  const priceInUsd = mvsBusdPrice.times(poolStruct?.totalRewardsInPool).toNumber()
  const totalOfPool = new BigNumber(poolStruct?.totalRewardsInPool).plus(poolStruct?.lockRewardsInPool).toNumber()

  return (
    <Card>
      <StyledBannerImage src={NFTPOOL_BANNER}>
        <CardBody>
          <Container flexDirection={['column', null, 'column']} justifyContent="center">
            <Heading scale="md" color="white">
              {t('Multiverse Pool')}
            </Heading>
            <Heading scale="xl" color="white">
              {totalOfPool ? formatNumber(totalOfPool, 0, 2) : <Skeleton width="200px" height={48} />}
            </Heading>
            {priceInUsd ? (
              <Text fontSize="16px" color="white">
                {`≈ $${formatNumber(priceInUsd, 2, 2)}`}
              </Text>
            ) : (
              <Skeleton width="86px" height="12px" mt="4px" />
            )}
          </Container>
        </CardBody>
      </StyledBannerImage>
    </Card>
  )
}

export default BannerNftPoolCard
