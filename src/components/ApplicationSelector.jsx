import { useLanguage, useUnit } from "../lib/contexts";
import t from "../lib/translations";
import Footer from "./Footer";

const getApps = (lang) => [
  {
    id: "tankPlates", icon: "🛢️",
    who: lang === "en" ? "Maintenance · Tank Specialists" : lang === "es" ? "Mantenimiento · Especialistas en Tanques" : "Manutenção · Especialistas em Tanques",
    tip: lang === "en"
      ? "Do your teams cut carbon steel floor or roof plates from storage tanks using oxyfuel? A refinery study showed plasma cuts the same 3/16\" plate in half the time — 10 min vs 20 min per sheet — delivering a 54% overall cost reduction including labor, gas, and equipment."
      : lang === "es"
      ? "¿Sus equipos cortan chapas de pisos o techos de tanques de almacenamiento con oxicombustible? Un estudio mostró que el plasma corta la misma chapa de 3/16\" en la mitad del tiempo, logrando una reducción de costos del 54%."
      : "Suas equipes cortam chapas de pisos ou tetos de tanques de armazenamento com oxicombustível? Um estudo mostrou que o plasma corta a mesma chapa de 3/16\" em metade do tempo, com redução de 54% nos custos totais.",
  },
  {
    id: "nozzleRemoval", icon: "⚙️",
    who: lang === "en" ? "Maintenance · Mechanical · Planning" : lang === "es" ? "Mantenimiento · Mecánica · Planificación" : "Manutenção · Mecânica · Planejamento",
    tip: lang === "en"
      ? "Do your teams use abrasive disc cutting to remove nozzles from pressure vessels or HDT reactors? With thick stainless steel (up to 60 mm), plasma reduced a 60-hour job to just 12 hours — an 80% time reduction that got equipment back to production ahead of schedule."
      : lang === "es"
      ? "¿Sus equipos usan disco abrasivo para remover boquillas de recipientes a presión? Con acero inoxidable grueso (hasta 60 mm), el plasma redujo un trabajo de 60 horas a solo 12 horas — una reducción del 80%."
      : "Suas equipes usam disco abrasivo para remover bocais de vasos de pressão ou reatores? Com aço inox espesso (até 60 mm), o plasma reduziu um trabalho de 60 horas para apenas 12 horas — redução de 80%.",
  },
  {
    id: "boilerSupports", icon: "🔧",
    who: lang === "en" ? "Maintenance · Shutdown Coordinators" : lang === "es" ? "Mantenimiento · Coordinadores de Parada" : "Manutenção · Coordenadores de Parada",
    tip: lang === "en"
      ? "During scheduled shutdowns, do workers cut and replace boiler tube supports using angle grinders or abrasive discs in confined spaces? A refinery test replacing 50 supports showed plasma cut execution time by 60%, removing a critical bottleneck from the shutdown schedule."
      : lang === "es"
      ? "¿Durante paradas programadas, los trabajadores cortan soportes de tubos de calderas con amoladoras? Una prueba en refinería reemplazando 50 soportes mostró que el plasma redujo el tiempo de ejecución un 60%."
      : "Durante paradas programadas, os trabalhadores cortam suportes de tubos de caldeiras com esmerilhadeiras? Um teste em refinaria substituindo 50 suportes mostrou que o plasma reduziu o tempo de execução em 60%.",
  },
  {
    id: "pipeBeveling", icon: "📐",
    who: lang === "en" ? "Welders · Pipe Fitters · Supervisors" : lang === "es" ? "Soldadores · Tuberos · Supervisores" : "Soldadores · Tubuladores · Supervisores",
    tip: lang === "en"
      ? "Do your pipe fitters use oxyfuel to cut bevels on field welds, followed by grinding to clean the edge? Plasma — manual or with a track-mounted turtle system — cuts a cleaner bevel in half the time and needs a fraction of the post-cut grinding."
      : lang === "es"
      ? "¿Sus tuberos usan oxicombustible para cortar biseles en soldaduras de campo, seguido de esmerilado? El plasma — manual o con sistema de tortuga — corta un bisel más limpio en la mitad del tiempo."
      : "Seus tubuladores usam oxicombustível para cortar chanfros em soldas de campo, seguido de esmerilamento? O plasma — manual ou com sistema de tartaruga — corta um chanfro mais limpo em metade do tempo.",
  },
  {
    id: "columnWork", icon: "🏭",
    who: lang === "en" ? "Maintenance · Turnaround Teams" : lang === "es" ? "Mantenimiento · Equipos de Turnaround" : "Manutenção · Equipes de Turnaround",
    tip: lang === "en"
      ? "Do turnaround teams cut protective plates, remove nozzles, or work on fractionating columns and distillation towers using disc cutters? A test removing stainless steel 309L nozzles from a distillation tower cut the affected area by 50% and finished ahead of the supplier's forecast."
      : lang === "es"
      ? "¿Los equipos de turnaround cortan placas protectoras o trabajan en columnas de destilación con discos cortadores? Una prueba en una torre de destilación redujo el área afectada un 50% y terminó antes de lo previsto."
      : "As equipes de turnaround cortam placas protetoras ou trabalham em colunas de destilação com discos? Um teste em uma torre de destilação reduziu a área afetada em 50% e terminou antes do prazo previsto.",
  },
  {
    id: "tubeRemoval", icon: "🔩",
    who: lang === "en" ? "Maintenance · Boiler Specialists" : lang === "es" ? "Mantenimiento · Especialistas en Calderas" : "Manutenção · Especialistas em Caldeiras",
    tip: lang === "en"
      ? "Do workers remove water circulation tubes or heat exchanger tubes from furnaces and boilers using abrasive discs? Plasma cuts the tube precisely without damaging the surrounding shell, eliminating repair rework and significantly reducing removal time per tube."
      : lang === "es"
      ? "¿Los trabajadores remueven tubos de circulación de agua de hornos y calderas con discos abrasivos? El plasma corta el tubo con precisión sin dañar la cubierta, eliminando retrabajo y reduciendo significativamente el tiempo de remoción."
      : "Os trabalhadores removem tubos de circulação de água de fornos e caldeiras com discos abrasivos? O plasma corta o tubo com precisão sem danificar o casco, eliminando retrabalho e reduzindo significativamente o tempo de remoção.",
  },
];

export default function ApplicationSelector({ selected, setSelected, onNext, onBack }) {
  const { lang, setLang } = useLanguage();
  const { unit, setUnit } = useUnit();
  const tr = t[lang];
  const apps = getApps(lang);

  const toggle = (id) => {
    setSelected((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
  };

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
          <div className="step active">1</div>
          <div className="step-line"></div>
          <div className="step">2</div>
          <div className="step-line"></div>
          <div className="step">3</div>
        </div>

        <h2 className="page-title">{tr.selectTitle}</h2>
        <p className="page-sub">{tr.selectSub}</p>

        <div className="select-actions">
          <button className="text-btn" onClick={() => setSelected(apps.map((a) => a.id))}>
            {lang === "en" ? "Select all" : lang === "es" ? "Seleccionar todo" : "Selecionar tudo"}
          </button>
          <button className="text-btn" onClick={() => setSelected([])}>
            {lang === "en" ? "Clear all" : lang === "es" ? "Limpiar todo" : "Limpar tudo"}
          </button>
          <span className="selected-count">
            {selected.length} {lang === "en" ? "selected" : lang === "es" ? "seleccionadas" : "selecionadas"}
          </span>
        </div>

        <div className="app-grid">
          {apps.map((app) => {
            const isSelected = selected.includes(app.id);
            return (
              <div key={app.id} className={`app-card ${isSelected ? "selected" : ""}`} onClick={() => toggle(app.id)}>
                <div className="tooltip">
                  <div className="tooltip-who">{app.who}</div>
                  <div className="tooltip-title">{tr[app.id]}</div>
                  <div className="tooltip-body">{app.tip}</div>
                </div>
                <div className="app-card-check">✓</div>
                <span className="app-card-icon">{app.icon}</span>
                <div className="app-card-title">{tr[app.id]}</div>
                <div className="app-card-desc">{tr[app.id + "Desc"]}</div>
              </div>
            );
          })}
        </div>

        <div className="nav-buttons">
          <button className="btn-secondary" onClick={onBack}>{tr.backBtn}</button>
          <button className="btn-primary" onClick={onNext} disabled={selected.length === 0}>
            {tr.nextBtn} →
          </button>
        </div>
      </div>

      <Footer lang={lang} />
    </div>
  );
}
