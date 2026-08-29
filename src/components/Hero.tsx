export default function Hero() {
  return (
    <section className="relative h-[300px] overflow-hidden md:h-[450px]">
      <img
        src="/hero-bg.png"
        alt="Hero Background"
        className="absolute inset-0 h-full w-full object-cover"
      />
      {/* Darkened overlay so white text pops */}
      <div className="absolute inset-0 bg-[#29231f]/60" />

      <div className="relative z-10 flex h-full items-center justify-center px-6 text-center">
        <div className="max-w-[700px]">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-[#d8b56b]">
            Ancient Textiles, Modern Luxury
          </p>
          <h1 className="font-serif text-4xl md:text-5xl font-normal leading-tight text-white drop-shadow-md">
            Handwoven Elegance, <br className="hidden md:block" /> Delivered to You
          </h1>
          <p className="mx-auto mt-4 max-w-[500px] text-sm md:text-base leading-relaxed text-white/90 drop-shadow-sm">
            A thoughtfully curated collection of exquisite handwoven
            sarees, crafted by master artisans and delivered with care.
          </p>
          <a
            href="#collection"
            className="mt-6 inline-flex items-center bg-[#c79b4c] px-8 py-3 text-sm font-medium uppercase tracking-widest text-white hover:bg-[#af8538] transition-colors"
          >
            Explore Collection
          </a>
        </div>
      </div>
    </section>
  );
}