import { useState } from "react";
import { useLanguage, useUnit } from "../lib/contexts";
import t from "../lib/translations";
import { INDUSTRY_DEFAULTS, APP_CALC_MAP } from "../lib/calculators";
import Footer from "./Footer";

const APP_ICONS = {
  tankPlates: "🛢️",
  nozzleRemoval: "⚙️",
  boilerSupports: "🔧",
  pipeBeveling: "📐",
  columnWork: "🏭",
  tubeRemoval: "🔩",
};

const fmtCurrency = (n) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);

const fmtNum = (n) =>
  new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(n);

const NEWSLETTER_URL = "https://www.linkedin.com/newsletters/industrial-cutting-processes-7419724116267520000/";
const PROFILE_URL = "https://www.linkedin.com/in/guivrossi/";

function getNarrative(appId, data, result, lang) {
  const d = data;
  const narratives = {
    tankPlates: {
      en: `Your team processes an estimated ${fmtNum(result.sheetsPerYear)} sheets per year across ${d.jobsPerYear} jobs. Oxyfuel takes ${d.oxyTimePerSheet} min per sheet vs ${d.plasmaTimePerSheet} min with plasma — saving ${fmtNum(result.timeSavings)} labor hours and eliminating ${fmtCurrency(result.oxyHours * d.oxyGasCostHr - result.plasmaHours * d.plasmaEnergyCostHr)} in gas/energy costs annually.`,
      es: `Su equipo procesa aproximadamente ${fmtNum(result.sheetsPerYear)} chapas por año en ${d.jobsPerYear} trabajos. El oxicombustible toma ${d.oxyTimePerSheet} min por chapa vs ${d.plasmaTimePerSheet} min con plasma, ahorrando ${fmtNum(result.timeSavings)} horas de mano de obra al año.`,
      pt: `Sua equipe processa aproximadamente ${fmtNum(result.sheetsPerYear)} chapas por ano em ${d.jobsPerYear} serviços. O oxicombustível leva ${d.oxyTimePerSheet} min por chapa vs ${d.plasmaTimePerSheet} min com plasma, economizando ${fmtNum(result.timeSavings)} horas de mão de obra por ano.`,
    },
    nozzleRemoval: {
      en: `Your team removes ${fmtNum(result.totalNozzles)} nozzles per year. With disc cutting at ${d.discHoursPerNozzle} hrs each, that's ${fmtNum(result.discHours)} worker-hours. Plasma completes the same work in ${fmtNum(result.plasmaHours)} hours — an ${Math.round((1 - d.plasmaHoursPerNozzle / d.discHoursPerNozzle) * 100)}% reduction, getting vessels back to production ${fmtNum(result.timeSavings)} hours sooner.`,
      es: `Su equipo remueve ${fmtNum(result.totalNozzles)} boquillas por año. Con disco a ${d.discHoursPerNozzle} hrs cada una, eso es ${fmtNum(result.discHours)} horas-trabajador. El plasma completa el mismo trabajo en ${fmtNum(result.plasmaHours)} horas — una reducción del ${Math.round((1 - d.plasmaHoursPerNozzle / d.discHoursPerNozzle) * 100)}%.`,
      pt: `Sua equipe remove ${fmtNum(result.totalNozzles)} bocais por ano. Com disco a ${d.discHoursPerNozzle} hrs cada, são ${fmtNum(result.discHours)} horas-trabalhador. O plasma completa o mesmo trabalho em ${fmtNum(result.plasmaHours)} horas — redução de ${Math.round((1 - d.plasmaHoursPerNozzle / d.discHoursPerNozzle) * 100)}%.`,
    },
    boilerSupports: {
      en: `Your shutdowns involve ${fmtNum(result.totalSupports)} supports per year across ${d.shutdownsPerYear} shutdowns. Disc cutting requires ${fmtNum(result.discHours)} worker-hours. Plasma reduces that to ${fmtNum(result.plasmaHours)} hours — a ${100 - d.plasmaTimePct}% reduction, saving ${fmtNum(result.timeSavings)} hours and removing a critical bottleneck from your maintenance schedule.`,
      es: `Sus paradas involucran ${fmtNum(result.totalSupports)} soportes por año en ${d.shutdownsPerYear} paradas. El disco requiere ${fmtNum(result.discHours)} horas-trabajador. El plasma reduce eso a ${fmtNum(result.plasmaHours)} horas, una reducción del ${100 - d.plasmaTimePct}%.`,
      pt: `Suas paradas envolvem ${fmtNum(result.totalSupports)} suportes por ano em ${d.shutdownsPerYear} paradas. O disco requer ${fmtNum(result.discHours)} horas-trabalhador. O plasma reduz para ${fmtNum(result.plasmaHours)} horas — redução de ${100 - d.plasmaTimePct}%.`,
    },
    pipeBeveling: {
      en: `Your ${d.numWorkers} bevel workers process ${fmtNum(result.totalPipes)} pipes per year. Oxyfuel bevel + grinding totals ${d.oxyBevelMin + d.oxyGrindMin} min per pipe. Plasma reduces that to ${d.plasmaBevelMin + d.plasmaGrindMin} min — saving ${fmtNum(result.timeSavings)} worker-hours annually and delivering a cleaner edge that requires less weld prep.`,
      es: `Sus ${d.numWorkers} trabajadores de biselado procesan ${fmtNum(result.totalPipes)} tuberías por año. Oxicombustible + esmerilado = ${d.oxyBevelMin + d.oxyGrindMin} min por tubería. El plasma reduce eso a ${d.plasmaBevelMin + d.plasmaGrindMin} min, ahorrando ${fmtNum(result.timeSavings)} horas-trabajador al año.`,
      pt: `Seus ${d.numWorkers} trabalhadores de chanframento processam ${fmtNum(result.totalPipes)} tubos por ano. Oxicombustível + esmerilamento = ${d.oxyBevelMin + d.oxyGrindMin} min por tubo. O plasma reduz para ${d.plasmaBevelMin + d.plasmaGrindMin} min, economizando ${fmtNum(result.timeSavings)} horas-trabalhador por ano.`,
    },
    columnWork: {
      en: `Your turnaround teams work on ${fmtNum(result.totalUnits)} components per year. The current method requires ${fmtNum(result.currentHours)} worker-hours. Plasma reduces that to ${fmtNum(result.plasmaHours)} hours with a cleaner cut and smaller heat-affected zone, saving ${fmtNum(result.timeSavings)} hours and reducing the risk of costly structural rework.`,
      es: `Sus equipos de turnaround trabajan en ${fmtNum(result.totalUnits)} componentes por año. El método actual requiere ${fmtNum(result.currentHours)} horas-trabajador. El plasma reduce eso a ${fmtNum(result.plasmaHours)} horas, ahorrando ${fmtNum(result.timeSavings)} horas.`,
      pt: `Suas equipes de turnaround trabalham em ${fmtNum(result.totalUnits)} componentes por ano. O método atual requer ${fmtNum(result.currentHours)} horas-trabalhador. O plasma reduz para ${fmtNum(result.plasmaHours)} horas, economizando ${fmtNum(result.timeSavings)} horas.`,
    },
    tubeRemoval: {
      en: `Your teams remove ${fmtNum(result.totalTubes)} tubes per year. Disc cutting requires ${fmtNum(result.discHours)} worker-hours. Plasma finishes in ${fmtNum(result.plasmaHours)} hours, saving ${fmtNum(result.timeSavings)} hours annually. Crucially, plasma cuts without damaging the surrounding shell — eliminating expensive repair rework that disc cutting can cause.`,
      es: `Sus equipos remueven ${fmtNum(result.totalTubes)} tubos por año. El disco requiere ${fmtNum(result.discHours)} horas-trabajador. El plasma termina en ${fmtNum(result.plasmaHours)} horas, ahorrando ${fmtNum(result.timeSavings)} horas. El plasma corta sin dañar la cubierta circundante.`,
      pt: `Suas equipes removem ${fmtNum(result.totalTubes)} tubos por ano. O disco requer ${fmtNum(result.discHours)} horas-trabalhador. O plasma termina em ${fmtNum(result.plasmaHours)} horas, economizando ${fmtNum(result.timeSavings)} horas. O plasma corta sem danificar o casco circundante.`,
    },
  };
  return narratives[appId]?.[lang] || narratives[appId]?.["en"] || "";
}

function getBreakdown(appId, data, result) {
  const d = data;
  const breakdowns = {
    tankPlates: [
      { label: `${d.sheetsPerJob} sheets × ${d.jobsPerYear} jobs/yr`, value: `${fmtNum(result.sheetsPerYear)} sheets/yr` },
      { label: `Oxyfuel: ${fmtNum(result.sheetsPerYear)} × ${d.oxyTimePerSheet} min ÷ 60`, value: `${fmtNum(result.oxyHours)} hrs/yr` },
      { label: `Plasma: ${fmtNum(result.sheetsPerYear)} × ${d.plasmaTimePerSheet} min ÷ 60`, value: `${fmtNum(result.plasmaHours)} hrs/yr` },
      { label: `Labor savings: ${fmtNum(result.timeSavings)} hrs × $${d.laborRate}/hr`, value: fmtCurrency(result.timeSavings * d.laborRate) },
      { label: `Gas/energy savings: oxy $${d.oxyGasCostHr}/hr vs plasma $${d.plasmaEnergyCostHr}/hr`, value: fmtCurrency(result.oxyHours * d.oxyGasCostHr - result.plasmaHours * d.plasmaEnergyCostHr) },
      { label: `Equipment savings: oxy $${d.oxyEquipCostHr}/hr vs plasma $${d.plasmaEquipCostHr}/hr`, value: fmtCurrency(result.oxyHours * d.oxyEquipCostHr - result.plasmaHours * d.plasmaEquipCostHr), total: true },
    ],
    nozzleRemoval: [
      { label: `${d.nozzlesPerJob} nozzles × ${d.jobsPerYear} jobs/yr`, value: `${fmtNum(result.totalNozzles)} nozzles/yr` },
      { label: `Disc: ${fmtNum(result.totalNozzles)} × ${d.discHoursPerNozzle} hrs × ${d.numWorkers} workers`, value: `${fmtNum(result.discHours)} worker-hrs/yr` },
      { label: `Plasma: ${fmtNum(result.totalNozzles)} × ${d.plasmaHoursPerNozzle} hrs × ${d.numWorkers} workers`, value: `${fmtNum(result.plasmaHours)} worker-hrs/yr` },
      { label: `Hours saved × $${d.laborRate}/hr`, value: fmtCurrency(result.savings) + "/yr", total: true },
    ],
    boilerSupports: [
      { label: `${d.supportsPerShutdown} supports × ${d.shutdownsPerYear} shutdowns/yr`, value: `${fmtNum(result.totalSupports)} supports/yr` },
      { label: `Disc: ${fmtNum(result.totalSupports)} × ${d.discTimePerSupport} min × ${d.numWorkers} workers ÷ 60`, value: `${fmtNum(result.discHours)} worker-hrs/yr` },
      { label: `Plasma at ${d.plasmaTimePct}% of disc time`, value: `${fmtNum(result.plasmaHours)} worker-hrs/yr` },
      { label: `Hours saved × $${d.laborRate}/hr`, value: fmtCurrency(result.savings) + "/yr", total: true },
    ],
    pipeBeveling: [
      { label: `${d.pipesPerDay} pipes/day × ${d.opDays} days × ${d.numWorkers} workers`, value: `${fmtNum(result.totalPipes * d.numWorkers)} pipe-passes/yr` },
      { label: `Oxyfuel: bevel ${d.oxyBevelMin} min + grind ${d.oxyGrindMin} min per pipe`, value: `${fmtNum(result.oxyTotalHours)} hrs/yr total` },
      { label: `Plasma: bevel ${d.plasmaBevelMin} min + grind ${d.plasmaGrindMin} min per pipe`, value: `${fmtNum(result.plasmaTotalHours)} hrs/yr total` },
      { label: `Hours saved × $${d.laborRate}/hr`, value: fmtCurrency(result.savings) + "/yr", total: true },
    ],
    columnWork: [
      { label: `${d.unitsPerJob} components × ${d.jobsPerYear} jobs/yr`, value: `${fmtNum(result.totalUnits)} components/yr` },
      { label: `Current: ${fmtNum(result.totalUnits)} × ${d.currentHrsPerUnit} hrs × ${d.numWorkers} workers`, value: `${fmtNum(result.currentHours)} worker-hrs/yr` },
      { label: `Plasma at ${d.plasmaTimePct}% of current time`, value: `${fmtNum(result.plasmaHours)} worker-hrs/yr` },
      { label: `Hours saved × $${d.laborRate}/hr`, value: fmtCurrency(result.savings) + "/yr", total: true },
    ],
    tubeRemoval: [
      { label: `${d.tubesPerJob} tubes × ${d.jobsPerYear} jobs/yr`, value: `${fmtNum(result.totalTubes)} tubes/yr` },
      { label: `Disc: ${fmtNum(result.totalTubes)} × ${d.discMinPerTube} min × ${d.numWorkers} workers ÷ 60`, value: `${fmtNum(result.discHours)} worker-hrs/yr` },
      { label: `Plasma at ${d.plasmaTimePct}% of disc time`, value: `${fmtNum(result.plasmaHours)} worker-hrs/yr` },
      { label: `Hours saved × $${d.laborRate}/hr`, value: fmtCurrency(result.savings) + "/yr", total: true },
    ],
  };
  return breakdowns[appId] || [];
}

function DetailPanel({ appId, data, result, lang }) {
  const breakdown = getBreakdown(appId, data, result);
  const narrative = getNarrative(appId, data, result, lang);
  const metrics = [
    { label: lang === "en" ? "Time saved" : lang === "es" ? "Tiempo ahorrado" : "Tempo economizado", value: fmtNum(result.timeSavings) + " hrs/yr", highlight: true },
    { label: lang === "en" ? "Annual savings" : lang === "es" ? "Ahorros anuales" : "Economias anuais", value: fmtCurrency(result.savings), highlight: true },
    { label: lang === "en" ? "Equiv. FTEs" : lang === "es" ? "Equiv. empleados" : "Equiv. funcionários", value: "~" + Math.max(1, Math.round(result.timeSavings / 1800)), highlight: false },
  ];
  return (
    <div style={{ borderTop: "1px solid var(--border)", padding: "20px", background: "rgba(0,0,0,0.2)" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "10px", marginBottom: "16px" }}>
        {metrics.map((m, i) => (
          <div key={i} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid var(--border)", borderRadius: "10px", padding: "12px 14px" }}>
            <div style={{ fontSize: "11px", color: "var(--text-muted)", marginBottom: "4px", textTransform: "uppercase", letterSpacing: "0.5px" }}>{m.label}</div>
            <div style={{ fontSize: "20px", fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, color: m.highlight ? "var(--accent)" : "var(--text)" }}>{m.value}</div>
          </div>
        ))}
      </div>
      <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid var(--border)", borderRadius: "10px", padding: "14px 16px", marginBottom: "14px" }}>
        <div style={{ fontSize: "11px", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "12px" }}>
          {lang === "en" ? "How the savings are calculated" : lang === "es" ? "Cómo se calculan los ahorros" : "Como as economias são calculadas"}
        </div>
        {breakdown.map((row, i) => (
          <div key={i}>
            {row.total && <div style={{ borderTop: "1px solid var(--border)", margin: "10px 0" }} />}
            <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: row.total ? "14px" : "12px", color: row.total ? "var(--text)" : "var(--text-muted)", fontWeight: row.total ? 600 : 400, marginBottom: "6px" }}>
              <span style={{ flex: 1 }}>{row.label}</span>
              <span style={{ color: row.total ? "var(--accent)" : "var(--text)", fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: row.total ? "16px" : "13px" }}>{row.value}</span>
            </div>
          </div>
        ))}
      </div>
      <div style={{ fontSize: "13px", color: "var(--text-muted)", lineHeight: "1.6", padding: "12px 16px", background: "rgba(255,109,0,0.05)", borderRadius: "10px", borderLeft: "3px solid var(--accent)" }}>
        {narrative}
      </div>
    </div>
  );
}

function ResultCard({ appId, savings, timeSavings, totalSavings, data, result, lang }) {
  const [open, setOpen] = useState(false);
  const tr = t[lang];
  const pct = totalSavings > 0 ? (savings / totalSavings) * 100 : 0;
  return (
    <div style={{ background: "var(--card-bg)", border: "1px solid " + (open ? "var(--accent)" : "var(--border)"), borderRadius: "var(--radius)", overflow: "hidden", transition: "border-color 0.2s", marginBottom: "10px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "14px", padding: "16px 18px", cursor: "pointer", userSelect: "none" }} onClick={() => setOpen(!open)}>
        <span style={{ fontSize: "22px", flexShrink: 0 }}>{APP_ICONS[appId]}</span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: "14px", fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, textTransform: "uppercase", color: "#fff", marginBottom: "2px" }}>{tr[appId]}</div>
          <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>{tr[appId + "Desc"]}</div>
        </div>
        <div style={{ width: "110px", flexShrink: 0 }}>
          <div style={{ height: "4px", background: "rgba(255,255,255,0.06)", borderRadius: "100px", overflow: "hidden", marginBottom: "4px" }}>
            <div style={{ height: "100%", width: Math.min(100, pct) + "%", background: "linear-gradient(90deg, var(--accent), var(--accent2))", borderRadius: "100px" }} />
          </div>
          <div style={{ fontSize: "11px", color: "var(--text-muted)", textAlign: "right" }}>{pct.toFixed(0)}% of total</div>
        </div>
        <div style={{ textAlign: "right", flexShrink: 0, minWidth: "90px" }}>
          <div style={{ fontSize: "17px", fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, color: "var(--accent)" }}>{fmtCurrency(savings)}</div>
          <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>per year</div>
        </div>
        <div style={{ fontSize: "16px", color: "var(--accent)", marginLeft: "6px", transition: "transform 0.2s", transform: open ? "rotate(90deg)" : "none", flexShrink: 0 }}>{">"}</div>
      </div>
      {open && <DetailPanel appId={appId} data={data} result={result} lang={lang} />}
    </div>
  );
}

function EmailBanner({ lang, totalSavings, apps, calcData, unit }) {
  const [visible, setVisible] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!email || !email.includes("@")) {
      setError(lang === "en" ? "Please enter a valid email." : lang === "es" ? "Ingresa un correo válido." : "Digite um e-mail válido.");
      return;
    }
    console.log("LEAD:", { name, email, company, totalSavings });
    setSubmitted(true);
  };

  if (!visible) return null;

  const inputStyle = { background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,109,0,0.3)", borderRadius: "8px", padding: "10px 14px", color: "#e8f4f8", fontSize: "14px", outline: "none", width: "100%", fontFamily: "inherit" };

  if (submitted) {
    return (
      <div style={{ margin: "0 0 24px", background: "linear-gradient(135deg, #0d1a0d, #1a2d1a)", border: "1px solid var(--accent)", borderRadius: "var(--radius)", padding: "24px 28px", display: "flex", alignItems: "center", gap: "16px" }}>
        <span style={{ fontSize: "32px" }}>✅</span>
        <div>
          <div style={{ fontSize: "16px", fontWeight: 700, color: "#fff", marginBottom: "4px" }}>
            {lang === "en" ? "Thanks! Share this tool with your team." : lang === "es" ? "¡Gracias! Comparte esta herramienta con tu equipo." : "Obrigado! Compartilhe esta ferramenta com sua equipe."}
          </div>
          <div style={{ fontSize: "13px", color: "var(--text-muted)" }}>
            {lang === "en" && <span>Follow <a href={NEWSLETTER_URL} target="_blank" rel="noreferrer" style={{ color: "var(--accent)" }}>Industrial Cutting Processes</a> for more insights.</span>}
            {lang === "es" && <span>Sigue <a href={NEWSLETTER_URL} target="_blank" rel="noreferrer" style={{ color: "var(--accent)" }}>Industrial Cutting Processes</a> para más insights.</span>}
            {lang === "pt" && <span>Siga <a href={NEWSLETTER_URL} target="_blank" rel="noreferrer" style={{ color: "var(--accent)" }}>Industrial Cutting Processes</a> para mais insights.</span>}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ margin: "0 0 24px", background: "linear-gradient(135deg, #100d00, #1a1500)", border: "1px solid var(--accent)", borderRadius: "var(--radius)", padding: "24px 28px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
        <div>
          <div style={{ fontSize: "18px", fontWeight: 700, color: "#fff", marginBottom: "4px" }}>
            {lang === "en" ? "💾 Save your report" : lang === "es" ? "💾 Guarda tu informe" : "💾 Salve seu relatório"}
          </div>
          <div style={{ fontSize: "13px", color: "var(--text-muted)" }}>
            {lang === "en" ? `You found ${fmtCurrency(totalSavings)}/yr in potential savings.` : lang === "es" ? `Encontraste ${fmtCurrency(totalSavings)}/año en ahorros potenciales.` : `Você encontrou ${fmtCurrency(totalSavings)}/ano em economias potenciais.`}
          </div>
        </div>
        <button onClick={() => setVisible(false)} style={{ background: "none", border: "none", color: "var(--text-muted)", fontSize: "18px", cursor: "pointer", padding: "0 4px", lineHeight: 1 }}>×</button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr auto", gap: "10px", alignItems: "end" }}>
        <div>
          <div style={{ fontSize: "11px", color: "var(--text-muted)", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.5px" }}>{lang === "en" ? "Name" : "Nombre"}</div>
          <input style={inputStyle} value={name} onChange={(e) => setName(e.target.value)} placeholder={lang === "en" ? "Your name" : lang === "es" ? "Tu nombre" : "Seu nome"} />
        </div>
        <div>
          <div style={{ fontSize: "11px", color: "var(--text-muted)", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.5px" }}>{lang === "en" ? "Email *" : "Correo *"}</div>
          <input style={inputStyle} type="email" value={email} onChange={(e) => { setEmail(e.target.value); setError(""); }} placeholder={lang === "en" ? "your@email.com" : "tu@correo.com"} />
          {error && <div style={{ fontSize: "11px", color: "#ff6b6b", marginTop: "4px" }}>{error}</div>}
        </div>
        <div>
          <div style={{ fontSize: "11px", color: "var(--text-muted)", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.5px" }}>{lang === "en" ? "Company" : "Empresa"}</div>
          <input style={inputStyle} value={company} onChange={(e) => setCompany(e.target.value)} placeholder={lang === "en" ? "Company name" : lang === "es" ? "Nombre empresa" : "Nome da empresa"} />
        </div>
        <button
          onClick={handleSubmit}
          style={{ background: "var(--accent)", color: "#000", border: "none", borderRadius: "8px", padding: "10px 20px", fontWeight: 700, fontSize: "13px", cursor: "pointer", fontFamily: "inherit", whiteSpace: "nowrap" }}
        >
          {lang === "en" ? "Save →" : lang === "es" ? "Guardar →" : "Salvar →"}
        </button>
      </div>
    </div>
  );
}

export default function ReportPage({ apps, calcData, onRestart }) {
  const { lang, setLang } = useLanguage();
  const { unit, setUnit } = useUnit();
  const tr = t[lang];
  const defaults = INDUSTRY_DEFAULTS[unit];

  const results = {};
  apps.forEach((appId) => {
    const data = { ...defaults[appId], ...(calcData[appId] || {}) };
    const calc = APP_CALC_MAP[appId];
    if (calc) results[appId] = { data, result: calc(data) };
  });

  const totalSavings = Object.values(results).reduce((s, { result }) => s + (result.savings || 0), 0);
  const totalTime = Object.values(results).reduce((s, { result }) => s + (result.timeSavings || 0), 0);

  return (
    <div className="page-wrapper">
      <nav className="nav">
        <div className="nav-brand">
          <span className="brand-icon">🔥</span>
          <span className="brand-name">Flare</span>
        </div>
        <div className="nav-controls">
          <div className="lang-select">
            {["en", "es", "pt"].map((l) => (
              <button key={l} className={`lang-btn ${lang === l ? "active" : ""}`} onClick={() => setLang(l)}>{l.toUpperCase()}</button>
            ))}
          </div>
          <div className="unit-toggle">
            <button className={`unit-btn ${unit === "metric" ? "active" : ""}`} onClick={() => setUnit("metric")}>{tr.metric}</button>
            <button className={`unit-btn ${unit === "imperial" ? "active" : ""}`} onClick={() => setUnit("imperial")}>{tr.imperial}</button>
          </div>
        </div>
      </nav>

      <div className="page-content">
        <div className="step-indicator">
          <div className="step done">✓</div>
          <div className="step-line done"></div>
          <div className="step done">✓</div>
          <div className="step-line done"></div>
          <div className="step active">3</div>
        </div>

        <h2 className="page-title">{tr.reportTitle}</h2>
        <p className="page-sub">{tr.reportSub}</p>

        {/* Totals banner */}
        <div className="totals-banner">
          <div className="total-item primary">
            <div className="total-label">{tr.totalSavings}</div>
            <div className="total-value">{fmtCurrency(totalSavings)}</div>
            <div className="total-sub">{tr.perYear}</div>
          </div>
          <div className="total-item">
            <div className="total-label">{tr.timeSavings}</div>
            <div className="total-value">{fmtNum(totalTime)}</div>
            <div className="total-sub">{tr.hours}</div>
          </div>
          <div className="total-item">
            <div className="total-label">{lang === "en" ? "Equiv. FTEs freed" : lang === "es" ? "Empleados equivalentes" : "Funcionários equivalentes"}</div>
            <div className="total-value">~{Math.max(1, Math.round(totalTime / 1800))}</div>
            <div className="total-sub">{lang === "en" ? "full-time workers" : lang === "es" ? "trabajadores completos" : "trabalhadores integrais"}</div>
          </div>
        </div>

        <EmailBanner lang={lang} totalSavings={totalSavings} apps={apps} calcData={calcData} unit={unit} />

        <div style={{ marginBottom: "24px" }}>
          {apps.map((appId) => {
            const r = results[appId];
            if (!r) return null;
            return (
              <ResultCard
                key={appId}
                appId={appId}
                savings={r.result.savings}
                timeSavings={r.result.timeSavings}
                totalSavings={totalSavings}
                data={r.data}
                result={r.result}
                lang={lang}
              />
            );
          })}
        </div>

        <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
          <button className="btn-secondary" onClick={onRestart}>{tr.restart}</button>
          <a href={PROFILE_URL} target="_blank" rel="noreferrer" className="btn-primary" style={{ textDecoration: "none" }}>
            {lang === "en" ? "💬 Talk to an expert" : lang === "es" ? "💬 Habla con un experto" : "💬 Fale com um especialista"}
          </a>
        </div>
      </div>

      <Footer lang={lang} />
    </div>
  );
}
