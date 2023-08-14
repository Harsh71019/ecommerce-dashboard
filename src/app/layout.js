import './globals.css';
import { Providers } from './providers';
import { ReduxProviders } from '@/redux/redux_provider';

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body>
        <ReduxProviders>
          <Providers>{children}</Providers>
        </ReduxProviders>
      </body>
    </html>
  );
}
