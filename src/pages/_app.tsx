import '../styles/globals.scss'
import type { AppProps } from 'next/app'

import AppLayout from '../components/AppLayout'

// Add ethereum property to Global window object.
declare global {
  interface Window {
    ethereum: {
      request<T>(params: any): Promise<T>;
      on<T>(event: string, cb: (params: T) => void): void;
      removeListener<T>(event: string, cb: (params: T) => void): void;
      selectedAddress: string | undefined;
      chainId: string;
    };
  }
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppLayout>
      <Component {...pageProps} />
    </AppLayout>
  )
}

export default MyApp
