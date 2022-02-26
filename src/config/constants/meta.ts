import { ContextApi } from 'contexts/Localization/types'
import { PageMeta } from './types'

export const DEFAULT_META: PageMeta = {
  title: 'MVS - A Decentralized Currency in Multiverse',
  description: 'MVS - A Decentralized Currency in Multiverse on Binance Smart Chain (BSC).',
  image: 'https://mvscoin.org/images/hero.png',
}

export const getCustomMeta = (path: string, t: ContextApi['t']): PageMeta => {
  // if (path.startsWith('/swap')) {
  //   basePath = '/swap'
  // } else if (path.startsWith('/add')) {
  //   basePath = '/add'
  // } else if (path.startsWith('/remove')) {
  //   basePath = '/remove'
  // }
  // else if (path.startsWith('/nfts/collections')) {
  //   basePath = '/nfts/collections'
  // }
  let basePath
  if (path.startsWith('/nfts/bag')) {
    basePath = '/nfts/bag'
  } else {
    basePath = path
  }

  switch (basePath) {
    case '/':
      return {
        title: `${t('Home')} | ${t('MVS')}`,
      }
    case '/nft-pool':
      return {
        title: `${t('MVS Pool')} | ${t('MVS')}`,
      }
    case '/nft-museum':
      return {
        title: `${t('NFT Museum')} | ${t('MVS')}`,
      }
    case '/nfts':
      return {
        title: `${t('NFT Market')} | ${t('MVS')}`,
      }
    case '/nfts/bag':
      return {
        title: `${t('Your Nfts')} | ${t('MVS')}`,
      }
    case '/nfts/collections':
      return {
        title: `${t('Collections')} | ${t('MVS')}`,
      }
    // case '/swap':
    //   return {
    //     title: `${t('Exchange')} | ${t('PancakeSwap')}`,
    //   }
    // case '/add':
    //   return {
    //     title: `${t('Add Liquidity')} | ${t('PancakeSwap')}`,
    //   }
    // case '/remove':
    //   return {
    //     title: `${t('Remove Liquidity')} | ${t('PancakeSwap')}`,
    //   }
    // case '/liquidity':
    //   return {
    //     title: `${t('Liquidity')} | ${t('PancakeSwap')}`,
    //   }
    // case '/find':
    //   return {
    //     title: `${t('Import Pool')} | ${t('PancakeSwap')}`,
    //   }
    default:
      return null
  }
}
