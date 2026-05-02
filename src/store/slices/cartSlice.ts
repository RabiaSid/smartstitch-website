import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Cart, CartItem } from '@/types';

interface CartState { cart: Cart; isOpen: boolean; }
const emptyCart: Cart = { items: [], totalItems: 0, subtotal: 0, shipping: 0, discount: 0, total: 0, currency: 'EUR' };
const recalc = (items: CartItem[]) => ({
  subtotal: items.reduce((s, i) => s + i.pricing.total, 0),
  totalItems: items.reduce((s, i) => s + i.customization.quantity, 0),
  total: items.reduce((s, i) => s + i.pricing.total, 0),
});

const cartSlice = createSlice({
  name: 'cart',
  initialState: { cart: emptyCart, isOpen: false } as CartState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      const idx = state.cart.items.findIndex(i => i.id === action.payload.id);
      if (idx >= 0) state.cart.items[idx] = action.payload;
      else state.cart.items.push(action.payload);
      Object.assign(state.cart, recalc(state.cart.items));
    },
    removeItem(state, action: PayloadAction<string>) {
      state.cart.items = state.cart.items.filter(i => i.id !== action.payload);
      Object.assign(state.cart, recalc(state.cart.items));
    },
    updateQuantity(state, action: PayloadAction<{ id: string; quantity: number }>) {
      const item = state.cart.items.find(i => i.id === action.payload.id);
      if (item) { item.customization.quantity = action.payload.quantity; Object.assign(state.cart, recalc(state.cart.items)); }
    },
    setShipping(state, action: PayloadAction<number>) {
      state.cart.shipping = action.payload;
      state.cart.total = state.cart.subtotal + action.payload - state.cart.discount;
    },
    clearCart(state)  { state.cart = emptyCart; },
    toggleCart(state) { state.isOpen = !state.isOpen; },
    openCart(state)   { state.isOpen = true; },
    closeCart(state)  { state.isOpen = false; },
  },
});
export const { addItem, removeItem, updateQuantity, setShipping, clearCart, toggleCart, openCart, closeCart } = cartSlice.actions;
export default cartSlice.reducer;
