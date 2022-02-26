import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import Page from 'components/Layout/Page'
import { Button, Text, Flex, Input, AutoRenewIcon, Box, IconButton, Heading } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import { getFullDisplayBalance } from 'utils/formatBalance'
import { simpleRpcProvider } from 'utils/providers'
import { formatEther, parseUnits } from 'ethers/lib/utils'
import {
  getNftMarketAddress,
  getMvsTokenAddress,
  getMvsNftPoolAddress,
  getMvsNftAddress,
  getmvsDividendPoolUpgradeableAddress,
} from 'utils/addressHelpers'
import { BIG_TEN } from 'utils/bigNumber'
import { ToastDescriptionWithTx } from 'components/Toast'
import useToast from 'hooks/useToast'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useWeb3React } from '@web3-react/core'
import ConnectWalletButton from 'components/ConnectWalletButton'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import {
  useMvsTokenContract,
  useMvsNftContract,
  useMvsNftPoolContract,
  useMvsDividendPoolUpgradeableContract,
  useNftMarketContract,
} from 'hooks/useContract'
import { AppHeader, AppBody } from '../../components/App'
import {
  AMOUNT,
  REWARD_PER_BLOCK,
  END_BLOCK_TO_ADD,
  TOTAL_REWARDS_IN_POOL,
  ORIGINAL_NFT_TOKENID,
  LOCK_REWARDS_IN_POOL,
  MAIN_ACCOUNT,
  DEVELOPERS_ACCOUNT,
} from './config'

const Wrapper = styled.div`
  position: relative;
  padding: 1rem;
`

export default function Body() {
  const { t } = useTranslation()
  const { toastSuccess, toastError } = useToast()
  const { account } = useWeb3React()
  const { callWithGasPrice } = useCallWithGasPrice()

  const [mvsNftPoolAddress, setMvsNftPoolAddress] = useState(getMvsNftPoolAddress())
  const [dividendPoolAddress, setDividendPoolAddress] = useState(getmvsDividendPoolUpgradeableAddress())
  const [mvsNFTAddress, setMvsNFTAddress] = useState(getMvsNftAddress())
  const [mvsTokenAddress, setMvsTokenAddress] = useState(getMvsTokenAddress())
  const [nftMarketAddress, setNftMarketAddress] = useState(getNftMarketAddress())
  const mvsTokenContract = useMvsTokenContract()
  const mvsNftPoolContract = useMvsNftPoolContract(true)
  const mvsDividendPoolContract = useMvsDividendPoolUpgradeableContract(true)
  const mvsNftContract = useMvsNftContract(true)
  const nftMarketContract = useNftMarketContract()
  const { chainId } = useActiveWeb3React()

  const [isApproved, setIsApproved] = useState(false)
  const [mvsTokenBalance, setmvsTokenBalance] = useState(new BigNumber(0))
  const [amount, setAmount] = useState(AMOUNT)
  /** initialize */
  const [rewardPerBlock, serRewardPerBlock] = useState(REWARD_PER_BLOCK)
  const [bonusEndBlock, setBonusEndBlock] = useState('')
  const [startBlock, setStartBlock] = useState('')
  const [totalRewardsInPool, setTotalRewardsInPool] = useState(TOTAL_REWARDS_IN_POOL)
  const [rewardToken, setRewardToken] = useState(mvsTokenContract.address)
  const [originalNFTTokenId, setOriginalNFTTokenId] = useState(ORIGINAL_NFT_TOKENID)
  const [lockRewardsInPool, setLockRewardsInPool] = useState(LOCK_REWARDS_IN_POOL)

  /** DividendPool */
  const [dividendPoolAddStartBlock, setDividendPoolAddStartBlock] = useState('')
  const [dividendPoolAddEndBlock, setDividendPoolAddEndBlock] = useState('')
  const [dividendPoolUpdateStartBlock, setDividendPoolUpdateStartBlock] = useState('')
  const [dividendPoolUpdateEndBlock, setDividendPoolUpdateEndBlock] = useState('')
  const [dividendPoolAddbunnyId, setDividendPoolAddbunnyId] = useState('')
  const [dividendPoolPower, setDividendPoolPower] = useState('')
  const [dividendPoolRemovebunnyId, setDividendPoolRemovebunnyId] = useState('')
  const [dividendPoolUpdateTotalAward, setDividendPoolUpdateTotalAward] = useState('')
  const [nowCycle, setNowCycle] = useState('')

  const handleDevSyncContractAddress = async () => {
    try {
      localStorage.setItem('Dev_nftMarketAddress', nftMarketAddress)
      localStorage.setItem('Dev_mvsTokenAddress', mvsTokenAddress)
      localStorage.setItem('Dev_mvsNFTAddress', mvsNFTAddress)
      localStorage.setItem('Dev_mvsNftPoolAddress', mvsNftPoolAddress)
      localStorage.setItem('Dev_mvsDividendPoolAddress', dividendPoolAddress)
      toastSuccess('DevLabs.syncContractAddressSuccess')
    } catch (error: any) {
      console.error(error)
    }
  }

  const handleDevIsApprovedForAll = async () => {
    try {
      const approvedForContract = await mvsNftContract.isApprovedForAll(account, mvsNftPoolContract.address)
      setIsApproved(approvedForContract)
      toastSuccess('DevLabs.isApprovedForAll=true')
    } catch (error: any) {
      console.error(error)
      toastError(`handleDevIsApprovedForAll: ${error?.message}`)
    }
  }

  const handleConfirmApproveTokensToPool = async () => {
    const _amount: string = new BigNumber(amount).multipliedBy(BIG_TEN.pow(18)).toString()
    try {
      const response = await mvsTokenContract.approve(mvsNftPoolContract.address, _amount)
      toastSuccess('successful', <ToastDescriptionWithTx txHash={response.transactionHash} />)
    } catch (error: any) {
      toastError(`handleConfirmApproveTokensToPool: ${error?.message}`)
    }
  }

  const handleConfirmAddCycle = async () => {
    try {
      const response = await mvsDividendPoolContract.addCycle(dividendPoolAddStartBlock, dividendPoolAddEndBlock)
      toastSuccess('successful', <ToastDescriptionWithTx txHash={response.transactionHash} />)
    } catch (error: any) {
      toastError(`handleConfirmAddCycle: ${error?.message}`)
    }
  }

  const handleConfirmUpdateCycle = async () => {
    const _dividendPoolUpdateTotalAward = new BigNumber(dividendPoolUpdateTotalAward)
      .multipliedBy(BIG_TEN.pow(18))
      .toString()
    try {
      const response = await mvsDividendPoolContract.updateNowCycle(
        dividendPoolUpdateStartBlock,
        dividendPoolUpdateEndBlock,
        _dividendPoolUpdateTotalAward,
      )
      toastSuccess('successful', <ToastDescriptionWithTx txHash={response.transactionHash} />)
    } catch (error: any) {
      toastError(`handleConfirmUpdateCycle: ${error?.message}`)
    }
  }

  const handleConfirmAddbunnyIdToPower = async () => {
    try {
      const response = await mvsDividendPoolContract.addBunnyIdToPower(dividendPoolAddbunnyId, dividendPoolPower)
      toastSuccess('successful', <ToastDescriptionWithTx txHash={response.transactionHash} />)
    } catch (error: any) {
      toastError(`handleConfirmAddbunnyIdToPower: ${error?.message}`)
    }
  }

  const handleConfirmRemovebunnyIdToPower = async () => {
    try {
      const response = await mvsDividendPoolContract.removeBunnyIdToPower(dividendPoolRemovebunnyId)
      toastSuccess('successful', <ToastDescriptionWithTx txHash={response.transactionHash} />)
    } catch (error: any) {
      toastError(`handleConfirmRemovebunnyIdToPower: ${error?.message}`)
    }
  }

  const handleConfirmInitalize = async () => {
    const _rewardPerBlock: string = new BigNumber(rewardPerBlock).multipliedBy(BIG_TEN.pow(18)).toString()
    const _startBlock: string = startBlock.toString()
    const _bonusEndBlock: string = bonusEndBlock.toString()
    const _totalRewardToken: string = new BigNumber(totalRewardsInPool).multipliedBy(BIG_TEN.pow(18)).toString()
    const _lockRewardsInPool: string = new BigNumber(lockRewardsInPool).multipliedBy(BIG_TEN.pow(18)).toString()
    const _originalNFTTokenId: string = originalNFTTokenId.toString()

    try {
      const response = await mvsNftPoolContract.initialize(
        mvsNFTAddress,
        rewardToken,
        _rewardPerBlock,
        _startBlock,
        _bonusEndBlock,
        _totalRewardToken,
        _lockRewardsInPool,
        _originalNFTTokenId,
      )
      toastSuccess('successful', <ToastDescriptionWithTx txHash={response.transactionHash} />)
    } catch (error: any) {
      toastError(`handleConfirmInitalize ${error?.message as string}`)
    }
  }

  const handleConfirmApproveNftToPool = async () => {
    try {
      await callWithGasPrice(mvsNftContract, 'setApprovalForAll', [mvsNftPoolContract.address, true])
      toastSuccess('successful', <ToastDescriptionWithTx />)
    } catch (error: any) {
      toastError(`handleConfirmApproveNftToPool: ${error?.message}`)
    }
  }

  const handleDevRefreshMvsTokenBalance = async () => {
    try {
      const res = await mvsTokenContract.balanceOf(account)
      setmvsTokenBalance(new BigNumber(res.toString()))
      toastSuccess('DevLabs.refreshMvsTokenBalance ok')
    } catch (error: any) {
      toastError(`handleDevRefreshMvsTokenBalance: ${error?.message}`)
    }
  }

  const handleConfirmNftMarketWidthdraw = async () => {
    try {
      await callWithGasPrice(nftMarketContract, 'claimPendingRevenue', [])
      toastSuccess('claimPendingRevenue successful', <ToastDescriptionWithTx />)
    } catch (error: any) {
      toastError(`claimPendingRevenue: ${error?.message}`)
    }
  }

  const fetchDividendPoolInfo = async () => {
    try {
      const _nowCycle = await mvsDividendPoolContract.cycle()
      const dividendPool = await mvsDividendPoolContract.getPoolInfo(_nowCycle.toString())
      if (dividendPool) {
        setDividendPoolUpdateStartBlock(dividendPool[2]?.toString())
        setDividendPoolUpdateEndBlock(dividendPool[3]?.toString())
        setDividendPoolUpdateTotalAward(getFullDisplayBalance(dividendPool[4]?.toString(), 18, 2))
        setNowCycle(_nowCycle.toString())
      }
    } catch (error) {
      console.error(error)
    }
  }

  const fetchDividendPoolCycle = async () => {
    try {
      const _nowCycle = await mvsDividendPoolContract.cycle()
      setNowCycle(_nowCycle.toString())
    } catch (error) {
      console.error(error)
    }
  }

  const [isShowWidthdraw, setIsShowWidthdraw] = useState(false)
  const [isShowDevelop, setIsShowDevelop] = useState(false)
  useEffect(() => {
    setIsShowWidthdraw(MAIN_ACCOUNT[chainId]?.toLowerCase() === account?.toLowerCase())
    setIsShowDevelop(DEVELOPERS_ACCOUNT[chainId]?.toLowerCase() === account?.toLowerCase())
  }, [account, chainId])

  useEffect(() => {
    const fetchBlockNumber = async () => {
      const blockNumber = await simpleRpcProvider.getBlockNumber()
      setDividendPoolAddStartBlock(String(blockNumber))
    }
    fetchBlockNumber()
  }, [mvsDividendPoolContract, account])

  return (
    <Page>
      <Flex flexDirection="row" px="16px" pb="16px" flexWrap="wrap" justifyContent="flex-start">
        <Box width={['100%', '100%', '100%', '100%']}>
          <Flex flexDirection="column" px="16px" pb="16px" style={{ flex: 1 }}>
            <AppBody>
              <AppHeader title={t('Wallet & ChainInfo')} noConfig subtitle="" />
              <Wrapper id="swap-page" style={{ paddingTop: '0px' }}>
                {account ? (
                  <Flex>
                    <Flex flexDirection="column">
                      <Text fontSize="12px" mt="3px" mb="6px" textTransform="uppercase" bold>
                        conneted address: {account}
                      </Text>
                    </Flex>
                    <Flex flexDirection="column" mt="10px">
                      <Text fontSize="12px" mt="3px" mb="6px" textTransform="uppercase" bold>
                        network id: {chainId}
                      </Text>
                    </Flex>
                  </Flex>
                ) : (
                  <Flex mb="16px" justifyContent="center" mt={['16px', '16px', '32px', '32px']}>
                    <ConnectWalletButton minWidth="168px" width={['100%', null, '100%']} />
                  </Flex>
                )}
              </Wrapper>
            </AppBody>
          </Flex>
        </Box>
      </Flex>

      {isShowWidthdraw && (
        <Flex flexDirection="row" px="16px" pb="16px" flexWrap="wrap" justifyContent="flex-start">
          <Box width={['100%', '100%', '100%', '50%']}>
            <Flex flexDirection="column" px="16px" pb="16px" style={{ flex: 1 }}>
              <AppBody>
                <AppHeader title={t('Treasury Widthdraw')} noConfig subtitle="" />
                <Wrapper id="swap-page" style={{ paddingTop: '0px' }}>
                  <Flex flexDirection="column">
                    <Button mb="8px" onClick={handleConfirmNftMarketWidthdraw}>
                      NFT Market
                    </Button>
                  </Flex>
                </Wrapper>
              </AppBody>
            </Flex>
          </Box>

          <Box width={['100%', '100%', '50%', '50%']}>
            <Flex flexDirection="column" px="16px" pb="16px">
              <AppBody>
                <AppHeader
                  title={t('Dividend Pool')}
                  noConfig
                  subtitle={`Contract Address: ${mvsDividendPoolContract?.address}`}
                />
                <Wrapper id="swap-page">
                  <Flex>
                    <Text fontSize="12px" mt="3px" mb="6px" textTransform="uppercase" bold>
                      {t('startBlock')}
                    </Text>
                    <Heading ml="10px">{dividendPoolUpdateStartBlock}</Heading>
                  </Flex>

                  <Flex>
                    <Text fontSize="12px" mt="3px" mb="6px" textTransform="uppercase" bold>
                      {t('endBlock')}
                    </Text>
                    <Heading ml="10px">{dividendPoolUpdateEndBlock}</Heading>
                  </Flex>

                  <Flex>
                    <Text fontSize="12px" mt="3px" mb="6px" textTransform="uppercase" bold>
                      {t('totalAward')}
                    </Text>
                    <Heading ml="10px">{dividendPoolUpdateTotalAward}</Heading>
                  </Flex>

                  <Flex>
                    <Text fontSize="12px" mt="3px" mb="6px" textTransform="uppercase" bold>
                      {t('cycle')}
                    </Text>
                    <Heading ml="10px">{nowCycle}</Heading>
                  </Flex>

                  <Flex flexDirection="column" mt="20px">
                    <Button mb="8px" onClick={fetchDividendPoolInfo} variant="tertiary">
                      <AutoRenewIcon />
                    </Button>
                  </Flex>
                </Wrapper>
              </AppBody>
            </Flex>
          </Box>
        </Flex>
      )}

      {isShowDevelop && (
        <Flex flexDirection="row" px="16px" pb="16px" flexWrap="wrap" justifyContent="flex-start">
          <Box width={['100%', '100%', '100%', '100%']}>
            <Flex flexDirection="column" px="16px" pb="16px">
              <AppBody>
                <AppHeader title={t('Configure the contract')} noConfig subtitle="stored in localStorage " />
                <Wrapper id="swap-page">
                  <Text fontSize="12px" mt="3px" mb="6px" color="secondary" textTransform="uppercase" bold>
                    {t('MvsNftPool contract')}
                  </Text>
                  <Input
                    scale="sm"
                    value={mvsNftPoolAddress}
                    onChange={(e) => setMvsNftPoolAddress(e.target.value.trim())}
                  />
                  <Text fontSize="12px" mt="3px" mb="6px" color="secondary" textTransform="uppercase" bold>
                    {t('MvsDividendPool contract')}
                  </Text>
                  <Input
                    scale="sm"
                    value={dividendPoolAddress}
                    onChange={(e) => setDividendPoolAddress(e.target.value.trim())}
                  />
                  <Text fontSize="12px" mt="3px" mb="6px" color="secondary" textTransform="uppercase" bold>
                    {t('MvsNft NFT contract')}
                  </Text>
                  <Input
                    mb="16px"
                    scale="sm"
                    value={mvsNFTAddress}
                    onChange={(e) => setMvsNFTAddress(e.target.value.trim())}
                  />
                  <Text fontSize="12px" mt="3px" mb="6px" color="secondary" textTransform="uppercase" bold>
                    {t('MvsToken contract')}
                  </Text>
                  <Input
                    scale="sm"
                    value={mvsTokenAddress}
                    onChange={(e) => setMvsTokenAddress(e.target.value.trim())}
                  />
                  <Text fontSize="12px" mt="3px" mb="6px" color="secondary" textTransform="uppercase" bold>
                    {t('nftMarket contract')}
                  </Text>
                  <Input
                    scale="sm"
                    value={nftMarketAddress}
                    onChange={(e) => setNftMarketAddress(e.target.value.trim())}
                  />
                  <Flex flexDirection="column" mt="20px">
                    <Button mb="8px" onClick={handleDevSyncContractAddress}>
                      {t('Confirm')}
                    </Button>
                  </Flex>
                </Wrapper>
              </AppBody>
            </Flex>
          </Box>

          {/* NFT Pool */}
          <Box width="100%" mt="40px">
            <Heading px="16px" pb="16px">
              NFT Pool
            </Heading>
            <Flex flexDirection="row" flexWrap="wrap">
              <Box width={['100%', '100%', '50%', '50%']}>
                <Flex flexDirection="column" px="16px" pb="16px">
                  <AppBody>
                    <AppHeader
                      title={t('Approve tokens(15B) to pool')}
                      noConfig
                      subtitle="Step1: approve tokens to pool"
                    />
                    <Wrapper id="swap-page">
                      <Text fontSize="12px" mt="3px" mb="6px" color="secondary" textTransform="uppercase" bold>
                        {t('amount')}
                      </Text>
                      <Input scale="sm" value={amount} onChange={(e) => setAmount(e.target.value.trim())} />
                      <Text fontSize="12px" mt="3px" mb="6px" color="secondary" textTransform="uppercase" bold>
                        {t('account')}
                      </Text>
                      <Input scale="sm" value={account} disabled />

                      <Flex justifyContent="space-between" width="100%" mt="16px">
                        <Text color="textSubtle">{t('balanceOf')}</Text>

                        <Flex alignItems="center" justifyContent="space-between">
                          <Text>{getFullDisplayBalance(mvsTokenBalance, 18, 0)}</Text>
                          <IconButton variant="text" onClick={handleDevRefreshMvsTokenBalance}>
                            <AutoRenewIcon width={20} height={20} color="textSubtle" />
                          </IconButton>
                        </Flex>
                      </Flex>

                      <Flex flexDirection="column">
                        <Button mb="8px" onClick={handleConfirmApproveTokensToPool}>
                          {t('Confirm')}
                        </Button>
                      </Flex>
                    </Wrapper>
                  </AppBody>
                </Flex>
              </Box>

              <Box width={['100%', '100%', '50%', '50%']}>
                <Flex flexDirection="column" px="16px" pb="16px" style={{ flex: 1 }}>
                  <AppBody>
                    <AppHeader title={t('Approve nft(#1) to pool')} noConfig subtitle="Step2: approve nft #1 to pool" />
                    <Wrapper id="swap-page">
                      <Flex flexDirection="column" mt="20px">
                        <Button
                          mb="8px"
                          onClick={handleDevIsApprovedForAll}
                          variant={isApproved ? 'success' : 'tertiary'}
                        >
                          {isApproved ? 'Have authorized' : <AutoRenewIcon />}
                        </Button>
                      </Flex>
                      <Flex flexDirection="column" mt="20px">
                        <Button mb="8px" onClick={handleConfirmApproveNftToPool}>
                          {t('Confirm')}
                        </Button>
                      </Flex>
                    </Wrapper>
                  </AppBody>
                </Flex>
              </Box>

              <Box width={['100%', '100%', '50%', '50%']}>
                <Flex flexDirection="column" px="16px" pb="16px" style={{ flex: 1 }}>
                  <AppBody>
                    <AppHeader title={t('Initialize pool')} noConfig subtitle="Step3: config and init pool" />
                    <Wrapper id="swap-page">
                      <Text fontSize="12px" mt="3px" mb="6px" color="secondary" textTransform="uppercase" bold>
                        {t('nft address')}
                      </Text>
                      <Input
                        scale="sm"
                        value={mvsNFTAddress}
                        onChange={(e) => setMvsNFTAddress(e.target.value.trim())}
                      />

                      <Text fontSize="12px" mt="3px" mb="6px" color="secondary" textTransform="uppercase" bold>
                        {t('token address')}
                      </Text>
                      <Input scale="sm" value={rewardToken} onChange={(e) => setRewardToken(e.target.value.trim())} />

                      <Text fontSize="12px" mt="3px" mb="6px" color="secondary" textTransform="uppercase" bold>
                        {t('awarded per block')}
                      </Text>
                      <Input
                        scale="sm"
                        value={rewardPerBlock}
                        onChange={(e) => serRewardPerBlock(e.target.value.trim())}
                      />

                      <Text fontSize="12px" mt="3px" mb="6px" color="secondary" textTransform="uppercase" bold>
                        {t('start block')}
                      </Text>
                      <Input
                        scale="sm"
                        value={startBlock}
                        onChange={(e) => {
                          const endBlockNumber = parseInt(e.target.value.trim(), 10) + END_BLOCK_TO_ADD
                          setStartBlock(e.target.value.trim())
                          setBonusEndBlock(endBlockNumber.toString())
                        }}
                      />

                      <Text fontSize="12px" mt="3px" mb="6px" color="secondary" textTransform="uppercase" bold>
                        {t('end block')}
                      </Text>
                      <Input
                        scale="sm"
                        value={bonusEndBlock}
                        disabled
                        onChange={(e) => setBonusEndBlock(e.target.value.trim())}
                      />

                      <Text fontSize="12px" mt="3px" mb="6px" color="secondary" textTransform="uppercase" bold>
                        {t('mined in total')}
                      </Text>
                      <Input
                        scale="sm"
                        value={totalRewardsInPool}
                        onChange={(e) => setTotalRewardsInPool(e.target.value.trim())}
                      />

                      <Text fontSize="12px" mt="3px" mb="6px" color="secondary" textTransform="uppercase" bold>
                        {t('lockRewardsInPool')}
                      </Text>
                      <Input
                        scale="sm"
                        value={lockRewardsInPool}
                        onChange={(e) => setLockRewardsInPool(e.target.value.trim())}
                      />

                      <Text fontSize="12px" mt="3px" mb="6px" color="secondary" textTransform="uppercase" bold>
                        {t('original tokenId')}
                      </Text>
                      <Input
                        scale="sm"
                        value={originalNFTTokenId}
                        onChange={(e) => setOriginalNFTTokenId(e.target.value.trim())}
                      />

                      <Flex flexDirection="column" mt="20px">
                        <Button mb="8px" onClick={handleConfirmInitalize}>
                          {t('Confirm')}
                        </Button>
                      </Flex>
                    </Wrapper>
                  </AppBody>
                </Flex>
              </Box>
            </Flex>
          </Box>

          {/* Dividend Pool */}
          <Box width="100%" mt="40px">
            <Heading px="16px" pb="16px">
              Dividend Pool
            </Heading>
            <Flex flexDirection="row" flexWrap="wrap">
              <Box width={['100%', '100%', '50%', '50%']}>
                <Flex flexDirection="column" px="16px" pb="16px">
                  <AppBody>
                    <AppHeader
                      title={t('Add Cycle')}
                      noConfig
                      subtitle={
                        <Flex alignItems="center">
                          <AutoRenewIcon mr="5px" onClick={() => fetchDividendPoolCycle()} />
                          cycle {nowCycle}
                        </Flex>
                      }
                    />
                    <Wrapper id="swap-page">
                      <Text fontSize="12px" mt="3px" mb="6px" color="secondary" textTransform="uppercase" bold>
                        {t('startBlock')}
                      </Text>
                      <Input
                        scale="sm"
                        value={dividendPoolAddStartBlock}
                        onChange={(e) => setDividendPoolAddStartBlock(e.target.value.trim())}
                      />
                      <Text fontSize="12px" mt="3px" mb="6px" color="secondary" textTransform="uppercase" bold>
                        {t('endBlock')}
                      </Text>
                      <Input
                        scale="sm"
                        value={dividendPoolAddEndBlock}
                        onChange={(e) => setDividendPoolAddEndBlock(e.target.value.trim())}
                      />

                      <Flex flexDirection="column" mt="16px">
                        <Button mb="8px" onClick={handleConfirmAddCycle}>
                          {t('Confirm')}
                        </Button>
                      </Flex>
                    </Wrapper>
                  </AppBody>
                </Flex>
              </Box>

              <Box width={['100%', '100%', '50%', '50%']}>
                <Flex flexDirection="column" px="16px" pb="16px">
                  <AppBody>
                    <AppHeader title={t('Update Now Cycle')} noConfig subtitle="Update Now Cycle" />
                    <Wrapper id="swap-page">
                      <Text fontSize="12px" mt="3px" mb="6px" color="secondary" textTransform="uppercase" bold>
                        {t('startBlock')}
                      </Text>
                      <Input
                        scale="sm"
                        value={dividendPoolUpdateStartBlock}
                        onChange={(e) => setDividendPoolUpdateStartBlock(e.target.value.trim())}
                      />
                      <Text fontSize="12px" mt="3px" mb="6px" color="secondary" textTransform="uppercase" bold>
                        {t('endBlock')}
                      </Text>
                      <Input
                        scale="sm"
                        value={dividendPoolUpdateEndBlock}
                        onChange={(e) => setDividendPoolUpdateEndBlock(e.target.value.trim())}
                      />
                      <Text fontSize="12px" mt="3px" mb="6px" color="secondary" textTransform="uppercase" bold>
                        {t('totalAward')}
                      </Text>
                      <Input
                        scale="sm"
                        value={dividendPoolUpdateTotalAward}
                        onChange={(e) => setDividendPoolUpdateTotalAward(e.target.value.trim())}
                      />

                      <Flex flexDirection="column" mt="20px">
                        <Button mb="8px" onClick={fetchDividendPoolInfo} variant="tertiary">
                          <AutoRenewIcon />
                        </Button>
                      </Flex>

                      <Flex flexDirection="column" mt="16px">
                        <Button mb="8px" onClick={handleConfirmUpdateCycle}>
                          {t('Confirm')}
                        </Button>
                      </Flex>
                    </Wrapper>
                  </AppBody>
                </Flex>
              </Box>

              <Box width={['100%', '100%', '50%', '50%']}>
                <Flex flexDirection="column" px="16px" pb="16px">
                  <AppBody>
                    <AppHeader title={t('AddbunnyIdToPower')} noConfig subtitle="Step1: " />
                    <Wrapper id="swap-page">
                      <Text fontSize="12px" mt="3px" mb="6px" color="secondary" textTransform="uppercase" bold>
                        {t('bunnyId')}
                      </Text>
                      <Input
                        scale="sm"
                        value={dividendPoolAddbunnyId}
                        onChange={(e) => setDividendPoolAddbunnyId(e.target.value.trim())}
                      />
                      <Text fontSize="12px" mt="3px" mb="6px" color="secondary" textTransform="uppercase" bold>
                        {t('power')}
                      </Text>
                      <Input
                        scale="sm"
                        value={dividendPoolPower}
                        onChange={(e) => setDividendPoolPower(e.target.value.trim())}
                      />

                      <Flex flexDirection="column" mt="16px">
                        <Button mb="8px" onClick={handleConfirmAddbunnyIdToPower}>
                          {t('Confirm')}
                        </Button>
                      </Flex>
                    </Wrapper>
                  </AppBody>
                </Flex>
              </Box>

              <Box width={['100%', '100%', '50%', '50%']}>
                <Flex flexDirection="column" px="16px" pb="16px">
                  <AppBody>
                    <AppHeader title={t('RemovebunnyIdToPower')} noConfig subtitle="Step1: " />
                    <Wrapper id="swap-page">
                      <Text fontSize="12px" mt="3px" mb="6px" color="secondary" textTransform="uppercase" bold>
                        {t('bunnyId')}
                      </Text>
                      <Input
                        scale="sm"
                        value={dividendPoolRemovebunnyId}
                        onChange={(e) => setDividendPoolRemovebunnyId(e.target.value.trim())}
                      />
                      <Flex flexDirection="column" mt="16px">
                        <Button mb="8px" onClick={handleConfirmRemovebunnyIdToPower}>
                          {t('Confirm')}
                        </Button>
                      </Flex>
                    </Wrapper>
                  </AppBody>
                </Flex>
              </Box>
            </Flex>
          </Box>
        </Flex>
      )}
    </Page>
  )
}
