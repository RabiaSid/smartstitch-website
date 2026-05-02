import { useAppSelector } from './useRedux';
export const useCurrency = () => {
  const { currency, currencySymbol, market } = useAppSelector(s => s.ui);
  const format = (amount: number) => `${currencySymbol}${amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
  return { currency, currencySymbol, market, format };
};
