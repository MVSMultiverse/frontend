// DropdownMenuItemType
import { MenuItemsType } from '@pancakeswap/uikit'
import { ContextApi } from 'contexts/Localization/types'
import { nftsBaseUrl } from 'views/Nft/market/constants'
import tokens from 'config/constants/tokens'

export type ConfigMenuItemsType = MenuItemsType & { hideSubNav?: boolean }

const config: (t: ContextApi['t']) => ConfigMenuItemsType[] = (t) => [
  {
    label: t('Buy MVS'),
    icon: 'Swap',
    href: '#',
    items: [],
    link: `https://pancakeswap.finance/swap?outputCurrency=${tokens.mvs.address}`,
  },
  {
    label: t('Pool'),
    icon: 'NftPool',
    href: '/nft-pool',
    showItemsOnMobile: false,
    items: [],
  },
  {
    label: t('NFT Market'),
    href: `${nftsBaseUrl}`,
    icon: 'NftMarket',
    showItemsOnMobile: false,
    items: [
      // {
      //   label: t('Overview'),
      //   href: `${nftsBaseUrl}`,
      // },
      // {
      //   label: t('Collections'),
      //   href: `${nftsBaseUrl}/collections`,
      // },
    ],
  },
  {
    label: t('NFT Museum'),
    icon: 'BlindBox',
    href: '/nft-museum',
    showItemsOnMobile: false,
    items: [],
  },
  // {
  //   label: '',
  //   href: '',
  //   icon: 'More',
  //   hideSubNav: true,
  //   items: [
  //     {
  //       label: t('DEV'),
  //       href: '/dev-labs',
  //     },
  //     {
  //       type: DropdownMenuItemType.DIVIDER,
  //     },
  //     {
  //       label: t('Docs'),
  //       href: 'https://docs.mvscoin.org',
  //       type: DropdownMenuItemType.EXTERNAL_LINK,
  //     },
  //   ],
  // },
  // {
  //   label: t('Trade'),
  //   icon: 'Swap',
  //   href: '/swap',
  //   showItemsOnMobile: false,
  //   items: [
  //     {
  //       label: t('Exchange'),
  //       href: '/swap',
  //     },
  //     {
  //       label: t('Liquidity'),
  //       href: '/liquidity',
  //     },
  //   ],
  // },
]

export default config
