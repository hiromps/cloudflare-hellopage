import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Hello World - Cloudflare Pages',
  description: 'A simple Next.js app deployed on Cloudflare Pages',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}