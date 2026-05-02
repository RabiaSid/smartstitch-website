import { useAppDispatch, useAppSelector } from './useRedux';
import { logout } from '@/store/slices/authSlice';
export const useAuth = () => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector(s => s.auth);
  return { ...auth, logout: () => dispatch(logout()) };
};
