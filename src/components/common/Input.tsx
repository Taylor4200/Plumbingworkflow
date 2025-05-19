import { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helper?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  inputSize?: 'sm' | 'base' | 'lg';
  variant?: 'default' | 'outline' | 'filled';
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helper,
      icon,
      iconPosition = 'left',
      fullWidth = false,
      inputSize = 'base',
      variant = 'default',
      className = '',
      disabled,
      ...props
    },
    ref
  ) => {
    const sizeStyles = {
      sm: 'text-sm px-3 py-1.5',
      base: 'text-base px-4 py-2',
      lg: 'text-lg px-5 py-2.5',
    };

    const variantStyles = {
      default:
        'bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500',
      outline:
        'bg-transparent border-2 border-gray-300 focus:border-blue-500 focus:ring-blue-500',
      filled: 'bg-gray-50 border-gray-300 focus:border-blue-500 focus:ring-blue-500',
    };

    const baseStyles = [
      'block w-full rounded-md shadow-sm transition-colors duration-200',
      'focus:outline-none focus:ring-2 focus:ring-offset-2',
      sizeStyles[inputSize],
      variantStyles[variant],
      error
        ? 'border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500'
        : '',
      disabled
        ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
        : 'text-gray-900',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const labelStyles = [
      'block text-sm font-medium text-gray-700 mb-1',
      error ? 'text-red-600' : '',
      disabled ? 'text-gray-500' : '',
    ]
      .filter(Boolean)
      .join(' ');

    const helperStyles = [
      'mt-1 text-sm',
      error ? 'text-red-600' : 'text-gray-500',
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div className={fullWidth ? 'w-full' : ''}>
        {label && (
          <label htmlFor={props.id} className={labelStyles}>
            {label}
          </label>
        )}
        <div className="relative">
          {icon && iconPosition === 'left' && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <div className="text-gray-400">{icon}</div>
            </div>
          )}
          <input
            ref={ref}
            className={`${baseStyles} ${
              icon && iconPosition === 'left' ? 'pl-10' : ''
            } ${icon && iconPosition === 'right' ? 'pr-10' : ''}`}
            disabled={disabled}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={
              error || helper ? `${props.id}-description` : undefined
            }
            {...props}
          />
          {icon && iconPosition === 'right' && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <div className="text-gray-400">{icon}</div>
            </div>
          )}
        </div>
        {(error || helper) && (
          <p className={helperStyles} id={`${props.id}-description`}>
            {error || helper}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input; 