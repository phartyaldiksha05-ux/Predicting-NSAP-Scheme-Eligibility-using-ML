import { motion } from "framer-motion";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const stateBeneficiaries = [
  { name: "UP", value: 2200 },
  { name: "MP", value: 1800 },
  { name: "WB", value: 1500 },
  { name: "Bihar", value: 1300 },
  { name: "Assam", value: 1100 },
];

const schemeDistribution = [
  { name: "IGNOAPS", value: 38 },
  { name: "IGNWPS", value: 24 },
  { name: "IGNDPS", value: 16 },
  { name: "NFBS", value: 22 },
];

const genderRatio = [
  { name: "Male", value: 49 },
  { name: "Female", value: 47 },
  { name: "Other", value: 4 },
];

const socialCategory = [
  { name: "SC", value: 28 },
  { name: "ST", value: 20 },
  { name: "OBC", value: 34 },
  { name: "General", value: 18 },
];

const monthlyTrend = [
  { month: "Jan", subscribers: 960, applications: 780 },
  { month: "Feb", subscribers: 1080, applications: 820 },
  { month: "Mar", subscribers: 1250, applications: 900 },
  { month: "Apr", subscribers: 1370, applications: 980 },
  { month: "May", subscribers: 1520, applications: 1040 },
  { month: "Jun", subscribers: 1680, applications: 1180 },
];

const aadhaarProgress = [
  { name: "Validated", value: 78 },
  { name: "Pending", value: 22 },
];

const colors = ["#38bdf8", "#818cf8", "#fb7185", "#fbbf24"];

export default function Analytics({ strings }) {
  return (
    <section className="space-y-6">
      <div className="grid gap-6 xl:grid-cols-[1.3fr_0.9fr]">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-[2rem] border border-white/10 bg-slate-950/70 p-6 shadow-2xl shadow-slate-950/20 backdrop-blur-xl">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-slate-400">{strings?.subtitle || "State-wise analytics"}</p>
              <h2 className="text-xl font-semibold text-white">{strings?.title || "State beneficiaries distribution"}</h2>
            </div>
            <span className="rounded-3xl bg-slate-900/80 px-4 py-2 text-xs uppercase tracking-[0.3em] text-slate-200">{strings?.tag || "Insight mode"}</span>
          </div>
          <div className="mt-6 h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stateBeneficiaries} margin={{ top: 20, right: 0, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="4 4" stroke="#334155" vertical={false} />
                <XAxis dataKey="name" stroke="#94a3b8" tickLine={false} />
                <YAxis stroke="#94a3b8" tickLine={false} />
                <Tooltip contentStyle={{ background: "#0f172a", border: "1px solid rgba(148, 163, 184, 0.2)" }} />
                <Bar dataKey="value" radius={[12, 12, 0, 0]} fill="url(#stateGradient)">
                  {stateBeneficiaries.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                  ))}
                </Bar>
                <defs>
                  <linearGradient id="stateGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#38bdf8" stopOpacity={0.9} />
                    <stop offset="100%" stopColor="#0f172a" stopOpacity={0.3} />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-[2rem] border border-white/10 bg-slate-950/70 p-6 shadow-2xl shadow-slate-950/20 backdrop-blur-xl">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-slate-400">{strings?.aadhaarSubtitle || "Digital linking progress"}</p>
              <h2 className="text-xl font-semibold text-white">{strings?.aadhaarTitle || "Aadhaar validation progress"}</h2>
            </div>
            <span className="rounded-3xl bg-slate-900/80 px-4 py-2 text-xs uppercase tracking-[0.3em] text-slate-200">{strings?.tag || "Verified records"}</span>
          </div>
          <div className="mt-6 h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={aadhaarProgress} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={70} outerRadius={110} paddingAngle={4}>
                  {aadhaarProgress.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 0 ? "#38bdf8" : "#334155"} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: "#0f172a", border: "1px solid rgba(148, 163, 184, 0.2)" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-[2rem] border border-white/10 bg-slate-950/70 p-6 shadow-2xl shadow-slate-950/20 backdrop-blur-xl">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-slate-400">{strings?.schemeDistribution || "Scheme distribution"}</p>
              <h2 className="text-lg font-semibold text-white">{strings?.schemeDistribution || "Scheme breakdown"}</h2>
            </div>
          </div>
          <div className="mt-6 h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={schemeDistribution} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label>
                  {schemeDistribution.map((entry, index) => (
                    <Cell key={`cell-${entry.name}`} fill={colors[index % colors.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: "#0f172a", border: "1px solid rgba(148, 163, 184, 0.2)" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-[2rem] border border-white/10 bg-slate-950/70 p-6 shadow-2xl shadow-slate-950/20 backdrop-blur-xl">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-slate-400">{strings?.genderRatio || "Gender ratio"}</p>
            <h2 className="text-lg font-semibold text-white">{strings?.genderRatio || "Population share"}</h2>
          </div>
          <div className="mt-6 h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={genderRatio} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={48} outerRadius={100} paddingAngle={4}>
                  {genderRatio.map((entry, index) => (
                    <Cell key={`cell-${entry.name}`} fill={colors[index % colors.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: "#0f172a", border: "1px solid rgba(148, 163, 184, 0.2)" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-[2rem] border border-white/10 bg-slate-950/70 p-6 shadow-2xl shadow-slate-950/20 backdrop-blur-xl">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-slate-400">{strings?.socialCategory || "Social category"}</p>
            <h2 className="text-lg font-semibold text-white">{strings?.socialCategory || "Community support"}</h2>
          </div>
          <div className="mt-6 h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={socialCategory} margin={{ top: 20, right: 0, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="4 4" stroke="#334155" vertical={false} />
                <XAxis dataKey="name" stroke="#94a3b8" tickLine={false} />
                <YAxis stroke="#94a3b8" tickLine={false} />
                <Tooltip contentStyle={{ background: "#0f172a", border: "1px solid rgba(148, 163, 184, 0.2)" }} />
                <Bar dataKey="value" radius={[12, 12, 0, 0]} fill="#38bdf8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-[2rem] border border-white/10 bg-slate-950/70 p-6 shadow-2xl shadow-slate-950/20 backdrop-blur-xl">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-slate-400">{strings?.monthlySubtitle || "Monthly trend"}</p>
            <h2 className="text-xl font-semibold text-white">{strings?.monthlyTrend || "Beneficiary enrollment & verification"}</h2>
          </div>
        </div>
        <div className="mt-6 h-[340px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={monthlyTrend} margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="trendGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.6} />
                  <stop offset="95%" stopColor="#0f172a" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid opacity={0.2} vertical={false} stroke="#334155" strokeDasharray="4 4" />
              <XAxis dataKey="month" stroke="#94a3b8" tickLine={false} />
              <YAxis stroke="#94a3b8" tickLine={false} />
              <Tooltip contentStyle={{ background: "#0f172a", border: "1px solid rgba(148, 163, 184, 0.2)" }} />
              <Area type="monotone" dataKey="subscribers" stroke="#38bdf8" strokeWidth={3} fill="url(#trendGradient)" activeDot={{ r: 6 }} />
              <Line type="monotone" dataKey="applications" stroke="#facc15" strokeWidth={3} dot={{ r: 4 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </section>
  );
}
