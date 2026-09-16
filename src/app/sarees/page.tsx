import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Collection from '@/components/Collection';

export default function SareesPage() {
  return (
    <main className="min-h-screen bg-[#f6f2eb] text-[#29231f]">
      <Header />

      <section className="px-5 pb-8 pt-16 min-[700px]:px-7">
        <div className="mx-auto max-w-[1240px] text-center">
          <p className="text-sm uppercase tracking-[0.19em] text-[#b88b3d]">
            Arya Collections
          </p>

          <h1 className="mt-3 font-serif text-4xl font-normal text-[#302a26] md:text-5xl">
            The Heritage Collection
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-[#8d837b]">
            Discover our collection of handpicked sarees, each chosen for
            its craftsmanship, character, and timeless beauty.
          </p>
        </div>
      </section>

      <Collection showAll />

      <Footer />
    </main>
  );
}