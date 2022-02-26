import React from 'react'
import styled from 'styled-components'
import { BackgroundImage, BoxProps, Box, Text } from '@pancakeswap/uikit'

const Bubble = styled.div`
  box-sizing: border-box;
  position: absolute;
  bottom: 12px;
  right: 12px;
  zindex: 10;
  background: linear-gradient(109.81deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.2) 103.77%);
  border-radius: 4px;
  padding: 3px 11px;
`

interface PreviewImageProps extends BoxProps {
  src: string
  height?: number
  width?: number
  tokenId?: string
}

const PreviewImage: React.FC<PreviewImageProps> = ({ height = 64, width = 64, tokenId, ...props }) => {
  return (
    <Box width="100%" height="100%" position="relative">
      <BackgroundImage height={height} width={width} style={{ borderRadius: '8px' }} {...props} />

      {tokenId && (
        <Bubble>
          <Text color="white" fontWeight={500} fontSize="15px" box-sizing="border-box">
            # {tokenId}
          </Text>
        </Bubble>
      )}
    </Box>
  )
}

export default PreviewImage
