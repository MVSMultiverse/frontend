import React, { useState } from 'react'
import { InjectedModalProps } from '@pancakeswap/uikit'
import useTheme from 'hooks/useTheme'
import { useTranslation } from 'contexts/Localization'
import { useMvsNftContract, useMvsDividendPoolUpgradeableContract } from 'hooks/useContract'
import { useWeb3React } from '@web3-react/core'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import useApproveConfirmTransaction from 'hooks/useApproveConfirmTransaction'
import useToast from 'hooks/useToast'
import { getMvsNftAddress } from 'utils/addressHelpers'
import { ToastDescriptionWithTx } from 'components/Toast'
import { useAppDispatch } from 'state'
import { setDividendPoolNfts } from 'state/nftPool/reducer'
import { StyledModal } from './styles'
import OwnNFTListStage from './OwnNFTListStage'
import ApproveAndConfirmStage from './ApproveAndConfirmStage'
import { HarvestingStage } from './types'

const modalTitles = {
  [HarvestingStage.SELECTED_NFT]: 'Selected SR,SSR NFTs',
  [HarvestingStage.APPROVE_AND_CONFIRM]: 'Back',
  [HarvestingStage.CONFIRM]: 'Back',
  [HarvestingStage.TX_CONFIRMED]: 'Transaction Confirmed',
}

interface HarvestModalProps extends InjectedModalProps {
  userNfts?: any
}

const StakeModal: React.FC<HarvestModalProps> = ({ userNfts, onDismiss }) => {
  const [stage, setStage] = useState(HarvestingStage.SELECTED_NFT)

  const { theme } = useTheme()
  const { t } = useTranslation()
  const { callWithGasPrice } = useCallWithGasPrice()
  const { account } = useWeb3React()
  const mvsDividendPoolContract = useMvsDividendPoolUpgradeableContract(true)
  const mvsNftContract = useMvsNftContract(true)
  const address = getMvsNftAddress()
  const { toastSuccess } = useToast()
  const dispatch = useAppDispatch()

  const [selectedNft, setSelectedNft] = useState([])

  const { isApproving, isApproved, isConfirming, handleApprove, handleConfirm } = useApproveConfirmTransaction({
    onRequiresApproval: async () => {
      try {
        const approvedForContract = await mvsNftContract.isApprovedForAll(account, mvsDividendPoolContract.address)
        return approvedForContract
      } catch (error) {
        return false
      }
    },
    onApprove: () => {
      return callWithGasPrice(mvsNftContract, 'setApprovalForAll', [mvsDividendPoolContract.address, true])
    },
    onApproveSuccess: async ({ receipt }) => {
      toastSuccess(
        t('Contract approved - you can now stake pool with NFT!'),
        <ToastDescriptionWithTx txHash={receipt.transactionHash} />,
      )
    },
    onConfirm: () => {
      const ids = selectedNft.map((it) => it.tokenId)
      return callWithGasPrice(mvsDividendPoolContract, 'stakeList', [ids])
    },
    onSuccess: async ({ receipt }) => {
      dispatch(setDividendPoolNfts({ nfts: selectedNft, collectionAddress: address }))
      onDismiss()
      toastSuccess(t('Successful stake'), <ToastDescriptionWithTx txHash={receipt.transactionHash} />)
    },
  })

  const continueToNextStage = () => {
    if (selectedNft.length > 0) {
      setStage(HarvestingStage.APPROVE_AND_CONFIRM)
    }
  }

  const goBack = () => {
    setStage(HarvestingStage.SELECTED_NFT)
  }

  const showBackButton = stage === HarvestingStage.CONFIRM || stage === HarvestingStage.APPROVE_AND_CONFIRM

  return (
    <StyledModal
      title={t(modalTitles[stage])}
      stage={stage}
      onDismiss={onDismiss}
      onBack={showBackButton ? goBack : null}
      headerBackground={theme.colors.gradients.cardHeader}
    >
      {/* Selected NFT */}
      {stage === HarvestingStage.SELECTED_NFT && (
        <OwnNFTListStage
          continueToNextStage={continueToNextStage}
          setSelectedNft={setSelectedNft}
          selectedNft={selectedNft}
          userNfts={userNfts}
        />
      )}
      {stage === HarvestingStage.APPROVE_AND_CONFIRM && (
        <ApproveAndConfirmStage
          handleApprove={handleApprove}
          isApproved={isApproved}
          isApproving={isApproving}
          isConfirming={isConfirming}
          handleConfirm={handleConfirm}
        />
      )}
    </StyledModal>
  )
}

export default StakeModal
