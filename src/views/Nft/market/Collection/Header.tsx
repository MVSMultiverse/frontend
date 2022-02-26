import React from 'react'
// import { useLocation, useParams } from 'react-router'
import { Text } from '@pancakeswap/uikit'
import { Collection } from 'state/nftMarket/types'
import { formatNumber } from 'utils/formatBalance'
import { useTranslation } from 'contexts/Localization'
import MarketPageHeader from '../components/MarketPageHeader'
import MarketPageTitle from '../components/MarketPageTitle'
import StatBox, { StatBoxItem } from '../components/StatBox'
import AvatarImage from '../components/BannerHeader/AvatarImage'
import LowestPriceStatBoxItem from './LowestPriceStatBoxItem'
import BannerImage from '../components/BannerHeader/BannerImage'

interface HeaderProps {
  collection: Collection
}

const Header: React.FC<HeaderProps> = ({ collection }) => {
  // const { collectionAddress } = useParams<{ collectionAddress: string }>()
  const { totalSupply, numberTokensListed, totalVolumeBNB, avatar, banner } = collection
  const { t } = useTranslation()
  // const { pathname, hash } = useLocation()

  const volume = totalVolumeBNB
    ? parseFloat(totalVolumeBNB).toLocaleString(undefined, {
        minimumFractionDigits: 3,
        maximumFractionDigits: 3,
      })
    : '0'

  return (
    <>
      <BannerImage src={banner?.large} alt="c" />
      <MarketPageHeader>
        <MarketPageTitle
          title={collection.name}
          avatar={<AvatarImage src={avatar} />}
          description={collection.description ? <Text color="textSubtle">{t(collection.description)}</Text> : null}
        />
        <StatBox>
          <StatBoxItem title={t('Items')} stat={formatNumber(Number(totalSupply), 0, 0)} />
          <StatBoxItem
            title={t('Items listed')}
            stat={numberTokensListed ? formatNumber(Number(numberTokensListed), 0, 0) : '0'}
          />
          <LowestPriceStatBoxItem collectionAddress={collection.address} />
          <StatBoxItem title={t('Vol. (%symbol%)', { symbol: 'BNB' })} stat={volume} />
        </StatBox>
      </MarketPageHeader>
      {/* <Container>
        <BaseSubMenu items={itemsConfig} activeItem={`${pathname}${hash || '#items'}`} mt="24px" mb="8px" />
      </Container> */}
    </>
  )
}

export default Header
