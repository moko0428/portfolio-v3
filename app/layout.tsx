import type { Metadata } from 'next';
import { Geist_Mono, Noto_Sans_KR } from 'next/font/google';

import './globals.css';
import { TopNav } from '@/components/top-nav';

const sans = Noto_Sans_KR({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
});

const mono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: '이준영 | Frontend Developer',
  description:
    '일상의 문제를 서비스 아이디어로 풀어내는 프론트엔드 개발자 이준영의 포트폴리오입니다.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${sans.variable} ${mono.variable} antialiased`}>
        <TopNav />
        <main className="min-h-screen bg-background text-foreground px-10">
          {children}
        </main>
      </body>
    </html>
  );
}
