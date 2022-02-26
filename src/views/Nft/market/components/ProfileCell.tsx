import React from 'react'
import styled from 'styled-components'
import { Box, Flex, Text } from '@pancakeswap/uikit'
import truncateHash from 'utils/truncateHash'
import { Link } from 'react-router-dom'
import { nftsBaseUrl } from '../constants'

const StyledFlex = styled(Flex)`
  align-items: center;
  transition: opacity 200ms ease-in;

  &:hover {
    opacity: 0.5;
  }
`

const ProfileCell: React.FC<{ accountAddress: string }> = ({ accountAddress }) => {

  return (
    <Link to={`${nftsBaseUrl}/bag/${accountAddress}`}>
      <StyledFlex>
        <Box display="inline">
          <Text lineHeight="1.25">{truncateHash(accountAddress)}</Text>
        </Box>
      </StyledFlex>
    </Link>
  )
}

export default ProfileCell
