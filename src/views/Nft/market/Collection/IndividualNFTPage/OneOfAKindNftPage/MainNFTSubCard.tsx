import React from 'react'
import { Flex, Box, Card, CardBody, Text, Button, BinanceIcon, Skeleton, useModal } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import { NftToken } from 'state/nftMarket/types'
import { useBNBBusdTickerPrice } from 'state/ticker/hooks'
import BuyModal from '../../../components/BuySellModals/BuyModal'
import SellModal from '../../../components/BuySellModals/SellModal'
import { nftsBaseUrl } from '../../../constants'
import { Container, CollectionLink } from '../shared/styles'

interface MainNFTSubCardProps {
  nft: NftToken
  isOwnNft: boolean
}

const MainNFTSubCard: React.FC<MainNFTSubCardProps> = ({ nft, isOwnNft }) => {
  const { t } = useTranslation()
  const bnbBusdPrice = useBNBBusdTickerPrice()

  const currentAskPriceAsNumber = nft.marketData?.currentAskPrice ? parseFloat(nft.marketData.currentAskPrice) : 0
  const priceInUsd = bnbBusdPrice.times(currentAskPriceAsNumber).toNumber()
  const [onPresentBuyModal] = useModal(<BuyModal nftToBuy={nft} />)
  const [onPresentSellModal] = useModal(
    <SellModal variant={nft.marketData?.isTradable ? 'edit' : 'sell'} nftToSell={nft} />,
  )

  const ownerButtons = (
    <Flex flexDirection={['column', 'column', 'row']}>
      <Button minWidth="168px" mr="16px" width={['100%', null, 'max-content']} mt="24px" onClick={onPresentSellModal}>
        {nft.marketData?.isTradable ? t('Adjust price') : t('List for sale')}
      </Button>
    </Flex>
  )

  return (
    <Card mb="20px">
      <CardBody>
        <Container flexDirection={['column-reverse', null, 'column']}>
          <Flex justifyContent="flex-start" alignItems="center">
            <Box>
              <CollectionLink style={{ marginTop: 0 }} to={`${nftsBaseUrl}/collections/${nft.collectionAddress}`}>
                {nft.collectionName}
              </CollectionLink>
              <Text fontSize="40px" bold mt="12px">
                {nft.name} {nft.rarity}-{nft.tokenId}
              </Text>
              {nft.description && <Text mt={['16px', '16px', '24px']}>{t(nft.description)}</Text>}
              <Text color="textSubtle" mt={['16px', '16px', '24px']}>
                {t('Price')}
              </Text>
              {currentAskPriceAsNumber > 0 ? (
                <Flex alignItems="center" mt="8px">
                  <BinanceIcon width={18} height={18} mr="4px" />
                  <Text fontSize="24px" bold mr="4px">
                    {nft.marketData.currentAskPrice}
                  </Text>
                  {bnbBusdPrice ? (
                    <Text color="textSubtle">{`(~${priceInUsd.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })} USD)`}</Text>
                  ) : (
                    <Skeleton width="64px" />
                  )}
                </Flex>
              ) : (
                <Text>{t('Not for sale')}</Text>
              )}
              {isOwnNft && ownerButtons}
              {!isOwnNft && (
                <Button
                  minWidth="168px"
                  disabled={!nft.marketData?.isTradable}
                  mr="16px"
                  width={['100%', null, 'max-content']}
                  mt="24px"
                  onClick={onPresentBuyModal}
                >
                  {t('Buy')}
                </Button>
              )}
            </Box>
          </Flex>
        </Container>
      </CardBody>
    </Card>
  )
}

export default MainNFTSubCard
