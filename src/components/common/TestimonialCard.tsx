import Image from 'next/image';
import { Testimonial } from '@/config/siteConfig';

interface TestimonialCardProps {
  testimonial: Testimonial;
  className?: string;
  variant?: 'default' | 'featured';
}

const TestimonialCard = ({
  testimonial,
  className = '',
  variant = 'default',
}: TestimonialCardProps) => {
  const isFeatured = variant === 'featured';

  return (
    <div
      className={`bg-white rounded-lg shadow-md p-6 ${
        isFeatured ? 'border-2 border-blue-500' : ''
      } ${className}`}
    >
      <div className="flex items-center mb-4">
        {testimonial.image ? (
          <div className="relative h-12 w-12 rounded-full overflow-hidden mr-4">
            <Image
              src={testimonial.image}
              alt={testimonial.name}
              fill
              className="object-cover"
            />
          </div>
        ) : (
          <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
            <span className="text-blue-600 text-xl font-semibold">
              {testimonial.name.charAt(0)}
            </span>
          </div>
        )}
        <div>
          <h4 className="text-lg font-semibold text-gray-900">
            {testimonial.name}
          </h4>
          {testimonial.location && (
            <p className="text-sm text-gray-600">{testimonial.location}</p>
          )}
        </div>
      </div>
      <div className="mb-4">
        <div className="flex text-yellow-400">
          {[...Array(5)].map((_, index) => (
            <svg
              key={index}
              className={`w-5 h-5 ${
                index < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
      </div>
      <blockquote className="text-gray-600 mb-4">
        "{testimonial.content}"
      </blockquote>
      {testimonial.date && (
        <p className="text-sm text-gray-500">{testimonial.date}</p>
      )}
    </div>
  );
};

export default TestimonialCard; 