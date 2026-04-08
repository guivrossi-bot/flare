// ─── TANK PLATES ─────────────────────────────────────────────────────────────
// Replacing oxyfuel with plasma for storage tank floor / roof plate cutting.
// Study data: 20 sheets = 6.6 h (oxy) vs 3.3 h (plasma) → 54% cost reduction.
export function calcTankPlates(d) {
  const sheetsPerYear = d.sheetsPerJob * d.jobsPerYear;
  const oxyHours = (sheetsPerYear * d.oxyTimePerSheet) / 60;
  const plasmaHours = (sheetsPerYear * d.plasmaTimePerSheet) / 60;
  const timeSavings = Math.max(0, oxyHours - plasmaHours);
  const laborSavings = timeSavings * d.laborRate;
  const gasSavings = oxyHours * d.oxyGasCostHr - plasmaHours * d.plasmaEnergyCostHr;
  const equipSavings = oxyHours * d.oxyEquipCostHr - plasmaHours * d.plasmaEquipCostHr;
  return {
    timeSavings,
    oxyHours,
    plasmaHours,
    sheetsPerYear,
    savings: Math.max(0, laborSavings + gasSavings + equipSavings),
  };
}

// ─── NOZZLE REMOVAL ───────────────────────────────────────────────────────────
// Replacing abrasive disc with plasma on thick-wall stainless steel nozzles.
// Study data (HDT): 4 nozzles, disc = 60 h → plasma = 12 h (80% reduction).
export function calcNozzleRemoval(d) {
  const totalNozzles = d.nozzlesPerJob * d.jobsPerYear;
  const discHours = totalNozzles * d.discHoursPerNozzle * d.numWorkers;
  const plasmaHours = totalNozzles * d.plasmaHoursPerNozzle * d.numWorkers;
  const timeSavings = Math.max(0, discHours - plasmaHours);
  return {
    timeSavings,
    discHours,
    plasmaHours,
    totalNozzles,
    savings: timeSavings * d.laborRate,
  };
}

// ─── BOILER SUPPORTS ─────────────────────────────────────────────────────────
// Replacing abrasive disc with plasma for boiler tube support replacement.
// Study data (RPBC): 50 supports/shutdown, plasma = 60% time reduction.
export function calcBoilerSupports(d) {
  const totalSupports = d.supportsPerShutdown * d.shutdownsPerYear;
  const discHours = (totalSupports * d.discTimePerSupport * d.numWorkers) / 60;
  const plasmaHours = discHours * (d.plasmaTimePct / 100);
  const timeSavings = Math.max(0, discHours - plasmaHours);
  return {
    timeSavings,
    discHours,
    plasmaHours,
    totalSupports,
    savings: timeSavings * d.laborRate,
  };
}

// ─── PIPE BEVELING ────────────────────────────────────────────────────────────
// Replacing oxyfuel + heavy grinding with plasma (manual or turtle track).
// Plasma produces a cleaner bevel requiring far less post-grind work.
export function calcPipeBeveling(d) {
  const totalPipes = d.pipesPerDay * d.opDays;
  const oxyTotalMin = totalPipes * (d.oxyBevelMin + d.oxyGrindMin) * d.numWorkers;
  const plasmaTotalMin = totalPipes * (d.plasmaBevelMin + d.plasmaGrindMin) * d.numWorkers;
  const timeSavings = Math.max(0, (oxyTotalMin - plasmaTotalMin) / 60);
  return {
    timeSavings,
    oxyTotalHours: oxyTotalMin / 60,
    plasmaTotalHours: plasmaTotalMin / 60,
    totalPipes,
    savings: timeSavings * d.laborRate,
  };
}

// ─── COLUMN WORK ─────────────────────────────────────────────────────────────
// Replacing disc / oxyfuel with plasma for distillation tower & column work.
// Study data: affected area reduced ~50%, equipment returned ahead of schedule.
export function calcColumnWork(d) {
  const totalUnits = d.unitsPerJob * d.jobsPerYear;
  const currentHours = totalUnits * d.currentHrsPerUnit * d.numWorkers;
  const plasmaHours = currentHours * (d.plasmaTimePct / 100);
  const timeSavings = Math.max(0, currentHours - plasmaHours);
  return {
    timeSavings,
    currentHours,
    plasmaHours,
    totalUnits,
    savings: timeSavings * d.laborRate,
  };
}

// ─── TUBE REMOVAL ─────────────────────────────────────────────────────────────
// Replacing abrasive disc with plasma for furnace / boiler tube removal.
// Plasma cuts without damaging the shell, eliminating repair rework.
export function calcTubeRemoval(d) {
  const totalTubes = d.tubesPerJob * d.jobsPerYear;
  const discHours = (totalTubes * d.discMinPerTube * d.numWorkers) / 60;
  const plasmaHours = discHours * (d.plasmaTimePct / 100);
  const timeSavings = Math.max(0, discHours - plasmaHours);
  return {
    timeSavings,
    discHours,
    plasmaHours,
    totalTubes,
    savings: timeSavings * d.laborRate,
  };
}

// ─── INDUSTRY DEFAULTS ───────────────────────────────────────────────────────
export const INDUSTRY_DEFAULTS = {
  metric: {
    tankPlates: {
      sheetsPerJob: 20, jobsPerYear: 12, laborRate: 20,
      oxyTimePerSheet: 20, plasmaTimePerSheet: 10,
      oxyGasCostHr: 8, plasmaEnergyCostHr: 3,
      oxyEquipCostHr: 4, plasmaEquipCostHr: 2,
    },
    nozzleRemoval: {
      nozzlesPerJob: 4, jobsPerYear: 6, laborRate: 22,
      discHoursPerNozzle: 15, plasmaHoursPerNozzle: 3, numWorkers: 2,
    },
    boilerSupports: {
      supportsPerShutdown: 50, shutdownsPerYear: 2, laborRate: 18,
      discTimePerSupport: 45, plasmaTimePct: 40, numWorkers: 3,
    },
    pipeBeveling: {
      pipesPerDay: 10, opDays: 260, laborRate: 20,
      oxyBevelMin: 20, plasmaBevelMin: 10,
      oxyGrindMin: 10, plasmaGrindMin: 2, numWorkers: 2,
    },
    columnWork: {
      unitsPerJob: 8, jobsPerYear: 4, laborRate: 22,
      currentHrsPerUnit: 3, plasmaTimePct: 50, numWorkers: 3,
    },
    tubeRemoval: {
      tubesPerJob: 100, jobsPerYear: 3, laborRate: 18,
      discMinPerTube: 20, plasmaTimePct: 45, numWorkers: 2,
    },
  },
  imperial: {
    tankPlates: {
      sheetsPerJob: 20, jobsPerYear: 12, laborRate: 20,
      oxyTimePerSheet: 20, plasmaTimePerSheet: 10,
      oxyGasCostHr: 8, plasmaEnergyCostHr: 3,
      oxyEquipCostHr: 4, plasmaEquipCostHr: 2,
    },
    nozzleRemoval: {
      nozzlesPerJob: 4, jobsPerYear: 6, laborRate: 25,
      discHoursPerNozzle: 15, plasmaHoursPerNozzle: 3, numWorkers: 2,
    },
    boilerSupports: {
      supportsPerShutdown: 50, shutdownsPerYear: 2, laborRate: 20,
      discTimePerSupport: 45, plasmaTimePct: 40, numWorkers: 3,
    },
    pipeBeveling: {
      pipesPerDay: 10, opDays: 260, laborRate: 22,
      oxyBevelMin: 20, plasmaBevelMin: 10,
      oxyGrindMin: 10, plasmaGrindMin: 2, numWorkers: 2,
    },
    columnWork: {
      unitsPerJob: 8, jobsPerYear: 4, laborRate: 25,
      currentHrsPerUnit: 3, plasmaTimePct: 50, numWorkers: 3,
    },
    tubeRemoval: {
      tubesPerJob: 100, jobsPerYear: 3, laborRate: 20,
      discMinPerTube: 20, plasmaTimePct: 45, numWorkers: 2,
    },
  },
};

export const APP_CALC_MAP = {
  tankPlates: calcTankPlates,
  nozzleRemoval: calcNozzleRemoval,
  boilerSupports: calcBoilerSupports,
  pipeBeveling: calcPipeBeveling,
  columnWork: calcColumnWork,
  tubeRemoval: calcTubeRemoval,
};
