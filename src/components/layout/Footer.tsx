'use client';

import Link from 'next/link';
import Image from 'next/image';
import { SiteConfig } from '@/config/siteConfig';
import CTAButton from '../common/CTAButton';
import { FacebookIcon, TwitterIcon, InstagramIcon } from '@/components/icons/SocialIcons';

interface FooterProps {
  config: SiteConfig;
  className?: string;
}

const Footer = ({ config, className = '' }: FooterProps) => {
  const navigation = {
    main: [
      { name: 'Home', href: '/' },
      { name: 'Services', href: '/services' },
      { name: 'About', href: '/about' },
      { name: 'Contact', href: '/contact' },
    ],
    services: config.services.map((service) => ({
      name: service.name,
      href: `/services#${service.id}`,
    })),
  };

  const iconMap: { [key: string]: React.ComponentType<{ className?: string; 'aria-hidden'?: boolean }> } = {
    facebook: FacebookIcon,
    twitter: TwitterIcon,
    instagram: InstagramIcon,
    // Add other icons here as needed
  };

  return (
    <footer className={`bg-gray-900 ${className}`} aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            <Image
              src={config.business.logo}
              alt={config.business.name}
              width={48}
              height={48}
              className="h-12 w-auto"
            />
            <p className="text-gray-300 text-base">
              {config.business.description}
            </p>
            <div className="flex space-x-6">
              {config.social.map((item) => {
                const IconComponent = iconMap[item.icon];
                if (!IconComponent) return null; // Handle cases where icon name is not found
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-gray-400 hover:text-gray-300"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="sr-only">{item.name}</span>
                    <IconComponent className="h-6 w-6" aria-hidden={true} />
                  </a>
                );
              })}
            </div>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                  Navigation
                </h3>
                <ul className="mt-4 space-y-4">
                  {navigation.main.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-base text-gray-300 hover:text-white"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                  Services
                </h3>
                <ul className="mt-4 space-y-4">
                  {navigation.services.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-base text-gray-300 hover:text-white"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                  Contact
                </h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <a
                      href={`tel:${config.contact.phone}`}
                      className="text-base text-gray-300 hover:text-white"
                    >
                      {config.contact.phone}
                    </a>
                  </li>
                  {config.contact.emergencyPhone && (
                    <li>
                      <a
                        href={`tel:${config.contact.emergencyPhone}`}
                        className="text-base text-red-400 hover:text-red-300"
                      >
                        Emergency: {config.contact.emergencyPhone}
                      </a>
                    </li>
                  )}
                  <li>
                    <a
                      href={`mailto:${config.contact.email}`}
                      className="text-base text-gray-300 hover:text-white"
                    >
                      {config.contact.email}
                    </a>
                  </li>
                  <li className="text-base text-gray-300">
                    {config.contact.address}
                  </li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                  Business Hours
                </h3>
                <ul className="mt-4 space-y-4">
                  {config.business.hours.map((hours, index) => (
                    <li key={index} className="text-base text-gray-300">
                      {hours}
                    </li>
                  ))}
                </ul>
                {config.cta.emergency && (
                  <div className="mt-6">
                    <CTAButton
                      cta={config.cta.emergency}
                      variant="emergency"
                      size="sm"
                      icon={
                        <svg
                          className="w-5 h-5"
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
                      }
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-700 pt-8">
          <p className="text-base text-gray-400 xl:text-center">
            &copy; {new Date().getFullYear()} {config.business.name}. All rights
            reserved.
          </p>
          {config.business.licenses && (
            <p className="mt-2 text-sm text-gray-400 xl:text-center">
              License #{config.business.licenses}
            </p>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer; 