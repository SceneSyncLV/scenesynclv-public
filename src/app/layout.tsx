import './globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'SceneSyncLV',
  description: 'Las Vegas local events',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full bg-slate-950 text-white antialiased">
        {children}
      </body>
    </html>
  );
}
