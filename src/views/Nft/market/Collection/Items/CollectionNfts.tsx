/* eslint-disable react/no-array-index-key */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import uniqBy from 'lodash/uniqBy'
import styled from 'styled-components'
import { Flex, Grid, Text, Box, ButtonMenu, ButtonMenuItem } from '@pancakeswap/uikit'
import { useAppDispatch } from 'state'
import {
  useGetNftFilterLoadingState,
  useGetNftOrdering,
  useGetNftShowOnlyOnSale,
  useNftsFromCollection,
} from 'state/nftMarket/hooks'
import { Collection, NftFilterLoadingState, NftToken, TokenMarketData } from 'state/nftMarket/types'
import { fetchNftsFromCollections } from 'state/nftMarket/reducer'
import { getNftApi, getNftsMarketData } from 'state/nftMarket/helpers'
import useIntersectionObserver from 'hooks/useIntersectionObserver'
import { useTranslation } from 'contexts/Localization'
import GridPlaceholder, { GridPlaceholderItem } from '../../components/GridPlaceholder'
import { CollectibleLinkCard } from '../../components/CollectibleCard'
import { REQUEST_SIZE, NFT_FILTER_NUMBER } from '../config'
import SortSelect from './SortSelect'
import { GridContainer, FilterByControls } from './UserNftsFilter'

interface CollectionNftsProps {
  collection: Collection
}

const CollectionNfts: React.FC<CollectionNftsProps> = ({ collection }) => {
  const { totalSupply, numberTokensListed, address: collectionAddress } = collection
  const [page, setPage] = useState(1)
  const [skip, setSkip] = useState(0)
  const [nfts, setNfts] = useState<NftToken[]>([])
  const [isFetchingFilteredNfts, setIsFetchingFilteredNfts] = useState(false)
  const { t } = useTranslation()
  const collectionNfts = useNftsFromCollection(collectionAddress)
  const nftFilterLoadingState = useGetNftFilterLoadingState(collectionAddress)
  const dispatch = useAppDispatch()
  const showOnlyNftsOnSale = useGetNftShowOnlyOnSale(collectionAddress)
  const { field: orderField, direction: orderDirection } = useGetNftOrdering(collectionAddress)
  const isFetching =
    orderField === 'tokenId' ? nftFilterLoadingState === NftFilterLoadingState.LOADING : isFetchingFilteredNfts

  const { observerRef, isIntersecting } = useIntersectionObserver()
  const [activeButtonIndex, setActiveButtonIndex] = useState(0)
  const [isLast, setIsLast] = useState(false)

  useEffect(() => {
    if (orderField === 'tokenId') {
      setPage(1)
      setIsLast(false)
    }
  }, [orderField, activeButtonIndex])

  useEffect(() => {
    if (isIntersecting && !isFetchingFilteredNfts && !isLast) {
      if (orderField === 'tokenId') {
        setPage((prevPage) => prevPage + 1)
      }
      setSkip(skip + REQUEST_SIZE)
    }
  }, [isIntersecting])

  useEffect(() => {
    setNfts([])
    setSkip(0)
    setIsLast(false)
  }, [orderField, orderDirection, activeButtonIndex])

  useEffect(() => {
    const fetchApiData = async (marketData: TokenMarketData[]) => {
      const apiRequestPromises = marketData.map((marketNft) => getNftApi(collectionAddress, marketNft.tokenId))
      const apiResponses = await Promise.all(apiRequestPromises)

      let responsesWithMarketData = []
      try {
        responsesWithMarketData = apiResponses.map((apiNft, i) => {
          return {
            ...apiNft,
            collectionAddress,
            collectionName: apiNft.collection.name,
            marketData: marketData[i],
          }
        })
      } catch (error) {
        responsesWithMarketData = []
      }
      setIsFetchingFilteredNfts(false)

      setNfts((prevState) => {
        const combinedNfts = [...prevState, ...responsesWithMarketData]
        return uniqBy(combinedNfts, 'tokenId')
      })
    }

    const fetchMarketData = async () => {
      // , otherId: activeButtonIndex
      const subgraphRes = await getNftsMarketData(
        activeButtonIndex !== 0
          ? {
              collection: collectionAddress.toLowerCase(),
              isTradable: true,
              otherId_in: NFT_FILTER_NUMBER[activeButtonIndex],
            }
          : { collection: collectionAddress.toLowerCase(), isTradable: true },
        REQUEST_SIZE,
        orderField,
        orderDirection,
        skip,
      )
      if (subgraphRes.length === 0) setIsLast(true)
      fetchApiData(subgraphRes)
    }

    if (orderField !== 'tokenId') {
      // Query by tokenId is handled in useEffect below since we in this case
      // we need to show all NFTs, even those that never been on sale (i.e. they are not in subgraph)
      setIsFetchingFilteredNfts(true)
      fetchMarketData()
    }
  }, [orderField, orderDirection, skip, collectionAddress, activeButtonIndex])

  useEffect(() => {
    if (orderField === 'tokenId') {
      dispatch(
        fetchNftsFromCollections({
          collectionAddress,
          page,
          size: REQUEST_SIZE,
        }),
      )
    }
  }, [page, collectionAddress, dispatch, orderField, activeButtonIndex])

  const nftsToShow =
    orderField === 'tokenId'
      ? collectionNfts?.filter((nft) => {
          if (showOnlyNftsOnSale) {
            return nft.marketData?.isTradable
          }
          return true
        })
      : nfts

  const isNotLastPage =
    showOnlyNftsOnSale || orderField !== 'tokenId'
      ? nftsToShow?.length < Number(numberTokensListed)
      : nftsToShow?.length < Number(totalSupply)

  const resultsAmount = showOnlyNftsOnSale || orderField !== 'tokenId' ? numberTokensListed : totalSupply

  const SortByControls = styled(Box)`
    grid-area: sortByControls;
  `

  const onActiveButtonChange = (index: number) => {
    setActiveButtonIndex(index)
  }

  return (
    <>
      {!nftsToShow || nftsToShow?.length === 0 ? (
        <GridPlaceholder />
      ) : (
        <>
          {/* <Flex p="16px" flexDirection="row" justifyContent="space-between" alignItems="center">
            <Text bold>
              {resultsAmount} {t('Results')}
            </Text>
          </Flex> */}

          <Flex
            p="16px"
            flexDirection={['column', 'column', 'row', 'row']}
            justifyContent={['flex-end', 'flex-end', 'space-between', 'space-between']}
            alignItems={['flex-end', 'flex-end', 'space-between', 'space-between']}
          >
            <FilterByControls>
              <ButtonMenu scale="sm" activeIndex={activeButtonIndex} onItemClick={onActiveButtonChange}>
                <ButtonMenuItem>{t('All ')}</ButtonMenuItem>
                <ButtonMenuItem style={{ whiteSpace: 'nowrap' }}>{t('R')}</ButtonMenuItem>
                <ButtonMenuItem style={{ whiteSpace: 'nowrap' }}>{t('SR')}</ButtonMenuItem>
                <ButtonMenuItem style={{ whiteSpace: 'nowrap' }}>{t('SSR')}</ButtonMenuItem>
              </ButtonMenu>
            </FilterByControls>
            <SortByControls mt={['20px', '20px', '0px', '0px']}>
              <SortSelect style={{ width: '150px' }} collectionAddress={collectionAddress} />
            </SortByControls>
          </Flex>

          <Grid
            gridGap="16px"
            gridTemplateColumns={['1fr', 'repeat(2, 1fr)', 'repeat(2, 1fr)', 'repeat(4, 1fr)']}
            alignItems="start"
            mb="100px"
          >
            {nftsToShow.map((nft) => {
              const currentAskPriceAsNumber = nft.marketData && parseFloat(nft.marketData.currentAskPrice)
              return (
                <CollectibleLinkCard
                  key={nft.tokenId}
                  nft={nft}
                  currentAskPrice={currentAskPriceAsNumber > 0 ? currentAskPriceAsNumber : undefined}
                />
              )
            })}
            {isNotLastPage &&
              isFetching &&
              !isLast &&
              new Array(REQUEST_SIZE)
                .fill(1)
                .map((it, index) => <GridPlaceholderItem mb="65px" key={`Placeholder-Item-${index}`} />)}
          </Grid>
        </>
      )}
      <div ref={observerRef} />
    </>
  )
}

export default CollectionNfts
