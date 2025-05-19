import { FacebookIcon, TwitterIcon, InstagramIcon } from '@/components/icons/SocialIcons';

export interface Service {
  id: string;
  name: string;
  description: string;
  icon?: string;
  price?: string;
  features?: string[];
  image?: string;
  gallery?: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
  image?: string;
  location?: string;
  date?: string;
}

export interface ContactInfo {
  phone: string;
  email: string;
  address: string;
  hours: string;
  emergencyPhone?: string;
  emergencyHours?: string;
  whatsapp?: string;
  serviceArea: string[];
}

export interface SocialLink {
  name: string;
  href: string;
  icon: string;
}

export interface BusinessInfo {
  name: string;
  slogan: string;
  description: string;
  industry: string;
  logo: string;
  founded?: string;
  owner?: string;
  certifications: string[];
  licenses: string[];
  insurance: string[];
  serviceArea: string[];
  city: string;
  state: string;
  zip: string;
  brandColors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  hours: string[];
}

export interface SEOConfig {
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
  twitterHandle?: string;
  schema?: {
    type: 'LocalBusiness' | 'ServiceBusiness';
    priceRange?: string;
    openingHours?: string[];
    paymentAccepted?: string[];
    areaServed?: string[];
  };
}

export interface CTASection {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  emergency?: boolean;
  backgroundColor?: string;
}

export interface SiteConfig {
  business: BusinessInfo;
  contact: ContactInfo;
  services: Service[];
  testimonials: Testimonial[];
  social: SocialLink[];
  seo: SEOConfig;
  cta: {
    primary: CTASection;
    emergency?: CTASection;
    quote?: CTASection;
  };
  trust: {
    certifications: string[];
    awards: string[];
    memberships: string[];
    guarantees: string[];
  };
  images: {
    hero: string;
    about: string;
    services: string[];
    team?: string[];
    gallery?: string[];
  };
}

const siteConfig: SiteConfig = {
  business: {
    name: "Golden Heavy Plumbing",
    slogan: "Reliable Plumbing Services, Golden Results",
    description: "Expert plumbing solutions for homes and businesses in the greater metropolitan area. Specializing in complex repairs and installations.",
    industry: "plumbing",
    logo: "/images/golden-logo.svg",
    founded: "1998",
    owner: "Maria Rodriguez",
    certifications: [
      "Certified Master Plumber",
      "Advanced Pipefitting Certification",
      "Commercial Plumbing Specialist"
    ],
    licenses: [
      "State Plumbing License #67890",
      "County Business Permit #54321"
    ],
    insurance: [
      "$3M General Liability",
      "Workers' Compensation",
    ],
    serviceArea: ["Metro City", "Suburbia East", "Industrial Park"],
    city: "Metro City",
    state: "CA",
    zip: "90210",
    brandColors: {
      primary: "#DAA520",
      secondary: "#1E3A8A",
      accent: "#FFFFFF"
    },
    hours: ["Mo-Fr 08:00-17:00", "Sa 08:00-12:00"]
  },
  contact: {
    phone: "(888) 777-6666",
    email: "info@goldenheavyplumbing.com",
    address: "456 Oak Avenue, Metro City, CA 90210",
    hours: "Mon-Fri 8 AM - 5 PM, Sat 8 AM - 12 PM",
    emergencyPhone: "(888) 555-1212",
    emergencyHours: "24/7 Emergency Service",
    whatsapp: "+18887776666",
    serviceArea: ["Metro City", "Suburbia East", "Industrial Park"]
  },
  services: [
    {
      id: "pipe-installation",
      name: "Pipe Installation & Repair",
      description: "Specializing in heavy-duty pipe installation and complex repair jobs for commercial and industrial clients.",
      icon: "pipe",
      image: "/images/service-pipe.jpg",
      features: ["New pipe laying", "Old pipe replacement", "Leak repair"],
    },
    {
      id: "drain-sewer",
      name: "Drain & Sewer Services",
      description: "Comprehensive cleaning, inspection, and repair for drains and sewer lines.",
      icon: "droplet",
      image: "/images/service-drain.jpg",
      features: ["Hydro jetting", "Video inspection", "Trenchless repair"],
    },
    {
      id: "commercial-plumbing",
      name: "Commercial Plumbing",
      description: "Full-service plumbing maintenance and repair for commercial buildings.",
      icon: "wrench",
      image: "/images/service-commercial.jpg",
      features: ["Backflow testing", "Grease trap service", "Industrial pumps"],
    },
    {
      id: "emergency-plumbing",
      name: "Emergency Plumbing",
      description: "24/7 rapid response for plumbing emergencies.",
      icon: "fire",
      image: "/images/service-emergency.jpg",
      features: ["Burst pipes", "Severe clogs", "Flooding"],
    },
  ],
  testimonials: [
    {
      id: "ghp-1",
      name: "Robert L.",
      role: "Factory Manager",
      content: "Golden Heavy Plumbing handled our complex industrial pipe replacement flawlessly. Professional and efficient.",
      rating: 5,
      location: "Industrial Park",
    },
    {
      id: "ghp-2",
      name: "Samantha P.",
      role: "Restaurant Owner",
      content: "Their drain cleaning service is top-notch. Quick response and solved the issue right away.",
      rating: 5,
      location: "Metro City",
    },
  ],
  social: [
    {
      name: "Facebook",
      href: "https://facebook.com/goldenheavyplumbing",
      icon: "facebook",
    },
    {
      name: "Twitter",
      href: "https://twitter.com/goldenheavy",
      icon: "twitter",
    },
  ],
  seo: {
    title: "Golden Heavy Plumbing | Commercial & Industrial Plumbing",
    description: "Expert plumbing services for commercial and industrial clients. Specializing in heavy-duty repairs and installations in Metro City and surrounding areas.",
    keywords: [
      "commercial plumbing metro city",
      "industrial plumbing metro city",
      "pipe repair metro city",
      "drain cleaning metro city",
      "24/7 plumber metro city"
    ],
    ogImage: "/images/golden-og.jpg",
    twitterHandle: "@goldenheavy",
    schema: {
      type: "ServiceBusiness",
      priceRange: "$$$",
      openingHours: ["Mo-Fr 08:00-17:00", "Sa 08:00-12:00"],
      paymentAccepted: ["Cash", "Check", "Bank Transfer"],
      areaServed: ["Metro City", "Suburbia East", "Industrial Park"]
    }
  },
  cta: {
    primary: {
      title: "Need Heavy-Duty Plumbing?",
      description: "Our experts handle the toughest jobs. Get a consultation today.",
      buttonText: "Request Consultation",
      buttonLink: "/contact",
      backgroundColor: "#1E3A8A"
    },
    emergency: {
      title: "24/7 Industrial Emergency Service",
      description: "Critical plumbing failure? Call our emergency line now.",
      buttonText: "Call Emergency",
      buttonLink: "tel:+18885551212",
      emergency: true,
      backgroundColor: "#DC3545"
    },
    quote: {
      title: "Get a Quote for Your Project",
      description: "Transparent pricing for all commercial and industrial services.",
      buttonText: "Get Quote",
      buttonLink: "/contact?type=quote",
      backgroundColor: "#DAA520"
    }
  },
  trust: {
    certifications: [
      "Certified Master Plumber (MRP123)",
      "Advanced Welder Certification",
    ],
    awards: [
      "Best Commercial Plumber - 2022",
      "Safety Excellence Award - 2023"
    ],
    memberships: [
      "Associated Plumbing Contractors",
      "Industrial Services Association"
    ],
    guarantees: [
      "Workmanship Guarantee",
      "On-Time Service Promise",
      "Licensed & Insured"
    ]
  },
  images: {
    hero: "/images/golden-hero.jpg",
    about: "/images/golden-about.jpg",
    services: [
      "/images/service-pipe.jpg",
      "/images/service-drain.jpg",
      "/images/service-commercial.jpg",
      "/images/service-emergency.jpg",
    ],
    team: [
      "/images/team-maria.jpg",
    ],
    gallery: [
      "/images/gallery-commercial-1.jpg",
      "/images/gallery-industrial-2.jpg",
      "/images/gallery-pipe-job.jpg",
    ]
  }
};

export default siteConfig; 