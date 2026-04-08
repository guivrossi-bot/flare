import { INDUSTRY_DEFAULTS, APP_CALC_MAP } from "../lib/calculators";

const APP_ICONS = {
  tankPlates: "🛢️",
  nozzleRemoval: "⚙️",
  boilerSupports: "🔧",
  pipeBeveling: "📐",
  columnWork: "🏭",
  tubeRemoval: "🔩",
};

const APP_NAMES = {
  en: {
    tankPlates: "Storage Tank Plate Cutting",
    nozzleRemoval: "Pressure Vessel Nozzle Removal",
    boilerSupports: "Boiler Tube Support Replacement",
    pipeBeveling: "Pipe Field Weld Beveling",
    columnWork: "Distillation Column & Tower Work",
    tubeRemoval: "Furnace & Boiler Tube Removal",
  },
  es: {
    tankPlates: "Corte de Chapas de Tanques de Almacenamiento",
    nozzleRemoval: "Remoción de Boquillas en Recipientes a Presión",
    boilerSupports: "Reemplazo de Soportes de Tubos de Calderas",
    pipeBeveling: "Biselado de Tuberías en Campo",
    columnWork: "Trabajo en Columnas y Torres de Destilación",
    tubeRemoval: "Remoción de Tubos de Hornos y Calderas",
  },
  pt: {
    tankPlates: "Corte de Chapas de Tanques de Armazenamento",
    nozzleRemoval: "Remoção de Bocais em Vasos de Pressão",
    boilerSupports: "Substituição de Suportes de Tubos de Caldeiras",
    pipeBeveling: "Chanframento de Tubulações em Campo",
    columnWork: "Trabalho em Colunas e Torres de Destilação",
    tubeRemoval: "Remoção de Tubos de Fornos e Caldeiras",
  },
};

const APP_WHY = {
  en: {
    tankPlates: "Oxyfuel cutting on tank floor and roof plates requires preheat, generates a wide heat-affected zone, and causes plate warping — especially on thin 3/16\" carbon steel. Plasma cuts the same material instantly, with a narrower HAZ, producing edges ready for welding without grinding. Field studies have confirmed a 54% overall cost reduction when switching from oxyfuel to plasma on tank plate work, including labor, gas, and equipment costs.",
    nozzleRemoval: "Removing nozzles from pressure vessels and HDT reactors with abrasive disc cutting on thick stainless steel (up to 60mm) is extremely slow and creates significant risk of shell damage. In validated field tests, plasma completed the removal of four 309L stainless steel nozzles at 60mm thickness in just 12 hours — compared to the original estimate of 60 hours using disc cutting. The affected area was reduced by approximately 50%, and equipment returned to service ahead of schedule.",
    boilerSupports: "During scheduled maintenance shutdowns, boiler tube supports in confined spaces must be cut and replaced using whatever tools fit the access constraints. Abrasive disc cutting in these conditions is slow and labor-intensive. Plasma cutting tests replacing supports during scheduled shutdowns have reduced execution time by approximately 60%, removing a critical bottleneck from the maintenance schedule.",
    pipeBeveling: "In the previous process, oxyfuel cutting was used to create bevels on field welds, followed by manual grinding to remove approximately 1.5mm of material. With plasma — both manual and automated (track-mounted turtle system) — bevels are cut cleaner and faster. The post-cut grinding requirement is dramatically reduced, increasing productivity and reducing the need for manual intervention by the operator.",
    columnWork: "Distillation towers and fractionating columns require precise cutting when removing protective plates, installing rolled plates near nozzle necks, or performing structural repairs. Abrasive disc cutting in these applications is imprecise and risks damaging the equipment shell. Plasma cutting reduced the heat-affected area by approximately 50% compared to disc cutting in refinery tests, and completed work ahead of the service provider's original schedule.",
    tubeRemoval: "Water circulation tubes and heat exchanger tubes in refinery furnaces and boilers were previously removed using abrasive disc cutting — a method that frequently causes damage to the surrounding tube sheet or shell, requiring costly additional repairs. Plasma cutting removes each tube with precision, without damaging the structure, significantly reducing removal time and eliminating shell repair rework.",
  },
  es: {
    tankPlates: "El corte con oxicombustible en chapas de pisos y techos de tanques requiere precalentamiento, genera una zona afectada por calor amplia y causa deformación de las chapas, especialmente en acero carbono de 3/16\". Estudios de campo confirmaron una reducción del 54% en costos al cambiar de oxicombustible a plasma en trabajo de chapas de tanques.",
    nozzleRemoval: "La remoción de boquillas de recipientes a presión con disco abrasivo en acero inoxidable grueso (hasta 60mm) es extremadamente lenta. En pruebas de campo validadas, el plasma completó la remoción de cuatro boquillas de 309L a 60mm en solo 12 horas versus el estimado original de 60 horas con disco abrasivo.",
    boilerSupports: "Durante paradas programadas de mantenimiento, los soportes de tubos de calderas en espacios confinados deben cortarse y reemplazarse. Pruebas de plasma reemplazando soportes durante paradas programadas redujeron el tiempo de ejecución aproximadamente un 60%, eliminando un cuello de botella crítico.",
    pipeBeveling: "Anteriormente se usaba corte oxicombustible para crear biseles en soldaduras de campo, seguido de esmerilado manual. Con plasma, los biseles se cortan más limpios y rápidos, reduciendo drásticamente el esmerilado posterior y aumentando la productividad.",
    columnWork: "Torres de destilación y columnas de fraccionamiento requieren corte preciso para remover placas protectoras o hacer reparaciones estructurales. El plasma redujo el área afectada en aproximadamente un 50% comparado con disco abrasivo en pruebas en refinería.",
    tubeRemoval: "Los tubos de circulación de agua en hornos y calderas se removían con disco abrasivo, causando frecuentes daños a la placa de tubos circundante. El plasma remueve cada tubo con precisión, sin dañar la estructura, reduciendo el tiempo de remoción y eliminando retrabajos de reparación.",
  },
  pt: {
    tankPlates: "O corte a oxicombustível em chapas de pisos e tetos de tanques requer pré-aquecimento, gera uma zona termicamente afetada ampla e causa empenamento das chapas, especialmente no aço carbono de 3/16\". Estudos de campo confirmaram redução de 54% nos custos ao trocar oxicombustível por plasma no corte de chapas de tanques.",
    nozzleRemoval: "A remoção de bocais de vasos de pressão com disco abrasivo em aço inoxidável espesso (até 60mm) é extremamente lenta. Em testes de campo validados, o plasma completou a remoção de quatro bocais de aço 309L a 60mm em apenas 12 horas, versus a estimativa original de 60 horas com disco abrasivo.",
    boilerSupports: "Durante paradas programadas de manutenção, os suportes de tubos de caldeiras em espaços confinados precisam ser cortados e substituídos. Testes de plasma substituindo suportes durante paradas programadas reduziram o tempo de execução em aproximadamente 60%, removendo um gargalo crítico do cronograma de manutenção.",
    pipeBeveling: "Anteriormente usava-se oxicombustível para criar chanfros em soldas de campo, seguido de esmerilamento manual. Com plasma, os chanfros são cortados de forma mais limpa e rápida, reduzindo drasticamente o esmerilamento posterior e aumentando a produtividade.",
    columnWork: "Torres de destilação e colunas de fracionamento requerem corte preciso para remover placas protetoras ou fazer reparos estruturais. O plasma reduziu a área afetada em aproximadamente 50% comparado ao disco abrasivo em testes em refinaria, e concluiu o trabalho antes do prazo previsto.",
    tubeRemoval: "Os tubos de circulação de água em fornos e caldeiras eram removidos com disco abrasivo, causando frequentes danos à espelho de tubos circundante. O plasma remove cada tubo com precisão, sem danificar a estrutura, reduzindo o tempo de remoção e eliminando retrabalhos de reparo.",
  },
};

const fmtCurrency = (n) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);

const fmtNum = (n) =>
  new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(n);

function getBreakdownLines(appId, data, result) {
  const d = data;
  const lines = {
    tankPlates: [
      { label: "Sheets per year", value: `${d.sheetsPerJob} sheets × ${d.jobsPerYear} jobs = ${fmtNum(result.sheetsPerYear)} sheets/yr` },
      { label: "Oxyfuel cutting time", value: `${fmtNum(result.oxyHours)} hrs/yr (${d.oxyTimePerSheet} min/sheet)` },
      { label: "Plasma cutting time", value: `${fmtNum(result.plasmaHours)} hrs/yr (${d.plasmaTimePerSheet} min/sheet)` },
      { label: "Labor savings", value: `${fmtNum(result.timeSavings)} hrs × $${d.laborRate}/hr = ${fmtCurrency(result.timeSavings * d.laborRate)}` },
      { label: "Gas/energy savings", value: `$${d.oxyGasCostHr}/hr → $${d.plasmaEnergyCostHr}/hr` },
      { label: "Total annual savings", value: fmtCurrency(result.savings), bold: true },
    ],
    nozzleRemoval: [
      { label: "Nozzles per year", value: `${d.nozzlesPerJob} × ${d.jobsPerYear} jobs = ${fmtNum(result.totalNozzles)} nozzles/yr` },
      { label: "Disc cutting time", value: `${fmtNum(result.discHours)} worker-hrs/yr (${d.discHoursPerNozzle} hrs/nozzle × ${d.numWorkers} workers)` },
      { label: "Plasma cutting time", value: `${fmtNum(result.plasmaHours)} worker-hrs/yr (${d.plasmaHoursPerNozzle} hrs/nozzle × ${d.numWorkers} workers)` },
      { label: "Time reduction", value: `${Math.round((1 - d.plasmaHoursPerNozzle / d.discHoursPerNozzle) * 100)}%` },
      { label: "Total annual savings", value: `${fmtNum(result.timeSavings)} hrs × $${d.laborRate}/hr = ${fmtCurrency(result.savings)}`, bold: true },
    ],
    boilerSupports: [
      { label: "Supports per year", value: `${d.supportsPerShutdown} × ${d.shutdownsPerYear} shutdowns = ${fmtNum(result.totalSupports)} supports/yr` },
      { label: "Disc cutting time", value: `${fmtNum(result.discHours)} worker-hrs/yr (${d.discTimePerSupport} min/support × ${d.numWorkers} workers)` },
      { label: "Plasma cutting time", value: `${fmtNum(result.plasmaHours)} worker-hrs/yr (${d.plasmaTimePct}% of disc time)` },
      { label: "Time reduction", value: `${100 - d.plasmaTimePct}%` },
      { label: "Total annual savings", value: `${fmtNum(result.timeSavings)} hrs × $${d.laborRate}/hr = ${fmtCurrency(result.savings)}`, bold: true },
    ],
    pipeBeveling: [
      { label: "Pipes beveled per year", value: `${d.pipesPerDay}/day × ${d.opDays} days × ${d.numWorkers} workers = ${fmtNum(result.totalPipes * d.numWorkers)} pipe-passes/yr` },
      { label: "Oxyfuel (bevel + grind)", value: `${d.oxyBevelMin + d.oxyGrindMin} min/pipe → ${fmtNum(result.oxyTotalHours)} hrs/yr total` },
      { label: "Plasma (bevel + grind)", value: `${d.plasmaBevelMin + d.plasmaGrindMin} min/pipe → ${fmtNum(result.plasmaTotalHours)} hrs/yr total` },
      { label: "Total annual savings", value: `${fmtNum(result.timeSavings)} hrs × $${d.laborRate}/hr = ${fmtCurrency(result.savings)}`, bold: true },
    ],
    columnWork: [
      { label: "Components per year", value: `${d.unitsPerJob} × ${d.jobsPerYear} jobs = ${fmtNum(result.totalUnits)} components/yr` },
      { label: "Current method time", value: `${fmtNum(result.currentHours)} worker-hrs/yr (${d.currentHrsPerUnit} hrs/component × ${d.numWorkers} workers)` },
      { label: "Plasma time", value: `${fmtNum(result.plasmaHours)} worker-hrs/yr (${d.plasmaTimePct}% of current)` },
      { label: "Total annual savings", value: `${fmtNum(result.timeSavings)} hrs × $${d.laborRate}/hr = ${fmtCurrency(result.savings)}`, bold: true },
    ],
    tubeRemoval: [
      { label: "Tubes per year", value: `${d.tubesPerJob} × ${d.jobsPerYear} jobs = ${fmtNum(result.totalTubes)} tubes/yr` },
      { label: "Disc cutting time", value: `${fmtNum(result.discHours)} worker-hrs/yr (${d.discMinPerTube} min/tube × ${d.numWorkers} workers)` },
      { label: "Plasma cutting time", value: `${fmtNum(result.plasmaHours)} worker-hrs/yr (${d.plasmaTimePct}% of disc time)` },
      { label: "Total annual savings", value: `${fmtNum(result.timeSavings)} hrs × $${d.laborRate}/hr = ${fmtCurrency(result.savings)}`, bold: true },
    ],
  };
  return lines[appId] || [];
}

export function generatePDF({ apps, calcData, unit, lang, userInfo }) {
  const defaults = INDUSTRY_DEFAULTS[unit];
  const names = APP_NAMES[lang] || APP_NAMES.en;
  const why = APP_WHY[lang] || APP_WHY.en;

  const results = apps.map((appId) => {
    const data = { ...(defaults[appId] || {}), ...(calcData[appId] || {}) };
    let result = { timeSavings: 0, savings: 0 };
    try { result = APP_CALC_MAP[appId](data); } catch (e) {}
    const breakdown = getBreakdownLines(appId, data, result);
    return { appId, data, result, breakdown };
  });

  const totalSavings = results.reduce((s, r) => s + (r.result.savings || 0), 0);
  const totalTime = results.reduce((s, r) => s + (r.result.timeSavings || 0), 0);
  const topResult = [...results].sort((a, b) => b.result.savings - a.result.savings)[0];

  const date = new Date().toLocaleDateString(
    lang === "pt" ? "pt-BR" : lang === "es" ? "es-ES" : "en-US",
    { year: "numeric", month: "long", day: "numeric" }
  );

  const L = {
    en: {
      title: "Plasma Cutting Savings Report — Oil & Gas Refinery",
      subtitle: "Prepared by Industrial Cutting Labs",
      totalSavings: "Total Estimated Annual Savings",
      perYear: "per year",
      hrsSaved: "labor hours saved/yr",
      ftesFreed: "equivalent FTEs freed",
      appsAnalyzed: "applications analyzed",
      aboutTitle: "About this report & methodology",
      about1: "This report was generated using Flare — a plasma cutting savings calculator developed by Industrial Cutting Labs, based on field data from validated plasma cutting studies in oil refinery maintenance operations.",
      about2: "Labor savings are calculated using your provided hourly rate and operational data. Where custom data was not entered, industry averages from validated refinery field tests were used. Actual savings will vary based on material thickness, operator skill, equipment model, and site conditions.",
      about3: "This report is intended as a decision-support tool. For a full ROI analysis including equipment investment and consumables, contact an Industrial Cutting Labs specialist.",
      summaryTitle: "Summary of Annual Savings by Application",
      appCol: "Application",
      timeSavedCol: "Time Saved (hrs/yr)",
      savingsCol: "Annual Savings",
      pctCol: "% of Total",
      totalRow: "TOTAL",
      detailTitle: "Detailed Analysis by Application",
      whyTitle: "Why plasma outperforms the current method",
      calcTitle: "Calculation breakdown",
      topOppLabel: "Top savings opportunity",
      addBenefitsTitle: "Additional benefits not quantified in this report",
      addBenefits: [
        "Reduced heat-affected zone (HAZ) — smaller metallurgical impact near the cut edge, reducing the risk of weld rejection",
        "Elimination of flammable gas cylinders (LPG/acetylene + oxygen) — significant safety improvement and logistics simplification",
        "Less solid waste and metallic fumes — improved environmental compliance on site",
        "Cleaner cut edges — reduced need for rework and post-cut conditioning before welding",
        "Faster equipment return to service — reduced production downtime during scheduled shutdowns",
        "Stainless steel compatibility — plasma cuts 304L, 309L, 316L without pre-treatment",
      ],
      dataSource: "Savings benchmarks are based on validated field studies of plasma cutting technology applied to oil refinery maintenance operations. Actual results will vary based on site conditions, equipment model, and operator experience.",
      ctaTitle: "Ready to validate these numbers at your site?",
      ctaSub: "Contact Industrial Cutting Labs for a site assessment and equipment demonstration.",
      disclaimer: "Disclaimer: Savings estimates are based on industry benchmarks and user-provided operational data. Actual results may vary. This report does not constitute a guarantee of performance or return on investment.",
      generatedBy: "Generated by Flare",
      iclTag: "Industrial Cutting Labs — industrialcuttinglabs.com",
    },
    es: {
      title: "Informe de Ahorros en Corte Plasma — Refinería Oil & Gas",
      subtitle: "Preparado por Industrial Cutting Labs",
      totalSavings: "Ahorros Anuales Estimados Totales",
      perYear: "por año",
      hrsSaved: "horas de mano de obra ahorradas/año",
      ftesFreed: "FTEs equivalentes liberados",
      appsAnalyzed: "aplicaciones analizadas",
      aboutTitle: "Sobre este informe y metodología",
      about1: "Este informe fue generado usando Flare — una calculadora de ahorros en corte plasma desarrollada por Industrial Cutting Labs, basada en datos de campo de estudios validados de corte plasma en operaciones de mantenimiento en refinerías.",
      about2: "Los ahorros de mano de obra se calculan usando la tarifa horaria y los datos operativos proporcionados. Donde no se ingresaron datos personalizados, se utilizaron promedios de la industria de pruebas de campo validadas en refinerías.",
      about3: "Este informe está diseñado como herramienta de apoyo a la decisión. Para un análisis completo de ROI que incluya inversión en equipos y consumibles, contacte a un especialista de Industrial Cutting Labs.",
      summaryTitle: "Resumen de Ahorros Anuales por Aplicación",
      appCol: "Aplicación",
      timeSavedCol: "Tiempo Ahorrado (hrs/año)",
      savingsCol: "Ahorros Anuales",
      pctCol: "% del Total",
      totalRow: "TOTAL",
      detailTitle: "Análisis Detallado por Aplicación",
      whyTitle: "Por qué el plasma supera al método actual",
      calcTitle: "Desglose del cálculo",
      topOppLabel: "Mayor oportunidad de ahorro",
      addBenefitsTitle: "Beneficios adicionales no cuantificados en este informe",
      addBenefits: [
        "Zona afectada por calor (HAZ) reducida — menor impacto metalúrgico cerca del borde de corte",
        "Eliminación de cilindros de gas inflamable (LPG/acetileno + oxígeno) — mejora significativa de seguridad",
        "Menos residuos sólidos y humos metálicos — mejor cumplimiento ambiental en el sitio",
        "Bordes de corte más limpios — menor necesidad de retrabajo antes de soldar",
        "Retorno más rápido del equipo al servicio — menos tiempo de inactividad durante paradas programadas",
        "Compatibilidad con acero inoxidable — el plasma corta 304L, 309L, 316L sin pretratamiento",
      ],
      dataSource: "Los benchmarks de ahorro están basados en estudios de campo validados de corte plasma aplicado al mantenimiento en refinerías. Los resultados reales variarán según las condiciones del sitio, modelo de equipo y experiencia del operador.",
      ctaTitle: "¿Listo para validar estos números en su sitio?",
      ctaSub: "Contacte a Industrial Cutting Labs para una evaluación de sitio y demostración de equipos.",
      disclaimer: "Descargo: Las estimaciones de ahorro se basan en benchmarks de la industria y datos operativos proporcionados por el usuario. Los resultados reales pueden variar.",
      generatedBy: "Generado por Flare",
      iclTag: "Industrial Cutting Labs — industrialcuttinglabs.com",
    },
    pt: {
      title: "Relatório de Economias em Corte a Plasma — Refinaria Oil & Gas",
      subtitle: "Preparado por Industrial Cutting Labs",
      totalSavings: "Economias Anuais Estimadas Totais",
      perYear: "por ano",
      hrsSaved: "horas de mão de obra economizadas/ano",
      ftesFreed: "FTEs equivalentes liberados",
      appsAnalyzed: "aplicações analisadas",
      aboutTitle: "Sobre este relatório e metodologia",
      about1: "Este relatório foi gerado usando o Flare — uma calculadora de economias em corte a plasma desenvolvida pela Industrial Cutting Labs, baseada em dados de campo de estudos validados de corte a plasma em operações de manutenção em refinarias.",
      about2: "As economias de mão de obra são calculadas usando a taxa horária e os dados operacionais fornecidos. Onde dados personalizados não foram inseridos, foram usadas médias do setor de testes de campo validados em refinarias.",
      about3: "Este relatório é destinado como ferramenta de suporte à decisão. Para uma análise completa de ROI incluindo investimento em equipamentos e consumíveis, entre em contato com um especialista da Industrial Cutting Labs.",
      summaryTitle: "Resumo de Economias Anuais por Aplicação",
      appCol: "Aplicação",
      timeSavedCol: "Tempo Economizado (hrs/ano)",
      savingsCol: "Economias Anuais",
      pctCol: "% do Total",
      totalRow: "TOTAL",
      detailTitle: "Análise Detalhada por Aplicação",
      whyTitle: "Por que o plasma supera o método atual",
      calcTitle: "Detalhamento do cálculo",
      topOppLabel: "Maior oportunidade de economia",
      addBenefitsTitle: "Benefícios adicionais não quantificados neste relatório",
      addBenefits: [
        "Zona termicamente afetada (ZTA) reduzida — menor impacto metalúrgico perto da borda de corte, reduzindo risco de rejeição de soldas",
        "Eliminação de cilindros de gás inflamável (GLP/acetileno + oxigênio) — melhoria significativa de segurança e simplificação logística",
        "Menos resíduos sólidos e fumos metálicos — melhor conformidade ambiental no local",
        "Bordas de corte mais limpas — menor necessidade de retrabalho e condicionamento pós-corte antes de soldar",
        "Retorno mais rápido do equipamento ao serviço — menos tempo de inatividade durante paradas programadas",
        "Compatibilidade com aço inoxidável — o plasma corta 304L, 309L, 316L sem pré-tratamento",
      ],
      dataSource: "Os benchmarks de economia são baseados em estudos de campo validados de corte a plasma aplicado à manutenção em refinarias. Os resultados reais variarão conforme as condições do local, modelo de equipamento e experiência do operador.",
      ctaTitle: "Pronto para validar esses números no seu site?",
      ctaSub: "Entre em contato com a Industrial Cutting Labs para uma avaliação de local e demonstração de equipamentos.",
      disclaimer: "Aviso: As estimativas de economia são baseadas em benchmarks do setor e dados operacionais fornecidos pelo usuário. Os resultados reais podem variar.",
      generatedBy: "Gerado pelo Flare",
      iclTag: "Industrial Cutting Labs — industrialcuttinglabs.com",
    },
  };

  const tx = L[lang] || L.en;

  const html = `<!DOCTYPE html>
<html lang="${lang}">
<head>
<meta charset="UTF-8"/>
<title>Flare Report — ${userInfo.company || "Refinery"}</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Helvetica Neue', Arial, sans-serif; background: #fff; color: #1a1a1a; font-size: 13px; line-height: 1.6; }
  .page { max-width: 840px; margin: 0 auto; padding: 48px; }

  /* HEADER */
  .header { display: flex; justify-content: space-between; align-items: flex-start; padding-bottom: 24px; border-bottom: 3px solid #ff6d00; margin-bottom: 32px; }
  .brand { display: flex; align-items: center; gap: 10px; }
  .brand-flame { font-size: 28px; }
  .brand-text {}
  .brand-name { font-size: 24px; font-weight: 800; color: #ff6d00; letter-spacing: 3px; text-transform: uppercase; line-height: 1; }
  .brand-sub { font-size: 10px; color: #999; margin-top: 3px; letter-spacing: 0.5px; }
  .header-meta { text-align: right; font-size: 12px; color: #666; line-height: 2; }
  .header-meta .report-name { font-size: 15px; font-weight: 700; color: #1a1a1a; display: block; line-height: 1.3; margin-bottom: 4px; }
  .header-meta .report-company { font-size: 13px; font-weight: 600; color: #ff6d00; display: block; }

  /* HERO BANNER */
  .hero { background: #0a0f18; color: #fff; border-radius: 14px; padding: 36px; margin-bottom: 28px; }
  .hero-top { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 28px; }
  .hero-left {}
  .hero-label { font-size: 10px; font-weight: 700; letter-spacing: 3px; color: #ff6d00; text-transform: uppercase; margin-bottom: 8px; }
  .hero-amount { font-size: 68px; font-weight: 800; color: #fff; line-height: 1; }
  .hero-period { font-size: 15px; color: #90a4ae; margin-top: 4px; }
  .hero-right { text-align: right; }
  .hero-tag { font-size: 11px; color: #90a4ae; margin-bottom: 6px; }
  .hero-user { font-size: 14px; font-weight: 600; color: #fff; }
  .hero-role { font-size: 11px; color: #90a4ae; }
  .hero-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 24px; }
  .hero-stat { text-align: center; }
  .hero-stat-val { font-size: 30px; font-weight: 800; color: #ff6d00; display: block; line-height: 1; }
  .hero-stat-label { font-size: 10px; color: #90a4ae; margin-top: 4px; display: block; }

  /* METHODOLOGY */
  .methodology { background: #fff8f0; border: 1px solid #ffd0a0; border-left: 4px solid #ff6d00; border-radius: 0 10px 10px 0; padding: 18px 22px; margin-bottom: 28px; }
  .methodology h3 { font-size: 11px; font-weight: 700; color: #b34700; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 10px; }
  .methodology p { font-size: 12px; color: #5d4037; line-height: 1.7; margin-bottom: 6px; }
  .methodology p:last-child { margin-bottom: 0; }

  /* PROFILE BOX */
  .profile { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-bottom: 28px; }
  .profile-item { background: #f8f8f8; border: 1px solid #eee; border-radius: 8px; padding: 10px 14px; }
  .profile-label { font-size: 9px; font-weight: 700; color: #999; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px; }
  .profile-value { font-size: 13px; font-weight: 600; color: #1a1a1a; }

  /* SECTION TITLE */
  .section-title { font-size: 10px; font-weight: 700; letter-spacing: 2px; color: #ff6d00; text-transform: uppercase; margin-bottom: 16px; padding-bottom: 8px; border-bottom: 2px solid #ffe0cc; margin-top: 32px; }

  /* SUMMARY TABLE */
  .summary-table { width: 100%; border-collapse: collapse; margin-bottom: 8px; }
  .summary-table thead tr { background: #0a0f18; }
  .summary-table thead th { color: #fff; padding: 10px 14px; font-size: 11px; font-weight: 700; text-align: left; }
  .summary-table thead th:not(:first-child) { text-align: right; }
  .summary-table tbody tr { border-bottom: 1px solid #f0f0f0; }
  .summary-table tbody tr:nth-child(even) { background: #fafafa; }
  .summary-table tbody td { padding: 10px 14px; }
  .summary-table tbody td:not(:first-child) { text-align: right; }
  .summary-table tfoot tr { background: #fff8f0; border-top: 2px solid #ff6d00; }
  .summary-table tfoot td { padding: 12px 14px; font-weight: 800; font-size: 14px; }
  .summary-table tfoot td:not(:first-child) { text-align: right; }
  .savings-val { color: #b34700; font-weight: 700; }
  .total-savings-val { color: #ff6d00; font-size: 16px; }
  .pct-bar { display: inline-block; width: 50px; height: 5px; background: #eee; border-radius: 100px; vertical-align: middle; margin-left: 6px; overflow: hidden; }
  .pct-fill { height: 100%; background: linear-gradient(90deg, #ff6d00, #ffd600); border-radius: 100px; }
  .app-icon-cell { font-size: 16px; margin-right: 6px; }

  /* TOP OPPORTUNITY */
  .top-opp { background: #fff3e0; border: 1px solid #ffcc80; border-radius: 10px; padding: 16px 20px; margin-bottom: 28px; display: flex; gap: 14px; align-items: flex-start; }
  .top-opp-icon { font-size: 28px; flex-shrink: 0; }
  .top-opp-label { font-size: 9px; font-weight: 700; color: #e65100; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px; }
  .top-opp-title { font-size: 15px; font-weight: 700; color: #1a1a1a; margin-bottom: 4px; }
  .top-opp-val { font-size: 13px; color: #b34700; font-weight: 600; }

  /* APP SECTIONS */
  .app-section { margin-bottom: 24px; border: 1px solid #e8e8e8; border-radius: 12px; overflow: hidden; page-break-inside: avoid; }
  .app-header { background: #0a0f18; padding: 14px 20px; display: flex; align-items: center; gap: 12px; }
  .app-header-icon { font-size: 20px; }
  .app-header-name { font-size: 14px; font-weight: 700; color: #fff; flex: 1; }
  .app-header-saving { font-size: 18px; font-weight: 800; color: #ff6d00; }
  .app-body { padding: 18px 20px; }
  .app-why { font-size: 12px; color: #455a64; line-height: 1.7; margin-bottom: 14px; padding: 12px 16px; background: #f9f9f9; border-radius: 8px; border-left: 3px solid #ff6d00; }
  .app-metrics { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-bottom: 14px; }
  .app-metric { background: #fff8f0; border: 1px solid #ffe0cc; border-radius: 8px; padding: 10px 12px; text-align: center; }
  .app-metric-val { font-size: 18px; font-weight: 800; color: #ff6d00; display: block; }
  .app-metric-label { font-size: 10px; color: #999; margin-top: 2px; }
  .app-calc-title { font-size: 10px; font-weight: 700; color: #999; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px; }
  .app-breakdown { width: 100%; border-collapse: collapse; }
  .app-breakdown tr { border-bottom: 1px solid #f5f5f5; }
  .app-breakdown tr:last-child { border-bottom: none; background: #fff8f0; }
  .app-breakdown td { padding: 7px 10px; font-size: 12px; color: #455a64; }
  .app-breakdown td:last-child { text-align: right; color: #b34700; font-weight: 600; }
  .app-breakdown tr:last-child td { font-weight: 700; font-size: 13px; color: #ff6d00; }

  /* ADDITIONAL BENEFITS */
  .add-benefits { background: #f0f7ff; border: 1px solid #b3d4f7; border-radius: 12px; padding: 20px 24px; margin-bottom: 28px; }
  .add-benefits h3 { font-size: 11px; font-weight: 700; color: #1565c0; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 14px; }
  .add-benefits-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
  .add-benefit { display: flex; align-items: flex-start; gap: 8px; font-size: 12px; color: #37474f; line-height: 1.5; }
  .add-dot { width: 6px; height: 6px; border-radius: 50%; background: #ff6d00; flex-shrink: 0; margin-top: 4px; }

  /* DATA SOURCE */
  .data-source { background: #f9f9f9; border: 1px solid #eee; border-radius: 8px; padding: 14px 18px; margin-bottom: 28px; font-size: 11px; color: #888; line-height: 1.6; }
  .data-source strong { color: #ff6d00; }

  /* CTA */
  .cta { background: #0a0f18; color: #fff; border-radius: 12px; padding: 24px 28px; margin-bottom: 28px; display: flex; justify-content: space-between; align-items: center; gap: 20px; }
  .cta-title { font-size: 17px; font-weight: 700; color: #fff; margin-bottom: 6px; }
  .cta-sub { font-size: 12px; color: #90a4ae; }
  .cta-links { text-align: right; font-size: 12px; line-height: 2.2; flex-shrink: 0; }
  .cta-links a { color: #ff6d00; text-decoration: none; display: block; font-weight: 600; }

  /* FOOTER */
  .footer { padding-top: 20px; border-top: 2px solid #eee; display: flex; justify-content: space-between; align-items: flex-start; }
  .footer-brand { font-size: 16px; font-weight: 800; color: #ff6d00; letter-spacing: 2px; }
  .footer-sub { font-size: 10px; color: #bbb; margin-top: 2px; }
  .footer-date { font-size: 11px; color: #bbb; text-align: right; }
  .disclaimer { font-size: 10px; color: #ccc; line-height: 1.6; margin-top: 16px; text-align: center; }

  @media print {
    body { print-color-adjust: exact; -webkit-print-color-adjust: exact; }
    .page { padding: 24px; }
    .app-section { page-break-inside: avoid; }
  }
</style>
</head>
<body>
<div class="page">

  <!-- HEADER -->
  <div class="header">
    <div class="brand">
      <div class="brand-flame">🔥</div>
      <div class="brand-text">
        <div class="brand-name">Flare</div>
        <div class="brand-sub">Industrial Cutting Labs — industrialcuttinglabs.com</div>
      </div>
    </div>
    <div class="header-meta">
      <span class="report-name">${tx.title}</span>
      <span class="report-company">${userInfo.company || ""}${userInfo.refinery ? " · " + userInfo.refinery : ""}</span>
      ${userInfo.country || ""}
      <br/>${date}
    </div>
  </div>

  <!-- HERO -->
  <div class="hero">
    <div class="hero-top">
      <div class="hero-left">
        <div class="hero-label">${tx.totalSavings}</div>
        <div class="hero-amount">${fmtCurrency(totalSavings)}</div>
        <div class="hero-period">${tx.perYear}</div>
      </div>
      <div class="hero-right">
        <div class="hero-tag">${tx.subtitle}</div>
        <div class="hero-user">${userInfo.name || ""}</div>
        <div class="hero-role">${userInfo.role || ""}${userInfo.role && userInfo.company ? " · " : ""}${userInfo.company || ""}</div>
      </div>
    </div>
    <div class="hero-stats">
      <div class="hero-stat">
        <span class="hero-stat-val">${fmtNum(totalTime)}</span>
        <span class="hero-stat-label">${tx.hrsSaved}</span>
      </div>
      <div class="hero-stat">
        <span class="hero-stat-val">~${Math.max(1, Math.round(totalTime / 1800))}</span>
        <span class="hero-stat-label">${tx.ftesFreed}</span>
      </div>
      <div class="hero-stat">
        <span class="hero-stat-val">${apps.length}</span>
        <span class="hero-stat-label">${tx.appsAnalyzed}</span>
      </div>
    </div>
  </div>

  ${userInfo.name || userInfo.company || userInfo.role || userInfo.refinery || userInfo.country ? `
  <!-- PROFILE -->
  <div class="profile">
    ${userInfo.name ? `<div class="profile-item"><div class="profile-label">${lang === "pt" ? "Nome" : lang === "es" ? "Nombre" : "Name"}</div><div class="profile-value">${userInfo.name}</div></div>` : ""}
    ${userInfo.role ? `<div class="profile-item"><div class="profile-label">${lang === "pt" ? "Cargo" : lang === "es" ? "Cargo" : "Role"}</div><div class="profile-value">${userInfo.role}</div></div>` : ""}
    ${userInfo.company ? `<div class="profile-item"><div class="profile-label">${lang === "pt" ? "Empresa" : lang === "es" ? "Empresa" : "Company"}</div><div class="profile-value">${userInfo.company}</div></div>` : ""}
    ${userInfo.refinery ? `<div class="profile-item"><div class="profile-label">${lang === "pt" ? "Refinaria" : lang === "es" ? "Refinería" : "Refinery"}</div><div class="profile-value">${userInfo.refinery}</div></div>` : ""}
    ${userInfo.country ? `<div class="profile-item"><div class="profile-label">${lang === "pt" ? "País" : lang === "es" ? "País" : "Country"}</div><div class="profile-value">${userInfo.country}</div></div>` : ""}
    ${userInfo.email ? `<div class="profile-item"><div class="profile-label">Email</div><div class="profile-value">${userInfo.email}</div></div>` : ""}
  </div>
  ` : ""}

  <!-- METHODOLOGY -->
  <div class="methodology">
    <h3>${tx.aboutTitle}</h3>
    <p>${tx.about1}</p>
    <p>${tx.about2}</p>
    <p>${tx.about3}</p>
  </div>

  <!-- SUMMARY TABLE -->
  <div class="section-title">${tx.summaryTitle}</div>
  <table class="summary-table">
    <thead>
      <tr>
        <th>${tx.appCol}</th>
        <th>${tx.timeSavedCol}</th>
        <th>${tx.savingsCol}</th>
        <th>${tx.pctCol}</th>
      </tr>
    </thead>
    <tbody>
      ${results.map(({ appId, result }) => {
        const pct = totalSavings > 0 ? (result.savings / totalSavings * 100) : 0;
        return `<tr>
          <td><span class="app-icon-cell">${APP_ICONS[appId]}</span>${names[appId]}</td>
          <td style="text-align:right">${fmtNum(result.timeSavings)}</td>
          <td style="text-align:right" class="savings-val">${fmtCurrency(result.savings)}</td>
          <td style="text-align:right">${pct.toFixed(0)}%<span class="pct-bar"><span class="pct-fill" style="width:${Math.min(100, pct)}%"></span></span></td>
        </tr>`;
      }).join("")}
    </tbody>
    <tfoot>
      <tr>
        <td>${tx.totalRow}</td>
        <td style="text-align:right">${fmtNum(totalTime)} hrs/yr</td>
        <td style="text-align:right" class="total-savings-val">${fmtCurrency(totalSavings)}</td>
        <td style="text-align:right">100%</td>
      </tr>
    </tfoot>
  </table>

  <!-- TOP OPPORTUNITY -->
  ${topResult ? `
  <div class="top-opp">
    <div class="top-opp-icon">${APP_ICONS[topResult.appId]}</div>
    <div>
      <div class="top-opp-label">${tx.topOppLabel}</div>
      <div class="top-opp-title">${names[topResult.appId]}</div>
      <div class="top-opp-val">${fmtCurrency(topResult.result.savings)}/yr · ${fmtNum(topResult.result.timeSavings)} hrs saved</div>
    </div>
  </div>
  ` : ""}

  <!-- DETAILED ANALYSIS -->
  <div class="section-title">${tx.detailTitle}</div>

  ${results.map(({ appId, data, result, breakdown }) => `
  <div class="app-section">
    <div class="app-header">
      <div class="app-header-icon">${APP_ICONS[appId]}</div>
      <div class="app-header-name">${names[appId]}</div>
      <div class="app-header-saving">${fmtCurrency(result.savings)}/yr</div>
    </div>
    <div class="app-body">
      <div class="app-why">${why[appId] || ""}</div>
      <div class="app-metrics">
        <div class="app-metric">
          <span class="app-metric-val">${fmtNum(result.timeSavings)}</span>
          <span class="app-metric-label">hrs/yr saved</span>
        </div>
        <div class="app-metric">
          <span class="app-metric-val">${fmtCurrency(result.savings)}</span>
          <span class="app-metric-label">annual savings</span>
        </div>
        <div class="app-metric">
          <span class="app-metric-val">~${Math.max(1, Math.round(result.timeSavings / 1800))}</span>
          <span class="app-metric-label">equiv. FTEs freed</span>
        </div>
      </div>
      <div class="app-calc-title">${tx.calcTitle}</div>
      <table class="app-breakdown">
        ${breakdown.map(row => `<tr><td>${row.label}</td><td>${row.value}</td></tr>`).join("")}
      </table>
    </div>
  </div>
  `).join("")}

  <!-- ADDITIONAL BENEFITS -->
  <div class="add-benefits">
    <h3>${tx.addBenefitsTitle}</h3>
    <div class="add-benefits-grid">
      ${tx.addBenefits.map(b => `<div class="add-benefit"><div class="add-dot"></div><div>${b}</div></div>`).join("")}
    </div>
  </div>

  <!-- DATA SOURCE -->
  <div class="data-source">
    <strong>📋 ${lang === "pt" ? "Fonte de dados" : lang === "es" ? "Fuente de datos" : "Data source"}:</strong> ${tx.dataSource}
  </div>

  <!-- CTA -->
  <div class="cta">
    <div>
      <div class="cta-title">${tx.ctaTitle}</div>
      <div class="cta-sub">${tx.ctaSub}</div>
    </div>
    <div class="cta-links">
      <a href="https://www.industrialcuttinglabs.com">industrialcuttinglabs.com</a>
      <a href="https://www.linkedin.com/in/guivrossi/">linkedin.com/in/guivrossi</a>
    </div>
  </div>

  <!-- FOOTER -->
  <div class="footer">
    <div>
      <div class="footer-brand">🔥 FLARE</div>
      <div class="footer-sub">${tx.iclTag}</div>
    </div>
    <div class="footer-date">${date}</div>
  </div>
  <div class="disclaimer">${tx.disclaimer}</div>

</div>
</body>
</html>`;

  const win = window.open("", "_blank");
  if (!win) return;
  win.document.write(html);
  win.document.close();
  setTimeout(() => win.print(), 800);
}
