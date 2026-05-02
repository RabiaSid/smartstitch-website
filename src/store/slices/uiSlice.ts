import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Market } from '@/types';
interface UIState { market: Market; currency: string; currencySymbol: string; isNavOpen: boolean; }
const uiSlice = createSlice({
  name: 'ui',
  initialState: { market: 'EU' as Market, currency: 'EUR', currencySymbol: '€', isNavOpen: false } as UIState,
  reducers: {
    setMarket(state, action: PayloadAction<Market>) {
      state.market = action.payload;
      if (action.payload === 'EU') { state.currency = 'EUR'; state.currencySymbol = '€'; }
      if (action.payload === 'ME') { state.currency = 'AED'; state.currencySymbol = 'د.إ'; }
    },
    toggleNav(state) { state.isNavOpen = !state.isNavOpen; },
    closeNav(state)  { state.isNavOpen = false; },
  },
});
export const { setMarket, toggleNav, closeNav } = uiSlice.actions;
export default uiSlice.reducer;
