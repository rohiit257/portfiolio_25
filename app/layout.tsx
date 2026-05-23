import './globals.css';
import type { Metadata } from 'next';
import { ThemeProvider } from '@/components/theme-provider';
import { LoadingScreen } from '@/components/loading-screen';
import { Toaster } from 'sonner';

export const metadata: Metadata = {
  title: {
    default: 'Rohit Shahi - Full Stack Developer & Blockchain Engineer',
    template: '%s | Rohit Shahi - Developer Portfolio'
  },
  description: 'Rohit Shahi - Full Stack Developer specializing in Solana blockchain, smart contracts, AI/ML, and scalable web applications. Computer Engineering student with expertise in Next.js, React, Python, C, and modern web technologies.',
  keywords: [
    'Rohit Shahi',
    'rohitdebugbugs',
    'Full Stack Developer',
    'Blockchain Developer',
    'Solana Developer',
    'Smart Contracts',
    'Next.js Developer',
    'React Developer',
    'Python Developer',
    'AI/ML Engineer',
    'Computer Engineering',
    'Web3 Developer',
    'DeFi Developer',
    'NFT Marketplace',
    'Real-time Applications',
    'WebSockets',
    'Portfolio'
  ],
  authors: [{ name: 'Rohit Shahi', url: 'https://www.rohitdebugbugs.in/' }],
  creator: 'Rohit Shahi',
  publisher: 'Rohit Shahi',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://www.rohitdebugbugs.in/'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.rohitdebugbugs.in/',
    title: 'Rohit Shahi - Full Stack Developer & Blockchain Engineer',
    description: 'Full Stack Developer specializing in Solana blockchain, smart contracts, AI/ML, and scalable web applications. Explore my projects and experience.',
    siteName: 'Rohit Shahi Portfolio',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Rohit Shahi - Developer Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rohit Shahi - Full Stack Developer & Blockchain Engineer',
    description: 'Full Stack Developer specializing in Solana blockchain, smart contracts, AI/ML, and scalable web applications.',
    images: ['/og-image.png'],
    creator: '@rohitdebugbugs',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
  category: 'technology',
  classification: 'Portfolio Website',
  referrer: 'origin-when-cross-origin',
  colorScheme: 'dark light',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ece7e1' },
    { media: '(prefers-color-scheme: dark)', color: '#111111' },
  ],
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/safari-pinned-tab.svg',
        color: '#000000',
      },
    ],
  },
  appleWebApp: {
    capable: true,
    title: 'Rohit Shahi Portfolio',
    statusBarStyle: 'black-translucent',
  },
  applicationName: 'Rohit Shahi Portfolio',
  generator: 'Next.js',
  abstract: 'Portfolio website showcasing full-stack development and blockchain engineering projects by Rohit Shahi.',
  archives: ['https://www.rohitdebugbugs.in/sitemap.xml'],
  bookmarks: ['https://www.rohitdebugbugs.in/'],
  other: {
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'msapplication-TileColor': '#000000',
    'msapplication-config': '/browserconfig.xml',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <LoadingScreen>
            <div className="bg-animated" />
            <div className="relative">
              {children}
              <Toaster />
            </div>
          </LoadingScreen>
        </ThemeProvider>
      </body>
    </html>
  );
}
