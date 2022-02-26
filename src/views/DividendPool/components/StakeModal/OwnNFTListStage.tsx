import React, { useState, useEffect } from 'react'
import { Flex, Text, Button, Box, Checkbox } from '@pancakeswap/uikit'
import useTheme from 'hooks/useTheme'
import { useTranslation } from 'contexts/Localization'
import { getNftsFromDifferentCollectionsApi } from 'state/nftMarket/helpers'
import PreviewImage from '../StakeNftPanel/PreviewImage'
import { StyledCard } from './styles'
import NoNftsImage from '../StakeNftPanel/NoNftsImage'

interface OwnNFTListStageProps {
  continueToNextStage: () => void
  selectedNft: any[]
  setSelectedNft: (ids?: any) => void
  userNfts: any
}

const LOADING_TEXT = 'Loading...'

const OwnNFTListStage: React.FC<OwnNFTListStageProps> = ({
  continueToNextStage,
  selectedNft,
  setSelectedNft,
  userNfts,
}) => {
  const { t } = useTranslation()
  const { theme } = useTheme()
  const [walletNftInVisibleTotal, setWalletNftInVisibleTotal] = useState([])
  const [isAllChecked, setIsAllChecked] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const _userNfts = JSON.parse(JSON.stringify(userNfts))
    const from = _userNfts.map((item) => ({ tokenId: item?.tokenId, collectionAddress: item?.collectionAddress }))
    const fetch = async () => {
      setIsLoading(true)
      try {
        const response: any = await getNftsFromDifferentCollectionsApi(from)
        const data = response.filter((item) => ['SR', 'SSR'].includes(item.rarity))
        if (response) {
          setWalletNftInVisibleTotal(data)
        }
      } catch (error) {
        setWalletNftInVisibleTotal([])
      } finally {
        setIsLoading(false)
      }
    }
    fetch()
  }, [userNfts])

  const handleSelectNft = (nft: any) => {
    const ids = selectedNft.map((item) => item.tokenId)
    if (ids.includes(nft.tokenId)) {
      setSelectedNft(selectedNft.filter((it: any) => it.tokenId !== nft.tokenId))
    } else {
      setSelectedNft((pre: any) => {
        if (pre.length > 11) {
          return [...pre]
        }
        return [...pre, nft]
      })
    }
  }

  const handleSelectAll = () => {
    if (isAllChecked) {
      setSelectedNft([])
    } else {
      const arr = [...walletNftInVisibleTotal].splice(0, 12)
      setSelectedNft(arr)
    }
    setIsAllChecked(!isAllChecked)
  }

  return (
    <Box width={['100%', '100%', '800px', '500px']} height={['400px', '400px', '530px', '550px']} overflowY="hidden">
      <Flex flexDirection="column" width="100%" height="100%" alignItems="center" pb="30px">
        <Flex
          flexDirection="column"
          flex="1"
          minHeight="70%"
          width={['100%', '100%', '80%']}
          mt={['0px', '0px', '24px', '24px']}
        >
          <Box
            background={theme.colors.backgroundAlt}
            style={{
              borderRadius: '15px',
              boxShadow: '0px 2px 3px 1px #eff4f5',
              padding: '16px 10px',
              height: '100%',
            }}
            overflowY="auto"
            overflowX="hidden"
          >
            <Flex px={['0px', null, '8px', '8px']} flexDirection="column" style={{ width: '100%' }}>
              {walletNftInVisibleTotal.map((it) => {
                const ids = selectedNft.map((i) => i.tokenId)
                return (
                  <StyledCard
                    selected={ids.includes(it?.tokenId)}
                    mt="8px"
                    onClick={() => handleSelectNft(it)}
                    key={it?.tokenId}
                  >
                    <Flex width={['100%', '100%', '80%']} padding="5px 0px" alignItems="center">
                      <Box width="20%" ml="16px" padding="0px">
                        <Flex flexDirection="column" justifyContent="center" padding="0px">
                          <PreviewImage src={it?.image?.thumbnail} height={64} width={64} />
                        </Flex>
                      </Box>
                      <Box width="80%" ml="16px" padding="0px">
                        <Flex flexDirection="column" alignItems="flex-start" justifyContent="center" padding="0px">
                          <Text textAlign="left" fontSize="16px" fontWeight="600">
                            {it?.name}
                          </Text>

                          <Text textAlign="left" fontSize="12px" mt={['0px', '0px', '5px', '5px']} color="textSubtle">
                            {it?.rarity}-{it?.tokenId}
                          </Text>
                        </Flex>
                      </Box>
                    </Flex>
                  </StyledCard>
                )
              })}
              {walletNftInVisibleTotal.length === 0 && !isLoading && (
                <Flex p="24px" flexDirection="column" alignItems="center" width="100%" mb="100px">
                  <NoNftsImage />
                  <Text pt="8px" bold>
                    {t('No Staking SR,SSR NFT, please Stake')}
                  </Text>
                </Flex>
              )}
              {isLoading && (
                <Flex width="100%" justifyContent="center" mt="8px">
                  <Text fontSize="12px" color="textSubtle">
                    {LOADING_TEXT}
                  </Text>
                </Flex>
              )}
            </Flex>
          </Box>
        </Flex>
        <Flex justifyContent="space-between" mt="15px" width={['98%', '98%', '100%', '80%']}>
          <Flex alignItems="center">
            <Checkbox scale="sm" checked={isAllChecked} onChange={() => handleSelectAll()} />
            <Text onClick={handleSelectAll}> {t('Selected All')}</Text>
          </Flex>

          <Text>
            {t('Selected')}: {selectedNft.length}/{walletNftInVisibleTotal.length}
          </Text>
        </Flex>
        <Flex flexDirection="column" flex="1" mt="30px">
          <Button onClick={continueToNextStage} disabled={selectedNft.length <= 0}>
            {t('Confirm Stake')}
          </Button>
        </Flex>
      </Flex>
    </Box>
  )
}

export default OwnNFTListStage
