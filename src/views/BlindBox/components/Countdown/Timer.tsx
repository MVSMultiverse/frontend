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
  background-color: #d1dce7;
  width: 34px;
  height: 34px;
  border-radius: ${({ theme }) => theme.radii.small};
  margin-right: 4px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  color: #3a5372;
  font-size: 23px;
`

const Interval = styled.div`
  height: 34px;
  margin-right: 4px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  color: #3a5372;
`

const Wrapper: React.FC<TimerProps> = ({ seconds, minutes, hours, days }) => {
  return (
    <StyledTimerFlex alignItems="flex-end">
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
