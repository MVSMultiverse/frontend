import React, { useState, useMemo, useEffect } from 'react'
import { InjectedModalProps, Flex, Text, Button, Box } from '@pancakeswap/uikit'
import useTheme from 'hooks/useTheme'
import { useTranslation } from 'contexts/Localization'
import { useMvsDividendPoolContract } from 'hooks/useContract'
import useToast from 'hooks/useToast'
import { ToastDescriptionWithTx } from 'components/Toast'
import { useGetNftInfo } from 'state/nftPool/hooks'
import { StyledModal, StyledCard } from './styles'
import PreviewImage from '../StakeNftPanel/PreviewImage'
import NoNftsImage from '../StakeNftPanel/NoNftsImage'

const LOADING_TEXT = 'Loading...'

interface HarvestModalProps extends InjectedModalProps {
  userNfts?: any
}

const UnStakeModal: React.FC<HarvestModalProps> = ({ userNfts, onDismiss }) => {
  const { theme } = useTheme()
  const { t } = useTranslation()
  const mvsDividendPoolContract = useMvsDividendPoolContract(true)
  const { toastSuccess, toastError } = useToast()
  const nftsCache = useGetNftInfo()

  const [isLoading, setIsLoading] = useState(false)

  const [userStakeNfts, setUserStakeNfts] = useState([])

  const handleUnStake = async (box: any) => {
    try {
      const tx = await mvsDividendPoolContract.emergencyWithdrawForNft(box.tokenId)
      toastSuccess(t('Your NFT has been sent to your wallet'), <ToastDescriptionWithTx txHash={tx.transactionHash} />)
      await tx.wait()
      setUserStakeNfts((item) => item.filter((it) => it.tokenId !== box.tokenId))
    } catch (error: any) {
      if (error?.data?.message || error?.message) {
        toastError(t(`${error?.data?.message || error?.message}`))
      }
    }
  }

  const _bunnyIds = useMemo(() => {
    return userNfts ? userNfts.bunnyIds : []
  }, [userNfts])

  const _tokenIds = useMemo(() => {
    return userNfts ? userNfts.tokenIds : []
  }, [userNfts])

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

  return (
    <StyledModal
      title={t('Redemption of NFT')}
      onDismiss={onDismiss}
      headerBackground={theme.colors.gradients.cardHeader}
    >
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
                {userStakeNfts.map((it) => {
                  return (
                    <StyledCard mt="8px" key={it?.tokenId}>
                      <Flex width={['100%', '100%', '100%']} padding="5px 0px" alignItems="center">
                        <Box width="20%" ml="16px" padding="0px">
                          <Flex flexDirection="column" justifyContent="center" padding="0px">
                            <PreviewImage src={it?.image?.thumbnail} height={64} width={64} />
                          </Flex>
                        </Box>
                        <Box width="40%" ml="16px" padding="0px">
                          <Flex flexDirection="column" alignItems="flex-start" justifyContent="center" padding="0px">
                            <Text textAlign="left" fontSize="16px" fontWeight="600">
                              {it?.name}
                            </Text>

                            <Text textAlign="left" fontSize="12px" mt={['0px', '0px', '5px', '5px']} color="textSubtle">
                              {it?.rarity}-{it?.tokenId}
                            </Text>
                          </Flex>
                        </Box>
                        <Box width="40%" padding="0px">
                          <Button variant="secondary" scale="sm" onClick={() => handleUnStake(it)} mt="5px">
                            {t('Redemption')}
                          </Button>
                        </Box>
                      </Flex>
                    </StyledCard>
                  )
                })}
                {userStakeNfts.length === 0 && !isLoading && (
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
        </Flex>
      </Box>
    </StyledModal>
  )
}

export default UnStakeModal
