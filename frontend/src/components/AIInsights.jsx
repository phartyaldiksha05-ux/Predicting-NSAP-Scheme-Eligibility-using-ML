import { motion } from "framer-motion";
import { Star, AlertTriangle, TrendingUp, ShieldAlert, Sparkles } from "lucide-react";

const insights = [
  { title: "Top states by beneficiaries", value: "UP, MP, WB", icon: TrendingUp, tone: "from-sky-500 to-cyan-500" },
  { title: "Duplicate beneficiary risk", value: "2.8%", icon: AlertTriangle, tone: "from-orange-400 to-red-400" },
  { title: "Fraud alert events", value: "5 active", icon: ShieldAlert, tone: "from-fuchsia-500 to-violet-500" },
  { title: "AI summary confidence", value: "91%", icon: Star, tone: "from-emerald-400 to-lime-400" },
];

export default function AIInsights({ searchQuery, onAskAssistant, assistantLabel, strings }) {
  const normalizedQuery = searchQuery?.trim().toLowerCase() || "";
  const filteredInsights = insights.filter((item) => {
    if (!normalizedQuery) return true;
    return (
      item.title.toLowerCase().includes(normalizedQuery) ||
      item.value.toLowerCase().includes(normalizedQuery)
    );
  });

  return (
    <aside className="sticky top-24 space-y-6 xl:top-28">
      <div className="rounded-[2rem] border border-white/10 bg-slate-950/75 p-6 shadow-2xl shadow-slate-950/20 backdrop-blur-xl">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-slate-400">{strings?.title || "AI Insights panel"}</p>
            <h2 className="mt-2 text-xl font-semibold text-white">{strings?.headline || "Actionable intelligence"}</h2>
          </div>
          <Sparkles className="h-6 w-6 text-cyan-300" />
        </div>

        <div className="mt-6 space-y-4">
          {filteredInsights.length > 0 ? (
            filteredInsights.map((item) => {
              const Icon = item.icon;
              return (
                <motion.div key={item.title} whileHover={{ scale: 1.02 }} className="rounded-3xl border border-white/10 bg-slate-900/80 p-4 shadow-inner shadow-slate-950/10">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm text-slate-400">{item.title}</p>
                      <p className="mt-2 text-2xl font-semibold text-white">{item.value}</p>
                    </div>
                    <div className={`flex h-12 w-12 items-center justify-center rounded-3xl bg-gradient-to-br ${item.tone} text-white`}>
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>
                </motion.div>
              );
            })
          ) : (
            <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 text-sm text-slate-300">
              No insights match your search. Try another query.
            </div>
          )}
        </div>
      </div>

      <div className="rounded-[2rem] border border-white/10 bg-slate-950/75 p-6 shadow-2xl shadow-slate-950/20 backdrop-blur-xl">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-400">{strings?.alertTitle || "Priority alert"}</p>
        <h2 className="mt-2 text-xl font-semibold text-white">{strings?.alertHeadline || "Unusual district spikes"}</h2>
        <p className="mt-3 text-sm leading-6 text-slate-300">{strings?.alertDescription || "AI detected a 38% spike in beneficiary registration from rural Jharkhand districts in the past 48 hours. Verify the data source and perform field validation."}</p>
        <div className="mt-5 rounded-3xl bg-slate-900/80 p-4 text-sm text-slate-200">
          <p className="font-semibold text-white">{strings?.auditRecommendation || "Audit recommendation:"}</p>
          <p className="mt-2 text-slate-300">{strings?.auditDetails || "Trigger local verification, cross-match Aadhaar records, and monitor duplicate enrollments across nearby regions."}</p>
        </div>
      </div>

      <button
        type="button"
        onClick={onAskAssistant}
        className="fixed bottom-6 right-6 z-50 inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-sky-500 to-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 shadow-2xl shadow-cyan-500/30 transition hover:scale-105 xl:relative xl:bottom-auto xl:right-auto"
      >
        <Sparkles className="h-5 w-5" /> {assistantLabel || "Ask AI Assistant"}
      </button>
    </aside>
  );
}
