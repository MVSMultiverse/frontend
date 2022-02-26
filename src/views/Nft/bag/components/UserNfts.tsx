/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { Grid, useModal, Text, Flex, ButtonMenu, ButtonMenuItem } from '@pancakeswap/uikit'
import Select, { OptionProps } from 'components/Select/Select'
import { useUserNfts } from 'state/nftMarket/hooks'
import { NftLocation, UserNftInitializationState, NftToken } from 'state/nftMarket/types'
import { useTranslation } from 'contexts/Localization'
import { CollectibleActionCard } from '../../market/components/CollectibleCard'
import GridPlaceholder from '../../market/components/GridPlaceholder'
import NoNftsImage from './NoNftsImage'
import SellModal from '../../market/components/BuySellModals/SellModal'
import { GridContainer, FilterByControls, SortByControls } from './UserNftsFilter'

interface SellNftProps {
  nft: NftToken
  location: NftLocation
  variant: 'sell' | 'edit'
}

const UserNfts = () => {
  const { nfts, userNftsInitializationState } = useUserNfts()
  const [clickedSellNft, setClickedSellNft] = useState<SellNftProps>({ nft: null, location: null, variant: null })
  const [onPresentSellModal] = useModal(<SellModal variant={clickedSellNft.variant} nftToSell={clickedSellNft.nft} />)
  const { t } = useTranslation()
  const [_nfts, setNfts] = useState<NftToken[]>(nfts)

  const [activeButtonIndex, setActiveButtonIndex] = useState(0)

  const [sortByIndex, setSortByIndex] = useState('All')
  const handleCollectibleClick = (nft: NftToken, location: NftLocation) => {
    switch (location) {
      case NftLocation.WALLET:
        setClickedSellNft({ nft, location, variant: 'sell' })
        break
      case NftLocation.FORSALE:
        setClickedSellNft({ nft, location, variant: 'edit' })
        break
      default:
        break
    }
  }

  const [_sortByItems, setSortByItems] = useState<OptionProps[]>([
    { label: t('All '), value: { field: 'All', direction: 'asc' } },
    { label: t('R '), value: { field: 'R', direction: 'asc' } },
    { label: t('SR '), value: { field: 'SR', direction: 'asc' } },
    { label: t('SSR '), value: { field: 'SSR', direction: 'asc' } },
  ])

  const onActiveButtonChange = (index: number) => {
    setActiveButtonIndex(index)
    onFilterDataFactory(index, sortByIndex)
  }

  const onFilterDataFactory = (_activeButtonIndex: number, _sortByIndex: string) => {
    const isForSaleActive = _activeButtonIndex === 1
    const currentSortIsAll = _sortByIndex === 'All'

    const forSale = nfts.filter((nft) => nft.location === 'For Sale')

    const nftsForRenderView = isForSaleActive
      ? currentSortIsAll
        ? forSale
        : forSale.filter((nft) => nft.rarity === _sortByIndex)
      : currentSortIsAll
      ? nfts
      : nfts.filter((nft) => nft.rarity === _sortByIndex)
    setNfts(nftsForRenderView)
  }

  const handleChange = (newOption: OptionProps) => {
    const _selectField = newOption.value.field
    setSortByIndex(_selectField)
    onFilterDataFactory(activeButtonIndex, _selectField)
  }

  useEffect(() => {
    if (nfts.length >= 0) {
      setNfts(nfts)
    }
  }, [nfts])

  useEffect(() => {
    if (clickedSellNft.nft) {
      onPresentSellModal()
    }
    // exhaustive deps disabled as the useModal dep causes re-render loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clickedSellNft])

  return (
    <>
      <GridContainer>
        <FilterByControls>
          <ButtonMenu scale="sm" activeIndex={activeButtonIndex} onItemClick={onActiveButtonChange}>
            <ButtonMenuItem>{t('All ')}</ButtonMenuItem>
            <ButtonMenuItem style={{ whiteSpace: 'nowrap' }}>{t('On Sale')}</ButtonMenuItem>
          </ButtonMenu>
        </FilterByControls>
        <SortByControls>
          <Select options={_sortByItems} onOptionChange={handleChange} />
        </SortByControls>
      </GridContainer>

      {/* User has no NFTs */}
      {_nfts.length === 0 && userNftsInitializationState === UserNftInitializationState.INITIALIZED ? (
        <Flex p="24px" flexDirection="column" alignItems="center">
          <NoNftsImage />
          <Text pt="8px" bold>
            {t('No NFTs found')}
          </Text>
        </Flex>
      ) : // User has NFTs and data has been fetched
      _nfts.length > 0 ? (
        <Grid
          gridGap="16px"
          gridTemplateColumns={['1fr', 'repeat(1, 1fr)', 'repeat(3, 1fr)', 'repeat(4, 1fr)']}
          alignItems="start"
          mb="100px"
        >
          {_nfts.map((nft) => {
            const { marketData, location } = nft
            return (
              <CollectibleActionCard
                isUserNft
                onClick={() => handleCollectibleClick(nft, location)}
                key={`${nft.tokenId}-${nft.collectionName}`}
                nft={nft}
                currentAskPrice={
                  marketData?.currentAskPrice && marketData?.isTradable && parseFloat(marketData.currentAskPrice)
                }
                nftLocation={location}
              />
            )
          })}
        </Grid>
      ) : (
        // User NFT data hasn't been fetched
        <GridPlaceholder />
      )}
    </>
  )
}

export default UserNfts
