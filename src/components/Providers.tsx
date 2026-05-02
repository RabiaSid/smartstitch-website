'use client';
import { Provider } from 'react-redux';
import { store } from '@/store';
import { Toaster } from 'react-hot-toast';
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      {children}
      <Toaster position="top-right" toastOptions={{ duration: 3000, style: { background: '#0A1F44', color: '#fff', borderRadius: '12px' }, success: { iconTheme: { primary: '#D4AF37', secondary: '#fff' } } }} />
    </Provider>
  );
}
