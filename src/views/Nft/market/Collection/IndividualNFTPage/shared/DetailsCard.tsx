import React from 'react'
import styled from 'styled-components'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { Box, Flex, Text, Link, CopyIcon, ArrowDownIcon } from '@pancakeswap/uikit'
import useToast from 'hooks/useToast'
import { NftToken } from 'state/nftMarket/types'
import { getBscScanLink } from 'utils'
import uriToHttp from 'utils/uriToHttp'
import { useTranslation } from 'contexts/Localization'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
// import ExpandableCard from './ExpandableCard'

interface DetailsCardProps {
  nft?: NftToken
  contractAddress: string
  ipfsJson: string
  count?: number
  rarity?: number
  original?: string
}

const LongTextContainer = styled(Text)`
  max-width: 170px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`

const DetailsCard: React.FC<DetailsCardProps> = ({ nft, contractAddress, ipfsJson, original }) => {
  const { t } = useTranslation()
  const { toastSuccess } = useToast()
  const { chainId } = useActiveWeb3React()
  const ipfsLink = ipfsJson ? uriToHttp(ipfsJson)[0] : null
  const content = (
    <Box>
      <Flex justifyContent="space-between" alignItems="center" mb="5px">
        <Text fontSize="14px" color="textSubtle" bold textTransform="uppercase">
          {t('Contract address')}
        </Text>
        <Flex>
          <Link external href={getBscScanLink(contractAddress, 'address', chainId)}>
            <LongTextContainer>{contractAddress}</LongTextContainer>
          </Link>
          <CopyToClipboard onCopy={() => toastSuccess(t('Copy success'))} text={contractAddress}>
            <CopyIcon width="12px" height="12px" ml="4px" />
          </CopyToClipboard>
        </Flex>
      </Flex>

      <Flex justifyContent="space-between" alignItems="center" mb="5px">
        <Text fontSize="14px" color="textSubtle" bold textTransform="uppercase">
          {t('original')}
        </Text>
        <Flex>
          <Flex>
            <LongTextContainer>4000 x 4000</LongTextContainer>
          </Flex>
          <Link external href={original}>
            <ArrowDownIcon width="12px" height="12px" ml="4px" />
          </Link>
        </Flex>
      </Flex>

      <Flex justifyContent="space-between" alignItems="center" mb="5px">
        <Text fontSize="14px" color="textSubtle" bold textTransform="uppercase">
          {t('Token Id')}
        </Text>
        <Flex>
          <LongTextContainer>#{nft.tokenId}</LongTextContainer>
        </Flex>
      </Flex>

      <Flex justifyContent="space-between" alignItems="center" mb="5px">
        <Text fontSize="14px" color="textSubtle" bold textTransform="uppercase">
          {t('Rarity')}
        </Text>
        <Flex>
          <LongTextContainer>{nft.rarity}</LongTextContainer>
        </Flex>
      </Flex>
      {ipfsLink && (
        <Flex justifyContent="space-between" alignItems="center" mb="5px">
          <Text fontSize="14px" color="textSubtle" bold textTransform="uppercase">
            IPFS JSON
          </Text>
          <Link external href={ipfsLink}>
            <LongTextContainer>{ipfsLink}</LongTextContainer>
          </Link>
        </Flex>
      )}
      {/* <Flex justifyContent="space-between" alignItems="center" mb="5px">
        <Text fontSize="14px" color="textSubtle" bold textTransform="uppercase">
          {t('Public Chain')}
        </Text>
        <Flex>
          <LongTextContainer>BSC</LongTextContainer>
        </Flex>
      </Flex>
      <Flex justifyContent="space-between" alignItems="center">
        <Text fontSize="14px" color="textSubtle" bold textTransform="uppercase">
          {t('Protocol')}
        </Text>
        <Flex>
          <LongTextContainer>ERC721</LongTextContainer>
        </Flex>
      </Flex> */}
      {/* {count && (
        <Flex justifyContent="space-between" alignItems="center" mb="16px" mr="4px">
          <Text fontSize="12px" color="textSubtle" bold textTransform="uppercase">
            {t('Supply Count')}
          </Text>
          <LongTextContainer bold>{formatNumber(count, 0, 0)}</LongTextContainer>
        </Flex>
      )}
      {rarity && (
        <Flex justifyContent="space-between" alignItems="center" mr="4px">
          <Text fontSize="12px" color="textSubtle" bold textTransform="uppercase">
            {t('Rarity')}
          </Text>
          <LongTextContainer bold>{`${formatNumber(rarity, 0, 2)}%`}</LongTextContainer>
        </Flex>
      )} */}
    </Box>
  )
  return <div style={{ width: '100%' }}>{content}</div>
  // <ExpandableCard title={t(`Chain Data`)} icon={<SearchIcon width="24px" height="24px" />} content={content} />
}

export default DetailsCard
