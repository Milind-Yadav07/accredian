import Container from "@/components/ui/Container";
import SectionLabel from "@/components/ui/SectionLabel";
import { process } from "@/data/content";

const stepIcons = [
  // Card 1: Growth / Chart Icon
  (
    <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  ),
  // Card 2: Presentation Easel / Board Icon
  (
    <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12H4z" />
    </svg>
  ),
  // Card 3: Video Screen / Monitor Play Icon
  (
    <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2zM10 8l5 3-5 3V8z" />
    </svg>
  ),
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-slate-50 py-24 scroll-mt-20 border-b border-slate-200">
      <Container>
        <SectionLabel label="How We Deliver Results That Matter?" />
        <h2 className="text-3xl md:text-4xl max-w-2xl leading-snug mb-16 font-bold text-slate-900">
          A Structured <span className="italic text-[#709F1E]">Three-Step Approach</span> to Skill Development
        </h2>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {process.map((step, index) => (
            <div
              key={step.title}
              className="relative bg-emerald-50/40 md:bg-white rounded-2xl p-8 border border-slate-200/90 shadow-sm hover:shadow-md transition-all duration-300 group flex flex-col items-center text-center"
            >
              {/* Left Vertical Accent Bar (Deloitte Green) */}
              <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-[70%] bg-[#86BC25] rounded-r-full" />
              
              {/* Right Vertical Accent Bar (Deloitte Green) */}
              <span className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-[70%] bg-[#86BC25] rounded-l-full" />

              {/* Centered Deloitte Green Circle Icon */}
              <div className="w-16 h-16 rounded-full bg-[#86BC25] text-white flex items-center justify-center shadow-md shadow-[#86BC25]/20 mt-2 mb-6 transition-transform duration-300 group-hover:scale-110">
                {stepIcons[index % stepIcons.length]}
              </div>

              {/* Centered Title */}
              <h3 className="text-xl font-extrabold text-slate-900 mb-3 group-hover:text-[#709F1E] transition-colors">
                {step.title}
              </h3>

              {/* Centered Description */}
              <p className="text-slate-600 text-sm leading-relaxed max-w-xs font-normal">
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
