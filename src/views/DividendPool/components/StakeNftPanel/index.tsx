import React, { useState, useEffect, useMemo } from 'react'
import styled from 'styled-components'
import { Box, CardBody, Flex, Text, Card, Button, Grid, useMatchBreakpoints, useModal } from '@pancakeswap/uikit'
import { useWeb3React } from '@web3-react/core'
import { useTranslation } from 'contexts/Localization'
import Select, { OptionProps } from 'components/Select/Select'
import { useMvsDividendPoolUpgradeableContract } from 'hooks/useContract'
import { useGetNftInfo, useGetUserBagNftTokenIds } from 'state/nftPool/hooks'
import { getMvsNftAddress } from 'utils/addressHelpers'
import useToast from 'hooks/useToast'
import { useAppDispatch } from 'state'
import { removeDividendPoolNfts, removeAllDividendPoolNfts, clearAllState } from 'state/nftPool/reducer'
import { ToastDescriptionWithTx } from 'components/Toast'
import PreviewImage from './PreviewImage'
import GridPlaceholder from './GridPlaceholder'
import { CardLayout } from '../shared/styles'
import NoNftsImage from './NoNftsImage'
import StakeModal from '../StakeModal'
import { UserPoolInfo } from '../../types'

export const StakeButton = styled(Button)`
  ${({ theme }) => theme.mediaQueries.lg} {
    margin-top: 50px;
  }
`

const NftCardBody: React.FC<{ isFetchEnd: boolean; mvsDividendUserPoolInfo: UserPoolInfo }> = ({
  isFetchEnd,
  mvsDividendUserPoolInfo,
}) => {
  const { t } = useTranslation()
  const { isMobile } = useMatchBreakpoints()
  const dispatch = useAppDispatch()
  const { account } = useWeb3React()
  const address = getMvsNftAddress()
  const mvsDividendPoolContract = useMvsDividendPoolUpgradeableContract(true)
  const { toastSuccess, toastError, toastWarning } = useToast()
  const collectionAddress = getMvsNftAddress()
  const nftsCache = useGetNftInfo()
  /** Bag */
  const walletTokenIds = useGetUserBagNftTokenIds(collectionAddress)
  const [onPresentStakeModalModal] = useModal(<StakeModal userNfts={walletTokenIds} />)
  const [sortByIndex, setSortByIndex] = useState('All')

  const [userStakeNfts, setUserStakeNfts] = useState([])
  const [stakeNftsInPool, setStakeNftsInPool] = useState(userStakeNfts)

  const _bunnyIds = useMemo(() => {
    return mvsDividendUserPoolInfo ? mvsDividendUserPoolInfo.bunnyIds : []
  }, [mvsDividendUserPoolInfo])

  const _tokenIds = useMemo(() => {
    return mvsDividendUserPoolInfo ? mvsDividendUserPoolInfo.tokenIds : []
  }, [mvsDividendUserPoolInfo])

  useEffect(() => {
    if (nftsCache.length > 0) {
      const data = _bunnyIds.map((it, index) => {
        return {
          ...nftsCache.find((item) => item?.bunnyId === it),
          tokenId: _tokenIds[index],
        }
      })
      setUserStakeNfts(data)
    }
  }, [_bunnyIds, _tokenIds, nftsCache])

  const [_sortByItems, setSortByItems] = useState<OptionProps[]>([
    { label: t('All '), value: { field: 'All', direction: 'asc' } },
    { label: t('SR '), value: { field: 'SR', direction: 'asc' } },
    { label: t('SSR '), value: { field: 'SSR', direction: 'asc' } },
  ])

  const handleChange = (newOption: OptionProps) => {
    const _selectField = newOption.value.field
    setSortByIndex(_selectField)
    if (_selectField === 'All') {
      setStakeNftsInPool(userStakeNfts)
    } else {
      const newData = userStakeNfts.filter((nft) => nft.rarity === _selectField)
      setStakeNftsInPool(newData)
    }
  }

  useEffect(() => {
    if (sortByIndex === 'All') {
      setStakeNftsInPool(userStakeNfts)
    } else {
      const newData = userStakeNfts.filter((nft) => nft.rarity === sortByIndex)
      setStakeNftsInPool(newData)
    }
  }, [userStakeNfts, sortByIndex])

  useEffect(() => {
    if (!account) {
      dispatch(clearAllState())
    }
  }, [account, dispatch])

  const handleUnStake = async (box: any) => {
    try {
      const tx = await mvsDividendPoolContract.unStake(box.tokenId)
      toastSuccess(t('Your NFT has been sent to your wallet'), <ToastDescriptionWithTx txHash={tx.transactionHash} />)
      await tx.wait()
      dispatch(removeDividendPoolNfts({ nfts: box, collectionAddress: address }))
    } catch (error: any) {
      if (error?.data?.message || error?.message) {
        toastError(t(`${error?.data?.message || error?.message}`))
      }
    }
  }

  const handleBatchUnStake = async () => {
    if (_tokenIds.length <= 0) {
      toastWarning(t('You haven’t staked in pool.'))
    } else {
      try {
        const tx = await mvsDividendPoolContract.unStakeList(_tokenIds)
        toastSuccess(
          t('Your NFT has been sent to your wallet.'),
          <ToastDescriptionWithTx txHash={tx.transactionHash} />,
        )
        await tx.wait()
        dispatch(removeAllDividendPoolNfts({ tokenIds: _tokenIds, collectionAddress: address }))
      } catch (error: any) {
        if (error?.data?.message || error?.message) {
          toastError(t(`${error?.data?.message || error?.message}`))
        }
      }
    }
  }

  const handleStake = async () => {
    if (walletTokenIds.length === 0) {
      toastWarning(t('No SR,SSR NFTs found in your bag'))
    } else {
      onPresentStakeModalModal()
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
            {t('Stake SR,SSR')}
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
      ) : stakeNftsInPool.length > 0 ? (
        <Grid
          gridGap="16px"
          gridTemplateColumns={['1fr', 'repeat(2, 1fr)', 'repeat(3, 1fr)', null, 'repeat(4, 1fr)']}
          alignItems="start"
          mb="100px"
        >
          {stakeNftsInPool.map((box) => (
            <Card key={`nft-pool-card-${box.tokenId}`}>
              <CardBody p="8px" style={{ width: '100%' }} key={`nft-pool-card-boday${box.tokenId}`}>
                <PreviewImage src={box?.image?.original} height={520} width={520} mb="8px" />
                <Flex flexDirection="row" justifyContent="space-between" alignItems="center">
                  <Text as="h4" fontWeight="600">
                    {box?.name} - {box.tokenId}
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
        </Grid>
      ) : (
        <Flex p="24px" flexDirection="column" alignItems="center" width="100%" mb="100px">
          <NoNftsImage />
          <Text pt="8px" bold>
            {t('No Staking SR,SSR NFT, please Stake')}
          </Text>
        </Flex>
      )}
    </CardLayout>
  )
}

export default React.memo(NftCardBody)
