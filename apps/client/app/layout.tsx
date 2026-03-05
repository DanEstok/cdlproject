import './globals.css';
import { Inter } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import PageLayout from '../components/PageLayout';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Client Portal - Recovery Platform',
  description: 'Client portal for case management',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="theme-color" content="#000000" />
          <link rel="manifest" href="/manifest.json" />
        </head>
        <body className={inter.className}>
          <PageLayout>{children}</PageLayout>
        </body>
      </html>
    </ClerkProvider>
  );
}
