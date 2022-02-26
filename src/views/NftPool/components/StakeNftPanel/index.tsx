/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Box, CardBody, Flex, Text, Card, Button, Grid, useMatchBreakpoints, useModal } from '@pancakeswap/uikit'
import { useWeb3React } from '@web3-react/core'
import { useTranslation } from 'contexts/Localization'
import Select, { OptionProps } from 'components/Select/Select'
import { useMvsNftPoolContract } from 'hooks/useContract'
import {
  useGetStakeNftTokenIds,
  useFetchStakeNfts,
  useGetIsLoading,
  useGetUserNftPoolList,
  useGetUserBagNftTokenIds,
} from 'state/nftPool/hooks'
import useIntersectionObserver from 'hooks/useIntersectionObserver'
import { getMvsNftAddress } from 'utils/addressHelpers'
import useToast from 'hooks/useToast'
import { useAppDispatch } from 'state'
import { removeUserPoolNfts, removeAllUserPoolNfts, clearAllState } from 'state/nftPool/reducer'
import { ToastDescriptionWithTx } from 'components/Toast'
import PreviewImage from './PreviewImage'
import GridPlaceholder, { GridPlaceholderItem } from './GridPlaceholder'
import { CardLayout } from '../shared/styles'
import NoNftsImage from './NoNftsImage'
import StakeModal from '../StakeModal'

export const StakeButton = styled(Button)`
  ${({ theme }) => theme.mediaQueries.lg} {
    margin-top: 50px;
  }
`

const NUMBER_OF_NFTPOOL_VISIBLE = 12
const NftCardBody: React.FC<{ isFetchEnd: boolean }> = ({ isFetchEnd }) => {
  const { t } = useTranslation()
  const { isMobile } = useMatchBreakpoints()
  const dispatch = useAppDispatch()
  const { account } = useWeb3React()
  const address = getMvsNftAddress()
  const contract = useMvsNftPoolContract(true)
  const { toastSuccess, toastError, toastWarning } = useToast()
  const collectionAddress = getMvsNftAddress()
  const { observerRef, isIntersecting } = useIntersectionObserver()

  const walletTokenIds = useGetUserBagNftTokenIds(collectionAddress)
  const [onPresentStakeModalModal] = useModal(<StakeModal userNfts={walletTokenIds} />)

  const stakeNftTokenIds = useGetStakeNftTokenIds()
  const isLoading = useGetIsLoading()
  const stakeNftsInPoolTotal = useGetUserNftPoolList()
  const [fetchIndex, setFetchIndex] = useState(0)
  const [_stakeNftsInPool, setStakeNftsInPool] = useState(stakeNftsInPoolTotal)
  const [sortByIndex, setSortByIndex] = useState('All')

  useFetchStakeNfts(fetchIndex, NUMBER_OF_NFTPOOL_VISIBLE)
  useEffect(() => {
    if (sortByIndex === 'All') {
      setStakeNftsInPool(stakeNftsInPoolTotal)
    } else {
      const newData = stakeNftsInPoolTotal.filter((nft) => nft.rarity === sortByIndex)
      setStakeNftsInPool(newData)
    }
  }, [stakeNftsInPoolTotal, sortByIndex])

  useEffect(() => {
    if (!account) {
      setFetchIndex(0)
      dispatch(clearAllState())
    }
  }, [account, dispatch])

  useEffect(() => {
    if (isIntersecting && stakeNftTokenIds.length > NUMBER_OF_NFTPOOL_VISIBLE) {
      setFetchIndex((nftPoolCurrentlyVisible) => {
        if (nftPoolCurrentlyVisible <= stakeNftsInPoolTotal.length && stakeNftsInPoolTotal.length !== 0 && !isLoading) {
          return nftPoolCurrentlyVisible + NUMBER_OF_NFTPOOL_VISIBLE
        }
        return nftPoolCurrentlyVisible
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isIntersecting, stakeNftTokenIds])

  const handleUnStake = async (box: any) => {
    if (box.tokenId === '1') return
    try {
      const tx = await contract.unStake(box.tokenId)
      toastSuccess(t('Your NFT has been sent to your wallet'), <ToastDescriptionWithTx txHash={tx.transactionHash} />)
      await tx.wait()
      dispatch(removeUserPoolNfts({ nfts: box, collectionAddress: address }))
    } catch (error: any) {
      if (error?.data?.message || error?.message) {
        toastError(t(`${error?.data?.message || error?.message}`))
      }
    }
  }

  const handleBatchUnStake = async () => {
    const ids = _stakeNftsInPool.length > 0 ? _stakeNftsInPool.map((it) => it?.tokenId) : []
    if (_stakeNftsInPool.length <= 0) {
      toastWarning(t('You haven’t staked in pool.'))
    } else {
      try {
        const tx = await contract.batchUnStake(ids.filter((id) => id !== '1'))
        toastSuccess(
          t('Your NFT has been sent to your wallet.'),
          <ToastDescriptionWithTx txHash={tx.transactionHash} />,
        )
        await tx.wait()
        dispatch(removeAllUserPoolNfts({ nfts: _stakeNftsInPool, collectionAddress: address }))
        setFetchIndex(0)
      } catch (error: any) {
        if (error?.data?.message || error?.message) {
          toastError(t(`${error?.data?.message || error?.message}`))
        }
      }
    }
  }

  const handleStake = async () => {
    if (walletTokenIds.length === 0) {
      toastWarning(t('No NFTs found in your bag'))
    } else {
      onPresentStakeModalModal()
    }
  }

  const [_sortByItems, setSortByItems] = useState<OptionProps[]>([
    { label: t('All '), value: { field: 'All', direction: 'asc' } },
    { label: t('R '), value: { field: 'R', direction: 'asc' } },
    { label: t('SR '), value: { field: 'SR', direction: 'asc' } },
    { label: t('SSR '), value: { field: 'SSR', direction: 'asc' } },
  ])

  const handleChange = (newOption: OptionProps) => {
    const _selectField = newOption.value.field
    setSortByIndex(_selectField)
    if (_selectField === 'All') {
      setStakeNftsInPool(stakeNftsInPoolTotal)
    } else {
      const newData = stakeNftsInPoolTotal.filter((nft) => nft.rarity === _selectField)
      setStakeNftsInPool(newData)
    }
  }

  return (
    <CardLayout>
      <Flex justifyContent="space-between" alignItems="center" mb="20px" width="100%">
        <Box>
          <Select options={_sortByItems} onOptionChange={handleChange} />
        </Box>
        <Flex justifyContent="flex-end">
          <Button
            variant="secondary"
            scale={isMobile ? 'sm' : 'sm'}
            onClick={handleStake}
            disabled={!account || (walletTokenIds && walletTokenIds.length <= 0)}
            style={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {t('Stake')}
          </Button>
          <Button
            variant="secondary"
            scale={isMobile ? 'sm' : 'sm'}
            ml={['5px', '5px', '10px', '10px']}
            onClick={handleBatchUnStake}
            disabled={!account}
            style={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {t('Unstake All')}
          </Button>
        </Flex>
      </Flex>
      {!isFetchEnd ? (
        <GridPlaceholder mb="65px" />
      ) : _stakeNftsInPool.length > 0 ? (
        <Grid
          gridGap="16px"
          gridTemplateColumns={['1fr', 'repeat(2, 1fr)', 'repeat(3, 1fr)', null, 'repeat(4, 1fr)']}
          alignItems="start"
          mb="100px"
        >
          {_stakeNftsInPool.map((box) => (
            <Card key={`nft-pool-card-${box.tokenId}`}>
              <CardBody p="8px" style={{ width: '100%' }} key={`nft-pool-card-boday${box.tokenId}`}>
                <PreviewImage src={box?.image?.original} height={520} width={520} mb="8px" />
                <Flex flexDirection="row" justifyContent="space-between" alignItems="center">
                  <Text as="h4" fontWeight="600">
                    {box?.name}
                  </Text>
                  <Text as="h3">
                    {box?.rarity}-{box?.tokenId}
                  </Text>
                </Flex>
                <Button
                  variant="primary"
                  scale={isMobile ? 'sm' : 'md'}
                  onClick={() => handleUnStake(box)}
                  width="100%"
                  mt="5px"
                >
                  {t('Unstake')}
                </Button>
              </CardBody>
            </Card>
          ))}
          {isLoading &&
            new Array(NUMBER_OF_NFTPOOL_VISIBLE)
              .fill(1)
              .map((it, index) => <GridPlaceholderItem mb="65px" key={`Placeholder-Item-${index}`} />)}
        </Grid>
      ) : (
        <Flex p="24px" flexDirection="column" alignItems="center" width="100%" mb="100px">
          <NoNftsImage />
          <Text pt="8px" bold>
            {t('No Staking NFT, please Stake')}
          </Text>
        </Flex>
      )}
      <div ref={observerRef} />
    </CardLayout>
  )
}

export default React.memo(NftCardBody)
