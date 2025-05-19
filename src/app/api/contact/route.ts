import { NextResponse } from 'next/server';
import { ContactFormData } from '@/components/common/ContactForm';

export async function POST(request: Request) {
  try {
    const formData: ContactFormData = await request.json();

    // Server-side validation
    if (!formData.name || !formData.email || !formData.phone || !formData.service || !formData.message) {
      return NextResponse.json({ message: 'All fields are required.' }, { status: 400 });
    }

    // Basic email format validation (can be more robust)
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!emailRegex.test(formData.email)) {
      return NextResponse.json({ message: 'Invalid email address.' }, { status: 400 });
    }

    // Basic phone number format validation (can be more robust)
    // Allows for digits, spaces, hyphens, and parentheses, with an optional leading plus sign
    const phoneRegex = /^\+?[\d\s-()]{10,}$/;
    if (!phoneRegex.test(formData.phone)) {
       return NextResponse.json({ message: 'Invalid phone number format.' }, { status: 400 });
    }

    // TODO: Implement actual email sending or CRM integration here
    console.log('Received contact form submission:', formData);

    // Simulate successful processing
    // For actual implementation, replace this with email sending logic (e.g., using Nodemailer, SendGrid, etc.)
    // await sendEmail(formData);

    // Simulate successful response
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay

    return NextResponse.json({ message: 'Message sent successfully!' }, { status: 200 });

  } catch (error) {
    console.error('Contact form submission error:', error);
    return NextResponse.json({ message: 'Failed to send message.', error: (error as Error).message }, { status: 500 });
  }
} 