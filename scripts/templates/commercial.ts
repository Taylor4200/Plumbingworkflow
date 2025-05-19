import { SiteConfig } from '../../src/config/siteConfig';

export const commercialTemplate: Partial<SiteConfig> = {
  business: {
    name: 'Commercial Plumbing Solutions',
    slogan: 'Industrial-Grade Plumbing for Your Business',
    description: 'Specialized commercial plumbing services for businesses, industrial facilities, and multi-unit properties. We provide comprehensive plumbing solutions with minimal disruption to your operations.',
    industry: 'plumbing',
    logo: '/images/logo.svg',
    founded: '2005',
    owner: 'Michael Anderson',
    certifications: [
      'Commercial Master Plumber',
      'Backflow Prevention Certified',
      'Industrial Plumbing Specialist',
      'LEED Certified Professional'
    ],
    licenses: [
      'State License #54321',
      'City Business License #09876',
      'Industrial Plumbing Permit #45678'
    ],
    insurance: [
      '$5M General Liability',
      'Workers\' Compensation',
      'Commercial Auto',
      'Equipment Insurance'
    ],
    serviceArea: [
      'Commercial Districts',
      'Industrial Parks',
      'Business Centers',
      'Multi-Unit Properties'
    ],
    city: 'Metropolis',
    state: 'NY',
    zip: '10001',
    brandColors: {
      primary: '#1A365D',    // Deep blue
      secondary: '#2D3748',  // Dark gray
      accent: '#C53030'      // Strong red
    },
    hours: [
      'Mo-Fr 06:00-20:00',
      'Sa 07:00-18:00',
      'Su Emergency Only'
    ]
  },
  contact: {
    phone: '(555) 987-6543',
    email: 'commercial@plumbingsolutions.com',
    address: '456 Business Avenue, Metropolis, NY 10001',
    hours: 'Monday - Friday: 6:00 AM - 8:00 PM, Saturday: 7:00 AM - 6:00 PM, Sunday: Emergency Only',
    emergencyPhone: '(555) 888-7777',
    emergencyHours: '24/7 Emergency Service',
    whatsapp: '+15559876543',
    serviceArea: ['Metropolis', 'Downtown', 'Business District', 'Industrial Zone']
  },
  services: [
    {
      id: 'commercial-maintenance',
      name: 'Commercial Maintenance',
      description: 'Preventive maintenance programs for commercial properties to ensure uninterrupted operations.',
      icon: 'tools',
      features: [
        'Regular inspections',
        'Preventive maintenance',
        'Emergency response',
        'Maintenance scheduling'
      ]
    },
    {
      id: 'industrial-plumbing',
      name: 'Industrial Plumbing',
      description: 'Specialized plumbing services for industrial facilities and manufacturing plants.',
      icon: 'industry',
      features: [
        'Process piping',
        'Industrial fixtures',
        'Waste management systems',
        'Water treatment'
      ]
    },
    {
      id: 'commercial-renovation',
      name: 'Commercial Renovation',
      description: 'Complete plumbing solutions for commercial property renovations and upgrades.',
      icon: 'building',
      features: [
        'Tenant improvements',
        'Code compliance',
        'Energy efficiency upgrades',
        'ADA compliance'
      ]
    }
  ],
  testimonials: [
    {
      id: '1',
      name: 'Robert Chen',
      role: 'Facility Manager',
      content: 'Their team handled our industrial facility upgrade with minimal disruption. Professional and efficient service.',
      rating: 5,
      location: 'Metropolis Industrial Park'
    }
  ],
  social: [
    {
      name: 'LinkedIn',
      href: 'https://linkedin.com/company/commercialplumbing',
      icon: 'linkedin'
    },
    {
      name: 'Twitter',
      href: 'https://twitter.com/commercialplumb',
      icon: 'twitter'
    }
  ],
  seo: {
    title: 'Commercial Plumbing Solutions | Industrial & Commercial Plumbing Services in Metropolis',
    description: 'Professional commercial plumbing services for businesses, industrial facilities, and multi-unit properties. Available 24/7 for emergency services in Metropolis and surrounding areas.',
    keywords: [
      'commercial plumbing',
      'industrial plumbing',
      'business plumbing services',
      'commercial maintenance',
      'industrial facilities',
      'emergency plumbing',
      'Metropolis plumber'
    ],
    schema: {
      type: 'ServiceBusiness' as 'LocalBusiness' | 'ServiceBusiness',
      priceRange: '$$$',
      openingHours: [
        'Mo-Fr 06:00-20:00',
        'Sa 07:00-18:00',
        'Su Emergency Only'
      ],
      paymentAccepted: [
        'Cash',
        'Credit Card',
        'Check',
        'Wire Transfer',
        'Business Account'
      ],
      areaServed: [
        'Metropolis',
        'Downtown',
        'Business District',
        'Industrial Zone'
      ]
    }
  },
  cta: {
    primary: {
      title: 'Commercial Plumbing Experts',
      description: 'Trust our experienced team for all your commercial plumbing needs.',
      buttonText: 'Request Quote',
      buttonLink: '/contact',
      backgroundColor: '#1A365D'
    },
    emergency: {
      title: '24/7 Emergency Service',
      description: 'Minimize downtime with our rapid emergency response team.',
      buttonText: 'Call Now',
      buttonLink: 'tel:+15558887777',
      emergency: true,
      backgroundColor: '#C53030'
    }
  },
  trust: {
    certifications: [
      'Commercial Master Plumber',
      'Backflow Prevention Certified',
      'Industrial Plumbing Specialist',
      'LEED Certified Professional'
    ],
    awards: [
      'Best Commercial Plumber 2023',
      'Excellence in Industrial Services'
    ],
    memberships: [
      'American Society of Plumbing Engineers',
      'Building Owners and Managers Association',
      'International Facility Management Association'
    ],
    guarantees: [
      '100% Satisfaction Guarantee',
      '2-Year Workmanship Warranty',
      'Licensed & Insured',
      'Bonded for Large Projects'
    ]
  }
}; 