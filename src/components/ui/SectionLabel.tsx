export default function SectionLabel({
  index,
  label,
  dark = false,
}: {
  index?: string;
  label: string;
  dark?: boolean;
}) {
  return (
    <div className="flex items-center gap-3 mb-5">
      {index && (
        <>
          <span className={`font-mono text-[11px] tracking-[0.18em] ${dark ? "text-[#86BC25]" : "text-[#709F1E]"}`}>
            {index}
          </span>
          <span className={`h-px flex-1 max-w-[40px] ${dark ? "bg-white/20" : "bg-slate-300"}`} />
        </>
      )}
      <span
        className={`font-mono text-[11px] tracking-[0.18em] uppercase ${
          dark ? "text-white/60" : "text-slate-600 font-semibold"
        }`}
      >
        {label}
      </span>
    </div>
  );
}
