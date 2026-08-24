/**
 * BRICS Citizen Closed-Loop Transparency & Verification Portal
 * Real-time milestone tracking, public accountability timeline, and citizen feedback loop.
 */

import { appState } from '../state.js';

export class CitizenTrackerModule {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.activePetition = null;
  }

  init() {
    this.render();
    this.bindEvents();
  }

  bindEvents() {
    const searchBtn = document.getElementById('ticketSearchBtn');
    const searchInput = document.getElementById('ticketSearchInput');

    if (searchBtn && searchInput) {
      searchBtn.addEventListener('click', () => this.handleSearch(searchInput.value.trim()));
      searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') this.handleSearch(searchInput.value.trim());
      });
    }

    const samplePills = this.container.querySelectorAll('.ticket-sample-pill');
    samplePills.forEach(pill => {
      pill.addEventListener('click', () => {
        const id = pill.getAttribute('data-ticket-id');
        if (searchInput) searchInput.value = id;
        this.handleSearch(id);
      });
    });
  }

  handleSearch(ticketId) {
    if (!ticketId) return;

    const matched = appState.petitions.find(p => p.id.toLowerCase() === ticketId.toLowerCase());
    const displayArea = document.getElementById('ticketResultDetails');

    if (!matched) {
      if (displayArea) {
        displayArea.innerHTML = `
          <div class="empty-state">
            <div class="empty-icon"><i class="icon-alert-octagon text-red"></i></div>
            <h3>Civic Ticket Not Found</h3>
            <p>No petition found matching "<strong>${ticketId}</strong>". Please verify your DPI Civic Ticket ID.</p>
          </div>
        `;
      }
      return;
    }

    this.activePetition = matched;
    this.renderTicketDetails(matched);
  }

  renderTicketDetails(p) {
    const displayArea = document.getElementById('ticketResultDetails');
    if (!displayArea) return;

    const statusBadgeClass = p.status === 'VERIFIED_COMPLETE' ? 'badge-complete' : p.status === 'IN_CONSTRUCTION' ? 'badge-construction' : 'badge-pipeline';

    displayArea.innerHTML = `
      <div class="ticket-full-card slide-up">
        <!-- Ticket Header -->
        <div class="ticket-head">
          <div class="ticket-main-meta">
            <span class="country-pill ${p.countryId}">${p.countryId}</span>
            <h3 class="ticket-id-title">${p.id}</h3>
            <span class="ticket-status-pill ${statusBadgeClass}"><i class="icon-clock"></i> ${p.status.replace('_', ' ')}</span>
          </div>
          <div class="ticket-auth-stamp">
            <i class="icon-check-circle text-green"></i> <span>DPI Cryptographically Signed & Verified</span>
          </div>
        </div>

        <!-- Petition Summary Details -->
        <div class="ticket-body-grid">
          <div class="tb-col">
            <span class="tb-label">Target District & Region:</span>
            <h4 class="tb-val highlight-cyan"><i class="icon-map-pin"></i> ${p.districtName}</h4>
            
            <span class="tb-label mt-2">Classified Infrastructure Sector:</span>
            <h4 class="tb-val highlight-purple"><i class="icon-tag"></i> ${p.sector}</h4>

            <span class="tb-label mt-2">Citizen Voice Transcription (${p.language}):</span>
            <p class="tb-quote italic">"${p.originalText}"</p>
          </div>

          <div class="tb-col">
            <span class="tb-label">AI Urgency Rating:</span>
            <div class="urgency-score-box">
              <span class="u-score text-red">${p.urgencyScore}</span>
              <span class="u-max">/ 10.0</span>
              <span class="u-badge">Critical Priority</span>
            </div>

            <span class="tb-label mt-2">Community Co-Signatures:</span>
            <div class="sigs-box">
              <i class="icon-users text-cyan"></i> <strong>${p.signaturesCount.toLocaleString()}</strong> Registered Residents Signed
            </div>

            <span class="tb-label mt-2">Approved Infrastructure Budget:</span>
            <div class="sigs-box">
              <i class="icon-dollar-sign text-green"></i> <strong>$${(p.budgetEstimatedUSD / 1000).toFixed(0)}k USD</strong> (NDB Concessional Pool)
            </div>
          </div>
        </div>

        <!-- 6-Stage Milestone Progression Timeline -->
        <div class="timeline-section">
          <h4 class="timeline-title"><i class="icon-git-commit"></i> Full Infrastructure Lifecycle & Milestone Verification</h4>
          
          <div class="milestones-stepper">
            ${(p.milestones || []).map((m, idx) => `
              <div class="m-step ${m.done ? 'step-done' : 'step-pending'}">
                <div class="step-marker">
                  ${m.done ? '<i class="icon-check"></i>' : idx + 1}
                </div>
                <div class="step-content">
                  <h5 class="step-name">${m.step}</h5>
                  <span class="step-date">${m.date}</span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Satellite / Citizen Drone Verification Audit -->
        <div class="verification-audit-box">
          <div class="audit-header">
            <h4><i class="icon-camera"></i> Drone & Satellite Telemetry Audit</h4>
            <span class="badge-live-stream"><span class="dot-live"></span> Live Optical Feed Ready</span>
          </div>
          <p class="audit-desc">High-resolution spatial verification ensures transparency from public tender release to real-world ground commissioning.</p>
          
          <div class="audit-feedback-row">
            <span class="feedback-prompt">Are you a resident of this district? Rate this project's delivery progress:</span>
            <div class="star-rating">
              <span class="star" data-rating="1">★</span>
              <span class="star" data-rating="2">★</span>
              <span class="star" data-rating="3">★</span>
              <span class="star" data-rating="4">★</span>
              <span class="star" data-rating="5">★</span>
            </div>
            <button class="btn btn-xs btn-outline" id="submitCitizenAuditBtn">Submit Citizen Audit</button>
          </div>
        </div>
      </div>
    `;

    // Star rating interactions
    const stars = displayArea.querySelectorAll('.star');
    stars.forEach(star => {
      star.addEventListener('click', () => {
        const rating = parseInt(star.getAttribute('data-rating'), 10);
        stars.forEach((s, idx) => {
          if (idx < rating) s.classList.add('star-active');
          else s.classList.remove('star-active');
        });
      });
    });

    const auditBtn = document.getElementById('submitCitizenAuditBtn');
    if (auditBtn) {
      auditBtn.addEventListener('click', () => {
        auditBtn.innerHTML = '<i class="icon-check"></i> Citizen Audit Recorded on DPI Ledger!';
        auditBtn.classList.add('btn-success');
      });
    }
  }

  render() {
    if (!this.container) return;

    this.container.innerHTML = `
      <div class="module-card">
        <div class="module-header">
          <div>
            <h2 class="module-title"><i class="icon-search-check"></i> Citizen Closed-Loop Transparency & Verification Portal</h2>
            <p class="module-subtitle">Track the end-to-end lifecycle of any submitted petition from voice intake to field completion</p>
          </div>
          <span class="telemetry-badge-active">PUBLIC DPI OPEN ACCESS</span>
        </div>

        <!-- Search Bar -->
        <div class="tracker-search-panel">
          <div class="search-input-group">
            <i class="icon-search search-icon"></i>
            <input type="text" id="ticketSearchInput" class="ticket-search-input" placeholder="Enter Civic Ticket ID (e.g. BRICS-IND-2026-1042, BRICS-BRA-2026-3011)..." value="BRICS-IND-2026-1042">
            <button class="btn btn-primary" id="ticketSearchBtn"><i class="icon-arrow-right"></i> Track Petition</button>
          </div>

          <div class="ticket-samples-row">
            <span class="samples-title">Sample Civic Tickets:</span>
            <button class="ticket-sample-pill" data-ticket-id="BRICS-IND-2026-1042">🇮🇳 Manikpur Water (IN)</button>
            <button class="ticket-sample-pill" data-ticket-id="BRICS-BRA-2026-3011">🇧🇷 Sertão Bahia Well (BR)</button>
            <button class="ticket-sample-pill" data-ticket-id="BRICS-ZAF-2026-4019">🇿🇦 Mqanduli Bridge (ZA)</button>
            <button class="ticket-sample-pill" data-ticket-id="BRICS-RUS-2026-5012">🇷🇺 Lena River Transit (RU)</button>
            <button class="ticket-sample-pill" data-ticket-id="BRICS-CHN-2026-6023">🇨🇳 Liangshan Cold Hub (CN)</button>
          </div>
        </div>

        <!-- Result View Container -->
        <div id="ticketResultDetails">
          <!-- Populated by search -->
        </div>
      </div>
    `;

    // Trigger initial search for default ticket
    setTimeout(() => {
      this.handleSearch('BRICS-IND-2026-1042');
    }, 50);
  }
}
