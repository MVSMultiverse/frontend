import React from 'react'
import Page from 'components/Layout/Page'
import { useBoxInfo } from './hooks/useInitData'
import MainBindBoxCard from './components/MainBindBoxCard'
import NftCardBody from './components/NftCardBody'

const BlindBox: React.FC = () => {
  const blindboxLatestData = useBoxInfo()

  return (
    <Page>
      <MainBindBoxCard />
      <NftCardBody data={blindboxLatestData?.boxes} />
    </Page>
  )
}

export default BlindBox
