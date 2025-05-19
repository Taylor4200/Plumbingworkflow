import Image from 'next/image';
import Link from 'next/link';
import { CTASection } from '@/config/siteConfig';

interface HeroSectionProps {
  title: string;
  subtitle: string;
  backgroundImage: string;
  cta: CTASection;
  emergencyCta?: CTASection;
  className?: string;
}

const HeroSection = ({
  title,
  subtitle,
  backgroundImage,
  cta,
  emergencyCta,
  className = '',
}: HeroSectionProps) => {
  return (
    <div className={`relative min-h-[600px] flex items-center ${className}`}>
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={backgroundImage}
          alt={title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-50" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <h1 className="text-4xl font-bold text-white sm:text-5xl md:text-6xl mb-6">
          {title}
        </h1>
        <p className="text-xl text-gray-200 max-w-3xl mx-auto mb-8">
          {subtitle}
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href={cta.buttonLink}
            className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
            style={{ backgroundColor: cta.backgroundColor }}
          >
            {cta.buttonText}
            <svg
              className="w-5 h-5 ml-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </Link>

          {emergencyCta && (
            <Link
              href={emergencyCta.buttonLink}
              className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700 md:py-4 md:text-lg md:px-10"
              style={{ backgroundColor: emergencyCta.backgroundColor }}
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
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              {emergencyCta.buttonText}
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Emergency CTA - Sticky */}
      {emergencyCta && (
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-red-600 text-white p-4 z-50 shadow-lg">
          <Link
            href={emergencyCta.buttonLink}
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
            <span className="font-medium">{emergencyCta.buttonText}</span>
          </Link>
        </div>
      )}
    </div>
  );
};

export default HeroSection; 