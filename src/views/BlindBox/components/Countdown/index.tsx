import React from 'react'
import moment from 'moment'
import { Flex, Heading, Skeleton } from '@pancakeswap/uikit'
import getTimePeriods from 'utils/getTimePeriods'
import { useTranslation } from 'contexts/Localization'
import Timer from './Timer'
import useNextEventCountdown from '../../hooks/useNextEventCountdown'

interface CountdownProps {
  eventTime: number
  preCountdownText?: string
  postCountdownText?: string
}

const Countdown: React.FC<CountdownProps> = ({ eventTime, preCountdownText, postCountdownText }) => {
  const { t } = useTranslation()
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
        <Flex display="inline-flex" justifyContent="flex-start" alignItems="center" mt="10px">
          {preCountdownText && <Heading mr="12px">{t(preCountdownText)}</Heading>}
          <Timer
            seconds={seconds}
            minutes={minutes} // We don't show seconds - so values from 0 - 59s should be shown as 1 min
            hours={hours}
            days={days}
          />
          {postCountdownText && <Heading>{postCountdownText}</Heading>}
        </Flex>
      ) : (
        <Skeleton height="41px" width="250px" />
      )}
    </>
  )
}

export default Countdown
