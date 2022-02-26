import React from 'react'
import { useTranslation } from 'contexts/Localization'
import { useLocation, useParams } from 'react-router'
import BaseSubMenu from '../../market/components/BaseSubMenu'
import { nftsBaseUrl } from '../../market/constants'

const SubMenuComponent: React.FC = () => {
  const { t } = useTranslation()
  const { accountAddress } = useParams<{ accountAddress: string }>()
  const { pathname } = useLocation()

  const ItemsConfig = [
    {
      label: t('Items'),
      href: `${nftsBaseUrl}/bag/${accountAddress}`,
    },
    {
      label: t('Activity'),
      href: `${nftsBaseUrl}/bag/${accountAddress}/activity`,
    },
  ]

  return <BaseSubMenu items={ItemsConfig} activeItem={pathname} justifyContent="center" mb={[0, 0, "60px", "60px"]} />
}

export default SubMenuComponent
