import { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
  className?: string;
  as?: 'div' | 'section' | 'article' | 'main';
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '7xl' | 'full';
  padding?: 'none' | 'small' | 'medium' | 'large';
  centered?: boolean;
  fluid?: boolean;
}

const Container = ({
  children,
  className = '',
  as: Component = 'div',
  size = '7xl',
  padding = 'medium',
  centered = true,
  fluid = false,
}: ContainerProps) => {
  const sizeStyles = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '7xl': 'max-w-7xl',
    full: 'max-w-full',
  };

  const paddingStyles = {
    none: '',
    small: 'px-4 sm:px-6',
    medium: 'px-4 sm:px-6 lg:px-8',
    large: 'px-4 sm:px-6 lg:px-8 xl:px-12',
  };

  const containerClasses = [
    !fluid && sizeStyles[size],
    paddingStyles[padding],
    centered && !fluid ? 'mx-auto' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return <Component className={containerClasses}>{children}</Component>;
};

export default Container; 