import { motion } from "framer-motion";
import { ArrowUpRight, ShieldCheck, HeartHandshake, Activity, Sparkles } from "lucide-react";

const highlightCards = [
  { label: "Total Beneficiaries", value: "12.4M", icon: Activity, tone: "from-sky-500 to-indigo-600" },
  { label: "Eligible Citizens", value: "8.7M", icon: ShieldCheck, tone: "from-emerald-500 to-teal-500" },
  { label: "Aadhaar Linked", value: "94%", icon: Sparkles, tone: "from-violet-500 to-fuchsia-500" },
  { label: "Disability Support Cases", value: "1.1M", icon: HeartHandshake, tone: "from-orange-400 to-amber-500" },
];

export default function Dashboard({ dateRange, strings }) {
  return (
    <section className="space-y-8">
      <div className="rounded-[2rem] border border-white/10 bg-slate-950/65 p-6 shadow-2xl shadow-slate-950/20 backdrop-blur-xl">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <span className="inline-flex rounded-full bg-sky-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-sky-200">
              Real-time analytics
            </span>
            <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">Welcome to the NSAP AI Command Center</h2>
            <p className="mt-3 max-w-xl text-slate-300 sm:text-lg">
              Monitor beneficiary distribution, eligibility forecasts, and digital inclusion across India with intelligent government-grade insights.
            </p>
          </div>
          <div className="inline-flex rounded-3xl bg-white/5 px-5 py-4 text-sm text-slate-200 shadow-lg shadow-slate-950/20 ring-1 ring-white/10">
            <span className="font-semibold text-sky-200">Current view:</span>
            <span className="ml-2 text-slate-300">{dateRange.label}</span>
          </div>
        </div>

        <div className="mt-8 grid gap-4 xl:grid-cols-4">
          {highlightCards.map((card) => {
            const Icon = card.icon;
            return (
              <motion.div key={card.label} whileHover={{ y: -6 }} className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-gradient-to-br from-slate-900/90 to-slate-950/90 p-5 shadow-2xl shadow-slate-950/20 ring-1 ring-white/5">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm uppercase tracking-[0.24em] text-slate-400">{card.label}</p>
                    <h3 className="mt-3 text-3xl font-semibold text-white">{card.value}</h3>
                  </div>
                  <div className={`flex h-14 w-14 items-center justify-center rounded-3xl bg-gradient-to-br ${card.tone} text-white shadow-xl shadow-slate-950/30`}>
                    <Icon className="h-6 w-6" />
                  </div>
                </div>
                <div className="mt-5 flex items-center gap-2 text-sm text-emerald-400">
                  <ArrowUpRight className="h-4 w-4" />
                  <span>Improved by 12% since last quarter</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.8fr_1fr]">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-[2rem] border border-white/10 bg-slate-950/70 p-6 shadow-2xl shadow-slate-950/20 backdrop-blur-xl">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-xl font-semibold text-white">Government Impact Summary</h3>
              <p className="text-sm text-slate-400">High-value trends across inclusion, service delivery, and eligibility.</p>
            </div>
            <span className="rounded-full bg-slate-900/80 px-4 py-2 text-xs uppercase tracking-[0.3em] text-slate-300">AI recommendations active</span>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl bg-white/5 p-5 text-slate-200 shadow-inner shadow-slate-950/10">
              <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Active schemes monitored</p>
              <p className="mt-3 text-3xl font-semibold">18+</p>
              <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-800/80">
                <div className="h-full w-5/6 rounded-full bg-gradient-to-r from-sky-500 to-cyan-400" />
              </div>
            </div>
            <div className="rounded-3xl bg-white/5 p-5 text-slate-200 shadow-inner shadow-slate-950/10">
              <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Average eligibility confidence</p>
              <p className="mt-3 text-3xl font-semibold">89%</p>
              <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-800/80">
                <div className="h-full w-11/12 rounded-full bg-gradient-to-r from-emerald-400 to-lime-400" />
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-slate-900/80 to-slate-950/80 p-6 shadow-2xl shadow-slate-950/20 backdrop-blur-xl">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Digital inclusion pulse</p>
              <h3 className="mt-2 text-xl font-semibold text-white">Coverage by priority segment</h3>
            </div>
            <div className="rounded-3xl bg-slate-800/70 px-4 py-2 text-xs uppercase tracking-[0.28em] text-slate-200">Updated 2 mins ago</div>
          </div>

          <div className="mt-6 space-y-4">
            {[
              { label: "Aadhaar coverage", value: 94, tone: "from-cyan-500 to-sky-400" },
              { label: "Mobile linking", value: 88, tone: "from-emerald-400 to-lime-400" },
              { label: "Bank account linked", value: 81, tone: "from-violet-500 to-fuchsia-500" },
            ].map((item) => (
              <div key={item.label} className="rounded-3xl bg-white/5 p-4">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-sm text-slate-300">{item.label}</p>
                  <p className="text-lg font-semibold text-white">{item.value}%</p>
                </div>
                <div className="mt-3 h-3 overflow-hidden rounded-full bg-slate-800/80">
                  <div className={`h-full rounded-full bg-gradient-to-r ${item.tone}`} style={{ width: `${item.value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
