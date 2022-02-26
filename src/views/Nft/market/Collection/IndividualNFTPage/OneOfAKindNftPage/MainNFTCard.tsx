import React from 'react'
import { Card, CardBody } from '@pancakeswap/uikit'
import { NftToken } from 'state/nftMarket/types'
import DetailsCard from '../shared/DetailsCard'
import { RoundedImage, Container } from '../shared/styles'

interface MainNFTCardProps {
  nft: NftToken
}

const MainNFTCard: React.FC<MainNFTCardProps> = ({ nft }) => {
  return (
    <Card>
      <CardBody p="12px">
        <Container flexDirection={['column', null, 'column']} justifyContent="center" alignItems="center">
          <RoundedImage src={nft.image.thumbnail} width={543} height={543} />
          <DetailsCard
            nft={nft}
            contractAddress={nft.collectionAddress}
            ipfsJson={nft?.marketData?.metadataUrl}
            original={nft?.image?.original}
          />
        </Container>
      </CardBody>
    </Card>
  )
}

export default MainNFTCard
