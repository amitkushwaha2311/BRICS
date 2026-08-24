/**
 * BRICS Digital Public Goods (DPG) & Frugal Solutions Repository
 * Cross-border proven engineering architectures and open-source DPI blueprints.
 */

export const DPG_SOLUTIONS = [
  {
    id: 'DPG-01-WATER',
    title: 'IoT Telemetry & Solar Deep-Well Microgrid (Jal-Jeevan Architecture)',
    originCountry: 'India 🇮🇳',
    category: 'Clean Water & Sanitation',
    applicableTo: ['South Africa 🇿🇦', 'Ethiopia 🇪🇹', 'Brazil 🇧🇷', 'Egypt 🇪🇬'],
    readinessLevel: 'TRL-9 (Nationally Deployed)',
    license: 'Apache 2.0 / Open DPG',
    summary: 'Automated solar-powered submersible pumps integrated with low-cost LoRaWAN/NB-IoT water pressure sensors, digital water ATM kiosks, and differential privacy telemetry.',
    impactMetrics: {
      costReductionPct: 62,
      deliveryTimeMonths: 4,
      avgBeneficiariesPerUnit: 4500,
      carbonOffsetTonnesPerYr: 180
    },
    techStack: 'Open Source IoT Firmware, Rust MQTT Broker, Solar MPPT Controller, IndiaStack Aadhaar/Fayda Anon Auth'
  },
  {
    id: 'DPG-02-POWER',
    title: 'Decentralized Township Solar Battery Micro-Utility (Favela / Township Stack)',
    originCountry: 'Brazil 🇧🇷 & South Africa 🇿🇦',
    category: 'Renewable Grid & Power',
    applicableTo: ['India 🇮🇳', 'Ethiopia 🇪🇹', 'Egypt 🇪🇬'],
    readinessLevel: 'TRL-8 (Multi-City Pilot)',
    license: 'MIT / Open DPG',
    summary: 'P2P solar micro-grid trading protocol with smart prepaid metering and battery bank resilience for informal settlements with zero grid stability.',
    impactMetrics: {
      costReductionPct: 54,
      deliveryTimeMonths: 6,
      avgBeneficiariesPerUnit: 12000,
      carbonOffsetTonnesPerYr: 840
    },
    techStack: 'Beckn Protocol Extension, Modbus Inverter Telemetry, Pix/UPI Micro-Transactions'
  },
  {
    id: 'DPG-03-TRANSIT',
    title: 'Prefabricated Flood-Resilient Modular Suspension & Arch Bridges (Welisizwe Blueprint)',
    originCountry: 'South Africa 🇿🇦 & India 🇮🇳',
    category: 'Rural Roadways & Freight',
    applicableTo: ['Russia 🇷🇺', 'Brazil 🇧🇷', 'Ethiopia 🇪🇹'],
    readinessLevel: 'TRL-9 (Field Deployed)',
    license: 'CERN Open Hardware License',
    summary: 'Rapid-assembly composite steel and geotextile pedestrian and light-vehicular bridges built in under 45 days over impassable swollen monsoon rivers.',
    impactMetrics: {
      costReductionPct: 70,
      deliveryTimeMonths: 1.5,
      avgBeneficiariesPerUnit: 8000,
      carbonOffsetTonnesPerYr: 95
    },
    techStack: 'Modular Hot-Dip Galvanized Steel, Anchor Rock Bolts, Open Drone Photogrammetry'
  },
  {
    id: 'DPG-04-TELEHEALTH',
    title: 'Riverine & High-Altitude Solar Telehealth Diagnostic Capsule (Tapajós / Arctic Model)',
    originCountry: 'Brazil 🇧🇷 & Russia 🇷🇺',
    category: 'Healthcare Clinics',
    applicableTo: ['India 🇮🇳', 'South Africa 🇿🇦', 'Ethiopia 🇪🇹'],
    readinessLevel: 'TRL-8 (Proven)',
    license: 'GPL v3.0 / DPG Alliance',
    summary: 'Off-grid solar telemedicine container equipped with point-of-care ultrasound, ECG, AI retinoid screening, and satellite uplink for remote triage.',
    impactMetrics: {
      costReductionPct: 58,
      deliveryTimeMonths: 3,
      avgBeneficiariesPerUnit: 15000,
      carbonOffsetTonnesPerYr: 120
    },
    techStack: 'WebRTC Low-Bandwidth Streaming, Edge AI Diagnostic Models, Satellite LEO Link'
  },
  {
    id: 'DPG-05-AGROLOGISTICS',
    title: 'Beidou/NavIC Cold Chain Telemetry & Decentralized Solar Evaporative Chillers',
    originCountry: 'China 🇨🇳 & India 🇮🇳',
    category: 'Agro-Logistics & Cold Chains',
    applicableTo: ['Egypt 🇪🇬', 'Ethiopia 🇪🇹', 'Brazil 🇧🇷', 'South Africa 🇿🇦'],
    readinessLevel: 'TRL-9 (Mass Production)',
    license: 'Apache 2.0',
    summary: 'Zero-freon phase-change material cold storage rooms powered by rooftop PV with automated route optimization for smallholder mountain farms.',
    impactMetrics: {
      costReductionPct: 48,
      deliveryTimeMonths: 2.5,
      avgBeneficiariesPerUnit: 6000,
      carbonOffsetTonnesPerYr: 310
    },
    techStack: 'Beidou Satellite IoT, Zero-GWP Thermal Battery, Beckn Open Network for Logistics'
  }
];
