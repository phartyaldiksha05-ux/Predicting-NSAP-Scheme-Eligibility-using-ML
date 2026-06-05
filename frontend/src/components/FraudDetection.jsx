import { AlertTriangle, ShieldCheck, Database, Zap } from "lucide-react";

const fraudItems = [
  { key: "duplicateRecords", title: "Duplicate records", value: "1.9k", severity: "High", description: "High similarity detected across beneficiary entries.", icon: AlertTriangle, color: "bg-rose-500/10 text-rose-300" },
  { key: "invalidAadhaar", title: "Invalid Aadhaar counts", value: "420", severity: "Medium", description: "Pending manual review for Aadhaar mismatches.", icon: ShieldCheck, color: "bg-amber-500/10 text-amber-300" },
  { key: "suddenSpikes", title: "Sudden spikes", value: "7 districts", severity: "Critical", description: "Unusual enrollment growth in remote zones.", icon: Zap, color: "bg-fuchsia-500/10 text-fuchsia-300" },
  { key: "suspiciousRatios", title: "Suspicious ratios", value: "12 anomalies", severity: "Watch", description: "Demographic ratios deviate from expected baselines.", icon: Database, color: "bg-sky-500/10 text-sky-300" },
];

export default function FraudDetection({ strings }) {
  return (
    <section className="space-y-6">
      <div className="rounded-[2rem] border border-white/10 bg-slate-950/70 p-6 shadow-2xl shadow-slate-950/20 backdrop-blur-xl">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-slate-400">{strings?.subtitle || "Fraud detection"}</p>
            <h2 className="text-2xl font-semibold text-white">{strings?.title || "Integrity and risk monitoring"}</h2>
          </div>
          <span className="rounded-3xl bg-rose-500/10 px-4 py-2 text-xs uppercase tracking-[0.3em] text-rose-200">{strings?.tag || "Proactive risk alerts"}</span>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {fraudItems.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.key} className="rounded-[1.75rem] border border-white/10 bg-slate-900/80 p-5 shadow-inner shadow-slate-950/10">
                <div className="flex items-center justify-between gap-3">
                  <div className={`inline-flex h-11 w-11 items-center justify-center rounded-3xl ${item.color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="rounded-full bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.3em] text-slate-300">{strings?.severityLabels?.[item.key] || item.severity}</span>
                </div>
                <div className="mt-5">
                  <p className="text-sm text-slate-400">{strings?.titles?.[item.key] || item.title}</p>
                  <p className="mt-3 text-3xl font-semibold text-white">{item.value}</p>
                </div>
                <p className="mt-4 text-sm leading-6 text-slate-400">{strings?.descriptions?.[item.key] || item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
