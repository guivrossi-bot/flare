import { useLanguage, useUnit } from "../lib/contexts";
import t from "../lib/translations";

export default function LandingPage({ onStart }) {
  const { lang, setLang } = useLanguage();
  const { unit, setUnit } = useUnit();
  const tr = t[lang];

  return (
    <div className="landing">
      <nav className="nav">
        <div className="nav-brand">
          <span className="brand-icon">🔥</span>
          <span className="brand-name">Flare</span>
          <span className="brand-tag">{tr.tagline}</span>
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

      <section className="hero">
        <div className="hero-bg">
          <div className="hero-glow glow1"></div>
          <div className="hero-glow glow2"></div>
        </div>
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-dot"></span>
            {tr.tagline}
          </div>
          <h1 className="hero-title">
            {lang === "en" && (<>Unlock Your<br /><span className="accent">Refinery's</span><br />Full Potential</>)}
            {lang === "es" && (<>Desbloquea el<br /><span className="accent">Potencial</span><br />de Tu Refinería</>)}
            {lang === "pt" && (<>Desbloqueie o<br /><span className="accent">Potencial</span><br />da Sua Refinaria</>)}
          </h1>
          <p className="hero-sub">{tr.heroSub}</p>
          <button className="hero-btn" onClick={onStart}>
            <span>{tr.startBtn}</span>
            <div className="btn-spark">→</div>
          </button>
        </div>

        <div className="hero-visual">
          {/* Refinery SVG illustration */}
          <svg viewBox="0 0 500 280" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Ground */}
            <rect x="0" y="230" width="500" height="50" fill="#0a0f18"/>
            {/* Large distillation column */}
            <rect x="180" y="60" width="36" height="170" rx="4" fill="#111c2e" stroke="#ff6d00" strokeWidth="1.5"/>
            <ellipse cx="198" cy="60" rx="18" ry="6" fill="#1a2d45" stroke="#ff6d00" strokeWidth="1"/>
            <rect x="190" y="30" width="16" height="32" rx="3" fill="#111c2e" stroke="#ff6d00" strokeWidth="1"/>
            {/* Second column */}
            <rect x="260" y="90" width="28" height="140" rx="3" fill="#111c2e" stroke="#ff9800" strokeWidth="1.2"/>
            <ellipse cx="274" cy="90" rx="14" ry="5" fill="#1a2d45" stroke="#ff9800" strokeWidth="1"/>
            <rect x="267" y="65" width="14" height="28" rx="2" fill="#111c2e" stroke="#ff9800" strokeWidth="1"/>
            {/* Small column */}
            <rect x="310" y="110" width="22" height="120" rx="3" fill="#111c2e" stroke="#ff6d00" strokeWidth="1"/>
            <ellipse cx="321" cy="110" rx="11" ry="4" fill="#1a2d45" stroke="#ff6d00" strokeWidth="1"/>
            {/* Pipes / connectors */}
            <path d="M216 140 Q238 140 260 150" stroke="#ff9800" strokeWidth="1.5" fill="none" opacity="0.7"/>
            <path d="M288 160 Q300 160 310 168" stroke="#ff6d00" strokeWidth="1.2" fill="none" opacity="0.6"/>
            <path d="M198 180 Q198 210 160 210" stroke="#ff9800" strokeWidth="1.2" fill="none" opacity="0.5"/>
            {/* Storage tanks */}
            <ellipse cx="80" cy="218" rx="45" ry="12" fill="#111c2e" stroke="#ff9800" strokeWidth="1"/>
            <rect x="35" y="170" width="90" height="48" rx="2" fill="#111c2e" stroke="#ff9800" strokeWidth="1"/>
            <ellipse cx="80" cy="170" rx="45" ry="12" fill="#1a2d45" stroke="#ff9800" strokeWidth="1.2"/>
            {/* Flare stack */}
            <rect x="420" y="80" width="8" height="150" fill="#111c2e" stroke="#ff6d00" strokeWidth="1"/>
            <path d="M424 80 Q418 60 424 50 Q430 60 424 80" fill="#ff6d00" opacity="0.9"/>
            <path d="M424 52 Q419 44 424 38 Q429 44 424 52" fill="#ffd600" opacity="0.8"/>
            <path d="M421 56 Q416 50 420 44" stroke="#ff9800" strokeWidth="1.5" fill="none" opacity="0.6"/>
            {/* Ground line */}
            <line x1="0" y1="230" x2="500" y2="230" stroke="#ff6d00" strokeWidth="0.5" opacity="0.3"/>
            {/* Pipe at ground */}
            <path d="M0 220 Q60 212 120 220 Q180 228 240 220 Q300 212 360 220 Q420 228 500 220 L500 280 L0 280 Z" fill="#0a0f18" opacity="0.9"/>
          </svg>
        </div>
      </section>

      <section className="stats-bar">
        <div className="stats-inner">
          {[
            { val: "54%", label: lang === "en" ? "Lower cutting cost" : lang === "es" ? "Menor costo de corte" : "Menor custo de corte" },
            { val: "80%", label: lang === "en" ? "Faster nozzle removal" : lang === "es" ? "Remoción más rápida" : "Remoção mais rápida" },
            { val: "60%", label: lang === "en" ? "Less shutdown time" : lang === "es" ? "Menos tiempo de parada" : "Menos tempo de parada" },
            { val: "2×", label: lang === "en" ? "Faster bevel prep" : lang === "es" ? "Biselado más rápido" : "Chanframento mais rápido" },
          ].map((s, i) => (
            <div key={i}>
              <span className="stat-val">{s.val}</span>
              <span className="stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="app-preview">
        <h2 className="section-title">
          {lang === "en" ? "6 Savings Opportunities" : lang === "es" ? "6 Oportunidades de Ahorro" : "6 Oportunidades de Economia"}
        </h2>
        <p className="section-sub">
          {lang === "en"
            ? "Select only the maintenance processes relevant to your refinery."
            : lang === "es"
            ? "Selecciona solo los procesos relevantes para tu refinería."
            : "Selecione apenas os processos relevantes para sua refinaria."}
        </p>
        <div className="preview-grid">
          {[
            { icon: "🛢️", label: lang === "en" ? "Tank Plates" : lang === "es" ? "Chapas de Tanques" : "Chapas de Tanques" },
            { icon: "⚙️", label: lang === "en" ? "Nozzle Removal" : lang === "es" ? "Remoción de Boquillas" : "Remoção de Bocais" },
            { icon: "🔧", label: lang === "en" ? "Boiler Supports" : lang === "es" ? "Soportes de Calderas" : "Suportes de Caldeiras" },
            { icon: "📐", label: lang === "en" ? "Pipe Beveling" : lang === "es" ? "Biselado de Tuberías" : "Chanframento de Tubos" },
            { icon: "🏭", label: lang === "en" ? "Column Work" : lang === "es" ? "Trabajo en Columnas" : "Trabalho em Colunas" },
            { icon: "🔩", label: lang === "en" ? "Tube Removal" : lang === "es" ? "Remoción de Tubos" : "Remoção de Tubos" },
          ].map((a, i) => (
            <div key={i} className="preview-card">
              <span className="preview-icon">{a.icon}</span>
              <span className="preview-label">{a.label}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
