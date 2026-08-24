/**
 * BRICS Explainable AI (XAI) Multi-Criteria Prioritization Engine
 * Algorithmic synthesis of Citizen Voice, Demographic Poverty, Deficit Gaps, and ESG alignment.
 */

import { appState } from '../state.js';
import { BRICS_COUNTRIES } from '../data/bricsData.js';
import { exportNDBDossier } from '../utils/exportDossier.js';

export class AiScoringEngineModule {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
  }

  init() {
    this.render();
    this.bindEvents();
  }

  bindEvents() {
    appState.subscribe('mcdaWeightsChanged', () => this.renderProjectCharters());
    appState.subscribe('countryChanged', () => this.renderProjectCharters());
    appState.subscribe('petitionsUpdated', () => this.renderProjectCharters());
  }

  render() {
    if (!this.container) return;

    this.container.innerHTML = `
      <div class="module-card">
        <div class="module-header">
          <div>
            <h2 class="module-title"><i class="icon-sliders"></i> Explainable AI (XAI) Multi-Criteria Decision Engine</h2>
            <p class="module-subtitle">Dynamic Weighted Prioritization combining Citizen Petitions, MPI Poverty, Deficits & ESG Metrics</p>
          </div>
          <button class="btn btn-outline btn-sm" id="resetWeightsBtn"><i class="icon-rotate-ccw"></i> Reset Standard Weights</button>
        </div>

        <!-- Weight Calibration Sliders -->
        <div class="weight-controls-grid">
          <div class="weight-card">
            <div class="weight-header">
              <span class="w-label">🗣️ Grassroots Citizen Demand</span>
              <span class="w-val" id="val_w1">${appState.mcdaWeights.citizenDemand}%</span>
            </div>
            <input type="range" class="w-slider" id="slider_w1" min="5" max="50" value="${appState.mcdaWeights.citizenDemand}">
            <p class="w-hint">Aggregated voice petitions, signatures & urgency ratings.</p>
          </div>

          <div class="weight-card">
            <div class="weight-header">
              <span class="w-label">📊 Demographic Vulnerability (MPI)</span>
              <span class="w-val" id="val_w2">${appState.mcdaWeights.demographics}%</span>
            </div>
            <input type="range" class="w-slider" id="slider_w2" min="5" max="50" value="${appState.mcdaWeights.demographics}">
            <p class="w-hint">Multidimensional Poverty Index, rural isolation & GINI.</p>
          </div>

          <div class="weight-card">
            <div class="weight-header">
              <span class="w-label">🚧 Infrastructure Deficit Gap</span>
              <span class="w-val" id="val_w3">${appState.mcdaWeights.deficitGap}%</span>
            </div>
            <input type="range" class="w-slider" id="slider_w3" min="5" max="50" value="${appState.mcdaWeights.deficitGap}">
            <p class="w-hint">Water stress, blackout rate & unpaved transit index.</p>
          </div>

          <div class="weight-card">
            <div class="weight-header">
              <span class="w-label">🌱 Climate ESG & Green Transition</span>
              <span class="w-val" id="val_w4">${appState.mcdaWeights.esg}%</span>
            </div>
            <input type="range" class="w-slider" id="slider_w4" min="5" max="40" value="${appState.mcdaWeights.esg}">
            <p class="w-hint">Carbon offset, drought resilience & renewable energy.</p>
          </div>

          <div class="weight-card">
            <div class="weight-header">
              <span class="w-label">📈 Economic Feasibility & Social ROI</span>
              <span class="w-val" id="val_w5">${appState.mcdaWeights.roi}%</span>
            </div>
            <input type="range" class="w-slider" id="slider_w5" min="5" max="30" value="${appState.mcdaWeights.roi}">
            <p class="w-hint">Projected social return multiplier per $1M invested.</p>
          </div>
        </div>

        <!-- Synthesized High-Priority Project Pipeline -->
        <div class="project-pipeline-section">
          <div class="pipeline-header">
            <h3><i class="icon-award"></i> High-Priority Bankable Project Charters (AI Synthesized)</h3>
            <span class="pipeline-meta">Ranked in real-time according to current policy weights</span>
          </div>

          <div class="charters-grid" id="chartersListContainer">
            <!-- Project cards rendered here -->
          </div>
        </div>
      </div>
    `;

    this.bindSliders();
    this.renderProjectCharters();
  }

  bindSliders() {
    const s1 = document.getElementById('slider_w1');
    const s2 = document.getElementById('slider_w2');
    const s3 = document.getElementById('slider_w3');
    const s4 = document.getElementById('slider_w4');
    const s5 = document.getElementById('slider_w5');

    const updateWeights = () => {
      const w1 = parseInt(s1.value, 10);
      const w2 = parseInt(s2.value, 10);
      const w3 = parseInt(s3.value, 10);
      const w4 = parseInt(s4.value, 10);
      const w5 = parseInt(s5.value, 10);

      document.getElementById('val_w1').innerText = `${w1}%`;
      document.getElementById('val_w2').innerText = `${w2}%`;
      document.getElementById('val_w3').innerText = `${w3}%`;
      document.getElementById('val_w4').innerText = `${w4}%`;
      document.getElementById('val_w5').innerText = `${w5}%`;

      appState.setMCDAWeights({
        citizenDemand: w1,
        demographics: w2,
        deficitGap: w3,
        esg: w4,
        roi: w5
      });
    };

    [s1, s2, s3, s4, s5].forEach(s => {
      if (s) s.addEventListener('input', updateWeights);
    });

    const resetBtn = document.getElementById('resetWeightsBtn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        s1.value = 30; s2.value = 25; s3.value = 20; s4.value = 15; s5.value = 10;
        updateWeights();
      });
    }
  }

  computePrioritizedProjects() {
    const weights = appState.mcdaWeights;
    const country = appState.currentCountry;

    // Collate district profiles
    let districts = [];
    if (country === 'ALL') {
      Object.values(BRICS_COUNTRIES).forEach(c => {
        if (c.districts) {
          c.districts.forEach(d => districts.push({ ...d, countryMeta: c }));
        }
      });
    } else {
      const c = BRICS_COUNTRIES[country];
      if (c && c.districts) {
        c.districts.forEach(d => districts.push({ ...d, countryMeta: c }));
      }
    }

    // Match petitions to districts
    const petitions = appState.petitions;

    const scoredProjects = districts.map(d => {
      const matchingPetitions = petitions.filter(p => p.districtId === d.id || p.districtName.includes(d.name.split('(')[0].trim()));
      const totalPetitions = matchingPetitions.length;
      const avgUrgency = totalPetitions > 0 ? (matchingPetitions.reduce((acc, p) => acc + p.urgencyScore, 0) / totalPetitions) : d.citizenUrgencyAvg;
      const avgDeficit = (d.deficits.water + d.deficits.power + d.deficits.transport + d.deficits.health + d.deficits.digital) / 5;

      // MCDA Score calculation
      const scoreDemand = (avgUrgency / 10.0) * 100;
      const scoreDemo = d.mpiPovertyIndex * 200; // Normalized 0-100
      const scoreDeficit = avgDeficit;
      const scoreESG = 75 + (d.deficits.water > 80 ? 15 : 5);
      const scoreROI = 82;

      const totalScore = (
        (scoreDemand * weights.citizenDemand) +
        (scoreDemo * weights.demographics) +
        (scoreDeficit * weights.deficitGap) +
        (scoreESG * weights.esg) +
        (scoreROI * weights.roi)
      ) / (weights.citizenDemand + weights.demographics + weights.deficitGap + weights.esg + weights.roi);

      // Determine top sector intervention
      const deficitKeys = Object.keys(d.deficits);
      const topDeficitKey = deficitKeys.reduce((a, b) => d.deficits[a] > d.deficits[b] ? a : b);
      const sectorNames = {
        water: 'Clean Water & Sanitation',
        power: 'Renewable Grid & Power',
        transport: 'Rural Roadways & Freight',
        health: 'Healthcare Clinics',
        digital: 'Digital Public Infra (Broadband)'
      };

      const topSector = sectorNames[topDeficitKey] || 'Clean Water & Sanitation';
      const estimatedCostUSD = (d.estimatedDeficitUSD * 0.45 * 1000000);

      return {
        id: `PROJ-${d.countryMeta.id}-${d.id.split('-').pop()}`,
        districtId: d.id,
        districtName: d.name,
        countryMeta: d.countryMeta,
        sector: topSector,
        totalScore: Math.min(99.5, totalScore).toFixed(1),
        urgencyScore: avgUrgency.toFixed(1),
        mpiScore: d.mpiPovertyIndex,
        ruralPct: d.ruralPct,
        beneficiaries: Math.floor(d.population * 0.35),
        estimatedCostUSD: estimatedCostUSD,
        sviMultiplier: (3.2 + (d.mpiPovertyIndex * 4)).toFixed(1),
        carbonOffset: `${Math.floor(estimatedCostUSD / 8000).toLocaleString()} Tonnes CO2/yr`,
        supportingPetitionsCount: d.activePetitions + (totalPetitions * 450),
        coreProblem: `Critical ${topDeficitKey.toUpperCase()} deficit rated at ${d.deficits[topDeficitKey]}% with severe rural community isolation.`,
        ndbStrategicPriority: d.ndbStrategicPriority,
        dpgReference: topSector.includes('Water') ? 'Jal Jeevan IoT Telemetry Blueprint (Apache 2.0)' : topSector.includes('Road') ? 'Welisizwe Modular Suspension Infrastructure' : 'Decentralized Solar Microgrid Architecture',
        timeframeMonths: topSector.includes('Water') ? 6 : topSector.includes('Road') ? 8 : 4,
        technicalArchitecture: `Deploy standardized Digital Public Good architecture featuring decentralized telemetry sensors, edge AI anomaly detection, and localized maintenance cooperatives. Fully compatible with national public procurement frameworks and NDB ESG criteria.`
      };
    });

    // Sort descending by total score
    return scoredProjects.sort((a, b) => b.totalScore - a.totalScore);
  }

  renderProjectCharters() {
    const container = document.getElementById('chartersListContainer');
    if (!container) return;

    const projects = this.computePrioritizedProjects();

    container.innerHTML = projects.map((p, rank) => `
      <div class="charter-card slide-up" style="animation-delay: ${rank * 0.08}s">
        <div class="charter-header">
          <div class="charter-rank">#${rank + 1}</div>
          <div class="charter-title-box">
            <h4>${p.districtName}</h4>
            <span class="charter-country">${p.countryMeta.flag} ${p.countryMeta.name} • ${p.sector}</span>
          </div>
          <div class="charter-score-badge">
            <span class="score-val">${p.totalScore}</span>
            <span class="score-lbl">MCDA AI Index</span>
          </div>
        </div>

        <div class="charter-body">
          <p class="charter-desc"><strong>Identified Need:</strong> ${p.coreProblem}</p>
          <div class="charter-ndb-badge"><i class="icon-shield"></i> NDB Priority: ${p.ndbStrategicPriority}</div>

          <div class="charter-metrics-grid">
            <div class="c-metric">
              <span class="c-lbl">Direct Beneficiaries</span>
              <span class="c-val text-cyan">${p.beneficiaries.toLocaleString()} Citizens</span>
            </div>
            <div class="c-metric">
              <span class="c-lbl">Est. Investment</span>
              <span class="c-val text-green">$${(p.estimatedCostUSD / 1000000).toFixed(2)}M USD</span>
            </div>
            <div class="c-metric">
              <span class="c-lbl">Social ROI (SVI)</span>
              <span class="c-val text-purple">${p.sviMultiplier}x Multiplier</span>
            </div>
            <div class="c-metric">
              <span class="c-lbl">Petitions Ingested</span>
              <span class="c-val text-amber">${p.supportingPetitionsCount.toLocaleString()} Voices</span>
            </div>
          </div>

          <div class="score-breakdown-bars">
            <div class="s-bar-row">
              <span>Citizen Demand (w1):</span>
              <div class="bar-track"><div class="bar-fill cyan" style="width: ${p.urgencyScore * 10}%"></div></div>
              <span>${p.urgencyScore}/10</span>
            </div>
            <div class="s-bar-row">
              <span>Poverty Vulnerability (w2):</span>
              <div class="bar-track"><div class="bar-fill purple" style="width: ${p.mpiScore * 200}%"></div></div>
              <span>MPI: ${p.mpiScore}</span>
            </div>
          </div>
        </div>

        <div class="charter-footer">
          <span class="dpg-tag"><i class="icon-cpu"></i> DPG: ${p.dpgReference.split('(')[0]}</span>
          <button class="btn btn-sm btn-primary" id="exportBtn_${p.id}">
            <i class="icon-download"></i> Export NDB Investment Memorandum
          </button>
        </div>
      </div>
    `).join('');

    // Bind export buttons
    projects.forEach(p => {
      const btn = document.getElementById(`exportBtn_${p.id}`);
      if (btn) {
        btn.addEventListener('click', () => {
          exportNDBDossier(p, p.countryMeta);
        });
      }
    });
  }
}
