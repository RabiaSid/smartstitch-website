import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Order, ShippingRate, Address, PaymentMethod } from '@/types';
interface OrderState { orders: Order[]; currentOrder: Order | null; shippingRates: ShippingRate[]; selectedShipping: ShippingRate | null; shippingAddress: Address | null; paymentMethod: PaymentMethod | null; isLoading: boolean; }
const orderSlice = createSlice({
  name: 'orders',
  initialState: { orders: [], currentOrder: null, shippingRates: [], selectedShipping: null, shippingAddress: null, paymentMethod: null, isLoading: false } as OrderState,
  reducers: {
    setOrders(state, action: PayloadAction<Order[]>) { state.orders = action.payload; },
    setCurrentOrder(state, action: PayloadAction<Order | null>) { state.currentOrder = action.payload; },
    setShippingRates(state, action: PayloadAction<ShippingRate[]>) { state.shippingRates = action.payload; },
    selectShipping(state, action: PayloadAction<ShippingRate>) { state.selectedShipping = action.payload; },
    setShippingAddress(state, action: PayloadAction<Address>) { state.shippingAddress = action.payload; },
    setPaymentMethod(state, action: PayloadAction<PaymentMethod>) { state.paymentMethod = action.payload; },
    setLoading(state, action: PayloadAction<boolean>) { state.isLoading = action.payload; },
  },
});
export const { setOrders, setCurrentOrder, setShippingRates, selectShipping, setShippingAddress, setPaymentMethod, setLoading } = orderSlice.actions;
export default orderSlice.reducer;
