import { ReactNode } from 'react';

interface HeadingProps {
  children: ReactNode;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  color?: 'default' | 'primary' | 'secondary' | 'white';
  align?: 'left' | 'center' | 'right';
  subtitle?: ReactNode;
  subtitleSize?: 'xs' | 'sm' | 'base' | 'lg';
  subtitleColor?: 'default' | 'primary' | 'secondary' | 'white';
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  centered?: boolean;
}

const Heading = ({
  children,
  className = '',
  as: Component = 'h2',
  size = '2xl',
  weight = 'bold',
  color = 'default',
  align = 'left',
  subtitle,
  subtitleSize = 'lg',
  subtitleColor = 'secondary',
  maxWidth = '2xl',
  centered = false,
}: HeadingProps) => {
  const sizeStyles = {
    xs: 'text-xs',
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl md:text-3xl',
    '3xl': 'text-3xl md:text-4xl',
    '4xl': 'text-4xl md:text-5xl',
    '5xl': 'text-5xl md:text-6xl',
  };

  const weightStyles = {
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
  };

  const colorStyles = {
    default: 'text-gray-900',
    primary: 'text-blue-600',
    secondary: 'text-gray-600',
    white: 'text-white',
  };

  const alignStyles = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  const subtitleSizeStyles = {
    xs: 'text-xs',
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg',
  };

  const subtitleColorStyles = {
    default: 'text-gray-600',
    primary: 'text-blue-600',
    secondary: 'text-gray-500',
    white: 'text-gray-200',
  };

  const maxWidthStyles = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    full: 'max-w-full',
  };

  return (
    <div
      className={`${alignStyles[align]} ${
        centered ? 'mx-auto' : ''
      } ${maxWidthStyles[maxWidth]} ${className}`}
    >
      <Component
        className={`${sizeStyles[size]} ${weightStyles[weight]} ${colorStyles[color]} mb-4`}
      >
        {children}
      </Component>
      {subtitle && (
        <p
          className={`${subtitleSizeStyles[subtitleSize]} ${subtitleColorStyles[subtitleColor]}`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default Heading; 