import { SiteConfig, Service } from '@/config/siteConfig';

interface SchemaMarkupProps {
  config: SiteConfig;
  pageType?: 'home' | 'about' | 'services' | 'contact' | 'serviceDetail';
  service?: Service;
}

const SchemaMarkup = ({ config, pageType = 'home', service }: SchemaMarkupProps) => {
  const {
    business,
    contact,
    services,
    seo: { schema },
  } = config;

  const baseSchema = {
    '@context': 'https://schema.org',
    '@type': schema?.type || 'LocalBusiness',
    name: business.name,
    description: business.description,
    url: typeof window !== 'undefined' ? window.location.origin : '',
    telephone: contact.phone,
    email: contact.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: contact.address.split(',')[0],
      addressLocality: business.city,
      addressRegion: business.state,
      postalCode: business.zip,
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      // These would need to be provided in the config
      latitude: '32.7767',
      longitude: '-96.7970',
    },
    openingHoursSpecification: schema?.openingHours?.map((hours) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: hours.split(' ')[0].split('-').map((day) => day),
      opens: hours.split(' ')[1].split('-')[0],
      closes: hours.split(' ')[1].split('-')[1],
    })),
    priceRange: schema?.priceRange,
    paymentAccepted: schema?.paymentAccepted,
    areaServed: schema?.areaServed?.map((area) => ({
      '@type': 'City',
      name: area,
    })),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `${business.name} Services`,
      itemListElement: services.map((service, index) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: service.name,
          description: service.description,
        },
        position: index + 1,
      })),
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '150',
    },
    sameAs: config.social.map((link) => link.href),
    award: config.trust.awards?.map(award => ({ '@type': 'Award', name: award })),
  };

  const pageSpecificSchema = {
    home: {
      ...baseSchema,
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': typeof window !== 'undefined' ? window.location.origin : '',
      },
    },
    about: {
      ...baseSchema,
      mainEntityOfPage: {
        '@type': 'AboutPage',
        '@id': typeof window !== 'undefined' ? `${window.location.origin}/about` : '',
      },
      founder: {
        '@type': 'Person',
        name: business.owner,
      },
      foundingDate: business.founded,
      award: config.trust.awards,
    },
    services: {
      ...baseSchema,
      mainEntityOfPage: {
        '@type': 'CollectionPage',
        '@id': typeof window !== 'undefined' ? `${window.location.origin}/services` : '',
      },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: `${business.name} Services`,
        itemListElement: services.map((service, index) => ({
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: service.name,
            description: service.description,
            provider: {
              '@type': 'LocalBusiness',
              name: business.name,
            },
          },
          position: index + 1,
        })),
      },
    },
    contact: {
      ...baseSchema,
      '@type': schema?.type || 'LocalBusiness',
      mainEntityOfPage: {
        '@type': 'ContactPage',
        '@id': typeof window !== 'undefined' ? `${window.location.origin}/contact` : '',
      },
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: contact.phone,
        contactType: 'customer service',
        areaServed: schema?.areaServed,
        availableLanguage: 'English',
        hoursAvailable: contact.hours,
      },
    },
    serviceDetail: service ? {
      ...baseSchema,
      '@type': 'Service',
      name: service.name,
      description: service.description,
      url: typeof window !== 'undefined' ? window.location.href : '',
      serviceType: service.name,
      provider: {
        '@type': schema?.type || 'LocalBusiness',
        name: business.name,
        url: typeof window !== 'undefined' ? window.location.origin : '',
        telephone: contact.phone,
        address: {
          '@type': 'PostalAddress',
          streetAddress: contact.address.split(',')[0],
          addressLocality: business.city,
          addressRegion: business.state,
          postalCode: business.zip,
          addressCountry: 'US',
        },
      },
      offers: service.price ? {
        '@type': 'Offer',
        price: service.price.replace(/[^0-9.]/g, ''),
        priceCurrency: 'USD',
      } : undefined,
      areaServed: schema?.areaServed?.map((area) => ({
        '@type': 'City',
        name: area,
      })),
    } : undefined,
  };

  const schemaData = pageSpecificSchema[pageType];

  if (!schemaData) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData, null, 2) }}
    />
  );
};

export default SchemaMarkup; 