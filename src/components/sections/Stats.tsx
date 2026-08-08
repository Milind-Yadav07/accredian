import Container from "@/components/ui/Container";

const statsData = [
  {
    value: "10K+",
    description: "Professionals Trained For Exceptional Career Success",
  },
  {
    value: "200+",
    description: "Sessions Delivered With Unmatched Learning Excellence",
  },
  {
    value: "5K+",
    description: "Active Learners Engaged In Dynamic Courses",
  },
];

export default function Stats() {
  return (
    <section id="stats" className="bg-white py-16 md:py-24 border-b border-gray-100 scroll-mt-20">
      <Container>
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Our <span className="text-[#86BC25]">Track Record</span>
          </h2>
          <p className="mt-2 text-base md:text-lg text-slate-600 font-medium">
            The Numbers Behind Our Success
          </p>
        </div>

        {/* 3 Stats Grid */}
        <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-200">
          {statsData.map((stat, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center px-6 py-6 md:py-4"
            >
              {/* Soft Deloitte Green Pill Badge for Stat Value */}
              <div className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-[#86BC25]/15 text-[#86BC25] font-extrabold text-2xl md:text-3xl tracking-tight mb-5">
                {stat.value}
              </div>
              {/* Stat Description */}
              <p className="text-slate-800 text-sm md:text-base font-semibold max-w-xs leading-snug">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
