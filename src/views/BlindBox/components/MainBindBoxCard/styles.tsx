import React from 'react'
import styled from 'styled-components'
import { NFTMARKET_SLIDES } from 'config/index'

const BoxItemGroup = styled.div`
  width: 100%;
  cursor: pointer;
`

const BoxItemBg = styled.div<{ src: string }>`
  background-size: contain;
  // filter: blur(30px);
  background-position: 70% 50%;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-image: url('${({ src }) => src}');
`

const BoxItemProductMain = styled.div<{ src: string }>`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 65%;
  height: 65%;
  background-repeat: no-repeat;
  background-position: 50%;
  background-size: cover;
  transform: translate(-50%, -50%);
  transition: transform 0.3s ease;
  background-image: url('${({ src }) => src}');

  animation: flyingAnim 3.5s ease-in-out infinite;

  @keyframes flyingAnim {
    from {
      transform: translate(-50%, -50%);
    }
    50% {
      transform: translate(-50%, -56%);
    }
    to {
      transform: translate(-50%, -50%);
    }
  }
`
export const BlindBoxItem = ({ data }) => {
  return (
    <BoxItemGroup>
      <BoxItemBg src={NFTMARKET_SLIDES[0]} />
    </BoxItemGroup>
  )
}

export const StyledBannerImage = styled.div`
  background-image: url('${NFTMARKET_SLIDES[0]}');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  flex: none;
  width: 100%;
  height: 192px;
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
