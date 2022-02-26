import React, { ReactNode } from 'react'
import { Flex, Box, Grid, ChevronLeftIcon, GridProps, Heading } from '@pancakeswap/uikit'
import { Link as RouterLink } from 'react-router-dom'
import styled from 'styled-components'
import { nftsBaseUrl } from 'views/Nft/market/constants'

interface MarketPageTitleProps extends GridProps {
  title: string
  description?: ReactNode
  avatar?: ReactNode
}

const BackLink = styled(RouterLink)`
  align-items: center;
  color: ${({ theme }) => theme.colors.primary};
  display: inline-flex;
  font-weight: 600;
`

const MarketPageTitle: React.FC<MarketPageTitleProps> = ({ title, description, children, avatar, ...props }) => (
  <Grid
    gridGap="16px"
    alignItems="center"
    justifyContent="center"
    // gridTemplateColumns={['1fr', null, null, null, 'repeat(2, 1fr)']}
    {...props}
  >
    <Box>
      <Flex flexDirection="row" alignItems="center" justifyContent="center" mb="5px">
        <BackLink to={`${nftsBaseUrl}`}>
          <ChevronLeftIcon color="primary" width="24px" mr="12px" />
          {/* {t('All Collections')} */}
        </BackLink>
        {avatar}
        <Heading as="h1" scale="xl" color="primary" ml="16px">
          {title}
        </Heading>
      </Flex>
      <span style={{ textAlign: 'center' }}>{description}</span>
    </Box>
    <Box>{children}</Box>
  </Grid>
)

export default MarketPageTitle
