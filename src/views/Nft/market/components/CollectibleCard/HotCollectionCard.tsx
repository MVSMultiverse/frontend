import { Card, CardBody, Flex, Heading, ProfileAvatar } from '@pancakeswap/uikit'
import React from 'react'
import { Link } from 'react-router-dom'
import styled, { css } from 'styled-components'

interface HotCollectionCardProps {
  bgSrc: string
  avatarSrc?: string
  collectionName: string
  url?: string
  disabled?: boolean
  description?: string
}

export const CollectionAvatar = styled(ProfileAvatar)`
  position: absolute;
  top: -25px;
  border: 4px white solid;
`

const StyledHotCollectionCard = styled(Card) <{ disabled?: boolean }>`
  border-radius: 12px;
  padding: 0;
  // border-bottom-left-radius: 56px;
  transition: opacity 200ms;

  & > div {
    border-radius: 12px;
    // border-bottom-left-radius: 56px;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    ${({ disabled }) =>
    disabled
      ? ''
      : css`
            &:hover {
              cursor: pointer;
              opacity: 0.6;
            }
          `}
  }
`

// const StyledImage = styled(Image)`
//   img {
//     // border-radius: 4px;
//   }
// `

const HotCollectionCard: React.FC<HotCollectionCardProps> = ({
  bgSrc,
  avatarSrc,
  collectionName,
  url,
  disabled,
  children,
}) => {
  const renderBody = () => (
    <CardBody p="0px">
      {/* <StyledImage src={bgSrc} height={95} width={375} /> */}
      <img src={bgSrc} style={{ height: '95px', width: "100%" }} alt="banner" />
      <Flex position="relative" justifyContent="center" alignItems="center">
        <CollectionAvatar src={avatarSrc} width={50} height={50} />
      </Flex>
      <Flex justifyContent="center" alignItems="center" flexDirection="column" paddingY="8px" paddingX="15px">
        <Heading mt="25px" color={disabled ? 'textDisabled' : 'body'} as="h3" mb={children ? '8px' : '0'}>
          {collectionName}
        </Heading>
        {children}
      </Flex>
    </CardBody>
  )

  return (
    <StyledHotCollectionCard disabled={disabled}>
      {url ? <Link to={url}>{renderBody()}</Link> : <div style={{ cursor: 'default' }}>{renderBody()}</div>}
    </StyledHotCollectionCard>
  )
}

export default HotCollectionCard
