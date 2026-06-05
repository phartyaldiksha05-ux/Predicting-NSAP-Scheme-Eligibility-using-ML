import { useEffect, useMemo, useState } from "react";
import { Globe2 } from "lucide-react";
import Navbar from "./components/Navbar.jsx";
import Dashboard from "./components/Dashboard.jsx";
import Predictor from "./components/Predictor.jsx";
import Analytics from "./components/Analytics.jsx";
import AIInsights from "./components/AIInsights.jsx";
import FraudDetection from "./components/FraudDetection.jsx";
import Footer from "./components/Footer.jsx";
import { translations, type Language } from "./i18n";
import "./index.css";

const dateRanges = [
  { value: "7d", label: "Last 7 days" },
  { value: "30d", label: "Last 30 days" },
  { value: "90d", label: "Last 90 days" },
  { value: "year", label: "Year to date" },
];

export default function App() {
  const [search, setSearch] = useState("");
  const [theme, setTheme] = useState("dark");
  const [dateRange, setDateRange] = useState(dateRanges[2]);
  const [language, setLanguage] = useState<Language>("en");
  const strings = translations[language];

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const dateRangeOptions = useMemo(() => dateRanges, []);

  const handleAssistantClick = () => {
    window.alert(
      language === "hi"
        ? "AI सहायक अभी निर्माणाधीन है।"
        : "AI assistant is under construction."
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Navbar
        theme={theme}
        onThemeToggle={() => setTheme((value) => (value === "dark" ? "light" : "dark"))}
        search={search}
        onSearchChange={setSearch}
        language={language}
        onLanguageChange={setLanguage}
        searchPlaceholder={strings.searchPlaceholder}
        onVoiceAssistant={handleAssistantClick}
        strings={strings.navbar}
      />

      <main className="mx-auto max-w-screen-2xl space-y-8 px-4 py-6 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] border border-white/10 bg-slate-950/70 p-5 shadow-2xl shadow-slate-950/20 backdrop-blur-xl sm:p-6">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div className="space-y-3">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-400">{strings.executiveControls}</p>
              <h2 className="text-2xl font-semibold text-white">{strings.dashboardTitle}</h2>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-2 rounded-full bg-slate-900/80 px-4 py-2 text-sm text-slate-200">
                <Globe2 className="h-4 w-4 text-cyan-300" />
                <span>{strings.languageLabel}</span>
              </div>
              <button className="rounded-3xl bg-slate-900/90 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">{strings.exportPDF}</button>
              <button className="rounded-3xl bg-slate-900/90 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">{strings.exportCSV}</button>
              <button className="rounded-3xl bg-gradient-to-r from-sky-500 to-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:shadow-glow">{strings.downloadReport}</button>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            {dateRangeOptions.map((range) => (
              <button
                key={range.value}
                type="button"
                onClick={() => setDateRange(range)}
                className={`rounded-full px-4 py-2 text-sm transition ${dateRange.value === range.value ? "bg-sky-500 text-slate-950" : "bg-white/5 text-slate-300 hover:bg-white/10"}`}
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>

        <Dashboard dateRange={dateRange} strings={strings.dashboard} />

        <div className="grid gap-8 xl:grid-cols-[1.8fr_0.9fr]">
          <div className="space-y-8">
            <Predictor strings={strings.predictor} />
            <Analytics strings={strings.analytics} />
            <FraudDetection strings={strings.fraud} />
          </div>
          <AIInsights searchQuery={search} onAskAssistant={handleAssistantClick} assistantLabel={strings.askAssistant} strings={strings.insights} />
        </div>
      </main>

      <div className="mx-auto max-w-screen-2xl px-4 pb-10 sm:px-6 lg:px-8">
        <Footer strings={strings.footer} />
      </div>
    </div>
  );
}
