import React, { useState, useEffect } from 'react'
import { Flex, Text, Button, Box, Message, useMatchBreakpoints } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import { useWeb3React } from '@web3-react/core'
import { useMvsDividendPoolContract } from 'hooks/useContract'
import useToast from 'hooks/useToast'
import { ToastDescriptionWithTx } from 'components/Toast'
import { useFetchOldDividendPoolInfo } from '../../hooks/useFetchOldDividendPoolInfo'

const UnStakeModal: React.FC = () => {
  const { t } = useTranslation()
  const { account } = useWeb3React()
  const { isMobile } = useMatchBreakpoints()
  const { toastSuccess, toastError, toastWarning } = useToast()
  const mvsDividendPoolContract = useMvsDividendPoolContract(true)
  const { mvsDividendUserPoolInfo: mvsDividendOldUserPoolInfo } = useFetchOldDividendPoolInfo()

  const [showMessage, setShowMessage] = useState(false)

  useEffect(() => {
    const len = mvsDividendOldUserPoolInfo?.tokenIds?.length
    if (len > 0) {
      setShowMessage(true)
    } else {
      setShowMessage(false)
    }
  }, [mvsDividendOldUserPoolInfo?.tokenIds])

  const handleBatchUnStake = async () => {
    const _tokenIds = mvsDividendOldUserPoolInfo?.tokenIds
    if (_tokenIds?.length <= 0) {
      toastWarning(t('You haven’t staked in pool.'))
    } else {
      try {
        const tx = await mvsDividendPoolContract.unStakeList(_tokenIds)
        toastSuccess(
          t('Your NFT has been sent to your wallet.'),
          <ToastDescriptionWithTx txHash={tx.transactionHash} />,
        )
        await tx.wait()
      } catch (error: any) {
        if (error?.data?.message || error?.message) {
          toastError(t(`${error?.data?.message || error?.message}`))
        }
      }
    }
  }

  return (
    <>
      {showMessage && (
        <>
          <Message variant="danger" mt="20px">
            <Box>
              <Flex>
                <Text as="p">
                  Please redeem the NFT you staked in the low-version dividend pool contract.{' '}
                  <Button
                    variant="secondary"
                    scale={isMobile ? 'sm' : 'sm'}
                    onClick={handleBatchUnStake}
                    disabled={!account}
                    style={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {t('Redemption of NFT')}
                  </Button>
                </Text>
              </Flex>
            </Box>
          </Message>
        </>
      )}
      <Message variant="warning" mt="20px">
        <Box>
          <Flex>
            <Text as="p">
              We have completed the upgrade and fixed the problem, you can stake before the next dividend deadline.
            </Text>
          </Flex>
        </Box>
      </Message>
    </>
  )
}

export default UnStakeModal
