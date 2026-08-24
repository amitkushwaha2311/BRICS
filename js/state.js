/**
 * BRICS InfraPulse AI - Reactive State Store
 * Manages global application context, event dispatching, and dynamic persistence.
 */

import { BRICS_COUNTRIES } from './data/bricsData.js';
import { INITIAL_CITIZEN_REQUESTS } from './data/citizenRequests.js';
import { DPG_SOLUTIONS } from './data/dpgSolutions.js';
import { I18N } from './i18n.js';

class StateStore {
  constructor() {
    this.currentCountry = 'ALL';
    this.currentLanguage = 'en';
    this.activeTab = 'map'; // 'map', 'ingestion', 'prioritization', 'warroom', 'tracker', 'knowledge'
    this.sectorFilter = 'ALL';
    this.urgencyThreshold = 0;
    
    // Ingested Petitions (with localStorage caching fallback)
    const storedPetitions = localStorage.getItem('infrapulse_petitions');
    this.petitions = storedPetitions ? JSON.parse(storedPetitions) : [...INITIAL_CITIZEN_REQUESTS];
    
    // MCDA Weights
    this.mcdaWeights = {
      citizenDemand: 30,
      demographics: 25,
      deficitGap: 20,
      esg: 15,
      roi: 10
    };

    // Budget Allocations Multipliers per Sector (Baseline 100%)
    this.sectorBudgetDeltas = {
      'Clean Water & Sanitation': 120, // +20%
      'Renewable Grid & Power': 110,
      'Rural Roadways & Freight': 95,
      'Healthcare Clinics': 130, // +30%
      'Digital Public Infra (Broadband)': 115,
      'Agro-Logistics & Cold Chains': 105
    };

    this.dpgSolutions = [...DPG_SOLUTIONS];
    this.listeners = new Map();
  }

  subscribe(event, callback) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event).add(callback);
    return () => this.listeners.get(event).delete(callback);
  }

  notify(event, data) {
    if (this.listeners.has(event)) {
      this.listeners.get(event).forEach(cb => cb(data, this));
    }
    if (this.listeners.has('*')) {
      this.listeners.get('*').forEach(cb => cb({ event, data }, this));
    }
  }

  setCountry(countryId) {
    if (this.currentCountry !== countryId) {
      this.currentCountry = countryId;
      this.notify('countryChanged', countryId);
    }
  }

  setLanguage(langCode) {
    if (I18N[langCode] && this.currentLanguage !== langCode) {
      this.currentLanguage = langCode;
      this.notify('languageChanged', langCode);
    }
  }

  setActiveTab(tabId) {
    if (this.activeTab !== tabId) {
      this.activeTab = tabId;
      this.notify('tabChanged', tabId);
    }
  }

  setSectorFilter(sector) {
    this.sectorFilter = sector;
    this.notify('filterChanged', { sector: this.sectorFilter, urgency: this.urgencyThreshold });
  }

  setUrgencyThreshold(val) {
    this.urgencyThreshold = parseFloat(val) || 0;
    this.notify('filterChanged', { sector: this.sectorFilter, urgency: this.urgencyThreshold });
  }

  setMCDAWeights(weights) {
    this.mcdaWeights = { ...this.mcdaWeights, ...weights };
    this.notify('mcdaWeightsChanged', this.mcdaWeights);
  }

  setSectorBudgetDelta(sector, percentage) {
    this.sectorBudgetDeltas[sector] = percentage;
    this.notify('budgetDeltasChanged', this.sectorBudgetDeltas);
  }

  addCitizenPetition(petition) {
    this.petitions.unshift(petition);
    try {
      localStorage.setItem('infrapulse_petitions', JSON.stringify(this.petitions));
    } catch (e) {
      console.warn('LocalStorage limit exceeded, caching in-memory', e);
    }
    this.notify('petitionAdded', petition);
    this.notify('petitionsUpdated', this.petitions);
  }

  getFilteredPetitions() {
    return this.petitions.filter(p => {
      // Country match
      if (this.currentCountry !== 'ALL' && p.countryId !== this.currentCountry) {
        return false;
      }
      // Sector match
      if (this.sectorFilter !== 'ALL' && p.sector !== this.sectorFilter) {
        return false;
      }
      // Urgency match
      if (p.urgencyScore < this.urgencyThreshold) {
        return false;
      }
      return true;
    });
  }

  getCurrentCountryMeta() {
    return BRICS_COUNTRIES[this.currentCountry] || BRICS_COUNTRIES.ALL;
  }

  t(key) {
    const dict = I18N[this.currentLanguage] || I18N.en;
    return dict[key] || I18N.en[key] || key;
  }
}

export const appState = new StateStore();
