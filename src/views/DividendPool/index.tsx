import React from 'react'
// import { Card, Text, Flex, CardBody, AutoRenewIcon, Box, IconButton, Heading } from '@pancakeswap/uikit'
import Page from 'components/Layout/Page'
import { getMvsNftAddress } from 'utils/addressHelpers'
import { useFetchCollectionsTokenIds } from 'state/nftPool/hooks'
import StakeNftPanel from './components/StakeNftPanel'
import BannerCard from './components/BannerCard'
import NftPoolEntry from './components/NftPoolEntry'
import UnStakeOldAll from './components/UnStakeOldAll'
import { useFetchDividendPoolInfo } from './hooks/useFetchDividendPoolInfo'

const DividendPool = () => {
  const { mvsDividendPoolInfo, mvsDividendUserPoolInfo } = useFetchDividendPoolInfo()
  const collectionAddress = getMvsNftAddress()
  useFetchCollectionsTokenIds(collectionAddress)
  const isFetchEnd = mvsDividendUserPoolInfo?.tokenIds !== undefined

  return (
    <>
      <Page>
        <BannerCard mvsDividendPoolInfo={mvsDividendPoolInfo} />
        <UnStakeOldAll />
        <NftPoolEntry poolStruct={mvsDividendPoolInfo} userPoolStruct={mvsDividendUserPoolInfo} />
        <StakeNftPanel isFetchEnd={isFetchEnd} mvsDividendUserPoolInfo={mvsDividendUserPoolInfo} />
      </Page>

      {/* <div style={{ width: '100%' }}>
        <Card>
          <CardBody>
            <Flex alignItems="flex-start">
              <Box width="45%">
                <Heading as="h2" fontSize="lg" mb={4}>
                  poolStruct
                </Heading>
                <pre>{JSON.stringify(mvsDividendPoolInfo, null, 4)}</pre>
              </Box>
              <Box width="55%" ml="30%">
                <Heading as="h2" fontSize="lg" mb={4}>
                  userPoolStruct
                </Heading>
                <pre>{JSON.stringify(mvsDividendUserPoolInfo, null, 4)}</pre>
              </Box>
            </Flex>
          </CardBody>
        </Card>
      </div> */}
    </>
  )
}

export default DividendPool
