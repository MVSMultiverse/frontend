import { SubMenuItems } from '@pancakeswap/uikit'
import styled from 'styled-components'

const BaseSubMenu = styled(SubMenuItems)`
  background-color: transparent;
  & a:hover {
    background-color: transparent;
  }
  border-bottom: 1px solid rgb(133 133 133 / 10%);
  // 1px ${({ theme }) => theme.colors.cardBorder} solid;
`

export default BaseSubMenu
