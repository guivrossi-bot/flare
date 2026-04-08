import { useState } from "react";
import { useLanguage, useUnit } from "../lib/contexts";
import t from "../lib/translations";
import { INDUSTRY_DEFAULTS } from "../lib/calculators";

const APP_FIELDS = {
  tankPlates: (tr) => [
    { key: "sheetsPerJob", label: tr.sheetsPerJob },
    { key: "jobsPerYear", label: tr.jobsPerYear },
    { key: "laborRate", label: tr.laborRate },
    { key: "oxyTimePerSheet", label: tr.oxyTimePerSheet },
    { key: "plasmaTimePerSheet", label: tr.plasmaTimePerSheet },
    { key: "oxyGasCostHr", label: tr.oxyGasCostHr },
    { key: "plasmaEnergyCostHr", label: tr.plasmaEnergyCostHr },
    { key: "oxyEquipCostHr", label: tr.oxyEquipCostHr },
    { key: "plasmaEquipCostHr", label: tr.plasmaEquipCostHr },
  ],
  nozzleRemoval: (tr) => [
    { key: "nozzlesPerJob", label: tr.nozzlesPerJob },
    { key: "jobsPerYear", label: tr.jobsPerYear },
    { key: "laborRate", label: tr.laborRate },
    { key: "discHoursPerNozzle", label: tr.discHoursPerNozzle },
    { key: "plasmaHoursPerNozzle", label: tr.plasmaHoursPerNozzle },
    { key: "numWorkers", label: tr.numWorkers },
  ],
  boilerSupports: (tr) => [
    { key: "supportsPerShutdown", label: tr.supportsPerShutdown },
    { key: "shutdownsPerYear", label: tr.shutdownsPerYear },
    { key: "laborRate", label: tr.laborRate },
    { key: "discTimePerSupport", label: tr.discTimePerSupport },
    { key: "plasmaTimePct", label: tr.plasmaTimePct },
    { key: "numWorkers", label: tr.numWorkers },
  ],
  pipeBeveling: (tr) => [
    { key: "pipesPerDay", label: tr.pipesPerDay },
    { key: "opDays", label: tr.opDays },
    { key: "laborRate", label: tr.laborRate },
    { key: "oxyBevelMin", label: tr.oxyBevelMin },
    { key: "plasmaBevelMin", label: tr.plasmaBevelMin },
    { key: "oxyGrindMin", label: tr.oxyGrindMin },
    { key: "plasmaGrindMin", label: tr.plasmaGrindMin },
    { key: "numWorkers", label: tr.numWorkers },
  ],
  columnWork: (tr) => [
    { key: "unitsPerJob", label: tr.unitsPerJob },
    { key: "jobsPerYear", label: tr.jobsPerYear },
    { key: "laborRate", label: tr.laborRate },
    { key: "currentHrsPerUnit", label: tr.currentHrsPerUnit },
    { key: "plasmaTimePct", label: tr.plasmaTimePct },
    { key: "numWorkers", label: tr.numWorkers },
  ],
  tubeRemoval: (tr) => [
    { key: "tubesPerJob", label: tr.tubesPerJob },
    { key: "jobsPerYear", label: tr.jobsPerYear },
    { key: "laborRate", label: tr.laborRate },
    { key: "discMinPerTube", label: tr.discMinPerTube },
    { key: "plasmaTimePct", label: tr.plasmaTimePct },
    { key: "numWorkers", label: tr.numWorkers },
  ],
};

const APP_ICONS = {
  tankPlates: "🛢️",
  nozzleRemoval: "⚙️",
  boilerSupports: "🔧",
  pipeBeveling: "📐",
  columnWork: "🏭",
  tubeRemoval: "🔩",
};

export default function CalculatorForms({ apps, calcData, setCalcData, onNext, onBack }) {
  const { lang, setLang } = useLanguage();
  const { unit, setUnit } = useUnit();
  const tr = t[lang];
  const [activeTab, setActiveTab] = useState(apps[0]);
  const defaults = INDUSTRY_DEFAULTS[unit];

  const getVal = (appId, key) => {
    if (calcData[appId]?.[key] !== undefined) return calcData[appId][key];
    return defaults[appId]?.[key] ?? "";
  };

  const setVal = (appId, key, val) => {
    setCalcData((prev) => ({
      ...prev,
      [appId]: { ...(prev[appId] || {}), [key]: val === "" ? "" : Number(val) },
    }));
  };

  const useAvg = (appId) => {
    setCalcData((prev) => ({ ...prev, [appId]: { ...defaults[appId] } }));
  };

  const fields = APP_FIELDS[activeTab]?.(tr) || [];

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
              <button key={l} className={`lang-btn ${lang === l ? "active" : ""}`} onClick={() => setLang(l)}>
                {l.toUpperCase()}
              </button>
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
          <div className="step active">2</div>
          <div className="step-line"></div>
          <div className="step">3</div>
        </div>

        <h2 className="page-title">{tr.calcTitle}</h2>
        <p className="page-sub">{tr.calcSub}</p>

        <div className="calc-layout">
          <div className="app-tabs">
            {apps.map((appId) => (
              <button
                key={appId}
                className={`app-tab ${activeTab === appId ? "active" : ""}`}
                onClick={() => setActiveTab(appId)}
              >
                <span className="tab-icon">{APP_ICONS[appId]}</span>
                <span className="tab-label">{tr[appId]}</span>
              </button>
            ))}
          </div>

          <div className="calc-form-panel">
            <div className="form-header">
              <div className="form-title">
                <span className="form-icon">{APP_ICONS[activeTab]}</span>
                <h3>{tr[activeTab]}</h3>
              </div>
              <button className="avg-btn" onClick={() => useAvg(activeTab)}>
                📊 {tr.industryAvg}
              </button>
            </div>

            <div className="form-grid">
              {fields.map((field) => (
                <div key={field.key} className="form-field">
                  <label>{field.label}</label>
                  <div>
                    <input
                      type="number"
                      value={getVal(activeTab, field.key)}
                      onChange={(e) => setVal(activeTab, field.key, e.target.value)}
                      placeholder={String(defaults[activeTab]?.[field.key] ?? "")}
                    />
                    <span className="field-hint">
                      {tr.industryAvg}: {defaults[activeTab]?.[field.key]}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="nav-buttons">
          <button className="btn-secondary" onClick={onBack}>{tr.backBtn}</button>
          <button className="btn-primary" onClick={onNext}>{tr.nextBtn} →</button>
        </div>
      </div>
    </div>
  );
}
