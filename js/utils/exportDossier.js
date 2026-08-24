/**
 * BRICS Policy Memorandum & NDB Project Charter Exporter
 * Generates formatted policy dossiers in Markdown & printable executive briefs.
 */

export function exportNDBDossier(projectData, countryMeta) {
  const dateStr = new Date().toISOString().split('T')[0];
  const markdownContent = `# BRICS NEW DEVELOPMENT BANK (NDB) & NATIONAL TREASURY
## PROJECT INVESTMENT MEMORANDUM & DIGITAL PUBLIC INFRASTRUCTURE CHARTER
**Document Reference**: NDB-DPI-${projectData.id || '2026-PRIORITY'}
**Target Sovereign State**: ${countryMeta.name} (${countryMeta.flag})
**National Infrastructure Priority Tier**: TIER 1 (Critical Sovereign Need)
**Date of Synthesis**: ${dateStr}

---

### 1. Executive Summary
- **Project Title**: ${projectData.title}
- **Target District/Region**: ${projectData.districtName}
- **Primary Sector**: ${projectData.sector}
- **Estimated Capital Expenditure (CAPEX)**: $${(projectData.estimatedCostUSD / 1000000).toFixed(2)} Million USD (${(projectData.estimatedCostUSD * countryMeta.exchangeToUSD).toLocaleString()} ${countryMeta.currency})
- **Target Direct Beneficiaries**: ${projectData.beneficiaries.toLocaleString()} Citizens
- **Estimated SVI (Social Value of Investment)**: ${projectData.sviMultiplier}x Multiplier
- **Climate & ESG Offset**: ${projectData.carbonOffset}

---

### 2. Grassroots Citizen Urgency & Deficit Synthesis
- **Aggregated Community Petitions**: ${projectData.supportingPetitionsCount.toLocaleString()} Verified DPI Submissions
- **Average Grassroots Urgency Score**: ${projectData.urgencyScore} / 10.0
- **Identified Critical Bottleneck**: ${projectData.coreProblem}
- **Demographic Vulnerability Profile**: Multidimensional Poverty Index (MPI): ${projectData.mpiScore}, Rural Density: ${projectData.ruralPct}%

---

### 3. Proposed Engineering & DPI Technical Architecture
${projectData.technicalArchitecture}

- **Recommended Open DPG Blueprint**: ${projectData.dpgReference}
- **Estimated Time to Commission**: ${projectData.timeframeMonths} Months

---

### 4. Co-Financing & Sovereign Debt Structure
- **NDB Concessional Loan (Green/DPI Facility)**: 65% ($${((projectData.estimatedCostUSD * 0.65) / 1000000).toFixed(2)}M)
- **National Sovereign Infrastructure Fund**: 25% ($${((projectData.estimatedCostUSD * 0.25) / 1000000).toFixed(2)}M)
- **Private Sector / Municipal Bonds**: 10% ($${((projectData.estimatedCostUSD * 0.10) / 1000000).toFixed(2)}M)

---

### 5. Citizen Verification & Milestone Audit Matrix
1. **Milestone 1**: Hydrogeological/LiDAR Structural Survey & Open Public Tender (Month 1-2)
2. **Milestone 2**: Civil Works Execution & Smart IoT Sensor Deployment (Month 3-5)
3. **Milestone 3**: Citizen Closed-Loop Drone & Biometric Satisfaction Verification (Month 6)

*Generated autonomously via BRICS InfraPulse AI Engine.*
`;

  // Download Markdown file
  const blob = new Blob([markdownContent], { type: 'text/markdown;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `NDB_Investment_Brief_${projectData.id || 'BRICS'}_${dateStr}.md`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
