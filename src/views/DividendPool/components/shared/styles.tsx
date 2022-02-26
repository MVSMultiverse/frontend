import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Box, Flex, Grid, Image, FlexProps, Text } from '@pancakeswap/uikit'

export const TwoColumnsContainer = styled(Flex)`
  gap: 22px;
  align-items: flex-start;
  & > div:first-child {
    flex: 1;
    gap: 20px;
  }
  & > div:last-child {
    flex: 2;
  }
`

export const RoundedImage = styled(Image)`
  height: max-content;
  border-radius: ${({ theme }) => theme.radii.default};
  overflow: hidden;
  & > img {
    object-fit: contain;
  }
`

export const SmallRoundedImage = styled(Image)`
  & > img {
    border-radius: ${({ theme }) => theme.radii.default};
  }
`

export const CollectionLink = styled(Link)`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 600;
  margin-top: 16px;
  display: inline-block;

  ${({ theme }) => theme.mediaQueries.lg} {
    margin-top: 50px;
  }
`

export const CollectibleRowContainer = styled(Grid)`
  &:hover {
    opacity: 0.5;
    cursor: pointer;
  }
`

export const StyledSortButton = styled.button`
  border: none;
  cursor: pointer;
  background: none;
  color: ${({ theme }) => theme.colors.secondary};
  font-weight: bold;
`

export const ButtonContainer = styled(Box)`
  text-align: right;
  padding-right: 24px;
`

export const TableHeading = styled(Grid)`
  border-bottom: ${({ theme }) => `1px solid ${theme.colors.cardBorder}`};
`

export const Container = styled(Flex)`
  gap: 8px;

  ${({ theme }) => theme.mediaQueries.sm} {
    gap: 14px;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    gap: 23px;
  }
`

interface StyledBannerImageProps {
  src: string
  alt?: string
}

export const StyledBannerImage = styled.div.attrs<StyledBannerImageProps>(({ alt }) => ({
  alt,
}))<StyledBannerImageProps>`
  ${({ src, theme }) => (src ? `background-image: url('${src}')` : `background-color: ${theme.colors.cardBorder}`)};
  background-image: url('${({ src }) => src}');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  flex: none;
  width: 100%;
  height: 143px;
  justify-content: center;
  display: flex;
  flex-direction: column;
  background-position: -53px;

  ${({ theme }) => theme.mediaQueries.sm} {
    height: 192px;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    height: 256px;
  }
`

interface StyledStakeImageProps {
  src: string
  alt?: string
}

export const StyledStakeImage = styled.div.attrs<StyledStakeImageProps>(({ alt }) => ({
  alt,
}))<StyledBannerImageProps>`
  ${({ src, theme }) => (src ? `background-image: url('${src}')` : `background-color: ${theme.colors.cardBorder}`)};
  background-image: url('${({ src }) => src}');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  flex: none;
  width: 100%;
  // border-radius: 32px;
  height: max-content;
  justify-content: center;
  display: flex;
  flex-direction: column;

  ${({ theme }) => theme.mediaQueries.sm} {
    height: 192px;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    height: 256px;
  }
`

export const CardLayout = styled.div`
  display: flex;
  flex-direction: column;
  // background-color: ${({ theme }) => theme.colors.backgroundAlt};
  border-radius: 4px;
  align-content: flex-start;
  justify-content: flex-start;
  margin-top: 20px;
`

interface MetaRowProps extends FlexProps {
  title: string
}

export const MetaRow: React.FC<MetaRowProps> = ({ title, children, ...props }) => (
  <Flex alignItems="center" justifyContent="space-between" {...props}>
    <Text fontSize="12px" color="textSubtle" maxWidth="120px" ellipsis title={title}>
      {title}
    </Text>
    <Box>{children}</Box>
  </Flex>
)

interface LowestPriceMetaRowProps {
  title: string
  digit: string
  suffix?: string
}

export const LowestPriceMetaRow = ({ title, digit, suffix = '' }: LowestPriceMetaRowProps) => {
  return (
    <MetaRow title={title}>
      <Flex alignItems="center">
        <Text fontWeight="600">{digit + suffix}</Text>
      </Flex>
    </MetaRow>
  )
}

export const DataSubItems = styled.div`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  margin: 0px -12px 0;
  padding: 0 12px;
  justify-content: space-between;
`

export const DataItems = styled.div`
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  min-width: 250px;
  margin: 24px 12px 0;
  box-shadow: 2px 4px 8px 0 rgb(0 0 0 / 6%), 0 -1px 2px 0 rgb(0 0 0 / 2%);
  border-radius: 24px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
`
