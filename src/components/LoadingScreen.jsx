import { useState, useEffect, useRef } from "react";

const FACTS = {
  en: [
    "In 2024, Petrobras refurbished approximately 353 storage tanks — most using oxyfuel cutting.",
    "Plasma cutting reduced a 60-hour pressure vessel nozzle removal job to just 12 hours.",
    "Over 90% of cutting in Brazilian refineries still uses oxyfuel or abrasive disc methods.",
    "Replacing 50 boiler tube supports with plasma cut scheduled shutdown time by 60%.",
    "Plasma creates a narrower heat-affected zone, reducing weld rework on critical equipment.",
    "Six of Brazil's thirteen Petrobras refineries have already validated plasma in maintenance.",
    "Plasma starts instantly — no 10–30 second preheat required before every cut.",
  ],
  es: [
    "En 2024, Petrobras refaccionó aproximadamente 353 tanques de almacenamiento, la mayoría con oxicombustible.",
    "El plasma redujo una remoción de boquillas de 60 horas a solo 12 horas.",
    "Más del 90% del corte en refinerías brasileñas aún usa oxicombustible o disco abrasivo.",
    "Reemplazar 50 soportes de tubos de calderas con plasma redujo el tiempo de parada un 60%.",
    "El plasma crea una zona de afectación térmica más estrecha, reduciendo el retrabajo en soldaduras.",
    "Seis de las trece refinerías de Petrobras ya validaron el plasma en mantenimiento.",
    "El plasma arranca instantáneamente — sin precalentamiento de 10 a 30 segundos.",
  ],
  pt: [
    "Em 2024, a Petrobras reformou aproximadamente 353 tanques de armazenamento, a maioria com oxicombustível.",
    "O plasma reduziu uma remoção de bocais de 60 horas para apenas 12 horas.",
    "Mais de 90% do corte em refinarias brasileiras ainda usa oxicombustível ou disco abrasivo.",
    "Substituir 50 suportes de tubos de caldeiras com plasma reduziu o tempo de parada em 60%.",
    "O plasma cria uma zona termicamente afetada menor, reduzindo o retrabalho em soldas críticas.",
    "Seis das treze refinarias da Petrobras já validaram o plasma na manutenção.",
    "O plasma parte instantaneamente — sem pré-aquecimento de 10 a 30 segundos.",
  ],
};

const MESSAGES = {
  en: ["Igniting the calculations...", "Crunching your numbers...", "Mapping your savings...", "Optimizing your turnaround...", "Almost ready..."],
  es: ["Encendiendo los cálculos...", "Procesando tus números...", "Mapeando tus ahorros...", "Optimizando tu parada...", "Casi listo..."],
  pt: ["Iniciando os cálculos...", "Processando seus números...", "Mapeando suas economias...", "Otimizando sua parada...", "Quase pronto..."],
};

const NEWSLETTER_URL = "https://www.linkedin.com/build-relation/newsletter-follow?entityUrn=7419724116267520000";

export default function LoadingScreen({ lang, onDone }) {
  const [msgIndex, setMsgIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const facts = FACTS[lang] || FACTS.en;
  const messages = MESSAGES[lang] || MESSAGES.en;
  const fact = useRef(facts[Math.floor(Math.random() * facts.length)]).current;

  useEffect(() => {
    const timer = setTimeout(() => onDone(), 9000);
    const msgTimer = setInterval(() => setMsgIndex((p) => Math.min(p + 2, messages.length - 1)), 1800);
    const progTimer = setInterval(() => setProgress((p) => Math.min(p + 3, 100)), 180);
    return () => { clearTimeout(timer); clearInterval(msgTimer); clearInterval(progTimer); };
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "#0a0f18", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px", textAlign: "center", position: "relative", overflow: "hidden" }}>
      <style>{`
        @keyframes spinCW { to { transform: rotate(360deg); } }
        @keyframes spinCCW { to { transform: rotate(-360deg); } }
        @keyframes glowPulse { 0%,100% { opacity:0.5; transform:translate(-50%,-50%) scale(1); } 50% { opacity:1; transform:translate(-50%,-50%) scale(1.15); } }
        @keyframes fadeMsg { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
        @keyframes factSlide { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
      `}</style>

      <div style={{ position: "absolute", width: "600px", height: "600px", borderRadius: "50%", background: "radial-gradient(circle, rgba(255,109,0,0.07) 0%, transparent 70%)", top: "50%", left: "50%", transform: "translate(-50%,-50%)", animation: "glowPulse 3s ease-in-out infinite", pointerEvents: "none" }} />

      <div style={{ position: "relative", width: "100px", height: "100px", marginBottom: "36px" }}>
        <div style={{ position: "absolute", inset: 0, border: "3px solid rgba(255,109,0,0.15)", borderTopColor: "#ff6d00", borderRadius: "50%", animation: "spinCW 1.4s linear infinite" }} />
        <div style={{ position: "absolute", inset: "12px", border: "3px solid rgba(255,214,0,0.15)", borderTopColor: "#ffd600", borderRadius: "50%", animation: "spinCCW 1s linear infinite" }} />
        <div style={{ position: "absolute", inset: "24px", border: "2px solid rgba(255,109,0,0.1)", borderTopColor: "rgba(255,109,0,0.5)", borderRadius: "50%", animation: "spinCW 0.7s linear infinite" }} />
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "10px", height: "10px", borderRadius: "50%", background: "#ffd600" }} />
      </div>

      <div key={msgIndex} style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "32px", fontWeight: 800, color: "#fff", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "12px", animation: "fadeMsg 0.5s ease", minHeight: "44px" }}>
        {messages[msgIndex]}
      </div>

      <div style={{ width: "320px", height: "3px", background: "rgba(255,255,255,0.06)", borderRadius: "100px", overflow: "hidden", marginBottom: "48px" }}>
        <div style={{ height: "100%", width: progress + "%", background: "linear-gradient(90deg, #ff6d00, #ffd600)", borderRadius: "100px", transition: "width 0.08s linear" }} />
      </div>

      <div style={{ maxWidth: "520px", marginBottom: "36px", animation: "factSlide 0.8s ease 0.3s both" }}>
        <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "2px", color: "#ff6d00", textTransform: "uppercase", marginBottom: "10px" }}>
          {lang === "en" ? "Did you know?" : lang === "es" ? "¿Sabías que?" : "Você sabia?"}
        </div>
        <div style={{ fontSize: "16px", color: "#90a4ae", lineHeight: 1.7, fontStyle: "italic" }}>{fact}</div>
      </div>

      <div
        onClick={() => window.open(NEWSLETTER_URL, "_blank")}
        style={{ display: "inline-flex", alignItems: "center", gap: "10px", padding: "10px 22px", border: "1px solid rgba(255,109,0,0.25)", borderRadius: "100px", background: "rgba(255,109,0,0.06)", cursor: "pointer", animation: "factSlide 0.8s ease 0.6s both" }}
      >
        <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#ff6d00", flexShrink: 0 }} />
        <span style={{ fontSize: "12px", color: "#90a4ae" }}>
          {lang === "en" && "Stay sharp — follow "}
          {lang === "es" && "Mantente actualizado — sigue "}
          {lang === "pt" && "Fique atualizado — siga "}
          <span style={{ color: "#ff6d00", fontWeight: 700 }}>Industrial Cutting Processes</span>
          {lang === "en" && " on LinkedIn"}
          {lang === "es" && " en LinkedIn"}
          {lang === "pt" && " no LinkedIn"}
        </span>
      </div>
    </div>
  );
}
