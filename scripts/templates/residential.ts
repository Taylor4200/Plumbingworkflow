import { SiteConfig } from '../../src/config/siteConfig';

export const residentialTemplate: Partial<SiteConfig> = {
  business: {
    name: 'Family Plumbing & Drain',
    slogan: 'Your Trusted Home Plumbing Partner',
    description: 'Professional residential plumbing services with a focus on customer satisfaction and quality workmanship. Available for routine maintenance, repairs, and emergency services.',
    industry: 'plumbing',
    logo: '/images/logo.svg',
    founded: '2010',
    owner: 'John Smith',
    certifications: [
      'Licensed Master Plumber',
      'Backflow Prevention Certified',
      'Green Plumbing Certified'
    ],
    licenses: [
      'State License #12345',
      'City Business License #67890'
    ],
    insurance: [
      '$1M General Liability',
      'Workers\' Compensation',
      'Commercial Auto'
    ],
    serviceArea: [
      'Residential Neighborhoods',
      'Suburban Communities',
      'Single-Family Homes'
    ],
    city: 'Suburbia',
    state: 'CA',
    zip: '90210',
    brandColors: {
      primary: '#2B6CB0',    // Trustworthy blue
      secondary: '#4A5568',  // Professional gray
      accent: '#48BB78'      // Fresh green
    },
    hours: [
      'Mo-Fr 07:00-19:00',
      'Sa 08:00-17:00',
      'Su 09:00-15:00'
    ]
  },
  contact: {
    phone: '(555) 123-4567',
    email: 'service@familyplumbing.com',
    address: '123 Home Street, Suburbia, CA 90210',
    hours: 'Monday - Friday: 7:00 AM - 7:00 PM, Saturday: 8:00 AM - 5:00 PM, Sunday: 9:00 AM - 3:00 PM',
    emergencyPhone: '(555) 999-8888',
    emergencyHours: '24/7 Emergency Service',
    whatsapp: '+15551234567',
    serviceArea: ['Suburbia', 'Neighboring Towns', 'Surrounding Communities']
  },
  services: [
    {
      id: 'drain-cleaning',
      name: 'Drain Cleaning',
      description: 'Professional drain cleaning services to remove clogs and prevent future blockages.',
      icon: 'faucet',
      features: [
        'Hydro jetting',
        'Video inspection',
        'Preventive maintenance'
      ]
    },
    {
      id: 'water-heaters',
      name: 'Water Heater Services',
      description: 'Installation, repair, and maintenance of all types of water heaters.',
      icon: 'fire',
      features: [
        'Tankless water heaters',
        'Traditional water heaters',
        'Energy-efficient options'
      ]
    },
    {
      id: 'bathroom-remodeling',
      name: 'Bathroom Remodeling',
      description: 'Complete bathroom renovation and remodeling services.',
      icon: 'bath',
      features: [
        'Custom designs',
        'Modern fixtures',
        'Accessibility upgrades'
      ]
    }
  ],
  testimonials: [
    {
      id: '1',
      name: 'Sarah Johnson',
      role: 'Homeowner',
      content: 'Excellent service! They arrived quickly and fixed our emergency leak professionally. Highly recommended!',
      rating: 5,
      location: 'Suburbia'
    }
  ],
  social: [
    {
      name: 'Facebook',
      href: 'https://facebook.com/familyplumbing',
      icon: 'facebook'
    },
    {
      name: 'Instagram',
      href: 'https://instagram.com/familyplumbing',
      icon: 'instagram'
    }
  ],
  seo: {
    title: 'Family Plumbing & Drain | Residential Plumbing Services in Suburbia',
    description: 'Professional residential plumbing services including drain cleaning, water heater repair, and bathroom remodeling. Available 24/7 for emergency services in Suburbia and surrounding areas.',
    keywords: [
      'residential plumbing',
      'home plumbing services',
      'drain cleaning',
      'water heater repair',
      'bathroom remodeling',
      'emergency plumbing',
      'Suburbia plumber'
    ],
    schema: {
      type: 'LocalBusiness' as 'LocalBusiness' | 'ServiceBusiness',
      priceRange: '$$',
      openingHours: [
        'Mo-Fr 07:00-19:00',
        'Sa 08:00-17:00',
        'Su 09:00-15:00'
      ],
      paymentAccepted: [
        'Cash',
        'Credit Card',
        'Check'
      ],
      areaServed: [
        'Suburbia',
        'Neighboring Towns',
        'Surrounding Communities'
      ]
    }
  },
  cta: {
    primary: {
      title: 'Need a Reliable Plumber?',
      description: 'Our family-owned business is ready to help with all your home plumbing needs.',
      buttonText: 'Schedule Service',
      buttonLink: '/contact',
      backgroundColor: '#2B6CB0'
    },
    emergency: {
      title: '24/7 Emergency Plumbing',
      description: 'Don\'t wait! Our emergency team is available around the clock.',
      buttonText: 'Call Now',
      buttonLink: 'tel:+15559998888',
      emergency: true,
      backgroundColor: '#E53E3E'
    }
  },
  trust: {
    certifications: [
      'Licensed Master Plumber',
      'Backflow Prevention Certified',
      'Green Plumbing Certified'
    ],
    awards: [
      'Best of Suburbia 2023',
      'Angie\'s List Super Service Award'
    ],
    memberships: [
      'Plumbing-Heating-Cooling Contractors Association',
      'Better Business Bureau'
    ],
    guarantees: [
      '100% Satisfaction Guarantee',
      '1-Year Workmanship Warranty',
      'Licensed & Insured'
    ]
  }
}; 