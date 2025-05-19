import { Metadata } from 'next';
import Head from 'next/head';
import { SiteConfig, Service } from '@/config/siteConfig';
import SchemaMarkup from '../common/SchemaMarkup';
import Header from './Header';
import Footer from './Footer';

interface PageLayoutProps {
  children: React.ReactNode;
  config: SiteConfig;
  metadata: Metadata;
  pageType?: 'home' | 'about' | 'services' | 'contact' | 'serviceDetail';
  service?: Service;
}

const PageLayout = ({
  children,
  config,
  metadata,
  pageType = 'home',
  service,
}: PageLayoutProps) => {
  const {
    business: { name, logo },
    seo: { ogImage, twitterHandle },
  } = config;

  const title = typeof metadata.title === 'string' 
    ? metadata.title 
    : (metadata.title as { default: string })?.default || `${name} | Professional Services`;
  
  const description = typeof metadata.description === 'string'
    ? metadata.description
    : config.business.description;

  const keywords = config.seo.keywords.join(', ');

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={typeof window !== 'undefined' ? window.location.href : ''} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        {ogImage && <meta property="og:image" content={ogImage} />}

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        {twitterHandle && <meta property="twitter:site" content={twitterHandle} />}
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
        {ogImage && <meta property="twitter:image" content={ogImage} />}

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        {/* <link rel="apple-touch-icon" href={logo} /> */}

        {/* Additional Meta Tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content={config.business.brandColors.primary} />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        <meta name="author" content={name} />

        {/* Schema.org markup */}
        <SchemaMarkup config={config} pageType={pageType} service={service} />
      </Head>

      <div className="min-h-screen flex flex-col">
        <Header config={config} />
        <main className="flex-grow pt-20">
          {children}
        </main>
        <Footer config={config} />
      </div>

      {/* Mobile Emergency CTA */}
      {config.cta.emergency && (
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-red-600 text-white p-4 z-50 shadow-lg">
          <a
            href={config.cta.emergency.buttonLink}
            className="flex items-center justify-center space-x-2"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <span className="font-medium">{config.cta.emergency.buttonText}</span>
          </a>
        </div>
      )}
    </>
  );
};

export default PageLayout; 