<div align="center">

# 🌿 Raíz Protocol
### *Decentralized Attestation & AI Oracle Infrastructure for Agricultural Provenance, Fair Escrow & Real-World Assets (RWA) on Stellar & Soroban*

[![License: MIT](https://img.shields.io/badge/License-MIT-emerald.svg)](./LICENSE)
[![Stellar: Built on Soroban](https://img.shields.io/badge/Stellar-Soroban%20%7C%20Horizon-black.svg?logo=stellar)](https://stellar.org)
[![Escrow: Trustless Work Standard](https://img.shields.io/badge/Escrow-Trustless%20Work%20ADR--001-blueviolet.svg)](https://trustlesswork.com)
[![Institution: TecNM Campus Tlaxiaco](https://img.shields.io/badge/Development-TecNM%20Tlaxiaco-b45309.svg)](http://tlaxiaco.tecnm.mx/)
[![Tests: 79 Passing](https://img.shields.io/badge/Tests-79%20Passing%20(0%20Failures)-success.svg)]()

<p align="center">
  <b>Open-source decentralized public goods infrastructure on Stellar: Connecting unbanked smallholder coffee growers, beekeepers, and indigenous artisans from the Mixteca region of Oaxaca with global ethical buyers through verifiable on-chain attestations.</b>
  <br>
  <i>Researched, designed, and engineered by indigenous Computer Systems Engineering student-researchers at <b>Instituto Tecnológico de Tlaxiaco (Oaxaca, Mexico)</b></i>
</p>

[Overview](#-overview) • [Empirical Field Research](#-the-empirical-field-research-moat) • [Architecture & Engineering Status](#-engineering-status-what-is-live-vs-sandbox-simulation) • [Unified Settlement Stack](#-unified-3-tier-settlement-architecture) • [Quickstart](#-quickstart) • [Documentation Center](#-documentation-center)

---

</div>

## 📌 Overview

**Raíz** is an open-source decentralized protocol for **Traceability, Visibility, and Verifiable Provenance (RWA)** built on the **Stellar Network** and **Soroban Smart Contracts**.

Conceived in the mountainous Mixteca Highlands of Oaxaca (**Heroica Ciudad de Tlaxiaco, San José Xochixtlán, San Pablo Tijaltepec, San Juan Mixtepec, San Juan Ñumí, and San Antonio Nduaxico**), Raíz eliminates digital and financial exclusion for smallholders and ancestral artisans through an **Offline-First PWA** operated by voice in their native language (*Tu'un Savi* / Mixteco).

---

## 🌾 The Empirical Field Research Moat

The foundational pillar of Raíz is not code generated in isolation, but **rigorous empirical field research** conducted on territory by student engineering brigades from TecNM Campus Tlaxiaco. This represents the irreplaceable human moat of the project:

### 1. In-Depth Field Interviews & Usability Audits (15 Individual Profiles + 3 Collectives)
* **San Juan Ñumí (Honey):** The [Ñumí Honey Union Interviews](./docs/research/entrevista_union_miel_san_juan_numi.md) with Union President Rogelio Martínez and Inventory Head Guadalupe Ramírez form a textbook software requirements gathering case study on rural inventory desynchronization and cooperative trust.
* **San Antonio Nduaxico (Tomato):** [Josué Gerardo Sanjuan](./docs/research/field-interviews/entrevista-02-josue-jitomate-nduaxico.md) documents the extreme vulnerability of perishable crops with a **maximum 5-day shelf life**, where buyers exploit urgency to impose sub-cost prices.
* **San Juan Mixtepec (Palm Weaving):** [Doña Juana (68 years old)](./docs/ux-testing/TEST_02_MIXTEPEC_PALMA_UX.md) weaves fine palm hats for 3 weeks, paid at $60–$80 MXN by middlemen and resold at $450+ MXN in urban tourist centers.
* **San Pablo Tijaltepec (Embroidery):** [Doña Francisca (64 years old)](./docs/ux-testing/TIJALTEPEC_FRICTION_AUDIT.md) demonstrates the impact of industrial machine knockoffs devaluing 6–9 months of ancestral needlework.
* **San José Xochixtlán (Triqui Textile):** [Doña Reyna (56 years old)](./docs/research/HITO_1.1_VALIDACION_CAMPO.md) on backstrap loom huipiles facing arbitrary buyer price deductions upon delivery.
* **Tlaxiaco (Fiber Crafts):** [Doña Felipa Hopilito (62 years old)](./docs/research/field-interviews/entrevista-03-felipa-hopilito-tlaxiaco.md) documents market space exclusion and informal street vending challenges.
* **Tlaxiaco / Amoltepec (Traditional Wood-Fired Bakery):** [Guadalupe Avendaño](./docs/research/field-interviews/cemitas-amoltepec-guadalupe-avendano/ENTREVISTA-01-doña-rosa-amoltepec.md) on climate vulnerabilities and lack of generational workforce turnover.

### 2. Scientific Nuance: The Counter-Example of Doña Mercedes Cruz
Demonstrating field authenticity over contrived marketing, [Mercedes Cruz (5th generation chocolate artisan)](./docs/research/field-interviews/entrevista-01-mercedes-cruz/INTERVIEW-SUMMARY.md) documented that **she does not suffer from predatory middlemen**, having established direct-to-consumer and restaurant channels over 30 years of reputation. This critical finding proves that **direct sales and certified provenance are precisely the structural solution needed** to liberate vulnerable producers from the middleman trap.

---

## ⚖️ Engineering Status: What is Live vs. Sandbox Simulation

To ensure complete transparency before technical reviewers from **Stellar Development Foundation (SDF)** and **Drips Network**:

| Subsystem | Current State | Technical Implementation Detail |
| :--- | :---: | :--- |
| **Progressive Web App (PWA)** | 🟢 **LIVE** | 100% functional React 19 + TypeScript client, installable on Android/iOS with service workers. |
| **Offline-First Resilience** | 🟢 **LIVE** | ACID transactional queue in browser `IndexedDB`. Records voice, GPS, and lots without cell signal and auto-syncs upon reconnection. |
| **Acoustic Voice Engine** | 🟢 **LIVE** | 24kbps Opus compression via W3C Web Audio API with semantic parsing for Spanish and *Tu'un Savi* (Mixteco). |
| **Elder Accessibility UI** | 🟢 **LIVE** | "Modo Abuelo" interface with 112px touch targets, high-contrast outdoor theme, zero complex typing. |
| **Cryptographic Digest Engine** | 🟢 **LIVE** | Canonical SHA-256 Community Digest calculation and Ed25519 signature verification (`CryptoEngine.ts`). |
| **Physical Hang-Tag QR Labels** | 🟢 **LIVE** | Dynamic SVG ISO/IEC 18004 generation linking physical sacks/crafts to digital passport hashes. |
| **Soroban Blockchain Adapter** | 🟡 **SANDBOX** | `SorobanAdapter.ts` currently runs in a **Testnet Mock Sandbox mode** (emitting structured cryptographic receipts `stx_...` and mock ledger sequence numbers while smart contract RPC integrations undergo Testnet hardening). |
| **Smart Contracts (Rust/Soroban)** | 🟡 **COMPILED** | Smart contract source code is complete in `/contracts` (`lot_passport`, `fair_escrow`, `attestation_registry`, `perpetual_royalties`) with passing unit tests (`cargo test`), preparing for formal Testnet deployment and security audit. |
| **Trustless Work Escrow** | 🟡 **SANDBOX** | Escrow logic follows the audited [ADR-001 Trustless Work specification](./docs/adr/ADR-001-TRUSTLESS-WORK-ESCROW.md), simulated in client runtime for 30% origin advance / 70% delivery release prior to on-chain deployment. |

---

## 💳 Unified 3-Tier Settlement Architecture

To resolve ambiguity between on-chain escrow, off-ramps, and cash distribution:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ TIER 1: ON-CHAIN ESCROW CUSTODY (Soroban Smart Contract)                    │
│ Buyer locks funds in USDC using the Trustless Work milestone standard:     │
│  • Milestone 1 (30%): Disbursed upon origin attestation verification.       │
│  • Milestone 2 (70%): Disbursed upon physical delivery confirmation.        │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ TIER 2: LAST-MILE PARCEL CASH NETWORK (MicoPay Community Nodes)            │
│ For unbanked indigenous elders with zero bank accounts:                      │
│ Local cooperatives and certified transport drivers disburse physical cash   │
│ in parcel/depot upon verifying the hang-tag QR attestation.                 │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ TIER 3: REGULATED FIAT BANKING RAILS (Etherfuse SPEI / MoneyGram Access)    │
│ For banked producers, cooperatives, and commercial entities:               │
│ Atomic conversion from USDC to local currency (MXNe via Etherfuse SPEI,     │
│ cash pickup via MoneyGram Stellar Access, or Banco del Bienestar debit).    │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 🚀 Quickstart

Clone, install, and run Raíz locally:

```bash
# 1. Clone the repository
git clone https://github.com/Open-Hub-Tec/raiz.git
cd raiz

# 2. Install dependencies
npm install

# 3. Launch local development server
npm run dev
```

Open your browser at `http://localhost:3000`.

### Verification & Quality Assurance:
```bash
# Run the complete test suite (79 automated tests, 0 failures)
npm run test

# Compile production bundle
npm run build
```

---

## 📚 Documentation Center

Technical architecture, field evidence, and academic standards are organized modularly in [`docs/`](./docs/README.md):

* **[Architecture Document](./docs/ARCHITECTURE.md):** 5-layer decoupled architecture, sequence diagrams, and cryptographic verification flow.
* **[ADR-001: Trustless Work Escrow](./docs/adr/ADR-001-TRUSTLESS-WORK-ESCROW.md):** Milestone custody specification and rationale.
* **[ADR-002: Offline-First PWA & Rural Identity](./docs/adr/ADR-002-OFFLINE-FIRST-PWA-AND-RURAL-IDENTITY.md):** W3C PWA standards vs. proprietary messaging platforms.
* **[SEP-XXXX Attestation Draft](./docs/standards/SEP_RWA_ATTESTATION_DRAFT.md):** Verifiable RWA Attestation Standard proposed for Soroban.
* **[Field Research Dossier](./docs/research/):** Complete field interviews, transcripts, audio recordings, and pain-point validations (Hito 1.1).
* **[UX Usability Testing](./docs/ux-testing/):** Timed field tests with indigenous elders and friction audit reports (Hito 1.2).

---

## 👥 Academic Governance & Team

* **Institution:** Instituto Tecnológico de Tlaxiaco (TecNM - Oaxaca, Mexico).
* **Department:** Ingeniería en Sistemas Computacionales.
* **Faculty Advisor:** Mtro. José Alfredo Román Cruz.
* **Student Research Fellows:** Open Hub TecNM Campus Tlaxiaco.
* **License:** [MIT Open Source](./LICENSE).
