import React from 'react'
import styled from 'styled-components'
import { useMatchBreakpoints, Message, Text } from '@pancakeswap/uikit'
// import { useWeb3React } from '@web3-react/core'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Autoplay, Pagination, Navigation } from 'swiper'
// import { useTranslation } from 'contexts/Localization'
import PageSection from 'components/PageSection'
import { PageMeta } from 'components/Layout/Page'
// import { nftsBaseUrl } from 'views/Nft/market/constants'
import useTheme from 'hooks/useTheme'
import { useTranslation } from 'contexts/Localization'
// import SearchBar from '../components/SearchBar'
import Collections from './Collections'
import Newest from './Newest'
import { NFTMARKET_SLIDES } from '../../../../config/index'

import 'swiper/swiper-bundle.css'

// install Swiper modules
SwiperCore.use([Autoplay, Pagination, Navigation])

const StyledEfficientSwiper = styled.div`
  .swiper {
    width: 100%;
    height: 100%;
  }

  .swiper-slide {
    text-align: center;
    font-size: 18px;
    background: #fff;

    /* Center slide text vertically */
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
  }

  .swiper-slide img {
    display: block;
    height: 100%;
    width: 100%;
    object-fit: cover;
    transform: none;
    transition: transform 1.5s cubic-bezier(0.19, 1, 0.22, 1) 0s;
    background: none;
  }

  .mySwiper {
    --swiper-navigation-color: #fff;
    --swiper-pagination-color: #fff;
  }
`

const Home = () => {
  const { t } = useTranslation()
  // const { account } = useWeb3React()
  const { theme } = useTheme()
  const { isMobile } = useMatchBreakpoints()

  return (
    <>
      <PageMeta />

      {/* <SearchBar /> */}
      <StyledEfficientSwiper>
        <Swiper
          spaceBetween={30}
          // eslint-disable-next-line
          centeredSlides={true}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          // pagination={{
          //   clickable: true,
          // }}
          // eslint-disable-next-line
          navigation={true}
          className="mySwiper"
          style={{ height: isMobile ? '148px' : '480px' }}
        >
          {NFTMARKET_SLIDES.map((it) => {
            return (
              <SwiperSlide key={it}>
                <img src={it} alt="banner" />
              </SwiperSlide>
            )
          })}
        </Swiper>
      </StyledEfficientSwiper>

      {/* <div>
            <Heading as="h1" scale="xxl" color="secondary" mb="24px">
              {t('NFT Market')}
            </Heading>
            <Heading scale="lg" color="text">
              {t('Buy and Sell NFTs on Binance Smart Chain')}
            </Heading>
            {account && (
              <Button as={Link} to={`${nftsBaseUrl}/bag/${account.toLowerCase()}`} mt="32px">
                {t('Manage/Sell')}
              </Button>
            )}
          </div> */}

      <PageSection
        innerProps={{ style: { margin: '0', width: '100%' } }}
        background={theme.colors.background}
        index={1}
        concaveDivider
        dividerPosition="top"
      >
        {/* <Message p="8px" mb="35px" variant="warning">
          <Text>
            {t(
              'Due to the BSC block synchronization issues, all decentralized NFT trading markets have problems. Performance may suffer until subgraph is restored.',
            )}
          </Text>
        </Message> */}
        <Collections />
        <Newest />
      </PageSection>

      {/* <Gradient p="64px 0">
        <SectionsWithFoldableText header={t('FAQs')} config={config(t)} m="auto" />
      </Gradient> */}
    </>
  )
}

export default Home
