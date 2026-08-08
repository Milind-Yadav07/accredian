import Container from "@/components/ui/Container";
import SectionLabel from "@/components/ui/SectionLabel";
import { testimonials } from "@/data/content";

export default function Testimonials() {
  return (
    <section id="testimonials" className="bg-slate-50 py-24 border-t border-slate-200 scroll-mt-20">
      <Container>
        <SectionLabel label="What Our Clients Are Saying" />
        <h2 className="text-3xl md:text-4xl max-w-xl leading-snug mb-14 font-bold text-slate-900">
          Testimonials from <span className="italic text-[#709F1E]">Our Partners</span>
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, index) => (
            <figure
              key={index}
              className="bg-white border border-slate-200 hover:border-[#86BC25] rounded-xl p-8 flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 group"
            >
              <blockquote className="text-base md:text-lg leading-relaxed italic text-slate-800 mb-8">
                “{t.quote}”
              </blockquote>
              <figcaption className="pt-5 border-t border-slate-100 flex items-center justify-between">
                <img
                  src={t.logo}
                  alt={`${t.company} logo`}
                  className="h-8 md:h-10 w-auto object-contain max-w-[120px]"
                />
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}
