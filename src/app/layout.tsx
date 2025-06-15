import './globals.css';
import { ReactNode } from 'react';
import Link from 'next/link';
import { cookies } from 'next/headers';

export const metadata = {
  title: 'SceneSyncLV',
  description: 'Las Vegas local events',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const cookieStore = cookies();
  const signedIn = !!cookieStore.get('sb-access-token');
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#22c55e" />
      </head>
      <body className="min-h-full bg-slate-950 text-white antialiased">
        <nav className="flex items-center gap-6 px-6 py-4 bg-slate-900">
          <Link href="/" className="font-bold text-lg">SceneSyncLV</Link>
          {signedIn && (
            <Link href="/promoter" className="ml-auto font-semibold text-emerald-400 hover:underline">Dashboard</Link>
          )}
        </nav>
        {children}
      </body>
    </html>
  );
}
