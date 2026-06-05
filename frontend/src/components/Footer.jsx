import { Github, Mail, Globe } from "lucide-react";

export default function Footer({ strings }) {
  return (
    <footer className="rounded-[2rem] border border-white/10 bg-slate-950/65 p-6 shadow-2xl shadow-slate-950/20 backdrop-blur-xl">
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-3">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-400">{strings?.contactTitle || "Ministry contact"}</p>
          <h2 className="text-lg font-semibold text-white">{strings?.contactName || "Ministry of Rural Development"}</h2>
          <p className="text-sm text-slate-300">{strings?.contactDesc || "AI-powered NSAP insights delivered with transparency, inclusion, and citizen-first governance."}</p>
        </div>
        <div className="space-y-3">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-400">{strings?.partnersTitle || "Partners"}</p>
          <div className="space-y-2 text-sm text-slate-200">
            <p>IBM SkillsBuild</p>
            <p>Edunet Foundation</p>
            <p>Government of India</p>
          </div>
        </div>
        <div className="space-y-3">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-400">{strings?.connectTitle || "Connect"}</p>
          <div className="space-y-2 text-sm text-slate-300">
            <a className="inline-flex items-center gap-2 text-slate-200 transition hover:text-white" href="https://github.com/phartyaldiksha05-ux/Predicting-NSAP-Scheme-Eligibility-using-ML" target="_blank" rel="noreferrer">
              <Github className="h-4 w-4" /> {strings?.github || "GitHub repository"}
            </a>
            <a className="inline-flex items-center gap-2 text-slate-200 transition hover:text-white" href="mailto:info@nsap.gov.in">
              <Mail className="h-4 w-4" /> {strings?.email || "info@nsap.gov.in"}
            </a>
            <a className="inline-flex items-center gap-2 text-slate-200 transition hover:text-white" href="https://nsap.gov.in" target="_blank" rel="noreferrer">
              <Globe className="h-4 w-4" /> {strings?.website || "nsap.gov.in"}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
