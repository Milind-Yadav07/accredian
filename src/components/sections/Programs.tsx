import Container from "@/components/ui/Container";
import SectionLabel from "@/components/ui/SectionLabel";
import { programs } from "@/data/content";

export default function Programs() {
  return (
    <section id="cat" className="bg-white py-24 border-t border-slate-200 scroll-mt-20">
      <Container>
        <SectionLabel label="Program catalog" />
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl max-w-2xl leading-snug font-bold text-slate-900">
            The CAT Framework: <span className="italic text-[#709F1E]">Our Proven Approach</span> to Learning Excellence
          </h2>
        </div>

        {/* Alternating Program Cards */}
        <div className="space-y-12 md:space-y-16">
          {programs.map((p) => {
            const isTextOnLeft = p.imageOnRight;

            return (
              <div
                key={p.code}
                className="group bg-slate-50 border border-slate-200/90 hover:border-[#86BC25] rounded-2xl p-6 sm:p-8 md:p-10 transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                  {/* Text Content Block */}
                  <div className={isTextOnLeft ? "order-1" : "order-1 md:order-2"}>
                    <span className="inline-block px-3 py-1 bg-[#86BC25]/15 text-[#86BC25] font-mono text-xs font-bold tracking-wider uppercase rounded-full mb-4">
                      {p.code}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-4 group-hover:text-[#709F1E] transition-colors">
                      {p.name}
                    </h3>
                    <p className="text-slate-600 text-base md:text-lg leading-relaxed mb-6 font-normal">
                      {p.desc}
                    </p>
                    <a
                      href="#lead-form"
                      className="inline-flex items-center gap-2 font-bold text-sm text-[#709F1E] hover:text-[#5a8216] group/btn"
                    >
                      Explore Curriculum
                      <span className="transform group-hover/btn:translate-x-1 transition-transform">
                        →
                      </span>
                    </a>
                  </div>

                  {/* Image Block */}
                  <div className={isTextOnLeft ? "order-2" : "order-2 md:order-1"}>
                    <div className="relative rounded-xl overflow-hidden shadow-md border border-slate-200/80 aspect-[16/10] bg-slate-100">
                      <img
                        src={p.image}
                        alt={`${p.name} illustration`}
                        className="w-full h-full object-cover transform group-hover:scale-[1.03] transition-transform duration-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
