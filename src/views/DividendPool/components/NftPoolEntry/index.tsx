import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { Flex, Box, Card, CardBody, Text, Heading, Skeleton, BinanceIcon } from '@pancakeswap/uikit'
import BigNumber from 'bignumber.js'
import { useBNBBusdTickerPrice } from 'state/ticker/hooks'
import { useTranslation } from 'contexts/Localization'
import { formatNumber } from 'utils/formatBalance'
import { simpleRpcProvider } from 'utils/providers'
import HarvestButton from '../HarvestButton'
import { DataSubItems } from '../shared/styles'
import { DividendPoolInfo, UserPoolInfo } from '../../types'
import Countdown from '../Countdown'

interface BannerNftPoolCard {
  poolStruct?: DividendPoolInfo
  userPoolStruct?: UserPoolInfo
}

const BannerNftPoolCard: React.FC<BannerNftPoolCard> = ({ poolStruct, userPoolStruct }) => {
  const { t } = useTranslation()
  const unharvestRewardAmount = parseFloat(userPoolStruct?.historyAward)
  const predictAwardAmount = parseFloat(userPoolStruct?.predictAward)
  const bnbBusdPrice = useBNBBusdTickerPrice()
  const priceInUsd = bnbBusdPrice.times(unharvestRewardAmount).toNumber()
  const predictAwardInUsd = bnbBusdPrice.times(predictAwardAmount).toNumber()
  const isCanHarvest = !userPoolStruct || unharvestRewardAmount <= 0

  const nowTimeUnix = moment().unix()
  const [endBlockTimeUnix, setEndBlockTimeUnix] = useState(0)

  useEffect(() => {
    const fetchBlockNumber = async () => {
      const _endBlock = poolStruct?.endBlock
      const blockNumber = await simpleRpcProvider.getBlockNumber()

      if (parseInt(_endBlock) > 0) {
        const _endBlockTimeUnix = new BigNumber(_endBlock)
          .minus(blockNumber)
          .multipliedBy(3)
          .plus(nowTimeUnix)
          .toNumber()
        setEndBlockTimeUnix(_endBlockTimeUnix)
      }
    }
    fetchBlockNumber()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [poolStruct?.endBlock])

  return (
    <DataSubItems>
      <Box width={['100%', '100%', '48%', '31%']} mt="20px">
        <Card>
          <CardBody>
            <Box>
              <Flex flexDirection="column" justifyContent="space-between">
                <Text color="textSubtle">{t('My SR Staked / Total SR Staked')}</Text>
                <Heading as="h3" scale="md" mt="20px">
                  {userPoolStruct ? (
                    `${userPoolStruct.srCount} / ${poolStruct.srCount}`
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
                <Text color="textSubtle">{t('My SSR Staked / Total SSR Staked')}</Text>
                <Heading as="h3" scale="md" mt="20px">
                  {userPoolStruct ? (
                    `${userPoolStruct.ssrCount} / ${poolStruct.ssrCount}`
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
                <Text color="textSubtle">{t('My Shares / Total Shares')}</Text>
                <Heading as="h3" scale="md" mt="20px">
                  {userPoolStruct?.stakePower ? (
                    <Heading as="h3" scale="md">
                      {userPoolStruct?.stakePower} / {poolStruct?.totalPower}
                    </Heading>
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
                <Flex justifyContent="space-between" alignItems="center">
                  <Text color="textSubtle">BNB</Text>
                  <HarvestButton text={t('Harvest')} disabled={isCanHarvest} />
                </Flex>

                <Flex mt="20px" flexDirection="row">
                  <BinanceIcon width={24} height={24} mr="4px" />
                  <Text fontSize="24px" bold mr="4px">
                    <Flex flexDirection="row" alignItems="center">
                      {unharvestRewardAmount ? (
                        <Heading as="h3" scale="md">
                          {formatNumber(unharvestRewardAmount, 2, 4)}
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
                <Text color="textSubtle">{t('Predict Reward')}</Text>

                <Flex mt="20px" flexDirection="row">
                  <BinanceIcon width={24} height={24} mr="4px" />
                  <Text fontSize="24px" bold mr="4px">
                    <Flex flexDirection="row" alignItems="center">
                      {parseFloat(userPoolStruct?.predictAward) ? (
                        <Heading as="h3" scale="md">
                          {userPoolStruct.predictAward}
                        </Heading>
                      ) : (
                        <Skeleton width="100px" height="25px" />
                      )}
                      {predictAwardInUsd ? (
                        <Text fontSize="14px" color="textSubtle" ml="4px">
                          {` ≈ $${formatNumber(predictAwardInUsd, 2, 2)} `}
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
                <Text color="textSubtle">{t('Next Devidend')}</Text>
                <Heading as="h3" scale="md" mt="20px">
                  <Countdown eventTime={endBlockTimeUnix} />
                </Heading>
              </Flex>
            </Box>
          </CardBody>
        </Card>
      </Box>
    </DataSubItems>
  )
}

export default BannerNftPoolCard
