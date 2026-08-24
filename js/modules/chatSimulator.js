/**
 * BRICS Omnichannel Citizen Chatbot Simulator
 * Simulates WhatsApp, Telegram, WeChat, and Kiosk conversational interfaces for infrastructure grievances.
 */

import { appState } from '../state.js';
import { BRICS_COUNTRIES } from '../data/bricsData.js';

export class ChatSimulatorModule {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.messages = [
      {
        sender: 'bot',
        text: '👋 Welcome to the **BRICS Digital Public Goods Infrastructure Bot** (ИнфраПульс / 基础设施 / इन्फ्रापल्स / Pulso). Report any community infrastructure deficit via text, voice note, or photo.',
        time: '10:00 AM'
      },
      {
        sender: 'bot',
        text: '💡 *Tip: Mention your district, the specific problem (e.g. water well failure, bridge collapse, blackout), and attach photos or GPS if available.*',
        time: '10:00 AM'
      }
    ];
    this.selectedPhoto = null;
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
            <h2 class="module-title"><i class="icon-message-square"></i> Omnichannel Citizen Messaging & Kiosk Portal</h2>
            <p class="module-subtitle">Supports WhatsApp, Telegram, WeChat & Low-Bandwidth Offline Kiosks with Geo-Tagging</p>
          </div>
          <div class="chat-channel-switcher">
            <button class="channel-tab active" data-channel="whatsapp"><i class="icon-whatsapp"></i> WhatsApp</button>
            <button class="channel-tab" data-channel="telegram"><i class="icon-telegram"></i> Telegram</button>
            <button class="channel-tab" data-channel="wechat"><i class="icon-wechat"></i> WeChat</button>
            <button class="channel-tab" data-channel="kiosk"><i class="icon-terminal"></i> Rural Kiosk</button>
          </div>
        </div>

        <div class="chat-layout-grid">
          <!-- Chat Phone Shell -->
          <div class="chat-phone-shell">
            <div class="chat-phone-header">
              <div class="chat-bot-avatar">
                <i class="icon-shield-check"></i>
              </div>
              <div class="chat-bot-meta">
                <h4>BRICS InfraPulse Civic DPI</h4>
                <span>🟢 Online • Verified Government Public Good</span>
              </div>
            </div>

            <div class="chat-messages-scroll" id="chatMessagesContainer">
              ${this.messages.map(m => this.renderMessageHTML(m)).join('')}
            </div>

            <div class="chat-quick-prompts">
              <span class="quick-title">Quick Scenarios:</span>
              <button class="quick-chip" data-quick="water-drought">💧 Water Pipeline Rupture (Bahia, Brazil)</button>
              <button class="quick-chip" data-quick="bridge-washout">🌉 Monsoon Flood Bridge (Bihar, India)</button>
              <button class="quick-chip" data-quick="power-arctic">❄️ Sub-Zero Power Outage (Yakutia, Russia)</button>
              <button class="quick-chip" data-quick="cold-storage">🍎 Cliff Village Cold Storage (Sichuan, China)</button>
            </div>

            <div class="chat-input-toolbar">
              <button class="tool-btn" id="attachPhotoBtn" title="Attach Damage Photo"><i class="icon-camera"></i></button>
              <button class="tool-btn" id="attachGpsBtn" title="Share GPS Location"><i class="icon-map-pin"></i></button>
              <input type="text" class="chat-text-input" id="chatInputText" placeholder="Describe the infrastructure issue...">
              <button class="chat-send-btn" id="chatSendBtn"><i class="icon-send"></i></button>
            </div>
            <div class="attachment-preview" id="attachmentPreview"></div>
          </div>

          <!-- Live AI Inspection & Verified DPI Credential Box -->
          <div class="chat-side-analytics">
            <div class="analytics-card">
              <h3 class="side-title"><i class="icon-cpu"></i> Zero-Knowledge Privacy Pipeline</h3>
              <p class="side-desc">Citizen requests are stripped of PII and mapped to a tamper-evident credential token before entering the National Infrastructure Database.</p>
              
              <div class="privacy-metric-row">
                <div class="p-metric">
                  <span class="p-label">DPI Verification Standard</span>
                  <span class="p-val text-green">IndiaStack / Pix / Mir Compatible</span>
                </div>
                <div class="p-metric">
                  <span class="p-label">Differential Privacy Layer</span>
                  <span class="p-val text-cyan">ε = 0.5 (Active Anonymization)</span>
                </div>
              </div>

              <div class="recent-tickets-box">
                <h4>Recently Processed Civic Tickets</h4>
                <div class="tickets-list" id="recentTicketsList">
                  ${appState.petitions.slice(0, 4).map(p => `
                    <div class="ticket-row-item">
                      <div class="t-badge ${p.countryId}">${p.countryId}</div>
                      <div class="t-info">
                        <span class="t-id">${p.id}</span>
                        <span class="t-sub">${p.sector} • ${p.districtName.split('(')[0]}</span>
                      </div>
                      <span class="t-urgency">${p.urgencyScore} 🔥</span>
                    </div>
                  `).join('')}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    this.bindEvents();
  }

  renderMessageHTML(m) {
    const isBot = m.sender === 'bot';
    return `
      <div class="chat-msg ${isBot ? 'msg-bot' : 'msg-user'} slide-up">
        <div class="msg-bubble">
          ${m.photo ? `<div class="msg-photo"><img src="${m.photo}" alt="Attached Infrastructure"></div>` : ''}
          <div class="msg-text">${this.formatMarkdown(m.text)}</div>
          <span class="msg-time">${m.time || 'Just now'}</span>
        </div>
      </div>
    `;
  }

  formatMarkdown(text) {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\n/g, '<br>');
  }

  bindEvents() {
    const sendBtn = document.getElementById('chatSendBtn');
    const inputField = document.getElementById('chatInputText');
    const photoBtn = document.getElementById('attachPhotoBtn');
    const gpsBtn = document.getElementById('attachGpsBtn');

    if (sendBtn && inputField) {
      sendBtn.addEventListener('click', () => this.handleSendMessage());
      inputField.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') this.handleSendMessage();
      });
    }

    if (photoBtn) {
      photoBtn.addEventListener('click', () => {
        this.selectedPhoto = 'https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8?auto=format&fit=crop&w=600&q=80';
        const preview = document.getElementById('attachmentPreview');
        if (preview) {
          preview.innerHTML = `
            <div class="preview-chip">
              <i class="icon-image"></i> Infrastructure Photo Attached (Broken Culvert / Road)
              <button class="remove-photo" id="removePhotoBtn">&times;</button>
            </div>
          `;
          document.getElementById('removePhotoBtn').addEventListener('click', () => {
            this.selectedPhoto = null;
            preview.innerHTML = '';
          });
        }
      });
    }

    if (gpsBtn) {
      gpsBtn.addEventListener('click', () => {
        if (inputField) {
          inputField.value += ' [GPS: 25.4484° N, 78.5685° E]';
        }
      });
    }

    const quickChips = this.container.querySelectorAll('.quick-chip');
    quickChips.forEach(chip => {
      chip.addEventListener('click', () => {
        const type = chip.getAttribute('data-quick');
        this.handleQuickScenario(type);
      });
    });

    const channelTabs = this.container.querySelectorAll('.channel-tab');
    channelTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        channelTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
      });
    });
  }

  handleSendMessage() {
    const input = document.getElementById('chatInputText');
    if (!input || !input.value.trim()) return;

    const userText = input.value.trim();
    const photo = this.selectedPhoto;
    input.value = '';
    this.selectedPhoto = null;
    const preview = document.getElementById('attachmentPreview');
    if (preview) preview.innerHTML = '';

    // Append user message
    this.appendMessage({
      sender: 'user',
      text: userText,
      photo: photo,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });

    // Simulate Bot typing & AI triage
    setTimeout(() => {
      this.processIncomingCitizenChat(userText, photo);
    }, 900);
  }

  handleQuickScenario(type) {
    const scenarios = {
      'water-drought': {
        text: 'Nossa comunidade em Canudos (Bahia) precisa com urgência de poço artesiano e energia solar. Estamos há 5 meses sem caminhão pipa!',
        countryId: 'BR',
        districtId: 'BR-BA-ST',
        districtName: 'Sertão Semi-Arid (Bahia)',
        sector: 'Clean Water & Sanitation',
        urgency: 9.6,
        photo: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=600&q=80'
      },
      'bridge-washout': {
        text: 'कोसी नदी में बाढ़ के कारण हमारा मुख्य पुल टूट गया है। 20 गांवों का संपर्क कट गया है। तुरंत पक्का पुल बनाया जाए!',
        countryId: 'IN',
        districtId: 'IN-BR-KB',
        districtName: 'Kosi Basin (Bihar)',
        sector: 'Rural Roadways & Freight',
        urgency: 9.8,
        photo: 'https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8?auto=format&fit=crop&w=600&q=80'
      },
      'power-arctic': {
        text: 'В поселке в Якутии авария на линии электропередач при -45°C. Нужен резервный дизель-солнечный гибридный генератор!',
        countryId: 'RU',
        districtId: 'RU-SA-YK',
        districtName: 'Sakha Republic (Yakutia)',
        sector: 'Renewable Grid & Power',
        urgency: 9.4,
        photo: 'https://images.unsplash.com/photo-1483921020237-2ff51e8e4b22?auto=format&fit=crop&w=600&q=80'
      },
      'cold-storage': {
        text: '四川凉山悬崖村急需智能光伏冷链中转仓库与盘山公路，解决农产品下山腐烂问题！',
        countryId: 'CN',
        districtId: 'CN-SC-LB',
        districtName: 'Liangshan Yi Prefecture (Sichuan)',
        sector: 'Agro-Logistics & Cold Chains',
        urgency: 9.1,
        photo: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80'
      }
    };

    const sc = scenarios[type];
    if (!sc) return;

    this.appendMessage({
      sender: 'user',
      text: sc.text,
      photo: sc.photo,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });

    setTimeout(() => {
      this.processIncomingCitizenChat(sc.text, sc.photo, sc);
    }, 800);
  }

  processIncomingCitizenChat(userText, photo, preset = null) {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const countryId = preset ? preset.countryId : (userText.match(/[अ-ह]/) ? 'IN' : userText.match(/[а-я]/i) ? 'RU' : userText.match(/[\u4e00-\u9fa5]/) ? 'CN' : userText.match(/[á-úãõç]/i) ? 'BR' : 'IN');
    const ticketId = `BRICS-${countryId}-2026-${randomSuffix}`;
    const sector = preset ? preset.sector : (userText.toLowerCase().includes('water') || userText.includes('पानी') || userText.includes('água') || userText.includes('вода') ? 'Clean Water & Sanitation' : userText.toLowerCase().includes('bridge') || userText.includes('पुल') || userText.includes('ponte') || userText.includes('мост') ? 'Rural Roadways & Freight' : 'Renewable Grid & Power');
    const urgency = preset ? preset.urgency : 9.2;
    const districtName = preset ? preset.districtName : (countryId === 'IN' ? 'Bundelkhand (Uttar Pradesh)' : countryId === 'BR' ? 'Sertão Semi-Arid (Bahia)' : countryId === 'RU' ? 'Sakha Republic (Yakutia)' : 'Liangshan (Sichuan)');

    const newPetition = {
      id: ticketId,
      countryId: countryId,
      districtId: preset ? preset.districtId : `${countryId}-DIST`,
      districtName: districtName,
      channel: 'whatsapp',
      language: 'Multilingual NLP Tagged',
      citizenName: 'Verified Community Resident',
      citizenAnonHash: `dpi:${countryId.toLowerCase()}:chat-anon-${Math.random().toString(36).substring(2, 8)}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      originalText: userText,
      translatedText: `Standardized Citizen Petition: Immediate intervention requested for ${sector} in ${districtName}.`,
      sector: sector,
      lat: (countryId === 'IN' ? 25.5 : countryId === 'BR' ? -11.7 : countryId === 'RU' ? 62.1 : 27.9) + (Math.random() * 0.06 - 0.03),
      lng: (countryId === 'IN' ? 78.6 : countryId === 'BR' ? -41.4 : countryId === 'RU' ? 129.7 : 102.3) + (Math.random() * 0.06 - 0.03),
      urgencyScore: urgency,
      impactScore: 9.0,
      signaturesCount: Math.floor(500 + Math.random() * 1500),
      status: 'POLICY_SHORTLISTED',
      budgetEstimatedUSD: 520000,
      aiEntities: {
        location: districtName,
        coreDeficit: `High-Severity Demand in ${sector}`,
        vulnerableGroup: 'Agrarian & vulnerable community residents',
        recommendedIntervention: 'National Infrastructure DPI Deployment & NDB Co-Funding',
        sentiment: 'Urgent Development Demand',
        confidence: 0.98
      },
      milestones: [
        { step: 'Ingested via Omnichannel Messaging Bot', date: 'Just now', done: true },
        { step: 'AI Computer Vision & NLP Triage', date: 'Just now', done: true },
        { step: 'Correlated with Regional Deficit Heatmap', date: 'Just now', done: true },
        { step: 'Included in Sovereign AI Priority Pool', date: 'Pending', done: false }
      ]
    };

    appState.addCitizenPetition(newPetition);

    const botReply = `
✅ **Request Verified & Ingested into National Infrastructure Grid!**

📋 **Civic Ticket ID**: \`${ticketId}\`
📍 **Target District**: ${districtName}
🏷️ **Classified Sector**: ${sector}
🔥 **AI Urgency Score**: **${urgency} / 10.0**
${photo ? '📸 **Computer Vision**: Infrastructure physical damage verified with 98.4% model confidence.' : ''}

Your petition has been matched with national demographic deficit indices and forwarded to the **National Ministry & New Development Bank (NDB) Planning Matrix**.
    `;

    this.appendMessage({
      sender: 'bot',
      text: botReply,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });

    this.updateRecentTicketsList();
  }

  appendMessage(msg) {
    this.messages.push(msg);
    const container = document.getElementById('chatMessagesContainer');
    if (container) {
      container.insertAdjacentHTML('beforeend', this.renderMessageHTML(msg));
      container.scrollTop = container.scrollHeight;
    }
  }

  updateRecentTicketsList() {
    const list = document.getElementById('recentTicketsList');
    if (list) {
      list.innerHTML = appState.petitions.slice(0, 4).map(p => `
        <div class="ticket-row-item slide-up">
          <div class="t-badge ${p.countryId}">${p.countryId}</div>
          <div class="t-info">
            <span class="t-id">${p.id}</span>
            <span class="t-sub">${p.sector} • ${p.districtName.split('(')[0]}</span>
          </div>
          <span class="t-urgency">${p.urgencyScore} 🔥</span>
        </div>
      `).join('');
    }
  }
}
