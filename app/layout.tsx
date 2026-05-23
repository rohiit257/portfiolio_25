import './globals.css';
import type { Metadata } from 'next';
import { ThemeProvider } from '@/components/theme-provider';
import { LoadingScreen } from '@/components/loading-screen';
import { Toaster } from 'sonner';
import { SEO, SITE_NAME, SITE_URL, absoluteUrl, getSearchVerification } from '@/lib/site-config';

export const metadata: Metadata = {
  title: {
    default: SEO.title,
    template: '%s | Rohit Shahi'
  },
  description: SEO.description,
  keywords: SEO.keywords,
  authors: [{ name: 'Rohit Shahi', url: SITE_URL }],
  creator: 'Rohit Shahi',
  publisher: 'Rohit Shahi',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    title: SEO.title,
    description: SEO.description,
    siteName: SITE_NAME,
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Rohit Shahi - Full Stack Developer, Blockchain and AI Engineer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SEO.title,
    description: SEO.description,
    images: ['/opengraph-image'],
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
  verification: getSearchVerification(),
  category: 'technology',
  classification: 'Portfolio Website',
  referrer: 'origin-when-cross-origin',
  icons: {
    icon: [{ url: '/avat.jpg', type: 'image/jpeg' }],
    apple: [{ url: '/avat.jpg', type: 'image/jpeg' }],
  },
  appleWebApp: {
    capable: true,
    title: 'Rohit Shahi Portfolio',
    statusBarStyle: 'black-translucent',
  },
  applicationName: 'Rohit Shahi Portfolio',
  generator: 'Next.js',
  abstract: 'Portfolio website showcasing full-stack development and blockchain engineering projects by Rohit Shahi.',
  archives: [absoluteUrl('/sitemap.xml')],
  bookmarks: [SITE_URL],
  other: {
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'msapplication-TileColor': '#000000',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  colorScheme: 'dark light',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ece7e1' },
    { media: '(prefers-color-scheme: dark)', color: '#111111' },
  ],
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
