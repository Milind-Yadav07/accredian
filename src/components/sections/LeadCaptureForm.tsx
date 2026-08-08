"use client";

import { FormEvent, useState } from "react";
import Container from "@/components/ui/Container";
import SectionLabel from "@/components/ui/SectionLabel";
import Button from "@/components/ui/Button";

type Status = "idle" | "loading" | "success" | "error";

export default function LeadCaptureForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: data.get("name"),
      email: data.get("email"),
      company: data.get("company"),
      teamSize: data.get("teamSize"),
      message: data.get("message"),
    };

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();

      if (!res.ok || !json.success) {
        setErrorMsg(json.error || "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }

      setStatus("success");
      form.reset();
    } catch {
      setErrorMsg("Network error. Please check your connection and try again.");
      setStatus("error");
    }
  }

  return (
    <section id="lead-form" className="bg-slate-900 text-white py-24">
      <Container className="max-w-2xl">
        <SectionLabel index="SEC. 06" label="Get in touch" dark />
        <h2 className="text-3xl md:text-4xl leading-snug mb-3 font-bold">
          Get expert guidance for your <span className="italic text-[#86BC25]">team&apos;s</span> success.
        </h2>
        <p className="text-slate-300 text-sm mb-10 max-w-md">
          Fill in your details and our enterprise team will reach out within
          one business day.
        </p>

        {status === "success" ? (
          <div className="border border-[#86BC25]/40 bg-[#86BC25]/10 p-8 text-center rounded-lg">
            <p className="text-xl font-bold mb-2 text-[#86BC25]">Request received.</p>
            <p className="text-slate-300 text-sm">
              Someone from our enterprise team will reach out shortly.
            </p>
            <button
              className="mt-6 text-xs font-mono text-[#86BC25] underline underline-offset-4"
              onClick={() => setStatus("idle")}
            >
              Submit another request
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-5">
            <Field label="Full name" name="name" required placeholder="Jordan Patel" />
            <Field label="Work email" name="email" type="email" required placeholder="jordan@company.com" />
            <Field label="Company" name="company" placeholder="Company name" />
            <Field label="Team size" name="teamSize" placeholder="e.g. 15-50" />
            <div className="sm:col-span-2">
              <label className="block text-xs font-mono tracking-wide text-slate-400 mb-2" htmlFor="message">
                What are you hoping to solve?
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                placeholder="Tell us about your team's skill gaps or goals..."
                className="w-full bg-slate-800 border border-slate-700 rounded px-4 py-3 text-sm placeholder:text-slate-500 focus:border-[#86BC25] outline-none transition-colors"
              />
            </div>

            {status === "error" && (
              <p className="sm:col-span-2 text-sm text-red-400" role="alert">
                {errorMsg}
              </p>
            )}

            <div className="sm:col-span-2">
              <Button type="submit" variant="primary" disabled={status === "loading"}>
                {status === "loading" ? "Sending…" : "Request a callback"}
              </Button>
            </div>
          </form>
        )}
      </Container>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-mono tracking-wide text-slate-400 mb-2" htmlFor={name}>
        {label}
        {required && <span className="text-[#86BC25]"> *</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full bg-slate-800 border border-slate-700 rounded px-4 py-3 text-sm placeholder:text-slate-500 focus:border-[#86BC25] outline-none transition-colors"
      />
    </div>
  );
}
