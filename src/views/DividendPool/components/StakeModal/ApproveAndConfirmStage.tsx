import React from 'react'
import styled from 'styled-components'
import { Flex, Text, Button, Box } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'

export const StepIndicator = styled(Flex)<{ success: boolean; disabled?: boolean }>`
  border-radius: 50%;
  background-color: ${({ theme, success, disabled }) => {
    if (disabled) {
      return 'none'
    }
    return success ? theme.colors.success : theme.colors.secondary
  }};
  border: ${({ theme, disabled }) => (disabled ? `1px solid ${theme.colors.textDisabled}` : 'none')};
  height: 32px;
  width: 32px;
  justify-content: center;
  align-items: center;
  margin-right: 8px;
`

interface ApproveAndConfirmStageProps {
  isApproved: boolean
  isApproving: boolean
  isConfirming: boolean
  handleApprove: () => void
  handleConfirm: () => void
}

// Buy Flow:
// Shown if user wants to pay with WBNB and contract isn't approved yet
// Sell Flow:
// Shown the first time user puts NFT for sale
const ApproveAndConfirmStage: React.FC<ApproveAndConfirmStageProps> = ({
  isApproved,
  isApproving,
  isConfirming,
  handleApprove,
  handleConfirm,
}) => {
  const { t } = useTranslation()

  return (
    <Box width={['100%', '100%', '800px', '500px']} overflowY="hidden">
      <Flex p="16px" flexDirection="column" width="100%">
        <Flex mb="8px" alignItems="center">
          <Flex flexDirection="column">
            <Flex alignItems="center">
              <StepIndicator success={isApproved}>
                <Text fontSize="20px" bold color="invertedContrast">
                  1
                </Text>
              </StepIndicator>
              <Text fontSize="20px" color={isApproved ? 'success' : 'secondary'} bold>
                {isApproved ? t('Enabled') : t('Enable')}
              </Text>
            </Flex>
            {!isApproved && (
              <Text mt="8px" maxWidth="275px" small color="textSubtle">
                {t('Please enable your NFT to be sent to the pool')}
              </Text>
            )}
          </Flex>
          {/* <Flex flex="0 0 64px" width="64px">
            {isApproving && <Spinner size={64} />}
          </Flex> */}
        </Flex>
        {!isApproved && (
          <Button variant="secondary" disabled={isApproving} onClick={handleApprove}>
            {isApproving ? `${t('Enabling')}...` : t('Enable')}
          </Button>
        )}
        <Flex alignItems="center" mt="8px">
          <Flex flexDirection="column">
            <Flex alignItems="center" mt="16px">
              <StepIndicator success={!!0} disabled={!isApproved}>
                <Text fontSize="20px" bold color={!isApproved ? 'textDisabled' : 'invertedContrast'}>
                  2
                </Text>
              </StepIndicator>
              <Text fontSize="20px" bold color={isApproved ? 'secondary' : 'textDisabled'}>
                {t('Confirm')}
              </Text>
            </Flex>
            <Text small color={isApproved ? 'textSubtle' : 'textDisabled'}>
              {t('Please confirm the transaction in your wallet')}
            </Text>
          </Flex>
          {/* <Flex flex="0 0 64px" width="64px">
            {isConfirming && <Spinner size={64} />}
          </Flex> */}
        </Flex>
        <Button mt="16px" disabled={!isApproved || isConfirming} onClick={handleConfirm} variant="secondary">
          {isConfirming ? t('Confirming') : t('Confirm')}
        </Button>
      </Flex>
    </Box>
  )
}

export default ApproveAndConfirmStage
