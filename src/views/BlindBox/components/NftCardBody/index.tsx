import React from 'react'
import { Box, CardBody, Flex, Text, FlexProps, Card, Grid } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import PreviewImage from './PreviewImage'
import GridPlaceholder from './GridPlaceholder'

interface LowestPriceMetaRowProps {
  title: string
  digit: string
  suffix?: string
}

export const LowestPriceMetaRow = ({ title, digit, suffix = '' }: LowestPriceMetaRowProps) => {
  return (
    <MetaRow title={title}>
      <Flex alignItems="center">
        <Text fontWeight="600">{digit + suffix}</Text>
      </Flex>
    </MetaRow>
  )
}

interface MetaRowProps extends FlexProps {
  title: string
}

export const MetaRow: React.FC<MetaRowProps> = ({ title, children, ...props }) => (
  <Flex alignItems="center" justifyContent="space-between" {...props}>
    <Text fontSize="12px" color="textSubtle" maxWidth="120px" ellipsis title={title}>
      {title}
    </Text>
    <Box>{children}</Box>
  </Flex>
)

interface NftCardBodyProps {
  data: any
}

const NftCardBody: React.FC<NftCardBodyProps> = ({ data }) => {
  const { t } = useTranslation()
  if (!data) {
    return <GridPlaceholder />
  }
  return (
    <Grid
      gridGap="16px"
      gridTemplateColumns={['1fr', 'repeat(1, 1fr)', 'repeat(3, 1fr)', null, 'repeat(3, 1fr)']}
      alignItems="start"
      mb="100px"
    >
      {data?.map((box: any) => {
        const metadata = JSON.parse(box?.metadataJSON) || {}
        return (
          <Card key={box.nftId}>
            <CardBody p="8px" style={{ width: '100%' }}>
              <PreviewImage src={metadata?.thumbnail} height={520} width={520} mb="8px" />
              <Text as="h4" fontWeight="600">
                {box?.name}
              </Text>
              <Flex alignItems="center" justifyContent="space-between">
                <Text fontSize="12px" color="textSubtle" mb="8px" ellipsis>
                  {box?.description}
                </Text>
              </Flex>
              {/* <Box>
                <LowestPriceMetaRow title={t('Probability')} digit={box?.probability} suffix="%" />
                <LowestPriceMetaRow title={t('Supply')} digit={box?.supply} />
                <LowestPriceMetaRow title={t('Rarity')} digit={box?.rarity} />
              </Box> */}
            </CardBody>
          </Card>
        )
      })}
    </Grid>
  )
}

export default NftCardBody
