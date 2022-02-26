import React from 'react'
import { Button } from '@pancakeswap/uikit'
import { useWeb3React } from '@web3-react/core'
import { useTranslation } from 'contexts/Localization'
import ConnectWalletButton from 'components/ConnectWalletButton'
import { useMvsDividendPoolUpgradeableContract } from 'hooks/useContract'
import useToast from 'hooks/useToast'
import { ToastDescriptionWithTx } from 'components/Toast'

interface HarvestButtonProps {
  text: string
  disabled?: boolean
}

const Body: React.FC<HarvestButtonProps> = ({ text, disabled = false }) => {
  const { t } = useTranslation()
  const mvsDividendPoolContract = useMvsDividendPoolUpgradeableContract(true)
  const { account } = useWeb3React()
  const { toastSuccess, toastError } = useToast()

  const handleConfirm = async () => {
    try {
      const receipt = await mvsDividendPoolContract.harvest()
      toastSuccess(
        t('Your BNB has been sent to your wallet'),
        <ToastDescriptionWithTx txHash={receipt.transactionHash} />,
      )
    } catch (error: any) {
      if (error?.data?.message || error?.message) {
        toastError(t(`${error?.data?.message || error?.message}`))
      }
    }
  }

  return (
    <>
      {account ? (
        <Button disabled={disabled} onClick={handleConfirm} scale="xs" style={{ borderRadius: '6px' }}>
          {text}
        </Button>
      ) : (
        <ConnectWalletButton scale="xs" />
      )}
    </>
  )
}

export default Body
