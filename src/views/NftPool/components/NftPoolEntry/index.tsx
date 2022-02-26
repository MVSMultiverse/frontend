import React from 'react'
import history from 'routerHistory'
import styled from 'styled-components'
import {
  Flex,
  Box,
  Card,
  CardBody,
  Text,
  Heading,
  Skeleton,
  PancakeRoundIcon,
  Button,
  useMatchBreakpoints,
} from '@pancakeswap/uikit'
import { TO_DIVIDENDPOOL_BACKGROUND } from 'config'
import BigNumber from 'bignumber.js'
import { useMVSBusdTickerPrice } from 'state/ticker/hooks'
import { useTranslation } from 'contexts/Localization'
import { formatNumber } from 'utils/formatBalance'
import HarvestButton from '../HarvestButton'
import { DataSubItems } from '../shared/styles'
import { PoolInfo, UserPoolInfo } from '../../types'

interface BannerNftPoolCard {
  poolStruct?: PoolInfo
  userPoolStruct?: UserPoolInfo
}

const StyledBannerImage = styled(CardBody)`
  background-image: url(${TO_DIVIDENDPOOL_BACKGROUND});
  background-size: cover;
  background-position: center;
  background-position: -63px 0px;
  flex: none;
  width: 100%;
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`

const BannerNftPoolCard: React.FC<BannerNftPoolCard> = ({ poolStruct, userPoolStruct }) => {
  const { t } = useTranslation()
  const { isMobile } = useMatchBreakpoints()
  const unharvestRewardAmount = parseFloat(userPoolStruct?.unharvestReward)
  const mvsBusdPrice = useMVSBusdTickerPrice()
  const priceInUsd = mvsBusdPrice.times(unharvestRewardAmount).toNumber()

  const MiningHashRate24HToGet = new BigNumber(poolStruct?.rewardPerBlock || 0)
    .times(28800)
    .dividedBy(new BigNumber(poolStruct?.totalShareInPool))
    .times(1000)
    .toNumber()

  const priceInUsdMiningHashRate24HToGet = mvsBusdPrice.times(MiningHashRate24HToGet).toNumber()

  return (
    <DataSubItems>
      <Box width="100%" mt="20px">
        <Card>
          <StyledBannerImage>
            <Box>
              <Flex flexDirection="column" justifyContent="flex-end">
                <Flex justifyContent="flex-end" alignItems="flex-end">
                  <Button
                    onClick={() => history.push('/dividend-pool')}
                    scale={isMobile ? 'sm' : 'sm'}
                    style={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {t('SR, SSR Dividends')}
                  </Button>
                </Flex>
              </Flex>
            </Box>
          </StyledBannerImage>
        </Card>
      </Box>

      <Box width={['100%', '100%', '48%', '31%']} mt="20px">
        <Card>
          <CardBody>
            <Box>
              <Flex flexDirection="column" justifyContent="space-between">
                <Flex justifyContent="space-between" alignItems="center">
                  <Text color="textSubtle">MVS</Text>
                  <HarvestButton text={t('Harvest')} disabled={unharvestRewardAmount <= 0} />
                </Flex>
                <Flex mt="20px" flexDirection="row">
                  <PancakeRoundIcon width={24} height={24} mr="4px" />
                  <Text fontSize="24px" bold mr="4px">
                    <Flex flexDirection="row" alignItems="center">
                      {unharvestRewardAmount ? (
                        <Heading as="h3" scale="md">
                          {formatNumber(unharvestRewardAmount, 2, 2)}
                        </Heading>
                      ) : (
                        <Skeleton width="100px" height="25px" />
                      )}

                      {priceInUsd ? (
                        <Text fontSize="14px" color="textSubtle" ml="4px">
                          {` ≈ $${formatNumber(priceInUsd, 2, 2)} `}
                        </Text>
                      ) : null}
                    </Flex>
                  </Text>
                </Flex>
              </Flex>
            </Box>
          </CardBody>
        </Card>
      </Box>

      <Box width={['100%', '100%', '48%', '31%']} mt="20px">
        <Card>
          <CardBody>
            <Box>
              <Flex flexDirection="column" justifyContent="space-between">
                <Text color="textSubtle">{t('My Staked/HashRate')}</Text>
                <Heading as="h3" scale="md" mt="20px">
                  {userPoolStruct?.allShare ? (
                    formatNumber(parseFloat(userPoolStruct?.allShare), 0, 0)
                  ) : (
                    <Skeleton width="100px" height="25px" />
                  )}
                </Heading>
              </Flex>
            </Box>
          </CardBody>
        </Card>
      </Box>

      <Box width={['100%', '100%', '48%', '31%']} mt="20px">
        <Card>
          <CardBody>
            <Flex flexDirection="column" justifyContent="space-between">
              <Text color="textSubtle">{t('Total Staked/HashRate')}</Text>
              <Heading as="h3" scale="md" mt="20px">
                {poolStruct?.totalShareInPool ? (
                  formatNumber(parseFloat(poolStruct?.totalShareInPool), 0, 0)
                ) : (
                  <Skeleton width="100px" height="25px" />
                )}
              </Heading>
            </Flex>
          </CardBody>
        </Card>
      </Box>

      <Box width={['100%', '100%', '48%', '31%']} mt="20px">
        <Card>
          <CardBody>
            <Box>
              <Flex flexDirection="column" justifyContent="space-between">
                <Text color="textSubtle">{t('Reward Per Block')}</Text>
                <Heading as="h3" scale="md" mt="20px">
                  {poolStruct?.rewardPerBlock ? (
                    formatNumber(parseFloat(poolStruct?.rewardPerBlock), 0, 0)
                  ) : (
                    <Skeleton width="100px" height="25px" />
                  )}
                </Heading>
              </Flex>
            </Box>
          </CardBody>
        </Card>
      </Box>

      <Box width={['100%', '100%', '48%', '31%']} mt="20px">
        <Card>
          <CardBody>
            <Box>
              <Flex flexDirection="column" justifyContent="space-between">
                <Text color="textSubtle">{t('Average Block Time')}</Text>
                <Heading as="h3" scale="md" mt="20px">
                  {poolStruct?.bscBlockTime ? (
                    `${formatNumber(parseFloat(poolStruct?.bscBlockTime), 0, 0)} s`
                  ) : (
                    <Skeleton width="100px" height="25px" />
                  )}
                </Heading>
              </Flex>
            </Box>
          </CardBody>
        </Card>
      </Box>

      <Box width={['100%', '100%', '48%', '31%']} mt="20px">
        <Card>
          <CardBody>
            <Box>
              <Flex flexDirection="column" justifyContent="space-between">
                <Flex alignItems="center">
                  <Text color="textSubtle">{t('1000 Mining HashRate/24H to get')}</Text>
                </Flex>
                <Flex mt="20px" flexDirection="row">
                  <PancakeRoundIcon width={24} height={24} mr="4px" />
                  <Text fontSize="24px" bold mr="4px">
                    {priceInUsdMiningHashRate24HToGet ? (
                      <Flex flexDirection="row" alignItems="center">
                        <Heading as="h3" scale="md">
                          {formatNumber(MiningHashRate24HToGet, 0, 0)}
                        </Heading>
                        <Text fontSize="14px" color="textSubtle">
                          {` ≈ $${formatNumber(priceInUsdMiningHashRate24HToGet, 2, 2)} `}
                        </Text>
                      </Flex>
                    ) : (
                      <Skeleton width="100px" height="25px" />
                    )}
                  </Text>
                </Flex>
              </Flex>
            </Box>
          </CardBody>
        </Card>
      </Box>
    </DataSubItems>
  )
}

export default BannerNftPoolCard
