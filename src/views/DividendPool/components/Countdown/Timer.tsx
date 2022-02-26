import React from 'react'
import styled from 'styled-components'
import { Flex } from '@pancakeswap/uikit'

export interface TimerProps {
  seconds?: number
  minutes?: number
  hours?: number
  days?: number
}

const StyledTimerFlex = styled(Flex)<{ showTooltip?: boolean }>`
  ${({ theme, showTooltip }) => (showTooltip ? ` border-bottom: 1px dashed ${theme.colors.textSubtle};` : ``)}
  div:last-of-type {
    margin-right: 0;
  }
`

const StyledTimerText = styled.div`
  border-radius: ${({ theme }) => theme.radii.small};
  margin-right: 4px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 23px;
`

const Interval = styled.div`
  margin-right: 4px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-weight: bold;
`

const Wrapper: React.FC<TimerProps> = ({ seconds, minutes, hours, days }) => {
  return (
    <StyledTimerFlex alignItems="center">
      <>
        <StyledTimerText>{days}</StyledTimerText>
        <Interval>:</Interval>
      </>
      <>
        <StyledTimerText>{hours}</StyledTimerText>
        <Interval>:</Interval>
      </>
      <>
        <StyledTimerText>{minutes}</StyledTimerText>
        <Interval>:</Interval>
      </>
      <>
        <StyledTimerText>{seconds}</StyledTimerText>
      </>
    </StyledTimerFlex>
  )
}

export default Wrapper
