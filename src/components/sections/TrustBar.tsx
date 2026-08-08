import Container from "@/components/ui/Container";

const clientLogos = [
  { name: "EY", src: "/clients logo/EY.svg" },
  { name: "Airbnb", src: "/clients logo/airbnb.svg" },
  { name: "Amazon", src: "/clients logo/amazon.svg" },
  { name: "Apple", src: "/clients logo/apple.svg" },
  { name: "BMW", src: "/clients logo/bmw.svg" },
  { name: "Coca-Cola", src: "/clients logo/coca-cola.svg" },
  { name: "Dell", src: "/clients logo/dell.svg" },
  { name: "Flipkart", src: "/clients logo/flipkart.svg" },
  { name: "Google", src: "/clients logo/google.svg" },
  { name: "Mastercard", src: "/clients logo/mastercard.svg" },
  { name: "Microsoft", src: "/clients logo/microsoft.svg" },
  { name: "Netflix", src: "/clients logo/netflix.svg" },
  { name: "PayPal", src: "/clients logo/paypal.svg" },
  { name: "Spotify", src: "/clients logo/spotify.svg" },
  { name: "Visa", src: "/clients logo/visa.svg" },
];

export default function TrustBar() {
  // Duplicate for seamless infinite marquee loop
  const marqueeList = [...clientLogos, ...clientLogos];

  return (
    <section id="clients" className="bg-slate-50 py-16 md:py-20 border-b border-slate-200 scroll-mt-20 overflow-hidden">
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee-track {
          display: flex;
          width: max-content;
          animation: marquee 30s linear infinite;
        }
        .animate-marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      <Container>
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Our Proven <span className="text-[#86BC25]">Partnerships</span>
          </h2>
          <p className="mt-2 text-base md:text-lg text-slate-600 font-medium">
            Successful Collaborations With the Industry’s Best
          </p>
        </div>
      </Container>

      {/* Infinite Marquee Container with Gradient Edge Fades */}
      <div className="relative w-full overflow-hidden before:absolute before:left-0 before:top-0 before:bottom-0 before:w-24 before:bg-gradient-to-r before:from-slate-50 before:to-transparent before:z-10 after:absolute after:right-0 after:top-0 after:bottom-0 after:w-24 after:bg-gradient-to-l after:from-slate-50 after:to-transparent after:z-10">
        <div className="animate-marquee-track flex items-center gap-8 md:gap-12 py-3">
          {marqueeList.map((logo, index) => (
            <div
              key={`${logo.name}-${index}`}
              className="flex items-center justify-center h-16 w-36 md:w-44 shrink-0 transition-all duration-300 transform hover:scale-110 cursor-pointer"
            >
              <img
                src={logo.src}
                alt={`${logo.name} logo`}
                className="max-h-11 md:max-h-14 w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
