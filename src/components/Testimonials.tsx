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

export default function Testimonials() {
  return (
    <section className="bg-[#fffdf9] px-7 py-[52px]">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-[34px] text-center">
          <p className="text-sm uppercase tracking-[0.19em] text-[#b88b3d]">
            Heirloom Stories
          </p>
        </div>

        <div className="grid grid-cols-1 gap-[45px] min-[700px]:grid-cols-3 min-[700px]:gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.name} className="text-center">
              <div className="mb-4 text-[17px] leading-none text-[#c8a05a]">
                ≡
              </div>

              <p className="mx-auto max-w-[290px] font-serif text-base leading-[1.8] text-[#625951]">
                &quot;{testimonial.quote}&quot;
              </p>

              <p className="mt-4 text-sm font-semibold text-[#2f2925]">
                {testimonial.name}
              </p>

              <p className="mt-0.5 text-sm text-[#978d84]">
                {testimonial.location}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}