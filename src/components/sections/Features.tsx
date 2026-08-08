import Container from "@/components/ui/Container";
import SectionLabel from "@/components/ui/SectionLabel";
import { features } from "@/data/content";

export default function Features() {
  return (
    <section id="accredian-edge" className="bg-slate-50 py-24 scroll-mt-20">
      <Container>
        <SectionLabel label="Why enterprise teams choose us" />
        <h2 className="text-3xl md:text-4xl max-w-xl leading-snug mb-14 font-bold text-slate-900">
          Training that starts with{" "}
          <span className="italic text-[#709F1E]">your</span> skill gaps.
        </h2>

        <div className="grid sm:grid-cols-2 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="bg-white p-8 md:p-10 rounded-lg border border-slate-200 hover:border-[#86BC25] shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group"
            >
              <h3 className="text-xl font-bold mb-3 text-slate-900 group-hover:text-[#709F1E] transition-colors">
                {f.title}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">{f.body}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
