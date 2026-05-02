import { useAppDispatch, useAppSelector } from './useRedux';
import { addItem, removeItem, updateQuantity, clearCart, toggleCart } from '@/store/slices/cartSlice';
import { CartItem } from '@/types';
export const useCart = () => {
  const dispatch = useAppDispatch();
  const { cart, isOpen } = useAppSelector(s => s.cart);
  return {
    cart, isOpen,
    addItem:        (item: CartItem)                 => dispatch(addItem(item)),
    removeItem:     (id: string)                     => dispatch(removeItem(id)),
    updateQuantity: (id: string, quantity: number)   => dispatch(updateQuantity({ id, quantity })),
    clearCart:      ()                               => dispatch(clearCart()),
    toggleCart:     ()                               => dispatch(toggleCart()),
  };
};
