import Image from 'next/image';
import { Service } from '@/config/siteConfig'; // Import Service interface
import Section from '@/components/common/Section';
import Container from '@/components/common/Container';
import Heading from '@/components/common/Heading';
import Grid from '@/components/common/Grid';

interface ServiceDetailProps {
  service: Service; // Expect a single Service object
}

const ServiceDetail = ({ service }: ServiceDetailProps) => {
  return (
    <Section background="gray">
      <Container>
        {/* Service Title and Description */}
        <Heading as="h1" size="3xl" weight="bold" centered={true} className="mb-8">
          {service.name}
        </Heading>
        <p className="text-lg text-gray-700 text-center max-w-3xl mx-auto mb-12">
          {service.description}
        </p>

        {/* Service Image */}
        {service.image && (
          <div className="relative w-full h-96 rounded-lg overflow-hidden mb-12 shadow-md">
            <Image
              src={service.image}
              alt={service.name}
              fill
              className="object-cover"
              priority // Prioritize loading for the main service image
            />
          </div>
        )}

        {/* Service Details (Features, Price, etc.) */}
        <Grid cols={1} responsive={{ md: 2 }} gap="large">
          {/* Features List */}
          {service.features && service.features.length > 0 && (
            <div>
              <Heading as="h2" size="xl" weight="semibold" className="mb-6">
                What Our Service Includes:
              </Heading>
              <ul className="space-y-4 text-gray-700">
                {service.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <svg
                      className="h-6 w-6 text-blue-600 mr-2 flex-shrink-0 mt-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Pricing or Additional Info */}
          {(service.price || service.icon) && (
            <div>
               <Heading as="h2" size="xl" weight="semibold" className="mb-6">
                Quick Details:
              </Heading>
              <div className="space-y-4">
                 {service.icon && (
                    <div className="flex items-center text-gray-700">
                        <svg
                            className="h-6 w-6 text-blue-600 mr-2 flex-shrink-0"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            {/* You'll need to implement logic here to map the string icon name to an SVG path */}
                            {/* For simplicity, using a placeholder icon */}
                             <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                        </svg>
                        <span>Type: {service.icon}</span> {/* Displaying icon name for now */}
                    </div>
                 )}
                {service.price && (
                  <div className="flex items-center text-gray-700">
                     <svg className="h-6 w-6 text-green-600 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.11 0-2 .9-2 2s.89 2 2 2 2-.9 2-2-.89-2-2-2zM10 14h4v-1H10v1zm9-7h-4V5h4v2zm-6 0h-4V5h4v2zm-6 0H3V5h4v2zm0 7H3v-4h4v4zm6 0h-4v-4h4v4zm6 0h-4v-4h4v4z" />
                     </svg>
                    <span>Starting Price: {service.price}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </Grid>

        {/* Add more sections as needed, e.g., a CTA section, testimonials, etc. */}
        {/* You can reuse CTA components here */}
        {/* <div className="mt-12">
          <CTAButton cta={siteConfig.cta.primary} />
        </div> */}

      </Container>
    </Section>
  );
};

export default ServiceDetail; 