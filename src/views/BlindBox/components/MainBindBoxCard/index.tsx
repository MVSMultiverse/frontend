/* eslint-disable consistent-return */
import React from 'react'
import { Card } from '@pancakeswap/uikit'
import { StyledBannerImage } from './styles'

const MainBindBoxCard: React.FC = () => {
  return (
    <Card mb={['20px', '20px', '40px', '40px']}>
      <StyledBannerImage />
    </Card>
  )
}

export default MainBindBoxCard
