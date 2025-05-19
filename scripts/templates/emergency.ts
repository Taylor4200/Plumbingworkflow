import { SiteConfig } from '../../src/config/siteConfig';

export const emergencyTemplate: Partial<SiteConfig> = {
  business: {
    name: '24/7 Emergency Plumbing',
    slogan: 'When You Need a Plumber, We\'re Already on the Way',
    description: 'Round-the-clock emergency plumbing services for residential and commercial properties. Our rapid response team is available 24/7 to handle any plumbing emergency.',
    industry: 'plumbing',
    logo: '/images/logo.svg',
    founded: '2015',
    owner: 'David Martinez',
    certifications: [
      'Emergency Response Certified',
      'Master Plumber',
      'Water Damage Restoration',
      'Gas Leak Detection Specialist'
    ],
    licenses: [
      'State License #78901',
      'City Business License #23456',
      'Emergency Services Permit #34567'
    ],
    insurance: [
      '$2M General Liability',
      'Workers\' Compensation',
      'Commercial Auto',
      'Emergency Response Coverage'
    ],
    serviceArea: [
      'Emergency Response Zone',
      'Metropolitan Area',
      'Surrounding Counties',
      '24/7 Coverage Area'
    ],
    city: 'Emergency City',
    state: 'TX',
    zip: '75001',
    brandColors: {
      primary: '#B91C1C',    // Emergency red
      secondary: '#1F2937',  // Dark gray
      accent: '#F59E0B'      // Warning yellow
    },
    hours: [
      '24/7 Emergency Service'
    ]
  },
  contact: {
    phone: '(555) 111-2222',
    email: 'emergency@247plumbing.com',
    address: '789 Emergency Lane, Emergency City, TX 75001',
    hours: '24/7 Emergency Service',
    emergencyPhone: '(555) 111-2222',
    emergencyHours: '24/7 Emergency Service',
    whatsapp: '+15551112222',
    serviceArea: ['Emergency City', 'Metropolitan Area', 'Surrounding Counties']
  },
  services: [
    {
      id: 'emergency-response',
      name: 'Emergency Response',
      description: 'Immediate response to plumbing emergencies with our 24/7 emergency team.',
      icon: 'clock',
      features: [
        '15-minute response time',
        '24/7 availability',
        'Emergency dispatch',
        'Rapid assessment'
      ]
    },
    {
      id: 'water-damage',
      name: 'Water Damage Control',
      description: 'Emergency water damage control and restoration services.',
      icon: 'water',
      features: [
        'Water extraction',
        'Damage assessment',
        'Mold prevention',
        'Restoration services'
      ]
    },
    {
      id: 'gas-leaks',
      name: 'Gas Leak Emergency',
      description: 'Emergency gas leak detection and repair services.',
      icon: 'fire',
      features: [
        'Gas leak detection',
        'Emergency shut-off',
        'Safety inspection',
        'Repair services'
      ]
    }
  ],
  testimonials: [
    {
      id: '1',
      name: 'Lisa Thompson',
      role: 'Homeowner',
      content: 'They arrived within 15 minutes of my call and fixed our burst pipe. Amazing emergency service!',
      rating: 5,
      location: 'Emergency City'
    }
  ],
  social: [
    {
      name: 'Facebook',
      href: 'https://facebook.com/247emergencyplumbing',
      icon: 'facebook'
    },
    {
      name: 'Twitter',
      href: 'https://twitter.com/247emergencyplumb',
      icon: 'twitter'
    }
  ],
  seo: {
    title: '24/7 Emergency Plumbing | Immediate Response Plumbing Services in Emergency City',
    description: '24/7 emergency plumbing services with rapid response times. Available round-the-clock for all plumbing emergencies in Emergency City and surrounding areas.',
    keywords: [
      'emergency plumbing',
      '24/7 plumber',
      'emergency response',
      'water damage',
      'gas leak',
      'burst pipe',
      'Emergency City plumber'
    ],
    schema: {
      type: 'LocalBusiness',
      priceRange: '$$',
      openingHours: [
        '24/7 Emergency Service'
      ],
      paymentAccepted: [
        'Cash',
        'Credit Card',
        'Check',
        'Emergency Insurance'
      ],
      areaServed: [
        'Emergency City',
        'Metropolitan Area',
        'Surrounding Counties'
      ]
    }
  },
  cta: {
    primary: {
      title: '24/7 Emergency Plumbing',
      description: 'Don\'t wait! Our emergency team is ready to respond.',
      buttonText: 'Call Now',
      buttonLink: 'tel:+15551112222',
      backgroundColor: '#B91C1C'
    },
    emergency: {
      title: 'Emergency Response',
      description: '15-minute response time guaranteed!',
      buttonText: 'Emergency Call',
      buttonLink: 'tel:+15551112222',
      emergency: true,
      backgroundColor: '#B91C1C'
    }
  },
  trust: {
    certifications: [
      'Emergency Response Certified',
      'Master Plumber',
      'Water Damage Restoration',
      'Gas Leak Detection Specialist'
    ],
    awards: [
      'Best Emergency Response 2023',
      'Customer Service Excellence'
    ],
    memberships: [
      'Emergency Services Association',
      'Plumbing-Heating-Cooling Contractors Association',
      'Better Business Bureau'
    ],
    guarantees: [
      '15-Minute Response Time',
      '24/7 Availability',
      'Licensed & Insured',
      'Satisfaction Guaranteed'
    ]
  }
}; 