import { Metadata } from 'next';
import ServiceCard from '@/components/services/ServiceCard';
import siteConfig from '@/config/siteConfig';

export const metadata: Metadata = {
  title: `Our Services | ${siteConfig.business.name}`,
  description: 'Professional plumbing services including emergency repairs, drain cleaning, leak detection, and more. Available 24/7 for all your plumbing needs.',
  keywords: siteConfig.seo.keywords.join(', '),
};

export default function ServicesPage() {
  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl mb-4">
            Our Professional Services
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We offer a comprehensive range of plumbing services to meet all your needs,
            from emergency repairs to routine maintenance. Our team of licensed professionals
            is available 24/7 to ensure your plumbing system runs smoothly.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {siteConfig.services.map((service) => (
            <div key={service.id} id={service.id}>
              <ServiceCard service={service} />
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-blue-600 rounded-lg shadow-xl overflow-hidden">
            <div className="px-6 py-12 sm:px-12">
              <h2 className="text-2xl font-bold text-white mb-4">
                Need Professional Plumbing Services?
              </h2>
              <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
                Our team of licensed plumbers is ready to help with any plumbing issue,
                big or small. Contact us today for a free quote or emergency service.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href={`tel:${siteConfig.contact.phone}`}
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  {siteConfig.contact.phone}
                </a>
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-700 hover:bg-blue-800"
                >
                  Get a Free Quote
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 