import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  PieChart, Pie, Cell, Legend, ResponsiveContainer
} from "recharts";

const schemeData = [
  { name: "IGNOAPS", value: 45, color: "#e65100" },
  { name: "IGNWPS", value: 25, color: "#6a1b9a" },
  { name: "IGNDPS", value: 20, color: "#1b5e20" },
  { name: "NFBS", value: 10, color: "#0d47a1" },
];

const accuracyData = [
  { name: "IGNDPS", precision: 89, recall: 100, f1: 94 },
  { name: "IGNOAPS", precision: 100, recall: 100, f1: 100 },
  { name: "IGNWPS", precision: 100, recall: 80, f1: 89 },
];

const modelData = [
  { name: "Logistic Regression", accuracy: 72 },
  { name: "Random Forest", accuracy: 95 },
  { name: "XGBoost", accuracy: 88 },
];

export default function Dashboard({ dateRange, strings }: { dateRange: any; strings: any }) {
  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>📊 {strings.title}</h2>
        <p>{strings.subtitle}</p>
        <p className="text-sm text-slate-400">{strings.currentView || `Current view: ${dateRange.label}`}</p>
      </div>

      {/* Stats Cards */}
      <div className="dash-stats">
        {strings.cards.map((s: any, i: number) => (
          <div className="dash-stat-card" key={i}>
            <div className="dash-stat-value text-white">{s.value}</div>
            <div className="dash-stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="charts-row">
        {/* Pie Chart */}
        <div className="chart-card">
          <h3>📊 {strings.schemeDistribution}</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={schemeData}
                cx="50%"
                cy="50%"
                outerRadius={90}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}%`}
                labelLine={true}
              >
                {schemeData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Model Comparison */}
        <div className="chart-card">
          <h3>🤖 {strings.modelComparison}</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={modelData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} />
              <YAxis domain={[0, 100]} />
              <Tooltip formatter={(val) => `${val}%`} />
              <Bar dataKey="accuracy" radius={[6, 6, 0, 0]}>
                {modelData.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={entry.accuracy === 95 ? "#003087" : "#90b8e8"}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="charts-row">
        {/* Precision Recall F1 */}
        <div className="chart-card full-width">
          <h3>📈 {strings.performance}</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={accuracyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis domain={[0, 100]} />
              <Tooltip formatter={(val) => `${val}%`} />
              <Legend />
              <Bar dataKey="precision" fill="#003087" radius={[4, 4, 0, 0]} />
              <Bar dataKey="recall" fill="#FF9933" radius={[4, 4, 0, 0]} />
              <Bar dataKey="f1" fill="#138808" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* About Project */}
      <div className="about-card">
        <h3>ℹ️ {strings.about.title}</h3>
        <div className="about-grid">
          <div className="about-item">
            <strong>{strings.about.problem}</strong>
            <p>{strings.about.problemDesc}</p>
          </div>
          <div className="about-item">
            <strong>{strings.about.dataset}</strong>
            <p>{strings.about.datasetDesc}</p>
          </div>
          <div className="about-item">
            <strong>{strings.about.technology}</strong>
            <p>{strings.about.technologyDesc}</p>
          </div>
          <div className="about-item">
            <strong>{strings.about.impact}</strong>
            <p>{strings.about.impactDesc}</p>
          </div>
        </div>
      </div>
    </div>
  );
}