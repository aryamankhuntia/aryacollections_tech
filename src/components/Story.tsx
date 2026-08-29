import { ArrowRight } from 'lucide-react';

export default function Story() {
  return (
    <section id="story" className="bg-[#f5f0e8] px-7 py-[58px]">
      <div className="desktop-story grid grid-cols-1 items-center gap-[48px]">
        <div className="h-[250px] overflow-hidden min-[700px]:h-[275px]">
          <img
            src="/story-loom.webp"
            alt="Traditional handloom weaving"
            className="h-full w-full object-cover"
          />
        </div>

        <div>
          <p className="text-sm uppercase tracking-[0.19em] text-[#b88b3d]">
            The Arya Collections Legacy
          </p>

          <h2 className="mt-3 font-serif text-[27px] font-normal leading-[1.12] text-[#302a26]">
            Our Story &amp; Loom Philosophy
          </h2>

          <div className="mt-5 space-y-3 text-base leading-[1.8] text-[#756b63]">
            <p>
              Arya Collections, rooted in the rich weaving heritage of India,
              honours the timeless artistry of traditional handloom weaving. Each
              thread is a story, each loom a testament to skill, patience and
              dedication passed down through generations.
            </p>

            <p>
              We eliminate the complexities to bring authentic, certified handloom
              directly to you, ensuring our weavers are rewarded fairly while you
              receive pieces made to last for generations.
            </p>
          </div>

          <a
            href="#"
            className="mt-5 inline-flex items-center gap-1.5 text-sm uppercase tracking-[0.08em] underline underline-offset-[4px] hover:text-[#b88b3d]"
          >
            Learn More About Our Artisans
            <ArrowRight className="h-[8px] w-[8px]" strokeWidth={1.4} />
          </a>
        </div>
      </div>
    </section>
  );
}