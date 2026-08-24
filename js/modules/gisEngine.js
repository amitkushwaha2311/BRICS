/**
 * BRICS Geospatial GIS Heatmap & Demographic Correlation Engine
 * Leaflet.js interactive mapping with dynamic urgency heatmaps, deficit overlays, and petition inspection.
 */

import { appState } from '../state.js';
import { BRICS_COUNTRIES } from '../data/bricsData.js';

export class GisEngineModule {
  constructor(containerId) {
    this.containerId = containerId;
    this.map = null;
    this.markersLayer = null;
    this.heatLayer = null;
    this.deficitCirclesLayer = null;
    this.activeLayerType = 'all'; // 'all', 'heat', 'deficits', 'petitions'
  }

  init() {
    this.renderContainerLayout();
    this.initLeafletMap();
    this.bindStateEvents();
  }

  renderContainerLayout() {
    const parent = document.getElementById(this.containerId);
    if (!parent) return;

    parent.innerHTML = `
      <div class="gis-wrapper">
        <!-- GIS Map Control Toolbar -->
        <div class="gis-toolbar">
          <div class="gis-toolbar-left">
            <div class="layer-control-group">
              <span class="toolbar-label"><i class="icon-layers"></i> GIS Layers:</span>
              <button class="layer-toggle-btn active" data-layer="all"><i class="icon-eye"></i> Multi-Layer View</button>
              <button class="layer-toggle-btn" data-layer="heat"><i class="icon-flame"></i> Citizen Demand Heatmap</button>
              <button class="layer-toggle-btn" data-layer="deficits"><i class="icon-alert-circle"></i> National Deficit Indices</button>
              <button class="layer-toggle-btn" data-layer="petitions"><i class="icon-pin"></i> Citizen Petitions</button>
            </div>
          </div>

          <div class="gis-toolbar-right">
            <div class="map-stats-pill">
              <span class="dot-live"></span>
              <span id="gisLiveCount">Showing ${appState.petitions.length} Ingested Citizen Petitions</span>
            </div>
          </div>
        </div>

        <!-- Map Canvas -->
        <div id="leafletMapContainer" class="leaflet-map-view"></div>

        <!-- Floating Map Legend & Deficit Scale -->
        <div class="gis-floating-legend">
          <h5 class="legend-title"><i class="icon-info"></i> Hotspot & Deficit Index Scale</h5>
          <div class="legend-scale-bar">
            <div class="scale-item"><span class="scale-color red"></span> Critical (Urgency > 9.0)</div>
            <div class="scale-item"><span class="scale-color amber"></span> High (7.5 - 8.9)</div>
            <div class="scale-item"><span class="scale-color blue"></span> Moderate (5.0 - 7.4)</div>
          </div>
          <div class="legend-ndb-note">
            <i class="icon-shield-check text-cyan"></i> <strong>NDB Priority Corridor:</strong> Rings denote regions with active New Development Bank co-financing alignment.
          </div>
        </div>
      </div>
    `;

    // Bind layer toggles
    const layerBtns = parent.querySelectorAll('.layer-toggle-btn');
    layerBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        layerBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.activeLayerType = btn.getAttribute('data-layer');
        this.refreshLayers();
      });
    });
  }

  initLeafletMap() {
    if (typeof L === 'undefined') {
      console.warn('Leaflet JS is not loaded yet');
      return;
    }

    const mapEl = document.getElementById('leafletMapContainer');
    if (!mapEl) return;

    // Center on current country or global BRICS
    const countryMeta = appState.getCurrentCountryMeta();
    this.map = L.map('leafletMapContainer', {
      center: countryMeta.center || [20.0, 30.0],
      zoom: countryMeta.zoom || 3,
      minZoom: 2,
      maxZoom: 18,
      zoomControl: true
    });

    // Dark Futuristic Map Tiles (CartoDB Dark Matter)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://carto.com/">CARTO</a> &copy; OpenStreetMap contributors | BRICS InfraPulse DPI',
      subdomains: 'abcd',
      maxZoom: 19
    }).addTo(this.map);

    this.markersLayer = L.layerGroup().addTo(this.map);
    this.deficitCirclesLayer = L.layerGroup().addTo(this.map);

    this.refreshLayers();
  }

  bindStateEvents() {
    appState.subscribe('countryChanged', (countryId) => {
      const meta = appState.getCurrentCountryMeta();
      if (this.map && meta.center) {
        this.map.flyTo(meta.center, meta.zoom, {
          duration: 1.5,
          easeLinearity: 0.25
        });
      }
      this.refreshLayers();
    });

    appState.subscribe('filterChanged', () => {
      this.refreshLayers();
    });

    appState.subscribe('petitionsUpdated', () => {
      this.refreshLayers();
    });
  }

  refreshLayers() {
    if (!this.map || !this.markersLayer || !this.deficitCirclesLayer) return;

    this.markersLayer.clearLayers();
    this.deficitCirclesLayer.clearLayers();

    const filteredPetitions = appState.getFilteredPetitions();
    const liveCountEl = document.getElementById('gisLiveCount');
    if (liveCountEl) {
      liveCountEl.innerText = `Showing ${filteredPetitions.length} Verified Grievances in ${appState.getCurrentCountryMeta().name}`;
    }

    // 1. Render District Deficit Hotspot Rings (if activeLayer is 'all' or 'deficits')
    if (this.activeLayerType === 'all' || this.activeLayerType === 'deficits') {
      this.renderDistrictDeficitCircles();
    }

    // 2. Render Citizen Petitions & Heat Pulsing Markers (if activeLayer is 'all', 'heat', or 'petitions')
    if (this.activeLayerType === 'all' || this.activeLayerType === 'heat' || this.activeLayerType === 'petitions') {
      this.renderCitizenMarkers(filteredPetitions);
    }
  }

  renderDistrictDeficitCircles() {
    const country = appState.currentCountry;
    let districtsToRender = [];

    if (country === 'ALL') {
      Object.values(BRICS_COUNTRIES).forEach(c => {
        if (c.districts) districtsToRender.push(...c.districts);
      });
    } else {
      const c = BRICS_COUNTRIES[country];
      if (c && c.districts) districtsToRender = c.districts;
    }

    districtsToRender.forEach(d => {
      const avgDeficit = (d.deficits.water + d.deficits.power + d.deficits.transport + d.deficits.health + d.deficits.digital) / 5;
      const radius = Math.max(35000, Math.min(95000, avgDeficit * 900));
      const color = avgDeficit > 80 ? '#ef4444' : avgDeficit > 65 ? '#f59e0b' : '#38bdf8';

      const circle = L.circle([d.lat, d.lng], {
        color: color,
        fillColor: color,
        fillOpacity: this.activeLayerType === 'deficits' ? 0.35 : 0.18,
        weight: 2,
        dashArray: '4, 8',
        radius: radius
      });

      const popupContent = `
        <div class="custom-gis-popup">
          <div class="popup-badge">${d.name}</div>
          <h4 class="popup-title">District Infrastructure Deficit Profile</h4>
          
          <div class="popup-metric-grid">
            <div class="p-card">
              <span class="lbl">Avg Deficit Severity</span>
              <span class="val ${avgDeficit > 80 ? 'text-red' : 'text-amber'}">${avgDeficit.toFixed(1)}%</span>
            </div>
            <div class="p-card">
              <span class="lbl">Multidimensional Poverty (MPI)</span>
              <span class="val text-purple">${d.mpiPovertyIndex}</span>
            </div>
            <div class="p-card">
              <span class="lbl">Current Budget Allocated</span>
              <span class="val text-cyan">$${d.budgetAllocatedUSD}M USD</span>
            </div>
            <div class="p-card">
              <span class="lbl">Estimated Deficit Gap</span>
              <span class="val text-red">$${d.estimatedDeficitUSD}M USD</span>
            </div>
          </div>

          <div class="sector-bars-box">
            <div class="bar-row"><span>💧 Water Deficit:</span> <strong>${d.deficits.water}%</strong></div>
            <div class="bar-row"><span>⚡ Power Grid Gap:</span> <strong>${d.deficits.power}%</strong></div>
            <div class="bar-row"><span>🛣️ Transport Severance:</span> <strong>${d.deficits.transport}%</strong></div>
            <div class="bar-row"><span>🏥 Healthcare Access:</span> <strong>${d.deficits.health}%</strong></div>
            <div class="bar-row"><span>📶 Digital Broadband:</span> <strong>${d.deficits.digital}%</strong></div>
          </div>

          <div class="popup-footer">
            <span class="ndb-tag"><i class="icon-award"></i> ${d.ndbStrategicPriority}</span>
          </div>
        </div>
      `;

      circle.bindPopup(popupContent, { maxWidth: 360, className: 'dark-leaflet-popup' });
      this.deficitCirclesLayer.addLayer(circle);
    });
  }

  renderCitizenMarkers(petitions) {
    petitions.forEach(p => {
      const urgencyClass = p.urgencyScore >= 9.0 ? 'marker-critical' : p.urgencyScore >= 7.5 ? 'marker-high' : 'marker-moderate';
      const sectorIcon = p.sector.includes('Water') ? '💧' : p.sector.includes('Power') ? '⚡' : p.sector.includes('Road') ? '🌉' : p.sector.includes('Health') ? '🏥' : p.sector.includes('Agro') ? '🍎' : '📶';

      const customIcon = L.divIcon({
        className: 'custom-gis-pin-wrapper',
        html: `
          <div class="gis-pulse-pin ${urgencyClass}">
            <span class="pin-icon">${sectorIcon}</span>
            <span class="pin-radar"></span>
          </div>
        `,
        iconSize: [36, 36],
        iconAnchor: [18, 18],
        popupAnchor: [0, -20]
      });

      const marker = L.marker([p.lat, p.lng], { icon: customIcon });

      const popupHTML = `
        <div class="custom-gis-popup">
          <div class="popup-header-row">
            <span class="country-pill">${p.countryId}</span>
            <span class="ticket-tag">${p.id}</span>
          </div>

          <h3 class="popup-title">${p.districtName}</h3>
          
          <div class="popup-tag-row">
            <span class="badge-sector">${p.sector}</span>
            <span class="badge-urgency"><i class="icon-flame"></i> Urgency: ${p.urgencyScore}/10</span>
          </div>

          <div class="popup-speech-box">
            <div class="speech-lang">🎙️ Ingested Voice / Text (${p.language}):</div>
            <div class="speech-quote">"${p.originalText}"</div>
            <div class="speech-trans">🌐 <strong>English Standardized:</strong> "${p.translatedText}"</div>
          </div>

          <div class="popup-meta-row">
            <div><strong>👥 Signatures:</strong> ${p.signaturesCount.toLocaleString()} Citizens</div>
            <div><strong>💰 Est. Cost:</strong> $${(p.budgetEstimatedUSD / 1000).toFixed(0)}k USD</div>
          </div>

          <div class="popup-actions">
            <button class="btn btn-sm btn-primary w-full" onclick="window.trackTicketFromMap('${p.id}')">
              <i class="icon-external-link"></i> Track Full DPI Milestone
            </button>
          </div>
        </div>
      `;

      marker.bindPopup(popupHTML, { maxWidth: 380, className: 'dark-leaflet-popup' });
      this.markersLayer.addLayer(marker);
    });

    // Expose ticket tracking shortcut to window
    window.trackTicketFromMap = (ticketId) => {
      appState.setActiveTab('tracker');
      setTimeout(() => {
        const input = document.getElementById('ticketSearchInput');
        const btn = document.getElementById('ticketSearchBtn');
        if (input && btn) {
          input.value = ticketId;
          btn.click();
        }
      }, 100);
    };
  }
}
