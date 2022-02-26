import React from 'react'
import { Box, CardBody, Flex, Text } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import { useBNBBusdTickerPrice } from 'state/ticker/hooks'
import PreviewImage from './PreviewImage'
import { CostLabel, LowestPriceMetaRow, MetaRow } from './styles'
import LocationTag from './LocationTag'
import { CollectibleCardProps } from './types'
import { useGetLowestPriceFromNft } from '../../hooks/useGetLowestPrice'
import { pancakeBunniesAddress } from '../../constants'

const CollectibleCardBody: React.FC<CollectibleCardProps> = ({ nft, nftLocation, currentAskPrice, isUserNft }) => {
  const { t } = useTranslation()
  const { name, image, rarity } = nft
  const bnbBusdPrice = useBNBBusdTickerPrice()
  const isPancakeBunny = nft.collectionAddress?.toLowerCase() === pancakeBunniesAddress.toLowerCase()
  const { isFetching, lowestPrice } = useGetLowestPriceFromNft(nft)

  return (
    <CardBody p="8px">
      <PreviewImage src={image.thumbnail} height={590} width={590} mb="8px" />
      <Flex
        alignItems={['flex-start', 'flex-start', 'center', 'center']}
        justifyContent="space-between"
        flexDirection="row"
      >
        {nft.collectionName && (
          <Text fontSize="12px" color="textSubtle" mb="8px">
            {nft.collectionName}
          </Text>
        )}
        {nftLocation && <LocationTag nftLocation={nftLocation} />}
      </Flex>
      <Flex justifyContent="space-between">
        <Text as="h4" fontWeight="600">
          {name}
        </Text>
        <Text as="h4" fontWeight="600">
          {rarity}-{nft.tokenId}
        </Text>
      </Flex>
      {currentAskPrice && (
        <Box>
          {isPancakeBunny && (
            <LowestPriceMetaRow lowestPrice={lowestPrice} isFetching={isFetching} bnbBusdPrice={bnbBusdPrice} />
          )}
          {currentAskPrice && (
            <MetaRow title={isUserNft ? t('Your price') : t('Asking price')}>
              <CostLabel cost={currentAskPrice} bnbBusdPrice={bnbBusdPrice} />
            </MetaRow>
          )}
        </Box>
      )}
    </CardBody>
  )
}

export default CollectibleCardBody
