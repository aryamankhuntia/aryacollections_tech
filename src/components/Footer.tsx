export default function Footer() {
  return (
    <footer id="contact" className="bg-[#211c19] px-7 py-[43px] text-[#9d9188]">
      <div className="mx-auto max-w-[1200px]">
        <div className="desktop-footer grid grid-cols-1 gap-[36px]">
          <div>
            <h2 className="font-serif text-2xl tracking-[0.18em] text-[#eee5da]">
              Arya Collections
            </h2>

            <p className="mt-3 max-w-[240px] text-sm leading-[1.8]">
              Sourcing heritage, weaving legacy. Every unique piece carries the
              hand of an Indian artisan.
            </p>

            <p className="mt-3 text-sm leading-[1.7] text-[#71675f]">
              Bengaluru, India
              <br />
              Handwoven in India.
            </p>
          </div>

          <div>
            <h3 className="text-sm uppercase tracking-[0.13em] text-[#c39a52]">
              Shop Collection
            </h3>

            <div className="mt-3 space-y-1.5 text-sm">
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
            <h3 className="text-sm uppercase tracking-[0.13em] text-[#c39a52]">
              About Arya Collections
            </h3>

            <div className="mt-3 space-y-1.5 text-sm">
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
            <h3 className="text-sm uppercase tracking-[0.13em] text-[#c39a52]">
              Direct Enquiries
            </h3>

            <p className="mt-3 text-sm leading-[1.8]">
              {process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+91 98460 12345'}
              <br />
              Customer support
            </p>

            <div className="mt-3 flex gap-1.5">
              <span className="flex h-[20px] w-[20px] items-center justify-center border border-[#4d4540] text-sm">
                IG
              </span>
              <span className="flex h-[20px] w-[20px] items-center justify-center border border-[#4d4540] text-sm">
                FB
              </span>
              <span className="flex h-[20px] w-[20px] items-center justify-center border border-[#4d4540] text-sm">
                X
              </span>
            </div>
          </div>
        </div>

        <div className="mt-[35px] flex items-center justify-between border-t border-[#342e29] pt-4 text-xs text-[#706760]">
          <p>© {new Date().getFullYear()} Arya Collections. All rights reserved.</p>

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
  );
}