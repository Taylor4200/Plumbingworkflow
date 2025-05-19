import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import siteConfig from '@/config/siteConfig';
import ServiceDetail from '@/components/services/ServiceDetail'; // We will create this component next

interface ServicePageProps {
  params: {
    serviceId: string;
  };
}

// Generate dynamic metadata for each service page
export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const service = siteConfig.services.find(
    (s) => s.id === params.serviceId
  );

  // If service not found, return basic metadata or redirect
  if (!service) {
    return {
      title: `${siteConfig.business.name} - Service Not Found`,
      description: 'The requested service was not found.',
    };
  }

  // Use service data and siteConfig for dynamic metadata
  const title = `${service.name} | ${siteConfig.business.name}`;
  const description = service.description; // Use service description
  const keywords = [
    ...siteConfig.seo.keywords,
    service.name.toLowerCase().replace(/\s+/g, '-'), // Add service name as keyword
  ];

  return {
    title,
    description,
    keywords,
    // Add Open Graph and Twitter meta tags if needed, potentially using service image
    // openGraph: {
    //   title,
    //   description,
    //   images: service.image ? [service.image] : undefined,
    // },
    // twitter: {
    //   card: 'summary_large_image',
    //   title,
    //   description,
    //   images: service.image ? [service.image] : undefined,
    // },
  };
}

// Dynamic Service Page Component
export default function ServicePage({ params }: ServicePageProps) {
  // Find the service data based on the serviceId from the URL
  const service = siteConfig.services.find(
    (s) => s.id === params.serviceId
  );

  // If service data is not found, render the notFound page
  if (!service) {
    notFound(); // Renders the closest not-found/page.tsx or 404.js
  }

  // Render the ServiceDetail component, passing the service data
  return (
    <>
      {/* PageLayout is already wrapping this content in the root layout */}
      <ServiceDetail service={service} />
    </>
  );
} 