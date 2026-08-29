import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Collection from '@/components/Collection';
import Testimonials from '@/components/Testimonials';
import Story from '@/components/Story';
import Footer from '@/components/Footer';

export default function Storefront() {
  return (
    <main className="min-h-screen bg-[#f6f2eb] text-[#29231f]">
      <Header />
      <Hero />
      <Collection />
      <Testimonials />
      <Story />
      <Footer />
    </main>
  );
}