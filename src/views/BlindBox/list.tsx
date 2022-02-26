import React from 'react'
import { Card, CardBody, Text, Heading, Skeleton, Flex, Box } from '@pancakeswap/uikit'
import Page from 'components/Layout/Page'
import { NFTPOOL_BANNER } from 'config'
import { useTranslation } from 'contexts/Localization'
import { useBoxInfo } from './hooks/useInitData'
import { Container, StyledBannerImage, TagsTitle } from './shared/styles'

const BlindBox: React.FC = () => {
  const blindboxLatestData = useBoxInfo()
  const { t } = useTranslation()
  const list = new Array(3).fill({
    title: 'Tiltle',
    past: 2,
    soldOut: true,
    img: 'https://dl0d5jadwbp9c.cloudfront.net/cdn/img/e3b49f348633c1366018d9b2518be0d0.jpeg',
  })

  return (
    <Page>
      <Heading scale="xl" color="primary" mb="32px">
        Past Records
      </Heading>
      <Flex>
        {list.map((item, index) => {
          return (
            <Box width="400px" mr="15px">
              <Card mb="32px">
                <StyledBannerImage src={item.img}>
                  <CardBody>
                    <Container pl="68px" flexDirection={['column', null, 'column']} justifyContent="center">
                      <TagsTitle scale="md" color="white">
                        Phase 20
                      </TagsTitle>
                      <Heading as="h1" scale="xxl" color="white">
                        {/* {totalOfPool ? formatNumber(totalOfPool, 2, 2) : <Skeleton width="200px" height={48} />} */}

                        {item.title}
                      </Heading>
                      <Text fontSize="16px" color="white">
                        sold Out
                      </Text>
                    </Container>
                  </CardBody>
                </StyledBannerImage>
              </Card>
            </Box>
          )
        })}
      </Flex>
    </Page>
  )
}

export default React.memo(BlindBox)
