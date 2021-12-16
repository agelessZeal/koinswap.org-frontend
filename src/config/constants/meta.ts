import { ContextApi } from 'contexts/Localization/types'
import { PageMeta } from './types'

export const DEFAULT_META: PageMeta = {
  title: 'koinswAp',
  description:
    'The most popular AMM on BSC by user count! Earn CAKE through yield farming or win it in the Lottery, then stake it in Syrup Pools to earn more tokens! Initial Farm Offerings (new token launch model pioneered by koinswAp), NFTs, and more, on a platform you can trust.',
  image: 'https://pancakeswap.finance/images/hero.png',
}

export const getCustomMeta = (path: string, t: ContextApi['t']): PageMeta => {
  let basePath
  if (path.startsWith('/swap')) {
    basePath = '/swap'
  } else if (path.startsWith('/add')) {
    basePath = '/add'
  } else if (path.startsWith('/remove')) {
    basePath = '/remove'
  } else if (path.startsWith('/teams')) {
    basePath = '/teams'
  } else if (path.startsWith('/voting/proposal') && path !== '/voting/proposal/create') {
    basePath = '/voting/proposal'
  } else if (path.startsWith('/nfts/collections')) {
    basePath = '/nfts/collections'
  } else if (path.startsWith('/nfts/profile')) {
    basePath = '/nfts/profile'
  } else if (path.startsWith('/pancake-squad')) {
    basePath = '/pancake-squad'
  } else {
    basePath = path
  }

  switch (basePath) {
    case '/':
      return {
        title: `${t('Home')} | ${t('koinswAp')}`,
      }
    case '/swap':
      return {
        title: `${t('Exchange')} | ${t('koinswAp')}`,
      }
    case '/add':
      return {
        title: `${t('Add Liquidity')} | ${t('koinswAp')}`,
      }
    case '/remove':
      return {
        title: `${t('Remove Liquidity')} | ${t('koinswAp')}`,
      }
    case '/liquidity':
      return {
        title: `${t('Liquidity')} | ${t('koinswAp')}`,
      }
    case '/find':
      return {
        title: `${t('Import Pool')} | ${t('koinswAp')}`,
      }
    case '/competition':
      return {
        title: `${t('Trading Battle')} | ${t('koinswAp')}`,
      }
    case '/prediction':
      return {
        title: `${t('Prediction')} | ${t('koinswAp')}`,
      }
    case '/prediction/leaderboard':
      return {
        title: `${t('Leaderboard')} | ${t('koinswAp')}`,
      }
    case '/farms':
      return {
        title: `${t('Farms')} | ${t('koinswAp')}`,
      }
    case '/farms/auction':
      return {
        title: `${t('Farm Auctions')} | ${t('koinswAp')}`,
      }
    case '/pools':
      return {
        title: `${t('Pools')} | ${t('koinswAp')}`,
      }
    case '/lottery':
      return {
        title: `${t('Lottery')} | ${t('koinswAp')}`,
      }
    case '/ifo':
      return {
        title: `${t('Initial Farm Offering')} | ${t('koinswAp')}`,
      }
    case '/teams':
      return {
        title: `${t('Leaderboard')} | ${t('koinswAp')}`,
      }
    case '/voting':
      return {
        title: `${t('Voting')} | ${t('koinswAp')}`,
      }
    case '/voting/proposal':
      return {
        title: `${t('Proposals')} | ${t('koinswAp')}`,
      }
    case '/voting/proposal/create':
      return {
        title: `${t('Make a Proposal')} | ${t('koinswAp')}`,
      }
    case '/info':
      return {
        title: `${t('Overview')} | ${t('koinswAp Info & Analytics')}`,
        description: 'View statistics for Pancakeswap exchanges.',
      }
    case '/info/pools':
      return {
        title: `${t('Pools')} | ${t('koinswAp Info & Analytics')}`,
        description: 'View statistics for Pancakeswap exchanges.',
      }
    case '/info/tokens':
      return {
        title: `${t('Tokens')} | ${t('koinswAp Info & Analytics')}`,
        description: 'View statistics for Pancakeswap exchanges.',
      }
    case '/nfts':
      return {
        title: `${t('Overview')} | ${t('koinswAp')}`,
      }
    case '/nfts/collections':
      return {
        title: `${t('Collections')} | ${t('koinswAp')}`,
      }
    case '/nfts/profile':
      return {
        title: `${t('Your Profile')} | ${t('koinswAp')}`,
      }
    case '/pancake-squad':
      return {
        title: `${t('Pancake Squad')} | ${t('koinswAp')}`,
      }
    default:
      return null
  }
}
