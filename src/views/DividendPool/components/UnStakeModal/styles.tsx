import React from 'react'
import styled from 'styled-components'
import { Modal, Grid, Flex, Text, BinanceIcon, Skeleton, Card } from '@pancakeswap/uikit'
import { useBNBBusdTickerPrice } from 'state/ticker/hooks'

export const StyledModal = styled(Modal)`
  padding: 0;
  & > div:last-child {
    padding: 0;
  }

  ${({ theme }) => theme.mediaQueries.xs} {
    width: 90%;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    width: auto;
  }
`

export const StyledCard = styled(Card)`
  border: 1px solid #fff;
`

export const BorderedBox = styled(Grid)`
  margin: 16px 0;
  padding: 16px;
  background-color: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  border-radius: ${({ theme }) => theme.radii.default};
  grid-template-columns: 1fr 1fr;
  grid-row-gap: 8px;
`

interface BnbAmountCellProps {
  bnbAmount: number
  isLoading?: boolean
  isInsufficient?: boolean
}

export const BnbAmountCell: React.FC<BnbAmountCellProps> = ({ bnbAmount, isLoading, isInsufficient }) => {
  const bnbBusdPrice = useBNBBusdTickerPrice()
  if (isLoading) {
    return (
      <Flex flexDirection="column" justifySelf="flex-end">
        <Skeleton width="86px" height="20px" mb="6px" />
        <Skeleton width="86px" height="20px" />
      </Flex>
    )
  }
  const usdAmount = bnbBusdPrice.times(bnbAmount).toNumber()

  return (
    <Flex justifySelf="flex-end" flexDirection="column">
      <Flex justifyContent="flex-end">
        <BinanceIcon height={16} width={16} mr="4px" />
        <Text bold color={isInsufficient ? 'failure' : 'text'}>{`${bnbAmount.toLocaleString(undefined, {
          minimumFractionDigits: 3,
          maximumFractionDigits: 3,
        })}`}</Text>
      </Flex>
      <Text small color="textSubtle" textAlign="right">
        {`($${usdAmount.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })})`}
      </Text>
    </Flex>
  )
}
