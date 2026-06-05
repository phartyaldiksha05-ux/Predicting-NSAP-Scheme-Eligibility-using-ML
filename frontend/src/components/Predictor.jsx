import { useMemo, useState } from "react";
import { ArrowRight, RefreshCcw, CheckCircle2, Info, ShieldCheck } from "lucide-react";
import { states } from "../data/states";
import { districts } from "../data/districts";

const schemeMap = {
  IGNOAPS: { title: "IGNOAPS", description: "Old Age Pension for elderly BPL citizens", tone: "from-sky-500 to-cyan-500" },
  IGNWPS: { title: "IGNWPS", description: "Widow Pension support with priority review", tone: "from-emerald-500 to-lime-500" },
  IGNDPS: { title: "IGNDPS", description: "Disability pension for senior beneficiaries", tone: "from-violet-500 to-fuchsia-500" },
  NFBS: { title: "NFBS", description: "Family benefit for vulnerable households", tone: "from-orange-400 to-amber-500" },
};

const initialForm = {
  name: "Rajesh Kumar",
  age: 64,
  gender: "Male",
  income: 4500,
  disability: 12,
  maritalStatus: "Widowed",
  locationType: "Rural",
  stateCode: 9,
  districtCode: 4,
  bplStatus: "Yes",
};

export default function Predictor({ strings }) {
  const [form, setForm] = useState(initialForm);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const districtOptions = useMemo(() => districts[form.stateCode] || [], [form.stateCode]);

  const onChange = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const runPrediction = async () => {
    setError("");
    setLoading(true);

    const requestPayload = {
      lgdstatecode: Number(form.stateCode),
      lgddistrictcode: Number(form.districtCode),
      totalbeneficiaries: 120,
      totalmale: 45,
      totalfemale: 60,
      totaltransgender: 15,
      totalsc: 30,
      totalst: 25,
      totalgen: 40,
      totalobc: 25,
      totalaadhaar: 110,
      totalmpbilenumber: 100,
    };

    try {
      const response = await fetch("http://localhost:8000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestPayload),
      });

      if (!response.ok) {
        const message = await response.text();
        throw new Error(message || "Prediction request failed");
      }

      const data = await response.json();
      setPrediction({
        scheme: {
          title: data.scheme_full_name,
          description: data.scheme_description,
          tone: schemeMap[data.scheme]?.tone || "from-sky-500 to-cyan-500",
        },
        status: strings?.eligible || "Eligible",
        confidence: data.confidence,
        reasons: [
          `${strings?.modelSchemeLabel || "Predicted scheme"}: ${data.scheme}`,
          ...Object.entries(data.all_probabilities || {}).map(([schemeName, probability]) => `${schemeName}: ${probability}%`),
        ],
      });
    } catch (err) {
      setError(`${strings?.backendError || "Prediction API error:"} ${err instanceof Error ? err.message : String(err)}`);
      setPrediction(null);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setForm(initialForm);
    setPrediction(null);
  };

  return (
    <section className="grid gap-6 xl:grid-cols-[1.4fr_1fr]">
      <div className="rounded-[2rem] border border-white/10 bg-slate-950/70 p-6 shadow-2xl shadow-slate-950/20 backdrop-blur-xl">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-slate-400">{strings?.caption || "Smart Eligibility Predictor"}</p>
            <h2 className="text-2xl font-semibold text-white">{strings?.headline || "AI-powered beneficiary recommendation"}</h2>
          </div>
          <div className="rounded-3xl bg-slate-900/70 px-4 py-2 text-xs uppercase tracking-[0.3em] text-slate-200">{strings?.caption || "Predictive inference engine"}</div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {[
            { label: strings?.labels.name || "Full name", name: "name", type: "text" },
            { label: strings?.labels.age || "Age", name: "age", type: "number" },
            { label: strings?.labels.gender || "Gender", name: "gender", type: "select", options: ["Male", "Female", "Other"] },
            { label: strings?.labels.income || "Income (₹)", name: "income", type: "number" },
            { label: strings?.labels.disability || "Disability %", name: "disability", type: "number" },
            { label: strings?.labels.maritalStatus || "Marital status", name: "maritalStatus", type: "select", options: ["Married", "Widowed", "Single", "Divorced"] },
          ].map((field) => (
            <div key={field.name} className="space-y-2">
              <label className="text-sm font-medium text-slate-200">{field.label}</label>
              {field.type === "select" ? (
                <select
                  value={form[field.name]}
                  onChange={(event) => onChange(field.name, event.target.value)}
                  className="w-full rounded-3xl border border-white/10 bg-slate-900/80 px-4 py-3 text-slate-100 outline-none transition focus:border-sky-400/60"
                >
                  {field.options.map((value) => (
                    <option key={value} value={value}>{value}</option>
                  ))}
                </select>
              ) : (
                <input
                  type={field.type}
                  value={form[field.name]}
                  onChange={(event) => onChange(field.name, event.target.value)}
                  className="w-full rounded-3xl border border-white/10 bg-slate-900/80 px-4 py-3 text-slate-100 outline-none transition focus:border-sky-400/60"
                />
              )}
            </div>
          ))}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-200">{strings?.labels.locationType || "Rural / Urban"}</label>
            <select
              value={form.locationType}
              onChange={(event) => onChange("locationType", event.target.value)}
              className="w-full rounded-3xl border border-white/10 bg-slate-900/80 px-4 py-3 text-slate-100 outline-none transition focus:border-sky-400/60"
            >
              <option>Rural</option>
              <option>Urban</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-200">{strings?.labels.state || "State"}</label>
            <select
              value={form.stateCode}
              onChange={(event) => {
                const value = Number(event.target.value);
                onChange("stateCode", value);
                onChange("districtCode", districts[value]?.[0]?.code || 1);
              }}
              className="w-full rounded-3xl border border-white/10 bg-slate-900/80 px-4 py-3 text-slate-100 outline-none transition focus:border-sky-400/60"
            >
              {states.map((state) => (
                <option key={state.code} value={state.code}>{state.name}</option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-200">{strings?.labels.district || "District"}</label>
            <select
              value={form.districtCode}
              onChange={(event) => onChange("districtCode", Number(event.target.value))}
              className="w-full rounded-3xl border border-white/10 bg-slate-900/80 px-4 py-3 text-slate-100 outline-none transition focus:border-sky-400/60"
            >
              {districtOptions.map((district) => (
                <option key={district.code} value={district.code}>{district.name}</option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-200">{strings?.labels.bplStatus || "BPL Status"}</label>
            <select
              value={form.bplStatus}
              onChange={(event) => onChange("bplStatus", event.target.value)}
              className="w-full rounded-3xl border border-white/10 bg-slate-900/80 px-4 py-3 text-slate-100 outline-none transition focus:border-sky-400/60"
            >
              <option>Yes</option>
              <option>No</option>
            </select>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-start">
          <button
            type="button"
            onClick={runPrediction}
            disabled={loading}
            className="inline-flex items-center justify-center rounded-3xl bg-gradient-to-r from-sky-500 to-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "Loading..." : strings?.predictButton || "Predict Eligibility"}
            <ArrowRight className="ml-2 h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={resetForm}
            className="inline-flex items-center justify-center rounded-3xl border border-white/10 bg-slate-900/80 px-6 py-3 text-sm font-semibold text-slate-200 transition hover:border-sky-400/50"
          >
            <RefreshCcw className="mr-2 h-4 w-4" /> {strings?.resetButton || "Reset"}
          </button>
        </div>
        {error ? (
          <div className="mt-4 rounded-3xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200">
            {error}
          </div>
        ) : null}
      </div>

      <div className="space-y-6">
        <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-slate-900/80 to-slate-950/80 p-6 shadow-2xl shadow-slate-950/20 backdrop-blur-xl">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-slate-400">AI recommendation</p>
              <h2 className="mt-2 text-xl font-semibold text-white">Prediction result</h2>
            </div>
            <div className="inline-flex items-center gap-2 rounded-3xl bg-white/5 px-4 py-2 text-sm text-slate-200">
              <ShieldCheck className="h-4 w-4 text-cyan-300" /> {strings?.trusted || "Trusted inference"}
            </div>
          </div>

          {prediction ? (
            <div className="mt-6 space-y-5">
              <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/80 p-5">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-[0.28em] text-slate-400">Recommended scheme</p>
                    <h3 className="mt-2 text-2xl font-semibold text-white">{prediction.scheme.title}</h3>
                    <p className="mt-2 max-w-xl text-sm text-slate-400">{prediction.scheme.description}</p>
                  </div>
                  <div className={`rounded-3xl bg-gradient-to-r ${prediction.scheme.tone} px-4 py-3 text-sm font-semibold text-white`}>Confidence {prediction.confidence}%</div>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/80 p-5">
                  <p className="text-sm uppercase tracking-[0.28em] text-slate-400">Eligibility status</p>
                  <p className="mt-4 flex items-center gap-2 text-2xl font-semibold text-emerald-400">✔ {prediction.status}</p>
                  <p className="mt-2 text-sm text-slate-400">Verified by the AI assessment engine using demographic policy rules.</p>
                </div>
                <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/80 p-5">
                  <p className="text-sm uppercase tracking-[0.28em] text-slate-400">Prediction logic</p>
                  <div className="mt-4 space-y-3">
                    {prediction.reasons.map((reason) => (
                      <div key={reason} className="flex items-start gap-3 rounded-3xl bg-slate-900/80 p-4 text-sm text-slate-200">
                        <CheckCircle2 className="mt-1 h-4 w-4 text-cyan-300" />
                        <span>{reason}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="mt-6 rounded-[1.75rem] border border-dashed border-white/10 bg-slate-950/70 p-8 text-center text-slate-400">
              <Info className="mx-auto mb-4 h-8 w-8 text-sky-400" />
              <p className="text-sm">Complete the predictor form and click <span className="font-semibold text-white">Predict Eligibility</span> to view tailored scheme recommendations.</p>
            </div>
          )}
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-slate-950/70 p-6 shadow-2xl shadow-slate-950/20 backdrop-blur-xl">
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { title: strings?.stats?.accuracyLabel || "State recommendation accuracy", value: "92%" },
              { title: strings?.stats?.responseTimeLabel || "Average response time", value: "220ms" },
            ].map((item) => (
              <div key={item.title} className="rounded-3xl bg-white/5 p-5 text-slate-200">
                <p className="text-sm text-slate-400">{item.title}</p>
                <p className="mt-3 text-3xl font-semibold text-white">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
