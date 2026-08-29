'use client';

import { useEffect, useState } from 'react';
import { supabase, Saree } from '@/lib/supabase';
import SareeCard from '@/components/SareeCard';
import {
  Search,
  ShoppingBag,
  ArrowRight,
  ChevronDown,
} from 'lucide-react';

const testimonials = [
  {
    quote:
      'The Kanjivaram I ordered for my daughter’s wedding was absolutely stunning. The craftsmanship and attention to detail were impeccable.',
    name: 'Radhika Iyer',
    location: 'Chennai',
  },
  {
    quote:
      'Arya Collections brings the soul of Banaras right to our doorstep. The quality is exceptional and every piece feels truly special.',
    name: 'Ananya Sharma',
    location: 'Mumbai',
  },
  {
    quote:
      'Delicate, timeless and so well made. The colour, drape and finish were even better than I expected.',
    name: 'Meera Das',
    location: 'New Delhi',
  },
];

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=90&w=2200';

const STORY_IMAGE =
  'https://images.unsplash.com/photo-1596484552993-855c826622fb?q=90&w=1400';

export default function Storefront() {
  const [sarees, setSarees] = useState<Saree[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    async function fetchSarees() {
      const { data } = await supabase
        .from('sarees')
        .select('*')
        .neq('status', 'archived')
        .order('created_at', { ascending: false });

      if (data) {
        setSarees(data);
      }

      setLoading(false);
    }

    fetchSarees();
  }, []);

  const filteredSarees = sarees.filter((saree) => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) return true;

    return (
      saree.title.toLowerCase().includes(query) ||
      Boolean(
        saree.fabric_type &&
          saree.fabric_type.toLowerCase().includes(query)
      ) ||
      Boolean(
        saree.color &&
          saree.color.toLowerCase().includes(query)
      )
    );
  });

  return (
    <main className="min-h-screen bg-[#f6f2eb] text-[#29231f]">

      {/* HEADER */}
      <header className="sticky top-0 z-50 h-[60px] border-b border-[#e5ded5] bg-[#fffdf9]">
        <div className="mx-auto flex h-full max-w-[1240px] items-center justify-between px-7">

          <a
            href="#"
            className="font-serif text-[15px] tracking-[0.16em] text-[#29231f]"
          >
            Arya Collections
          </a>

          <nav className="desktop-nav hidden items-center gap-[28px]">
            <a
              href="#"
              className="text-[7px] uppercase tracking-[0.1em] text-[#b88b3d]"
            >
              Home
            </a>

            <a
              href="#collection"
              className="text-[7px] uppercase tracking-[0.1em] text-[#403934] hover:text-[#b88b3d]"
            >
              Collection
            </a>

            <a
              href="#story"
              className="text-[7px] uppercase tracking-[0.1em] text-[#403934] hover:text-[#b88b3d]"
            >
              Our Story
            </a>

            <a
              href="#contact"
              className="text-[7px] uppercase tracking-[0.1em] text-[#403934] hover:text-[#b88b3d]"
            >
              Contact
            </a>
          </nav>

          <div className="flex items-center gap-3.5">
            <Search
              className="h-[12px] w-[12px] text-[#342f2b]"
              strokeWidth={1.4}
            />

            <div className="flex items-center gap-1 text-[7px] text-[#342f2b]">
              <ShoppingBag
                className="h-[12px] w-[12px]"
                strokeWidth={1.4}
              />
              Inquire
            </div>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative h-[295px] overflow-hidden min-[700px]:h-[330px]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url("${HERO_IMAGE}")`,
          }}
        />

        <div className="absolute inset-0 bg-[#3b2b1f]/25" />

        <div className="relative z-10 flex h-full items-center justify-center px-6 text-center">
          <div className="max-w-[700px]">

            <p className="mb-4 text-[7px] uppercase tracking-[0.24em] text-[#d8b56b]">
              Ancient Textiles, Modern Luxury
            </p>

            <h1 className="font-serif text-[30px] font-normal leading-[1.08] text-white min-[700px]:text-[36px]">
              Handwoven Elegance,
              <br className="hidden min-[700px]:block" />
              Delivered to You
            </h1>

            <p className="mx-auto mt-4 max-w-[500px] text-[9px] leading-[1.7] text-white/90">
              A thoughtfully curated collection of exquisite handwoven
              sarees, crafted by master artisans and delivered with care.
            </p>

            <a
              href="#collection"
              className="mt-6 inline-flex h-[30px] items-center bg-[#c79b4c] px-7 text-[7px] uppercase tracking-[0.1em] text-white hover:bg-[#af8538]"
            >
              Explore Collection
            </a>
          </div>
        </div>
      </section>

      {/* COLLECTION */}
      <section
        id="collection"
        className="bg-[#f6f2eb] px-5 min-[700px]:px-7"
      >
        <div className="mx-auto max-w-[1240px]">

          {/* FILTER BAR */}
          <div className="desktop-filter grid gap-0 border-b border-[#ded7cd] py-4">

            <div className="relative border border-[#d8d1c7] bg-[#fbfaf7] px-2.5">
              <select className="h-[31px] w-full appearance-none bg-transparent pr-5 text-[7px] uppercase text-[#5d554d] outline-none">
                <option>Price</option>
                <option>Low to High</option>
                <option>High to Low</option>
              </select>

              <ChevronDown
                className="absolute right-2 top-1/2 h-[8px] w-[8px] -translate-y-1/2 text-[#b88b3d]"
                strokeWidth={1.4}
              />
            </div>

            <div className="relative border border-[#d8d1c7] bg-[#fbfaf7] px-2.5">
              <select className="h-[31px] w-full appearance-none bg-transparent pr-5 text-[7px] uppercase text-[#5d554d] outline-none">
                <option>Weave Type</option>
                <option>Silk</option>
                <option>Cotton</option>
                <option>Linen</option>
              </select>

              <ChevronDown
                className="absolute right-2 top-1/2 h-[8px] w-[8px] -translate-y-1/2 text-[#b88b3d]"
                strokeWidth={1.4}
              />
            </div>

            <div className="relative border border-[#d8d1c7] bg-[#fbfaf7] px-2.5">
              <select className="h-[31px] w-full appearance-none bg-transparent pr-5 text-[7px] uppercase text-[#5d554d] outline-none">
                <option>Region</option>
                <option>Kanchipuram</option>
                <option>Banaras</option>
                <option>Bengal</option>
              </select>

              <ChevronDown
                className="absolute right-2 top-1/2 h-[8px] w-[8px] -translate-y-1/2 text-[#b88b3d]"
                strokeWidth={1.4}
              />
            </div>

            <div className="flex h-[31px] items-center border border-[#d8d1c7] bg-[#fbfaf7] px-2.5">
              <Search
                className="mr-1.5 h-[9px] w-[9px] shrink-0 text-[#746a61]"
                strokeWidth={1.4}
              />

              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for specific weaves, colors, or regions..."
                className="w-full bg-transparent text-[7px] outline-none placeholder:text-[#9d948b]"
              />
            </div>

            <button className="h-[31px] bg-[#292420] text-[6px] uppercase tracking-[0.08em] text-white hover:bg-[#b88b3d]">
              Apply
            </button>
          </div>

          {/* COLLECTION LABEL */}
          <div className="pb-6 pt-[56px] text-center">
            <p className="text-[7px] uppercase tracking-[0.19em] text-[#b88b3d]">
              The Signature Collection
            </p>
          </div>

          {/* PRODUCTS */}
          {loading ? (
            <div className="py-16 text-center text-[7px] uppercase tracking-[0.1em] text-[#948a81]">
              Loading collection...
            </div>
          ) : filteredSarees.length === 0 ? (
            <div className="py-16 text-center text-[7px] uppercase tracking-[0.1em] text-[#948a81]">
              No sarees found matching your criteria.
            </div>
          ) : (
            <div className="desktop-grid-3 grid grid-cols-1 gap-x-[15px] gap-y-[28px]">
              {filteredSarees.slice(0, 6).map((saree) => (
                <SareeCard key={saree.id} saree={saree} />
              ))}
            </div>
          )}

          {/* VIEW ALL */}
          <div className="flex justify-center py-[40px]">
            <button className="border border-[#3b342f] px-6 py-[8px] text-[6px] uppercase tracking-[0.09em] text-[#39322d] hover:bg-[#39322d] hover:text-white">
              View All Heritage Masterpieces
            </button>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-[#fffdf9] px-7 py-[52px]">
        <div className="mx-auto max-w-[1200px]">

          <div className="mb-[34px] text-center">
            <p className="text-[7px] uppercase tracking-[0.19em] text-[#b88b3d]">
              Heirloom Stories
            </p>
          </div>

          <div className="grid grid-cols-1 gap-[45px] min-[700px]:grid-cols-3 min-[700px]:gap-8">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.name}
                className="text-center"
              >
                <div className="mb-4 text-[17px] leading-none text-[#c8a05a]">
                  ≡
                </div>

                <p className="mx-auto max-w-[290px] font-serif text-[8px] leading-[1.8] text-[#625951]">
                  &quot;{testimonial.quote}&quot;
                </p>

                <p className="mt-4 text-[7px] font-semibold text-[#2f2925]">
                  {testimonial.name}
                </p>

                <p className="mt-0.5 text-[6px] text-[#978d84]">
                  {testimonial.location}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STORY */}
      <section
        id="story"
        className="bg-[#f5f0e8] px-7 py-[58px]"
      >
        <div className="desktop-story grid grid-cols-1 items-center gap-[48px]">

          <div className="h-[250px] overflow-hidden min-[700px]:h-[275px]">
            <img
              src={STORY_IMAGE}
              alt="Traditional handloom weaving"
              className="h-full w-full object-cover"
            />
          </div>

          <div>
            <p className="text-[7px] uppercase tracking-[0.19em] text-[#b88b3d]">
              The Arya Collections Legacy
            </p>

            <h2 className="mt-3 font-serif text-[27px] font-normal leading-[1.12] text-[#302a26]">
              Our Story &amp; Loom Philosophy
            </h2>

            <div className="mt-5 space-y-3 text-[8px] leading-[1.8] text-[#756b63]">
              <p>
                Arya Collections, rooted in the rich weaving heritage of India,
                honours the timeless artistry of traditional handloom
                weaving. Each thread is a story, each loom a testament
                to skill, patience and dedication passed down through
                generations.
              </p>

              <p>
                We eliminate the complexities to bring authentic,
                certified handloom directly to you, ensuring our
                weavers are rewarded fairly while you receive pieces
                made to last for generations.
              </p>
            </div>

            <a
              href="#"
              className="mt-5 inline-flex items-center gap-1.5 text-[6px] uppercase tracking-[0.08em] underline underline-offset-[4px] hover:text-[#b88b3d]"
            >
              Learn More About Our Artisans
              <ArrowRight
                className="h-[8px] w-[8px]"
                strokeWidth={1.4}
              />
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        id="contact"
        className="bg-[#211c19] px-7 py-[43px] text-[#9d9188]"
      >
        <div className="mx-auto max-w-[1200px]">

          <div className="desktop-footer grid grid-cols-1 gap-[36px]">

            <div>
              <h2 className="font-serif text-[17px] tracking-[0.18em] text-[#eee5da]">
                Arya Collections
              </h2>

              <p className="mt-3 max-w-[240px] text-[7px] leading-[1.8]">
                Sourcing heritage, weaving legacy. Every unique piece
                carries the hand of an Indian artisan.
              </p>

              <p className="mt-3 text-[6px] leading-[1.7] text-[#71675f]">
                Bengaluru, India
                <br />
                Handwoven in India.
              </p>
            </div>

            <div>
              <h3 className="text-[6px] uppercase tracking-[0.13em] text-[#c39a52]">
                Shop Collection
              </h3>

              <div className="mt-3 space-y-1.5 text-[6px]">
                <a href="#collection" className="block hover:text-white">
                  Kanjivaram Silks
                </a>
                <a href="#collection" className="block hover:text-white">
                  Banarasi Sarees
                </a>
                <a href="#collection" className="block hover:text-white">
                  Handloom Cottons
                </a>
                <a href="#collection" className="block hover:text-white">
                  Linen &amp; Tissue
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-[6px] uppercase tracking-[0.13em] text-[#c39a52]">
                About Arya Collections
              </h3>

              <div className="mt-3 space-y-1.5 text-[6px]">
                <a href="#story" className="block hover:text-white">
                  Our Weaving Legacy
                </a>
                <a href="#story" className="block hover:text-white">
                  Loom Philosophy
                </a>
                <a href="#" className="block hover:text-white">
                  Shipping Policy
                </a>
                <a href="#" className="block hover:text-white">
                  Contact &amp; Care
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-[6px] uppercase tracking-[0.13em] text-[#c39a52]">
                Direct Enquiries
              </h3>

              <p className="mt-3 text-[6px] leading-[1.8]">
                {process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ||
                  '+91 98460 12345'}
                <br />
                Customer support
              </p>

              <div className="mt-3 flex gap-1.5">
                <span className="flex h-[20px] w-[20px] items-center justify-center border border-[#4d4540] text-[6px]">
                  IG
                </span>
                <span className="flex h-[20px] w-[20px] items-center justify-center border border-[#4d4540] text-[6px]">
                  FB
                </span>
                <span className="flex h-[20px] w-[20px] items-center justify-center border border-[#4d4540] text-[6px]">
                  X
                </span>
              </div>
            </div>
          </div>

          <div className="mt-[35px] flex items-center justify-between border-t border-[#342e29] pt-4 text-[5px] text-[#706760]">
            <p>
              © {new Date().getFullYear()} Vasthiram. All rights reserved.
            </p>

            <div className="flex gap-4">
              <a href="#" className="hover:text-white">
                Privacy Policy
              </a>

              <a href="#" className="hover:text-white">
                Terms &amp; Conditions
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}