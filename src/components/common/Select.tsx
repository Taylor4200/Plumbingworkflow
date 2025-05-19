import { SelectHTMLAttributes, forwardRef } from 'react';

interface Option {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  label?: string;
  error?: string;
  helper?: string;
  options: Option[];
  fullWidth?: boolean;
  inputSize?: 'sm' | 'base' | 'lg';
  variant?: 'default' | 'outline' | 'filled';
  placeholder?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      error,
      helper,
      options,
      fullWidth = false,
      inputSize = 'base',
      variant = 'default',
      placeholder,
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
      'appearance-none bg-no-repeat bg-right',
      'pr-10', // Space for the custom arrow
      sizeStyles[inputSize],
      variantStyles[variant],
      error
        ? 'border-red-300 text-red-900 focus:border-red-500 focus:ring-red-500'
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
          <select
            ref={ref}
            className={baseStyles}
            disabled={disabled}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={
              error || helper ? `${props.id}-description` : undefined
            }
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option
                key={option.value}
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg
              className="h-4 w-4 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
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

Select.displayName = 'Select';

export default Select; 