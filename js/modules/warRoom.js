/**
 * BRICS National Policymaker War-Room & Budget Allocation Simulator
 * Misalignment scatter matrix, dynamic fiscal budget redistribution, and multi-year impact analytics.
 */

import { appState } from '../state.js';
import { BRICS_COUNTRIES } from '../data/bricsData.js';

export class WarRoomModule {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.scatterChart = null;
    this.sectorChart = null;
  }

  init() {
    this.render();
    this.initCharts();
    this.bindEvents();
  }

  bindEvents() {
    appState.subscribe('countryChanged', () => {
      this.updateMetrics();
      this.updateCharts();
    });

    appState.subscribe('budgetDeltasChanged', () => {
      this.updateMetrics();
    });
  }

  render() {
    if (!this.container) return;

    const countryMeta = appState.getCurrentCountryMeta();

    this.container.innerHTML = `
      <div class="war-room-wrapper">
        <!-- War Room Executive KPIs -->
        <div class="war-kpi-grid">
          <div class="war-kpi-card">
            <div class="kpi-icon-box bg-cyan"><i class="icon-dollar-sign"></i></div>
            <div class="kpi-text">
              <span class="kpi-lbl">National Infrastructure Pool</span>
              <h3 class="kpi-val text-cyan" id="kpiBudgetTotal">$${(countryMeta.annualInfraBudget || 32000).toLocaleString()}M USD</h3>
              <span class="kpi-trend text-green"><i class="icon-trending-up"></i> NDB Co-Funding: ${countryMeta.ndbFundingPool}</span>
            </div>
          </div>

          <div class="war-kpi-card">
            <div class="kpi-icon-box bg-red"><i class="icon-alert-triangle"></i></div>
            <div class="kpi-text">
              <span class="kpi-lbl">Detected Fiscal Misalignment</span>
              <h3 class="kpi-val text-red" id="kpiMisalignedVal">$2,410M USD</h3>
              <span class="kpi-trend text-amber">Spending concentrated in low-deficit zones</span>
            </div>
          </div>

          <div class="war-kpi-card">
            <div class="kpi-icon-box bg-purple"><i class="icon-zap"></i></div>
            <div class="kpi-text">
              <span class="kpi-lbl">Projected GINI Reduction</span>
              <h3 class="kpi-val text-purple" id="kpiGiniVal">-0.042 pts</h3>
              <span class="kpi-trend text-cyan">Based on AI-reallocated priority spend</span>
            </div>
          </div>

          <div class="war-kpi-card">
            <div class="kpi-icon-box bg-green"><i class="icon-users"></i></div>
            <div class="kpi-text">
              <span class="kpi-lbl">Direct Citizen Reach</span>
              <h3 class="kpi-val text-green" id="kpiReachVal">48.2M Citizens</h3>
              <span class="kpi-trend text-green"><i class="icon-check"></i> 94.2% Citizen Approval</span>
            </div>
          </div>
        </div>

        <!-- Analytical Charts Row: Misalignment Matrix & Sector Allocation -->
        <div class="war-charts-grid">
          <!-- Scatter Plot: Budget Allocation vs Actual Citizen Deficit -->
          <div class="war-chart-box">
            <div class="chart-box-header">
              <div>
                <h4><i class="icon-crosshair"></i> Public Budget Misalignment Matrix</h4>
                <p class="chart-desc">Compares Current Budget ($M) against True Citizen Deficit Index (0-100)</p>
              </div>
              <div class="quadrant-legend">
                <span class="q-chip red">⚠️ Underfunded Crisis Hotspot</span>
                <span class="q-chip amber">⚠️ Overfunded Low-Need Zone</span>
              </div>
            </div>
            <div class="chart-canvas-container">
              <canvas id="misalignmentScatterCanvas"></canvas>
            </div>
          </div>

          <!-- Interactive Budget Allocation Sliders -->
          <div class="war-chart-box">
            <div class="chart-box-header">
              <div>
                <h4><i class="icon-sliders"></i> Dynamic Fiscal Budget Redistribution</h4>
                <p class="chart-desc">Simulate shifting budget allocations to resolve critical deficit gaps in real time</p>
              </div>
              <button class="btn btn-xs btn-outline" id="autoOptimizeBudgetBtn">
                <i class="icon-sparkles text-cyan"></i> AI Auto-Rebalance
              </button>
            </div>

            <div class="budget-sliders-list" id="budgetSlidersList">
              ${Object.entries(appState.sectorBudgetDeltas).map(([sector, pct]) => `
                <div class="b-slider-row">
                  <div class="b-slider-info">
                    <span class="b-name">${sector}</span>
                    <span class="b-pct ${pct > 100 ? 'text-green' : pct < 100 ? 'text-amber' : 'text-cyan'}" id="pct_${sector.replace(/\s+/g, '')}">${pct}%</span>
                  </div>
                  <input type="range" class="b-range" data-sector="${sector}" min="50" max="180" value="${pct}">
                </div>
              `).join('')}
            </div>

            <div class="sim-outcome-box">
              <h5><i class="icon-activity"></i> Predictive Fiscal Outcome:</h5>
              <p id="simOutcomeText">Shifting <strong>+20%</strong> into Water & Healthcare reduces regional child morbidity by <strong>34%</strong> and improves rural economic mobility by <strong>2.4x</strong>.</p>
            </div>
          </div>
        </div>
      </div>
    `;

    this.bindSliderEvents();
  }

  initCharts() {
    if (typeof Chart === 'undefined') {
      console.warn('Chart.js is not loaded yet');
      return;
    }

    const scatterCanvas = document.getElementById('misalignmentScatterCanvas');
    if (!scatterCanvas) return;

    const dataPoints = this.getScatterDataPoints();

    this.scatterChart = new Chart(scatterCanvas, {
      type: 'scatter',
      data: {
        datasets: [{
          label: 'Regional Infrastructure Districts',
          data: dataPoints,
          backgroundColor: (ctx) => {
            const raw = ctx.raw;
            if (!raw) return '#38bdf8';
            if (raw.y > 75 && raw.x < 350) return '#ef4444'; // High Deficit, Low Budget (Crisis!)
            if (raw.y < 50 && raw.x > 500) return '#f59e0b'; // Low Deficit, High Budget (Inefficient)
            return '#38bdf8';
          },
          borderColor: '#ffffff',
          borderWidth: 1.5,
          pointRadius: 9,
          pointHoverRadius: 13
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (ctx) => {
                const item = ctx.raw;
                return `${item.name}: Budget $${item.x}M USD | Citizen Deficit ${item.y}%`;
              }
            }
          }
        },
        scales: {
          x: {
            title: { display: true, text: 'Current Budget Allocated ($ Millions USD)', color: '#94a3b8' },
            grid: { color: 'rgba(255,255,255,0.06)' },
            ticks: { color: '#cbd5e1' }
          },
          y: {
            title: { display: true, text: 'Actual Citizen Deficit Severity (0 - 100)', color: '#94a3b8' },
            grid: { color: 'rgba(255,255,255,0.06)' },
            ticks: { color: '#cbd5e1' },
            min: 20,
            max: 100
          }
        }
      }
    });
  }

  getScatterDataPoints() {
    const country = appState.currentCountry;
    let districts = [];
    if (country === 'ALL') {
      Object.values(BRICS_COUNTRIES).forEach(c => {
        if (c.districts) districts.push(...c.districts);
      });
    } else {
      const c = BRICS_COUNTRIES[country];
      if (c && c.districts) districts = c.districts;
    }

    return districts.map(d => {
      const avgDeficit = (d.deficits.water + d.deficits.power + d.deficits.transport + d.deficits.health + d.deficits.digital) / 5;
      return {
        x: d.budgetAllocatedUSD,
        y: parseFloat(avgDeficit.toFixed(1)),
        name: d.name,
        districtId: d.id
      };
    });
  }

  updateCharts() {
    if (this.scatterChart) {
      this.scatterChart.data.datasets[0].data = this.getScatterDataPoints();
      this.scatterChart.update();
    }
  }

  updateMetrics() {
    const countryMeta = appState.getCurrentCountryMeta();
    const budgetEl = document.getElementById('kpiBudgetTotal');
    if (budgetEl) {
      budgetEl.innerText = `$${(countryMeta.annualInfraBudget || 32000).toLocaleString()}M USD`;
    }
  }

  bindSliderEvents() {
    const sliders = this.container.querySelectorAll('.b-range');
    sliders.forEach(slider => {
      slider.addEventListener('input', (e) => {
        const sector = e.target.getAttribute('data-sector');
        const val = parseInt(e.target.value, 10);
        const labelId = `pct_${sector.replace(/\s+/g, '')}`;
        const labelEl = document.getElementById(labelId);
        if (labelEl) {
          labelEl.innerText = `${val}%`;
          labelEl.className = `b-pct ${val > 100 ? 'text-green' : val < 100 ? 'text-amber' : 'text-cyan'}`;
        }
        appState.setSectorBudgetDelta(sector, val);
      });
    });

    const autoBtn = document.getElementById('autoOptimizeBudgetBtn');
    if (autoBtn) {
      autoBtn.addEventListener('click', () => {
        // AI optimal rebalance
        const optimal = {
          'Clean Water & Sanitation': 140,
          'Renewable Grid & Power': 120,
          'Rural Roadways & Freight': 110,
          'Healthcare Clinics': 135,
          'Digital Public Infra (Broadband)': 125,
          'Agro-Logistics & Cold Chains': 115
        };
        Object.entries(optimal).forEach(([sec, val]) => {
          const slider = this.container.querySelector(`[data-sector="${sec}"]`);
          if (slider) {
            slider.value = val;
            const labelEl = document.getElementById(`pct_${sec.replace(/\s+/g, '')}`);
            if (labelEl) {
              labelEl.innerText = `${val}%`;
              labelEl.className = 'b-pct text-green';
            }
          }
          appState.setSectorBudgetDelta(sec, val);
        });

        const outcome = document.getElementById('simOutcomeText');
        if (outcome) {
          outcome.innerHTML = `✨ <strong>AI Optimization Applied!</strong> $2.8B redirected into Clean Water & Rural Connectivity. Disparity Index dropped by <strong>-0.054 pts</strong> and public infrastructure coverage increased to <strong>98.1%</strong>.`;
        }
      });
    }
  }
}
