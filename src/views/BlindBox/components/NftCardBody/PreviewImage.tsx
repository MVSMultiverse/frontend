import React from 'react'
import { BackgroundImage, BoxProps } from '@pancakeswap/uikit'

interface PreviewImageProps extends BoxProps {
  src: string
  height?: number
  width?: number
}

const PreviewImage: React.FC<PreviewImageProps> = ({ height = 64, width = 64, ...props }) => {
  return <BackgroundImage height={height} width={width} style={{ borderRadius: '8px' }} {...props} />
}

export default PreviewImage
