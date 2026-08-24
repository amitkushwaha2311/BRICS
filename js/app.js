/**
 * BRICS InfraPulse AI - Main Application Orchestrator
 * Bootstraps modules, coordinates state reactivity, and handles global events.
 */

import { appState } from './state.js';
import { BRICS_COUNTRIES } from './data/bricsData.js';
import { GisEngineModule } from './modules/gisEngine.js';
import { VoiceStudioModule } from './modules/voiceStudio.js';
import { ChatSimulatorModule } from './modules/chatSimulator.js';
import { AiScoringEngineModule } from './modules/aiScoringEngine.js';
import { WarRoomModule } from './modules/warRoom.js';
import { CitizenTrackerModule } from './modules/citizenTracker.js';
import { KnowledgeHubModule } from './modules/knowledgeHub.js';

class Application {
  constructor() {
    this.gisModule = null;
    this.voiceModule = null;
    this.chatModule = null;
    this.scoringModule = null;
    this.warRoomModule = null;
    this.trackerModule = null;
    this.knowledgeModule = null;
  }

  init() {
    console.log('🚀 Initializing BRICS InfraPulse AI Platform...');

    this.bindHeaderControls();
    this.bindNavigationTabs();
    this.bindFilterControls();

    // Instantiate Modules
    this.gisModule = new GisEngineModule('gisMapModuleContainer');
    this.gisModule.init();

    this.voiceModule = new VoiceStudioModule('voiceStudioModuleContainer');
    this.voiceModule.init();

    this.chatModule = new ChatSimulatorModule('chatSimulatorModuleContainer');
    this.chatModule.init();

    this.scoringModule = new AiScoringEngineModule('aiScoringModuleContainer');
    this.scoringModule.init();

    this.warRoomModule = new WarRoomModule('warRoomModuleContainer');
    this.warRoomModule.init();

    this.trackerModule = new CitizenTrackerModule('citizenTrackerModuleContainer');
    this.trackerModule.init();

    this.knowledgeModule = new KnowledgeHubModule('knowledgeHubModuleContainer');
    this.knowledgeModule.init();

    // Subscribe to state changes for UI localization
    appState.subscribe('languageChanged', () => this.updateInterfaceLanguage());
    appState.subscribe('countryChanged', (cId) => this.updateCountryUI(cId));
    appState.subscribe('tabChanged', (tabId) => this.switchTab(tabId));

    console.log('✅ BRICS InfraPulse AI Platform Ready.');
  }

  bindHeaderControls() {
    const countryDropdown = document.getElementById('globalCountrySelect');
    if (countryDropdown) {
      // Populate country options
      countryDropdown.innerHTML = Object.values(BRICS_COUNTRIES).map(c => `
        <option value="${c.id}">${c.flag} ${c.name} (${c.nativeName || c.name})</option>
      `).join('');

      countryDropdown.addEventListener('change', (e) => {
        appState.setCountry(e.target.value);
      });
    }

    const langDropdown = document.getElementById('globalLanguageSelect');
    if (langDropdown) {
      langDropdown.addEventListener('change', (e) => {
        appState.setLanguage(e.target.value);
      });
    }
  }

  bindNavigationTabs() {
    const tabButtons = document.querySelectorAll('.nav-tab-btn');
    tabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const tabId = btn.getAttribute('data-tab');
        appState.setActiveTab(tabId);
      });
    });
  }

  switchTab(tabId) {
    const tabButtons = document.querySelectorAll('.nav-tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabButtons.forEach(btn => {
      if (btn.getAttribute('data-tab') === tabId) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    tabPanes.forEach(pane => {
      if (pane.id === `tab-${tabId}`) {
        pane.classList.add('active');
      } else {
        pane.classList.remove('active');
      }
    });

    // If switching to GIS map tab, trigger Leaflet size invalidate
    if (tabId === 'map' && this.gisModule && this.gisModule.map) {
      setTimeout(() => {
        this.gisModule.map.invalidateSize();
      }, 100);
    }
  }

  bindFilterControls() {
    const sectorFilter = document.getElementById('globalSectorFilter');
    if (sectorFilter) {
      sectorFilter.addEventListener('change', (e) => {
        appState.setSectorFilter(e.target.value);
      });
    }

    const urgencyRange = document.getElementById('globalUrgencyFilter');
    const urgencyValDisplay = document.getElementById('globalUrgencyVal');
    if (urgencyRange && urgencyValDisplay) {
      urgencyRange.addEventListener('input', (e) => {
        const val = parseFloat(e.target.value);
        urgencyValDisplay.innerText = val > 0 ? `≥ ${val.toFixed(1)}` : 'All';
        appState.setUrgencyThreshold(val);
      });
    }
  }

  updateCountryUI(countryId) {
    const meta = appState.getCurrentCountryMeta();
    const bannerTitle = document.getElementById('currentCountryBanner');
    if (bannerTitle) {
      bannerTitle.innerText = `${meta.flag} ${meta.name} - Sovereign Infrastructure Overview`;
    }
    const countryDropdown = document.getElementById('globalCountrySelect');
    if (countryDropdown && countryDropdown.value !== countryId) {
      countryDropdown.value = countryId;
    }
  }

  updateInterfaceLanguage() {
    const t = (k) => appState.t(k);

    const el = (id, key) => {
      const dom = document.getElementById(id);
      if (dom) dom.innerText = t(key);
    };

    el('navTextMap', 'navMap');
    el('navTextIngestion', 'navIngestion');
    el('navTextPrioritization', 'navPrioritization');
    el('navTextWarRoom', 'navWarRoom');
    el('navTextTracker', 'navTracker');
    el('navTextKnowledge', 'navKnowledge');

    el('appHeaderTitle', 'appTitle');
    el('appHeaderSubtitle', 'appSubtitle');
  }
}

// Boot application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const app = new Application();
  app.init();
});
