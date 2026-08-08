"use client";

import { useState, useEffect, useRef } from "react";
import { X, CheckCircle2 } from "lucide-react";

interface CountryCode {
  iso2: string;
  name: string;
  phonecode: string;
}

const DEFAULT_COUNTRIES: CountryCode[] = [
  { iso2: "IN", name: "India", phonecode: "91" },
  { iso2: "US", name: "United States", phonecode: "1" },
  { iso2: "GB", name: "United Kingdom", phonecode: "44" },
  { iso2: "CA", name: "Canada", phonecode: "1" },
  { iso2: "AE", name: "United Arab Emirates", phonecode: "971" },
  { iso2: "AU", name: "Australia", phonecode: "61" },
  { iso2: "SG", name: "Singapore", phonecode: "65" },
  { iso2: "DE", name: "Germany", phonecode: "49" },
];

interface CountrySelectProps {
  countries: CountryCode[];
  selectedCountry: CountryCode;
  onSelect: (country: CountryCode) => void;
}

function CountrySelect({ countries, selectedCountry, onSelect }: CountrySelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredCountries = countries.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.phonecode.includes(searchQuery) ||
      c.iso2.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative shrink-0" ref={dropdownRef}>
      {/* Closed State Button with FlagCDN Image */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 py-1 px-1.5 text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none cursor-pointer rounded-none hover:bg-slate-100 transition-colors"
        aria-label="Select Country Code"
      >
        <img
          src={`https://flagcdn.com/w20/${selectedCountry.iso2.toLowerCase()}.png`}
          alt={selectedCountry.name}
          width={20}
          height={15}
          className="w-5 h-3.5 object-cover rounded-sm border border-slate-200 shrink-0"
        />
        <span>+{selectedCountry.phonecode}</span>
        <span className="text-slate-500 text-xs">({selectedCountry.iso2})</span>
        <span className="text-slate-400 text-xs">▾</span>
      </button>

      {/* Open Dropdown List */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-64 max-h-60 bg-white border border-slate-200 shadow-xl rounded-none z-[120] overflow-hidden flex flex-col animate-fade-in">
          {/* Filter Input */}
          <div className="p-2 border-b border-slate-100 bg-slate-50">
            <input
              type="text"
              placeholder="Search country or code..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-2 py-1 text-xs border border-slate-300 rounded-none focus:outline-none focus:border-[#86BC25]"
              autoFocus
            />
          </div>

          {/* Options List with FlagCDN Images */}
          <div className="overflow-y-auto max-h-48 divide-y divide-slate-50">
            {filteredCountries.length === 0 ? (
              <div className="p-3 text-xs text-slate-400 text-center">
                No countries found
              </div>
            ) : (
              filteredCountries.map((country) => {
                const flagUrl = `https://flagcdn.com/w20/${country.iso2.toLowerCase()}.png`;
                const isSelected = country.iso2 === selectedCountry.iso2;
                return (
                  <button
                    key={`${country.iso2}-${country.phonecode}`}
                    type="button"
                    onClick={() => {
                      onSelect(country);
                      setIsOpen(false);
                      setSearchQuery("");
                    }}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-emerald-50 transition-colors ${
                      isSelected ? "bg-emerald-50 font-bold text-[#86BC25]" : "text-slate-700"
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <img
                        src={flagUrl}
                        alt={country.name}
                        width={20}
                        height={15}
                        className="w-5 h-3.5 object-cover rounded-sm border border-slate-200 shrink-0"
                      />
                      <span className="truncate">{country.name}</span>
                    </div>
                    <span className="font-semibold text-slate-500 shrink-0 ml-2">
                      +{country.phonecode} ({country.iso2})
                    </span>
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}

interface EnquireModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function EnquireModal({ isOpen, onClose }: EnquireModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [countries, setCountries] = useState<CountryCode[]>(DEFAULT_COUNTRIES);
  const [selectedCountry, setSelectedCountry] = useState<CountryCode>(DEFAULT_COUNTRIES[0]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    domain: "",
    candidates: "",
    mode: "",
    location: "",
  });

  // Fetch country codes from CountryStateCity API
  useEffect(() => {
    async function fetchCountries() {
      try {
        const res = await fetch("https://api.countrystatecity.in/v1/countries", {
          headers: {
            "X-CSCAPI-KEY":
              "357b520109ba0ffa10981a8b5ad457ea0b8687b3fb92f42b0a811dd1f732f449",
          },
        });
        if (res.ok) {
          const data: CountryCode[] = await res.json();
          const valid = data.filter((c) => c.phonecode && c.iso2);
          const sorted = valid.sort((a, b) => {
            if (a.iso2 === "IN") return -1;
            if (b.iso2 === "IN") return 1;
            return a.name.localeCompare(b.name);
          });
          setCountries(sorted);
          const india = sorted.find((c) => c.iso2 === "IN");
          if (india) setSelectedCountry(india);
        }
      } catch (err) {
        console.error("Failed to fetch country codes from API:", err);
      }
    }
    fetchCountries();
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      setSubmitted(false);
      setErrorMsg("");
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/enquire", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          countryCode: `+${selectedCountry.phonecode}`,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSubmitted(true);
      } else {
        setErrorMsg(data.error || "Failed to submit enquiry. Please try again.");
      }
    } catch (err) {
      console.error("Form submission error:", err);
      setErrorMsg("Network error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setSubmitted(false);
    setErrorMsg("");
    setFormData({
      name: "",
      email: "",
      phone: "",
      company: "",
      domain: "",
      candidates: "",
      mode: "",
      location: "",
    });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-[100] flex items-center justify-center p-3 sm:p-4 md:p-6 animate-fade-in"
      onClick={handleClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="relative bg-white rounded-none overflow-hidden shadow-2xl max-w-4xl w-full flex flex-col md:flex-row border border-slate-100 max-h-[96vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left Column - Corporate Image Banner */}
        <div className="hidden md:block w-5/12 relative bg-slate-900 overflow-hidden shrink-0">
          <img
            src="/enquire-banner.png"
            alt="Accredian Enterprise Consultation"
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* Right Column - Enquire Form */}
        <div className="w-full md:w-7/12 p-5 sm:p-6 md:p-7 relative flex flex-col justify-between overflow-y-auto md:overflow-y-visible">
          {/* Header with Close Button */}
          <div className="flex items-center justify-between pb-2.5 border-b border-slate-100 mb-3">
            <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900">
              Enquire <span className="text-[#86BC25]">Now</span>
            </h3>
            <button
              onClick={handleClose}
              className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-none transition-colors"
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {submitted ? (
            <div className="py-10 text-center flex flex-col items-center justify-center space-y-4">
              <CheckCircle2 className="w-16 h-16 text-[#86BC25] animate-bounce" />
              <h4 className="text-2xl font-bold text-slate-900">
                Thank You for Your Enquiry!
              </h4>
              <p className="text-slate-600 text-sm md:text-base max-w-sm">
                Your enquiry has been saved to our database. Our enterprise team will contact you within 24 hours.
              </p>
              <button
                onClick={handleClose}
                className="mt-6 px-8 py-3 bg-[#86BC25] hover:bg-[#709F1E] text-black font-extrabold rounded-none text-sm transition-colors shadow-md"
              >
                Close Window
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-2.5 sm:space-y-3">
              {errorMsg && (
                <div className="p-2.5 bg-red-50 border border-red-200 text-red-700 text-xs font-semibold rounded-none">
                  {errorMsg}
                </div>
              )}

              {/* Name */}
              <div>
                <input
                  type="text"
                  required
                  placeholder="Enter Name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full py-1.5 border-b border-slate-300 focus:border-[#86BC25] focus:outline-none text-slate-900 placeholder-slate-400 text-sm md:text-base transition-colors rounded-none"
                />
              </div>

              {/* Email */}
              <div>
                <input
                  type="email"
                  required
                  placeholder="Enter Email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full py-1.5 border-b border-slate-300 focus:border-[#86BC25] focus:outline-none text-slate-900 placeholder-slate-400 text-sm md:text-base transition-colors rounded-none"
                />
              </div>

              {/* Phone with FlagCDN Country Code Dropdown */}
              <div className="flex items-center gap-1.5 border-b border-slate-300 py-1.5 focus-within:border-[#86BC25] transition-colors rounded-none">
                <CountrySelect
                  countries={countries}
                  selectedCountry={selectedCountry}
                  onSelect={(country) => setSelectedCountry(country)}
                />
                <span className="text-slate-300 select-none">|</span>
                <input
                  type="tel"
                  required
                  placeholder="Enter Phone Number"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full focus:outline-none text-slate-900 placeholder-slate-400 text-sm md:text-base bg-transparent rounded-none"
                />
              </div>

              {/* Company Name */}
              <div>
                <input
                  type="text"
                  required
                  placeholder="Enter company name"
                  value={formData.company}
                  onChange={(e) =>
                    setFormData({ ...formData, company: e.target.value })
                  }
                  className="w-full py-1.5 border-b border-slate-300 focus:border-[#86BC25] focus:outline-none text-slate-900 placeholder-slate-400 text-sm md:text-base transition-colors rounded-none"
                />
              </div>

              {/* Select Domain */}
              <div>
                <select
                  required
                  value={formData.domain}
                  onChange={(e) =>
                    setFormData({ ...formData, domain: e.target.value })
                  }
                  className={`w-full py-1.5 border-b border-slate-300 focus:border-[#86BC25] focus:outline-none text-sm md:text-base bg-transparent transition-colors rounded-none ${
                    formData.domain ? "text-slate-900 font-medium" : "text-slate-400"
                  }`}
                >
                  <option value="" disabled>
                    Select Domain
                  </option>
                  <option value="genai" className="text-slate-900">
                    Generative AI Mastery
                  </option>
                  <option value="ds" className="text-slate-900">
                    Data Science & Analytics
                  </option>
                  <option value="pm" className="text-slate-900">
                    Product Management
                  </option>
                  <option value="dx" className="text-slate-900">
                    Digital Transformation
                  </option>
                  <option value="fintech" className="text-slate-900">
                    Fintech & Risk
                  </option>
                  <option value="leadership" className="text-slate-900">
                    Executive Leadership
                  </option>
                </select>
              </div>

              {/* Enter No. of candidates */}
              <div>
                <input
                  type="number"
                  placeholder="Enter No. of candidates"
                  value={formData.candidates}
                  onChange={(e) =>
                    setFormData({ ...formData, candidates: e.target.value })
                  }
                  className="w-full py-1.5 border-b border-slate-300 focus:border-[#86BC25] focus:outline-none text-slate-900 placeholder-slate-400 text-sm md:text-base transition-colors rounded-none"
                />
              </div>

              {/* Select Mode of Delivery * */}
              <div>
                <select
                  required
                  value={formData.mode}
                  onChange={(e) =>
                    setFormData({ ...formData, mode: e.target.value })
                  }
                  className={`w-full py-1.5 border-b border-slate-300 focus:border-[#86BC25] focus:outline-none text-sm md:text-base bg-transparent transition-colors rounded-none ${
                    formData.mode ? "text-slate-900 font-medium" : "text-slate-400"
                  }`}
                >
                  <option value="" disabled>
                    Select Mode of Delivery *
                  </option>
                  <option value="online" className="text-slate-900">
                    Online
                  </option>
                  <option value="offline" className="text-slate-900">
                    Offline
                  </option>
                </select>
              </div>

              {/* Location */}
              <div>
                <input
                  type="text"
                  placeholder="Eg: Gurgoan, Delhi, India"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  className="w-full py-1.5 border-b border-slate-300 focus:border-[#86BC25] focus:outline-none text-slate-900 placeholder-slate-400 text-sm md:text-base transition-colors rounded-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full mt-4 sm:mt-5 py-3.5 bg-[#86BC25] hover:bg-[#709F1E] text-black font-extrabold rounded-none text-base shadow-md hover:shadow-lg transition-all duration-200 transform active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
