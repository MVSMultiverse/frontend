import React from 'react'
import moment from 'moment'
import { Flex, Skeleton } from '@pancakeswap/uikit'
import getTimePeriods from 'utils/getTimePeriods'
import Timer from './Timer'
import useNextEventCountdown from '../../hooks/useNextEventCountdown'

interface CountdownProps {
  eventTime: number
}

const Countdown: React.FC<CountdownProps> = ({ eventTime }) => {
  const nowTimeUnix = moment().unix()
  const secondsRemaining = useNextEventCountdown(eventTime)
  let days
  let hours
  let minutes
  let seconds

  if (eventTime <= 0 || eventTime < nowTimeUnix) {
    days = 0
    hours = 0
    minutes = 0
    seconds = 0
  } else {
    days = getTimePeriods(secondsRemaining)?.days
    hours = getTimePeriods(secondsRemaining)?.hours
    minutes = getTimePeriods(secondsRemaining)?.minutes
    seconds = getTimePeriods(secondsRemaining)?.seconds
  }

  return (
    <>
      {secondsRemaining ? (
        <Flex display="inline-flex" justifyContent="flex-start" alignItems="center">
          <Timer seconds={seconds} minutes={minutes} hours={hours} days={days} />
        </Flex>
      ) : (
        <Skeleton height="41px" width="150px" />
      )}
    </>
  )
}

export default Countdown
