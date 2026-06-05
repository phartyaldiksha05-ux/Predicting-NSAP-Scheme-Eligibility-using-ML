import { Bell, Search, Sparkles, SunMoon, User, Mic2 } from "lucide-react";

export default function Navbar({ theme, onThemeToggle, search, onSearchChange, language, onLanguageChange, searchPlaceholder, onVoiceAssistant, strings }) {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl shadow-2xl shadow-slate-950/30">
      <div className="mx-auto flex max-w-screen-2xl flex-col gap-4 px-4 py-4 sm:px-6 lg:px-8 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex flex-1 items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-gradient-to-br from-sky-500 to-indigo-600 text-white shadow-lg shadow-sky-500/20 ring-1 ring-white/20">
            <span className="text-xl">🇮🇳</span>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300/90">Ministry of Rural Development</p>
            <h1 className="text-xl font-semibold text-white sm:text-2xl">AI-Powered NSAP Welfare Recommendation</h1>
            <p className="text-sm text-slate-300">Government of India analytics platform with intelligent eligibility forecasting.</p>
          </div>
          <span className="inline-flex items-center rounded-full border border-cyan-300/20 bg-slate-900/70 px-3 py-1 text-xs uppercase tracking-[0.3em] text-cyan-200 shadow-inner shadow-cyan-500/10">
            <Sparkles className="mr-1 h-3.5 w-3.5" /> AI
          </span>
        </div>

        <div className="flex w-full flex-col gap-3 xl:w-auto xl:flex-row xl:items-center xl:justify-end">
          <div className="relative min-w-0 flex-1 xl:max-w-[420px]">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              value={search}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder={searchPlaceholder || "Search reports, states, schemes..."}
              className="w-full rounded-2xl border border-white/10 bg-slate-900/80 py-3 pl-10 pr-4 text-sm text-slate-100 outline-none transition focus:border-sky-400/60 focus:bg-slate-900"
            />
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onThemeToggle}
              className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-slate-900/80 text-slate-200 transition hover:border-cyan-400/40 hover:text-white"
              aria-label={strings?.themeToggle || "Toggle theme"}
            >
              <SunMoon className="h-5 w-5" />
            </button>
            <button className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-slate-900/80 text-slate-200 transition hover:border-cyan-400/40 hover:text-white" aria-label={strings?.notifications || "Notifications"}>
              <Bell className="h-5 w-5" />
            </button>
            <select
              value={language}
              onChange={(event) => onLanguageChange(event.target.value)}
              className="h-12 rounded-2xl border border-white/10 bg-slate-900/80 px-3 text-sm text-slate-100 outline-none transition hover:border-cyan-400/40"
              aria-label="Language selector"
            >
              <option value="en">EN</option>
              <option value="hi">HI</option>
            </select>
            <button
              onClick={onVoiceAssistant}
              className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-cyan-500 to-sky-500 text-white shadow-lg shadow-cyan-500/20"
              aria-label={strings?.voiceAssistant || "Voice assistant"}
            >
              <Mic2 className="h-5 w-5" />
            </button>
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-slate-800 text-white shadow-inner shadow-slate-950/30">
              <User className="h-5 w-5" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
