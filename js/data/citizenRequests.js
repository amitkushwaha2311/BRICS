/**
 * BRICS Omnichannel Citizen Development Requests Dataset
 * Multilingual, geolocated citizen petitions ingested via Voice, WhatsApp, Telegram, SMS, and Kiosk.
 */

export const INITIAL_CITIZEN_REQUESTS = [
  // INDIA (Bundelkhand & Kosi Basin)
  {
    id: 'BRICS-IND-2026-1042',
    countryId: 'IN',
    districtId: 'IN-UP-BD',
    districtName: 'Bundelkhand (Uttar Pradesh)',
    channel: 'voice',
    language: 'Hindi (हिन्दी / बुंदेली)',
    citizenName: 'Rameshwar Pal',
    citizenAnonHash: 'dpi:in:aadhaar-anon:9a8f2e41',
    timestamp: '2026-08-24 09:15:00',
    originalText: 'हमारे गांव मानिकपुर में पिछले तीन साल से सूखा पड़ा है। पानी का कुआं सूख चुका है, महिलाओं को 5 किलोमीटर दूर रेलवे ट्रैक पार करके गंदा पानी लाना पड़ता है। तुरंत सौर ऊर्जा से चलने वाले बोरवेल और पाइप लाइन की सख्त जरूरत है।',
    translatedText: 'Our village Manikpur has suffered severe drought for three years. The community well is dry; women must walk 5 km across railway tracks to fetch contaminated water. We urgently need solar-powered deep borewells and piped water connection.',
    sector: 'Clean Water & Sanitation',
    lat: 25.0484,
    lng: 78.4685,
    urgencyScore: 9.6,
    impactScore: 9.2,
    signaturesCount: 1420,
    status: 'POLICY_SHORTLISTED',
    budgetEstimatedUSD: 380000,
    aiEntities: {
      location: 'Manikpur, Chitrakoot/Bundelkhand',
      coreDeficit: 'Critical Groundwater Depletion & Distance to Potable Water',
      vulnerableGroup: 'Rural women, infants, agrarian families',
      recommendedIntervention: 'Deep Aquifer Solar Pumping + Jal Jeevan Grid Interlink',
      sentiment: 'Desperate / High Urgency',
      confidence: 0.98
    },
    milestones: [
      { step: 'Ingested via Voice IVR', date: '2026-08-24 09:15', done: true },
      { step: 'AI Dialect Translation & Entity Tagging', date: '2026-08-24 09:16', done: true },
      { step: 'Cross-Referenced with Water Stress Index (92%)', date: '2026-08-24 09:18', done: true },
      { step: 'Prioritized into National Infrastructure Pipeline', date: '2026-08-24 11:30', done: true },
      { step: 'NDB Water Resilience Co-Financing Review', date: 'Pending', done: false },
      { step: 'Tender Execution & Citizen Drone Verification', date: 'Pending', done: false }
    ]
  },
  {
    id: 'BRICS-IND-2026-1088',
    countryId: 'IN',
    districtId: 'IN-BR-KB',
    districtName: 'Kosi Basin (Bihar)',
    channel: 'whatsapp',
    language: 'Hindi / Maithili (मैथिली)',
    citizenName: 'Sunita Devi (Village Panchayat Head)',
    citizenAnonHash: 'dpi:in:aadhaar-anon:3c7b1190',
    timestamp: '2026-08-23 16:40:00',
    originalText: 'हर साल कोसी नदी की बाढ़ में हमारी बांस की पुलिया बह जाती है। 40 गांवों का संपर्क मुख्य अस्पताल और ब्लॉक से कट जाता है। प्रसव के दौरान महिलाओं की जान जा रही है। हमें कंक्रीट का ऊंचा पक्का पुल चाहिए।',
    translatedText: 'Every monsoon flood washes away our temporary bamboo culverts. Over 40 villages lose all road connectivity to the district hospital. Women in labor are losing their lives. We demand an elevated flood-resilient concrete bridge.',
    sector: 'Rural Roadways & Freight',
    lat: 25.9200,
    lng: 87.1200,
    urgencyScore: 9.8,
    impactScore: 9.5,
    signaturesCount: 3890,
    status: 'BUDGET_APPROVED',
    budgetEstimatedUSD: 2400000,
    aiEntities: {
      location: 'Saharsa-Supaul Border, Kosi Embankment',
      coreDeficit: 'Severe Flood Severance & Healthcare Transport Blockade',
      vulnerableGroup: '40 Isolated Flood-Prone Gram Panchayats',
      recommendedIntervention: 'Elevated High-Level RCC Bridge & Embankment Protection',
      sentiment: 'Critical Emergency',
      confidence: 0.99
    },
    milestones: [
      { step: 'Ingested via WhatsApp Bot + Photo Upload', date: '2026-08-23 16:40', done: true },
      { step: 'AI Computer Vision: Structural Damage Verified (98%)', date: '2026-08-23 16:42', done: true },
      { step: 'Demographic Vulnerability Filter (MPI: 0.44)', date: '2026-08-23 16:45', done: true },
      { step: 'Ministry of Road Transport & NDB Approval', date: '2026-08-24 14:00', done: true },
      { step: 'Tender Issued & e-Procurement Live', date: 'In Progress', done: false },
      { step: 'Civil Construction & Satellite Milestone Check', date: 'Pending', done: false }
    ]
  },
  {
    id: 'BRICS-IND-2026-2104',
    countryId: 'IN',
    districtId: 'IN-AS-MJ',
    districtName: 'Majuli Island (Assam)',
    channel: 'kiosk',
    language: 'Assamese (অসমীয়া)',
    citizenName: 'Biren Kalita',
    citizenAnonHash: 'dpi:in:aadhaar-anon:88f1a23c',
    timestamp: '2026-08-22 11:20:00',
    originalText: 'মাজুলী নদীদ্বীপত বিদ্যুতৰ তাঁৰ বাৰে বাৰে ছিঙি থাকে। নিশা স্বাস্থ্য কেন্দ্ৰত অন্ধকাৰত চিকিৎসা কৰিব লগা হয়। আমাক ২৪ ঘণ্টীয়া সৌৰ শক্তিৰ হাইব্ৰিড মাইক্ৰোগ্ৰিড আৰু বেটাৰী ষ্টৰেজ লাগে।',
    translatedText: 'On Majuli river island, power cables break continuously during storms. The primary health center operates in total darkness at night. We need a 24-hour hybrid solar microgrid with battery energy storage.',
    sector: 'Renewable Grid & Power',
    lat: 26.9600,
    lng: 94.1800,
    urgencyScore: 8.9,
    impactScore: 8.6,
    signaturesCount: 940,
    status: 'IN_CONSTRUCTION',
    budgetEstimatedUSD: 720000,
    aiEntities: {
      location: 'Garamur & Kamalabari, Majuli Island',
      coreDeficit: 'Island Grid Isolation & Primary Clinic Blackouts',
      vulnerableGroup: 'Island Population, Rural Patients',
      recommendedIntervention: '1.2 MW Floating + Rooftop Solar Hybrid Microgrid',
      sentiment: 'High Urgency',
      confidence: 0.97
    },
    milestones: [
      { step: 'Kiosk Submission with Biometric Attestation', date: '2026-08-22 11:20', done: true },
      { step: 'AI MCDA Prioritization Score: 91/100', date: '2026-08-22 11:25', done: true },
      { step: 'State Energy Development Agency Sanction', date: '2026-08-23 10:00', done: true },
      { step: 'Solar Battery Procurement & Delivery', date: '2026-08-24 08:00', done: true },
      { step: 'Civil Installation (68% Complete)', date: '2026-08-24 18:00', done: false },
      { step: 'Live Telemetry Ingestion to DPI Portal', date: 'Pending', done: false }
    ]
  },

  // BRAZIL (Bahia Sertão, Pará Amazonia & Maranhão)
  {
    id: 'BRICS-BRA-2026-3011',
    countryId: 'BR',
    districtId: 'BR-BA-ST',
    districtName: 'Sertão Semi-Arid (Bahia)',
    channel: 'voice',
    language: 'Portuguese (Português do Sertão)',
    citizenName: 'Maria Francisca dos Santos',
    citizenAnonHash: 'dpi:br:cpf-anon:71a99c04',
    timestamp: '2026-08-24 10:05:00',
    originalText: 'A nossa comunidade quilombola em Canudos está há 6 meses sem caminhão pipa. As crianças estão bebendo água barrenta do açude e tendo diarreia grave. Precisamos de poço artesiano movido a energia solar e cisternas de placas já!',
    translatedText: 'Our quilombola rural community in Canudos has been without water delivery trucks for 6 months. Children are drinking turbid dam water and suffering severe diarrhea. We urgently need solar artesian wells and community water cisterns now!',
    sector: 'Clean Water & Sanitation',
    lat: -11.7500,
    lng: -41.2000,
    urgencyScore: 9.7,
    impactScore: 9.4,
    signaturesCount: 2180,
    status: 'POLICY_SHORTLISTED',
    budgetEstimatedUSD: 450000,
    aiEntities: {
      location: 'Canudos / Sertão da Bahia',
      coreDeficit: 'Extreme Water Scarcity & Child Waterborne Disease',
      vulnerableGroup: 'Quilombola Indigenous & Rural Smallholders',
      recommendedIntervention: 'Deep Solar-Powered Brackish Well Desalination & 200 Cisterns',
      sentiment: 'Critical Distress',
      confidence: 0.99
    },
    milestones: [
      { step: 'Voice Audio Ingestion via WhatsApp Audio', date: '2026-08-24 10:05', done: true },
      { step: 'AI Portuguese NLP: Medical Emergency Clustered', date: '2026-08-24 10:06', done: true },
      { step: 'Correlation with Semi-Arid Drought Index (95%)', date: '2026-08-24 10:08', done: true },
      { step: 'Prioritization in Ministry of Regional Integration Pipeline', date: '2026-08-24 12:00', done: true },
      { step: 'NDB Social Sustainability Fund Application', date: 'Pending', done: false },
      { step: 'Community Verification via SISAGUA DPI App', date: 'Pending', done: false }
    ]
  },
  {
    id: 'BRICS-BRA-2026-3045',
    countryId: 'BR',
    districtId: 'BR-PA-AM',
    districtName: 'Tapajós Basin (Pará / Amazonia)',
    channel: 'telegram',
    language: 'Portuguese / Nheengatu (Amazônia)',
    citizenName: 'Joao Caboclo Silva',
    citizenAnonHash: 'dpi:br:cpf-anon:52e18d77',
    timestamp: '2026-08-23 14:15:00',
    originalText: 'As comunidades ribeirinhas do Rio Tapajós não têm sinal de internet nem posto de saúde com eletricidade. Para levar um doente até Santarém de barco leva 18 horas de viagem. Precisamos de telemedicina conectada via satélite e ambulancha solar.',
    translatedText: 'Riverine communities along Tapajós River have no internet or electrified health posts. Transporting a patient to Santarém by boat takes 18 hours. We urgently need satellite-connected telemedicine hubs and solar-powered ambulance boats.',
    sector: 'Healthcare Clinics',
    lat: -4.3500,
    lng: -56.1000,
    urgencyScore: 9.3,
    impactScore: 9.0,
    signaturesCount: 1650,
    status: 'BUDGET_APPROVED',
    budgetEstimatedUSD: 890000,
    aiEntities: {
      location: 'Tapajós Riverine Corridor, Pará',
      coreDeficit: 'Extreme Healthcare Isolation (18hr transit to emergency care)',
      vulnerableGroup: 'Riverine Traditional & Indigenous Populations',
      recommendedIntervention: 'Solar Telehealth Outposts + Rapid Electric River Ambulances',
      sentiment: 'High Urgency',
      confidence: 0.98
    },
    milestones: [
      { step: 'Telegram Ingestion with Offline Geotag', date: '2026-08-23 14:15', done: true },
      { step: 'AI Extraction: Telemedicine & Transport Gap (88%)', date: '2026-08-23 14:18', done: true },
      { step: 'Cross-BRICS DPI Match: Brazil-India Health Stack', date: '2026-08-23 15:00', done: true },
      { step: 'Amazon Sustainable Infrastructure Allocation Approved', date: '2026-08-24 09:30', done: true },
      { step: 'Starlink/Telebras Antenna & Boat Procurement', date: 'In Progress', done: false },
      { step: 'Final Delivery & Patient Triage Telemetry Live', date: 'Pending', done: false }
    ]
  },

  // SOUTH AFRICA (Eastern Cape, Limpopo & Soweto)
  {
    id: 'BRICS-ZAF-2026-4019',
    countryId: 'ZA',
    districtId: 'ZA-EC-OR',
    districtName: 'OR Tambo District (Eastern Cape)',
    channel: 'voice',
    language: 'isiXhosa / English',
    citizenName: 'Nokuthula Mthembu',
    citizenAnonHash: 'dpi:za:id-anon:44c9b201',
    timestamp: '2026-08-24 08:30:00',
    originalText: 'Abantwana bethu bawela umlambo oyingozi ukuya esikolweni eMqanduli. Xa kusina imvula abakwazi ukuwela, kwaye abathathu sele betshonile kulo nyaka. Sicela urhulumente asakhele ibhulorho yabatshovi kunye neendlela ezicocekileyo.',
    translatedText: 'Our children must cross a dangerous river to reach school in Mqanduli. When it rains they cannot cross, and three have drowned this year. We plead with government to build a safe pedestrian bridge and paved access road.',
    sector: 'Rural Roadways & Freight',
    lat: -31.7500,
    lng: 28.9500,
    urgencyScore: 9.9,
    impactScore: 9.6,
    signaturesCount: 3410,
    status: 'IN_CONSTRUCTION',
    budgetEstimatedUSD: 620000,
    aiEntities: {
      location: 'Mqanduli / Mthatha River Basin, Eastern Cape',
      coreDeficit: 'Fatal River Crossing for Schoolchildren & Isolated Villages',
      vulnerableGroup: 'Primary Students & Rural Commuters',
      recommendedIntervention: 'Suspension Pedestrian Bridge & All-Weather Feeder Road',
      sentiment: 'Extreme Grief & Urgency',
      confidence: 0.99
    },
    milestones: [
      { step: 'Voice Petition Received via Toll-Free Voice Line', date: '2026-08-24 08:30', done: true },
      { step: 'AI Speech-to-Text & isiXhosa Dialect Extraction', date: '2026-08-24 08:32', done: true },
      { step: 'Demographic MPI Correlation: Highest In SA (0.48)', date: '2026-08-24 08:35', done: true },
      { step: 'Emergency Welisizwe Rural Bridges Budget Allocated', date: '2026-08-24 11:00', done: true },
      { step: 'SA Army Engineers & Contractor Site Mobilization (80%)', date: '2026-08-24 17:00', done: false },
      { step: 'Citizen Verification & Safe Passage Certification', date: 'Pending', done: false }
    ]
  },
  {
    id: 'BRICS-ZAF-2026-4077',
    countryId: 'ZA',
    districtId: 'ZA-GP-SO',
    districtName: 'Soweto & Orange Farm (Gauteng)',
    channel: 'whatsapp',
    language: 'isiZulu / English',
    citizenName: 'Sipho Dlamini (Youth Tech Coordinator)',
    citizenAnonHash: 'dpi:za:id-anon:12d098ee',
    timestamp: '2026-08-23 18:50:00',
    originalText: 'Load shedding in Orange Farm causes 12 hours of blackouts daily. Small businesses, spaza shops, and schools are paralyzed. Food rots in freezers and clinics cannot store insulin safely. We need a township solar microgrid and free public Wi-Fi hotspot mesh.',
    translatedText: 'Load shedding in Orange Farm causes 12 hours of blackouts daily. Small businesses, spaza shops, and schools are paralyzed. Food rots in freezers and clinics cannot store insulin safely. We need a township solar microgrid and free public Wi-Fi hotspot mesh.',
    sector: 'Renewable Grid & Power',
    lat: -26.4800,
    lng: 27.8600,
    urgencyScore: 8.7,
    impactScore: 8.5,
    signaturesCount: 4200,
    status: 'POLICY_SHORTLISTED',
    budgetEstimatedUSD: 1100000,
    aiEntities: {
      location: 'Orange Farm Ext 4, Southern Gauteng',
      coreDeficit: 'Chronic Power Blackouts & Township Digital Exclusion',
      vulnerableGroup: 'Youth Jobseekers, Spaza Small Businesses, Clinics',
      recommendedIntervention: '2.5MW Rooftop Community Solar Grid + Fibre Mesh DPI',
      sentiment: 'Economic Frustration & Mobilization',
      confidence: 0.97
    },
    milestones: [
      { step: 'WhatsApp Petition & Spaza Shop Geotag Cluster', date: '2026-08-23 18:50', done: true },
      { step: 'AI Deficit Correlation (Power Deficit: 88%)', date: '2026-08-23 18:55', done: true },
      { step: 'Shortlisted for NDB Green Township Resiliency Fund', date: '2026-08-24 10:15', done: true },
      { step: 'Eskom & City Power Grid Interconnection Study', date: 'In Progress', done: false },
      { step: 'Solar Battery Installation & Commissioning', date: 'Pending', done: false }
    ]
  },

  // RUSSIA (Sakha Yakutia & Dagestan)
  {
    id: 'BRICS-RUS-2026-5012',
    countryId: 'RU',
    districtId: 'RU-SA-YK',
    districtName: 'Sakha Republic (Yakutia)',
    channel: 'kiosk',
    language: 'Russian (Русский / Саха тыла)',
    citizenName: 'Aytal Ivanov',
    citizenAnonHash: 'dpi:ru:snils-anon:8891bf10',
    timestamp: '2026-08-24 07:45:00',
    originalText: 'Поселок на берегу реки Лена отрезан от большой земли в период весеннего ледохода и осенней распутицы на 4 месяца. Цены на продукты взлетают в 5 раз, скорая помощь не может проехать. Необходим постоянный круглогодичный автомобильный мост через Лену и оптоволокно для телемедицины.',
    translatedText: 'Our settlement on the Lena River is cut off from the mainland for 4 months during spring ice drifts and autumn mud season. Food prices quintuple, and ambulances cannot cross. We urgently need the year-round Lena River bridge completed and fiber-optic telemedicine link.',
    sector: 'Rural Roadways & Freight',
    lat: 62.1500,
    lng: 129.8500,
    urgencyScore: 9.4,
    impactScore: 9.3,
    signaturesCount: 2980,
    status: 'BUDGET_APPROVED',
    budgetEstimatedUSD: 8500000,
    aiEntities: {
      location: 'Lena River Crossing, Yakutsk Region',
      coreDeficit: 'Permafrost Transportation Isolation & Severe Logistics Inflation',
      vulnerableGroup: 'Sub-Arctic Isolated Communities',
      recommendedIntervention: 'All-Weather Permafrost Cable-Stayed Bridge + Fiber Line',
      sentiment: 'High Urgency / Winter Preparedness',
      confidence: 0.99
    },
    milestones: [
      { step: 'Ingested at Arctic Public Services Kiosk', date: '2026-08-24 07:45', done: true },
      { step: 'AI Natural Language Extraction (Russian/Yakut)', date: '2026-08-24 07:48', done: true },
      { step: 'Transport Deficit Index Rated at 96/100', date: '2026-08-24 07:50', done: true },
      { step: 'Federal Infrastructure & NDB Arctic Fund Approved', date: '2026-08-24 13:20', done: true },
      { step: 'Permafrost Deep Piling Underway', date: 'In Progress', done: false },
      { step: 'Drone Telemetry Milestone Validation', date: 'Pending', done: false }
    ]
  },
  {
    id: 'BRICS-RUS-2026-5089',
    countryId: 'RU',
    districtId: 'RU-DA-NC',
    districtName: 'Highland Districts (Dagestan)',
    channel: 'telegram',
    language: 'Russian / Avar (Русский / Авар)',
    citizenName: 'Magomed Aliyev',
    citizenAnonHash: 'dpi:ru:snils-anon:319fa00c',
    timestamp: '2026-08-23 12:30:00',
    originalText: 'В высокогорных аулах района Тлярата постоянные перебои с питьевой водой из-за замерзания старых труб зимой и оползней весной. Женщины носят воду из горных родников вручную. Требуется строительство гравитационного утепленного водопровода с фильтрацией.',
    translatedText: 'In high-altitude auls of Tlyarata district, drinking water cuts off constantly due to frozen old pipes in winter and landslides in spring. Women carry water by hand from mountain springs. We require construction of an insulated gravity-fed water pipeline with filtration.',
    sector: 'Clean Water & Sanitation',
    lat: 42.1000,
    lng: 46.8500,
    urgencyScore: 8.8,
    impactScore: 8.4,
    signaturesCount: 1470,
    status: 'POLICY_SHORTLISTED',
    budgetEstimatedUSD: 510000,
    aiEntities: {
      location: 'Tlyarata High-Altitude District, Dagestan',
      coreDeficit: 'Mountain Freeze-Thaw Pipeline Ruptures & Water Hauling',
      vulnerableGroup: 'Highland Mountain Villages',
      recommendedIntervention: 'Deep Trench Insulated Polyethylene Gravity Water Network',
      sentiment: 'Urgent Infrastructure Request',
      confidence: 0.96
    },
    milestones: [
      { step: 'Ingested via Telegram Civic Bot', date: '2026-08-23 12:30', done: true },
      { step: 'AI Water Stress & Elevation Gradient Analysis', date: '2026-08-23 12:32', done: true },
      { step: 'Shortlisted for Regional Mountain Development Scheme', date: '2026-08-24 11:00', done: true },
      { step: 'Topographic LiDAR Survey & Hydraulic Plan', date: 'Pending', done: false }
    ]
  },

  // CHINA (Sichuan Liangshan & Guizhou)
  {
    id: 'BRICS-CHN-2026-6023',
    countryId: 'CN',
    districtId: 'CN-SC-LB',
    districtName: 'Liangshan Yi Prefecture (Sichuan)',
    channel: 'kiosk',
    language: 'Mandarin / Nuosu Yi (中文 / ꆈꌠ꒿)',
    citizenName: 'Jimu Amu (吉木阿木)',
    citizenAnonHash: 'dpi:cn:id-anon:9011ea82',
    timestamp: '2026-08-24 11:10:00',
    originalText: '大凉山悬崖村周边的三个高山自然村，农产品（花椒、核桃）丰收后全靠人背马驮下山，损耗超过40%。孩子们上学每天要在陡峭山路上步行3小时。强烈建议修建全天候盘山硬化货运公路与智能农产品冷链物流中转仓。',
    translatedText: 'Three cliff-top villages in Liangshan Yi prefecture still rely on mule packs to transport Sichuan peppercorns and walnuts down steep ridges, suffering >40% post-harvest spoilage. Children hike 3 hours on cliff edges to school. We strongly urge construction of a paved mountain freight road and smart agro-cold-storage transfer hub.',
    sector: 'Agro-Logistics & Cold Chains',
    lat: 27.9500,
    lng: 102.3500,
    urgencyScore: 9.1,
    impactScore: 9.0,
    signaturesCount: 3650,
    status: 'BUDGET_APPROVED',
    budgetEstimatedUSD: 3200000,
    aiEntities: {
      location: 'Atuleer / Liangshan Yi Cliff Ridges, Sichuan',
      coreDeficit: 'Extreme Mountain Elevation Isolation & Crop Logistics Loss',
      vulnerableGroup: 'Ethnic Yi Agrarian Smallholders & Students',
      recommendedIntervention: 'Engineered Switchback Road + Beidou Smart Agro-Cold Hub',
      sentiment: 'Strong Communal Aspiration',
      confidence: 0.99
    },
    milestones: [
      { step: 'Ingested via Rural Digital Kiosk Portal', date: '2026-08-24 11:10', done: true },
      { step: 'AI Multi-Dialect Nuosu-Mandarin Processing', date: '2026-08-24 11:12', done: true },
      { step: 'Combined with Rural Revitalization Index (MPI: 0.28)', date: '2026-08-24 11:15', done: true },
      { step: 'Provincial Rural Revitalization & NDB Approval', date: '2026-08-24 15:30', done: true },
      { step: 'Tunnel & Bridge Engineering Procurement Active', date: 'In Progress', done: false }
    ]
  },
  {
    id: 'BRICS-CHN-2026-6091',
    countryId: 'CN',
    districtId: 'CN-GZ-LS',
    districtName: 'Liupanshui (Guizhou Province)',
    channel: 'wechat',
    language: 'Mandarin (中文)',
    citizenName: 'Chen Wei (陈伟)',
    citizenAnonHash: 'dpi:cn:id-anon:448b10ef',
    timestamp: '2026-08-23 09:20:00',
    originalText: '喀斯特地貌山区地下水漏失严重，逢旱季水井枯竭。希望在村庄山凹处扩建防渗雨水蓄水池，并铺设覆盖全乡的智慧物联网水表与管网，解决3000户村民季节性断水问题。',
    translatedText: 'Karst mountain topography causes severe groundwater seepage; wells dry up during dry spells. We request construction of an impermeable rainwater harvesting reservoir basin and smart IoT water metering network to solve seasonal shortages for 3,000 households.',
    sector: 'Clean Water & Sanitation',
    lat: 26.6500,
    lng: 104.9200,
    urgencyScore: 8.5,
    impactScore: 8.2,
    signaturesCount: 2100,
    status: 'VERIFIED_COMPLETE',
    budgetEstimatedUSD: 820000,
    aiEntities: {
      location: 'Karst Basin, Liupanshui, Guizhou',
      coreDeficit: 'Karst Geology Surface Runoff Loss & Seasonal Drought',
      vulnerableGroup: '3,000 Rural Agrarian Families',
      recommendedIntervention: 'Geomembrane Rainwater Basin + Smart IoT Water Distribution',
      sentiment: 'Constructive Proposal',
      confidence: 0.97
    },
    milestones: [
      { step: 'WeChat Citizen Feedback Mini-App Ingestion', date: '2026-08-23 09:20', done: true },
      { step: 'AI MCDA Prioritization Rating: 87/100', date: '2026-08-23 09:22', done: true },
      { step: 'National Water Resources Bureau Grant Sanction', date: '2026-08-23 14:00', done: true },
      { step: 'Construction Completed & IoT Sensors Active', date: '2026-08-24 16:00', done: true },
      { step: 'Citizen Satisfaction Audit: 96% Positive', date: '2026-08-24 17:30', done: true }
    ]
  },

  // ETHIOPIA (Jigjiga Somali & Bale Highlands)
  {
    id: 'BRICS-ETH-2026-7014',
    countryId: 'ET',
    districtId: 'ET-SO-JG',
    districtName: 'Jigjiga Zone (Somali Region)',
    channel: 'voice',
    language: 'Somali / Amharic (Soomaali / አማርኛ)',
    citizenName: 'Farhan Abdi & Community Elders',
    citizenAnonHash: 'dpi:et:fayda-anon:55a019ef',
    timestamp: '2026-08-24 06:30:00',
    originalText: 'Abaartu waxay laysay boqolaal neef oo xoolo ah. Ceelashii gacanta waa wada engegeen. Hooyooyinka iyo carruurtu waxay biyo raadsadaan 15km. Waxaan si degdeg ah ugu baahannahay ceel-biyood qoto-dheer oo qoraxda ku shaqeeya.',
    translatedText: 'Persistent drought has wiped out hundreds of pastoralist livestock. Traditional hand-dug shallow wells have failed. Mothers and children walk 15 km to search for water. We desperately need a deep solar-powered borehole with animal watering troughs.',
    sector: 'Clean Water & Sanitation',
    lat: 9.4200,
    lng: 42.9200,
    urgencyScore: 9.9,
    impactScore: 9.7,
    signaturesCount: 2760,
    status: 'POLICY_SHORTLISTED',
    budgetEstimatedUSD: 340000,
    aiEntities: {
      location: 'Jigjiga Pastoralist Belt, Somali Region',
      coreDeficit: 'Critical Aquifer Depth & Severe Livestock Mortality',
      vulnerableGroup: 'Pastoralist Nomadic Communities & Infants',
      recommendedIntervention: '400m Deep Solar Borehole with Multi-Spigot Kiosk & Animal Troughs',
      sentiment: 'Emergency Life-Threatening Crisis',
      confidence: 0.99
    },
    milestones: [
      { step: 'Toll-Free Voice IVR Submission', date: '2026-08-24 06:30', done: true },
      { step: 'AI Somali Audio Translation & Entity Extraction', date: '2026-08-24 06:33', done: true },
      { step: 'Cross-Referenced with Water Stress Index (96%) & MPI (0.56)', date: '2026-08-24 06:35', done: true },
      { step: 'Prioritized into NDB-Ethiopia Emergency Climate Facility', date: '2026-08-24 10:00', done: true },
      { step: 'Drilling Rig Dispatch & Hydrogeology Scan', date: 'In Progress', done: false }
    ]
  },

  // EGYPT (Asyut & North Sinai)
  {
    id: 'BRICS-EGY-2026-8022',
    countryId: 'EG',
    districtId: 'EG-UE-AS',
    districtName: 'Asyut Governorate (Upper Egypt)',
    channel: 'whatsapp',
    language: 'Arabic (العربية / صعيدي)',
    citizenName: 'Mahmoud Al-Sayed',
    citizenAnonHash: 'dpi:eg:id-anon:88b712aa',
    timestamp: '2026-08-24 08:10:00',
    originalText: 'في قرى مركز أبنوب بأسيوط، شبكة الصرف الصحي متهالكة وتتسرب للمياه الجوفية مما تسبب في تصدع المنازل وانتشار الأمراض بين الأطفال. نطالب بإدراجنا عاجلاً ضمن المرحلة الجديدة من مبادرة حياة كريمة لمد شبكات صرف صحي حديثة.',
    translatedText: 'In Abnoub villages in Asyut, the degraded sewage network leaks into groundwater, cracking house foundations and spreading disease among children. We demand urgent inclusion in the new phase of the "Decent Life" (Hayah Karima) initiative for modern sanitation pipelines.',
    sector: 'Clean Water & Sanitation',
    lat: 27.2400,
    lng: 31.2500,
    urgencyScore: 9.0,
    impactScore: 8.8,
    signaturesCount: 3150,
    status: 'BUDGET_APPROVED',
    budgetEstimatedUSD: 1450000,
    aiEntities: {
      location: 'Abnoub / Asyut Governorate, Upper Egypt',
      coreDeficit: 'Groundwater Contamination from Broken Cesspools & Structural Damage',
      vulnerableGroup: 'Low-Income Upper Egypt Rural Families',
      recommendedIntervention: 'Decentralized Sewage Treatment Plant & Sealed Pipeline Grid',
      sentiment: 'Urgent Sanitation Crisis',
      confidence: 0.98
    },
    milestones: [
      { step: 'WhatsApp Civic Bot Ingestion with Photo Evidence', date: '2026-08-24 08:10', done: true },
      { step: 'AI Arabic NLP Triage: High Structural Risk', date: '2026-08-24 08:12', done: true },
      { step: 'Demographic Deficit Filter (MPI: 0.35, Health Deficit: 82%)', date: '2026-08-24 08:15', done: true },
      { step: 'Decent Life (Hayah Karima) & NDB Co-Financing Approved', date: '2026-08-24 13:00', done: true },
      { step: 'Contractor Excavation & Pipeline Laying', date: 'In Progress', done: false }
    ]
  },

  // UAE (Ras Al Khaimah)
  {
    id: 'BRICS-UAE-2026-9015',
    countryId: 'AE',
    districtId: 'AE-RAK-MT',
    districtName: 'Hajar Mountain Foothills (Ras Al Khaimah)',
    channel: 'voice',
    language: 'Arabic / English (العربية)',
    citizenName: 'Sultan Al-Shehhi',
    citizenAnonHash: 'dpi:ae:eid-anon:19af8830',
    timestamp: '2026-08-23 15:40:00',
    originalText: 'خلال مواسم الأمطار المفاجئة في الجبال، تؤدي السيول الجارفة لقطع الطرق وعزل المزارع التراثية. نحتاج إلى سدود ذكية لتجميع مياه الأمطار ومحطة تحلية بالطاقة الشمسية لري مزارع النخيل واستدامتها.',
    translatedText: 'During flash mountain rains, torrential runoff cuts mountain roads and isolates heritage farms. We need smart rainwater retention check-dams and solar micro-desalination for sustainable date palm farm irrigation.',
    sector: 'Clean Water & Sanitation',
    lat: 25.7200,
    lng: 56.0500,
    urgencyScore: 7.2,
    impactScore: 7.8,
    signaturesCount: 780,
    status: 'POLICY_SHORTLISTED',
    budgetEstimatedUSD: 950000,
    aiEntities: {
      location: 'Wadi Bih / Hajar Mountains, RAK',
      coreDeficit: 'Flash Flood Road Washouts & Aquifer Salinization',
      vulnerableGroup: 'Mountain Agricultural Communities',
      recommendedIntervention: 'Cascading Smart Flood Retention Dams + Solar Desalination',
      sentiment: 'Proactive Innovation Request',
      confidence: 0.97
    },
    milestones: [
      { step: 'Voice Ingestion via UAE National DPG Portal', date: '2026-08-23 15:40', done: true },
      { step: 'AI Arabic/English Dual Extraction', date: '2026-08-23 15:42', done: true },
      { step: 'Green Transition & Climate Resilience Tagged', date: '2026-08-23 15:45', done: true },
      { step: 'Ministry of Climate Change & Environment Review', date: 'In Progress', done: false }
    ]
  }
];
