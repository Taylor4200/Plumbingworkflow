import Hero from '@/components/home/Hero';
import Services from '@/components/home/Services';
import About from '@/components/home/About';
import Testimonials from '@/components/home/Testimonials';
import Contact from '@/components/home/Contact';
import siteConfig from '@/config/siteConfig';

export const metadata = {
  title: siteConfig.seo.title,
  description: siteConfig.seo.description,
};

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <About />
      <Testimonials />
      <Contact />
    </>
  );
}
