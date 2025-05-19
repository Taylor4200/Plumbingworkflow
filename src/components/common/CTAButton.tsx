import Link from 'next/link';
import { CTASection } from '@/config/siteConfig';

interface CTAButtonProps {
  cta: CTASection;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary' | 'emergency';
  fullWidth?: boolean;
  icon?: React.ReactNode;
}

const CTAButton = ({
  cta,
  className = '',
  size = 'md',
  variant = 'primary',
  fullWidth = false,
  icon,
}: CTAButtonProps) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200';
  
  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const variantStyles = {
    primary: 'text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'text-blue-600 bg-white border border-blue-600 hover:bg-blue-50 focus:ring-blue-500',
    emergency: 'text-white bg-red-600 hover:bg-red-700 focus:ring-red-500',
  };

  const widthStyles = fullWidth ? 'w-full' : '';

  const buttonStyles = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${widthStyles} ${className}`;

  const isExternalLink = cta.buttonLink.startsWith('http') || cta.buttonLink.startsWith('tel:') || cta.buttonLink.startsWith('mailto:');

  const buttonContent = (
    <>
      {icon && <span className="mr-2">{icon}</span>}
      {cta.buttonText}
      {!isExternalLink && (
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
      )}
    </>
  );

  if (isExternalLink) {
    return (
      <a
        href={cta.buttonLink}
        className={buttonStyles}
        style={{ backgroundColor: variant === 'primary' ? cta.backgroundColor : undefined }}
      >
        {buttonContent}
      </a>
    );
  }

  return (
    <Link
      href={cta.buttonLink}
      className={buttonStyles}
      style={{ backgroundColor: variant === 'primary' ? cta.backgroundColor : undefined }}
    >
      {buttonContent}
    </Link>
  );
};

export default CTAButton; 