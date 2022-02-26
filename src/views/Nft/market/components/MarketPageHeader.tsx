import React from 'react'
import PageHeader, { PageHeaderProps } from 'components/PageHeader'

const MarketPageHeader: React.FC<PageHeaderProps> = (props) => {
  return <PageHeader background="#FFF" {...props} />
}

export default MarketPageHeader
