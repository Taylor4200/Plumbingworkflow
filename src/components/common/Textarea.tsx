import { TextareaHTMLAttributes, forwardRef } from 'react';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helper?: string;
  fullWidth?: boolean;
  inputSize?: 'sm' | 'base' | 'lg';
  variant?: 'default' | 'outline' | 'filled';
  rows?: number;
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      error,
      helper,
      fullWidth = false,
      inputSize = 'base',
      variant = 'default',
      rows = 4,
      resize = 'vertical',
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

    const resizeStyles = {
      none: 'resize-none',
      vertical: 'resize-y',
      horizontal: 'resize-x',
      both: 'resize',
    };

    const baseStyles = [
      'block w-full rounded-md shadow-sm transition-colors duration-200',
      'focus:outline-none focus:ring-2 focus:ring-offset-2',
      sizeStyles[inputSize],
      variantStyles[variant],
      resizeStyles[resize],
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
        <textarea
          ref={ref}
          rows={rows}
          className={baseStyles}
          disabled={disabled}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={
            error || helper ? `${props.id}-description` : undefined
          }
          {...props}
        />
        {(error || helper) && (
          <p className={helperStyles} id={`${props.id}-description`}>
            {error || helper}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

export default Textarea; 