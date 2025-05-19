import { ReactNode } from 'react';

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  background?: 'white' | 'gray' | 'blue' | 'image';
  backgroundImage?: string;
  overlay?: boolean;
  fullWidth?: boolean;
  padding?: 'none' | 'small' | 'medium' | 'large';
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '7xl' | 'full';
  centered?: boolean;
}

const Section = ({
  children,
  className = '',
  id,
  background = 'white',
  backgroundImage,
  overlay = false,
  fullWidth = false,
  padding = 'medium',
  maxWidth = '7xl',
  centered = true,
}: SectionProps) => {
  const backgroundStyles = {
    white: 'bg-white',
    gray: 'bg-gray-50',
    blue: 'bg-blue-50',
    image: backgroundImage ? 'bg-cover bg-center bg-no-repeat' : 'bg-white',
  };

  const paddingStyles = {
    none: '',
    small: 'py-8',
    medium: 'py-12 md:py-16',
    large: 'py-16 md:py-24',
  };

  const maxWidthStyles = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '7xl': 'max-w-7xl',
    full: 'max-w-full',
  };

  return (
    <section
      id={id}
      className={`relative ${backgroundStyles[background]} ${className}`}
      style={
        background === 'image' && backgroundImage
          ? { backgroundImage: `url(${backgroundImage})` }
          : undefined
      }
    >
      {overlay && (
        <div className="absolute inset-0 bg-black bg-opacity-50" aria-hidden="true" />
      )}
      <div
        className={`relative ${
          fullWidth ? '' : 'px-4 sm:px-6 lg:px-8'
        } ${paddingStyles[padding]}`}
      >
        <div
          className={`${
            centered ? 'mx-auto' : ''
          } ${maxWidthStyles[maxWidth]}`}
        >
          {children}
        </div>
      </div>
    </section>
  );
};

export default Section; 