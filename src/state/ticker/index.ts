import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SerializedTicker, TickerState } from '../types'

const initialState: TickerState = { data: [] }

export const tickerSlice = createSlice({
  name: 'Ticker',
  initialState,
  reducers: {
    setTicker: (state, action: PayloadAction<SerializedTicker[]>) => {
      state.data = action.payload
    },
  },
})

// Actions
export const { setTicker } = tickerSlice.actions

export default tickerSlice.reducer
