/**
 * BRICS Digital Public Goods (DPG) & Cross-Border Solution Exchange
 * Open-source architectural blueprints, technology transfer metrics, and peer replication guide.
 */

import { appState } from '../state.js';
import { DPG_SOLUTIONS } from '../data/dpgSolutions.js';

export class KnowledgeHubModule {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
  }

  init() {
    this.render();
  }

  render() {
    if (!this.container) return;

    this.container.innerHTML = `
      <div class="module-card">
        <div class="module-header">
          <div>
            <h2 class="module-title"><i class="icon-globe"></i> Cross-BRICS Digital Public Goods & Solutions Exchange</h2>
            <p class="module-subtitle">Open-source DPI engineering blueprints, frugal architectures, and peer-to-peer technology transfer</p>
          </div>
          <span class="telemetry-badge-active">DPG ALLIANCE CERTIFIED</span>
        </div>

        <!-- Solutions Grid -->
        <div class="dpg-solutions-grid">
          ${DPG_SOLUTIONS.map((sol, idx) => `
            <div class="dpg-card slide-up" style="animation-delay: ${idx * 0.08}s">
              <div class="dpg-card-header">
                <div class="dpg-origin-pill">Origin: <strong>${sol.originCountry}</strong></div>
                <span class="dpg-trl-badge"><i class="icon-check-circle"></i> ${sol.readinessLevel}</span>
              </div>

              <h3 class="dpg-title">${sol.title}</h3>
              <p class="dpg-summary">${sol.summary}</p>

              <div class="dpg-metrics-row">
                <div class="d-metric">
                  <span class="d-lbl">CapEx Cost Reduction</span>
                  <span class="d-val text-green">-${sol.impactMetrics.costReductionPct}%</span>
                </div>
                <div class="d-metric">
                  <span class="d-lbl">Deployment Speed</span>
                  <span class="d-val text-cyan">${sol.impactMetrics.deliveryTimeMonths} Months</span>
                </div>
                <div class="d-metric">
                  <span class="d-lbl">Beneficiaries/Unit</span>
                  <span class="d-val text-purple">${sol.impactMetrics.avgBeneficiariesPerUnit.toLocaleString()}</span>
                </div>
              </div>

              <div class="dpg-applicable-box">
                <span class="app-lbl"><i class="icon-share-2"></i> AI Recommends Replicating In:</span>
                <div class="app-flags">
                  ${sol.applicableTo.map(c => `<span class="app-chip">${c}</span>`).join('')}
                </div>
              </div>

              <div class="dpg-tech-stack">
                <i class="icon-terminal"></i> <strong>Open Architecture:</strong> ${sol.techStack}
              </div>

              <div class="dpg-footer">
                <span class="license-tag"><i class="icon-lock-open"></i> ${sol.license}</span>
                <button class="btn btn-xs btn-primary" onclick="alert('Digital Public Good blueprint bundle downloaded for sovereign adoption!')">
                  <i class="icon-download"></i> Get DPG Blueprint
                </button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }
}
