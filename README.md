<div align="center">

# 🌿 Raíz Protocol
### *The Decentralized Attestation & AI Oracle Infrastructure for Real-World Assets (RWA) and Agricultural Provenance on Stellar & Soroban*

[![License: MIT](https://img.shields.io/badge/License-MIT-emerald.svg)](https://opensource.org/licenses/MIT)
[![Raíz CI Quality & Integrity Gate](https://github.com/Open-Hub-Tec/raiz/actions/workflows/ci.yml/badge.svg)](https://github.com/Open-Hub-Tec/raiz/actions/workflows/ci.yml)
[![Stellar: Built on Horizon & Soroban](https://img.shields.io/badge/Stellar-Soroban%20%7C%20Horizon-black.svg?logo=stellar)](https://stellar.org)
[![Attestations: RWA Verifiable Claims](https://img.shields.io/badge/Attestations-EAS--Equivalent%20on%20Soroban-blueviolet.svg)]()
[![Drips: Verified Public Good](https://img.shields.io/badge/Drips-Funded%20Public%20Good-blueviolet.svg)](https://www.drips.network/)
[![Institution: TecNM Campus Tlaxiaco](https://img.shields.io/badge/Development-TecNM%20Tlaxiaco-b45309.svg)](http://tlaxiaco.tecnm.mx/)
[![Status: Production Ready v1.2.0](https://img.shields.io/badge/Status-Active%20Protocol%20v1.2.0-success.svg)]()

<p align="center">
  <b>Pioneering open public goods infrastructure on Stellar: Connecting unbanked smallholders, indigenous artisans, and cooperatives with global ethical markets through verifiable on-chain attestations.</b>
  <br>
  <i>Conceived and engineered by indigenous Computer Systems Engineering student-researchers at <b>Instituto Tecnológico de Tlaxiaco (Oaxaca, Mexico)</b></i>
</p>

[Architecture](#-protocol-architecture) • [Attestation Engine](#-the-rwa-attestation-engine-eas-for-stellar) • [Autonomous AI Oracles](#-the-4-autonomous-ai-oracles) • [Soroban Smart Contracts](#-soroban-smart-contracts) • [Hybrid Settlement](#-multi-anchor-hybrid-settlement-rails) • [Universal SDK](#-developer-sdk-raiz-protocolsdk) • [Roadmap](#-delivery-roadmap--milestones) • [Academic Team](#-team--governance)

---

</div>

## 📌 Executive Summary

**Raíz** is an open-source, decentralized **Real-World Asset (RWA) Attestation and Settlement Protocol** built natively for the **Stellar Network** and **Soroban Smart Contracts**.

While previous agtech solutions rely on centralized databases or generic marketplaces, Raíz functions as a **sovereign base-layer protocol**. It provides an immutable **Attestation Engine** (comparable to Ethereum Attestation Service / EAS, purpose-built for Soroban) combined with **4 Autonomous AI Oracles** to solve the four existential challenges of smallholder agriculture and indigenous craftsmanship:

1. **Information Asymmetry & Exploitation (*Coyotaje*):** Intermediaries buy specialty coffee and artisan textiles at up to 75% below market rate due to a lack of certified lab provenance.
2. **Regulatory Barriers (EUDR):** Smallholders face complete exclusion from European and international markets without verifiable proof of zero-deforestation under the EU Deforestation Regulation.
3. **Severe Digital & Linguistic Exclusion:** Over 80% of producers in the Mixteca Highlands are elderly speakers of indigenous languages (*Tu'un Savi* / Mixteco) unable to use seed-phrase crypto wallets or complex web apps.
4. **Last-Mile Banking Absence:** Commercial banks do not exist in rural mountain settlements, requiring atomic off-ramps into local credit unions, Banco del Bienestar debit cards, and cash-at-scale terminals.

---

## 🏛️ Protocol Architecture

Raíz decouples raw data collection from on-chain verification, ensuring high-throughput, gas-subsidized, and offline-resilient execution:

```
┌─────────────────────────────────────────────────────────────────────────────────────────────┐
│                          1. EDGE CAPTURE & ZERO-SEED IDENTITY                               │
│  - Oral Voice Input in Tu'un Savi (Mixteco) & Rural Spanish                                 │
│  - Passwordless DID: WhatsApp/SMS OTP + Offline Physical Community QR Cards                 │
│  - 100% Offline ACID Outbox (IndexedDB) with automatic cryptographic batch sync             │
└──────────────────────────────────────────────┬──────────────────────────────────────────────┘
                                               │ Encrypted Payload (Opus Audio + Metadata)
┌──────────────────────────────────────────────▼──────────────────────────────────────────────┐
│                              2. RAÍZ AUTONOMOUS AI ORACLES                                  │
│  ┌───────────────────────┐ ┌───────────────────────┐ ┌────────────────────────────────────┐ │
│  │     AIVoiceOracle     │ │   AIQualityOracle     │ │       AIEUDRSatelliteOracle        │ │
│  │ Acoustic Normalization│ │ SCAA Grade & Heritage │ │  Copernicus Sentinel-2 Geofencing  │ │
│  │ Tu'un Savi -> JSON    │ │  >85 pts Specialty    │ │  Zero Deforestation Post-2020      │ │
│  └───────────────────────┘ └───────────────────────┘ └────────────────────────────────────┘ │
│                                      │                                                      │
│                        Signed Attestation Digest (Ed25519)                                  │
└──────────────────────────────────────┬──────────────────────────────────────────────────────┘
                                       │
┌──────────────────────────────────────▼──────────────────────────────────────────────────────┐
│                    3. RAÍZ ATTESTATION ENGINE (EAS FOR STELLAR SOROBAN)                     │
│  - On-Chain Schema Registry (`AttestationRegistry.rs`)                                      │
│  - Verifiable Claims: SCAA Quality, EUDR Compliance, Ancestral Origin, Physical Weight       │
│  - Cryptographic Community Digest SHA-256 anchored on the Stellar Ledger                    │
└──────────────────────────────────────┬──────────────────────────────────────────────────────┘
                                       │ Verified Conditions Met
┌──────────────────────────────────────▼──────────────────────────────────────────────────────┐
│                         4. SOROBAN SMART CONTRACT EXECUTION                                 │
│  - `FairEscrow.rs`: Trustless funds lockup conditioned on physical weighing attestation     │
│  - `PerpetualRoyalties.rs`: 10% automated secondary resale royalty to female artisans       │
│  - `CommunalTequio.rs`: 2% collective community infrastructure development fund             │
└──────────────────────────────────────┬──────────────────────────────────────────────────────┘
                                       │ Atomic Payout Trigger
┌──────────────────────────────────────▼──────────────────────────────────────────────────────┐
│                        5. MULTI-ANCHOR HYBRID SETTLEMENT RAILS                              │
│  - Mexico: Etherfuse (MXNe / SPEI) -> Banco del Bienestar Debit Cards                       │
│  - Mexico Rural Field: MicoPay Cash Terminal -> Physical Weighing Scale Cash-out            │
│  - Bolivia: Polar Anchor -> ASFI QR Simple Instant Interbank Settlement                     │
│  - Brazil: Banco Central do Brasil PIX Anchor -> 24/7 Real Payout                           │
└─────────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 📜 The RWA Attestation Engine (EAS for Stellar)

On Ethereum, the **Ethereum Attestation Service (EAS)** established a universal standard for issuing, verifying, and revoking on-chain and off-chain claims. 

**Raíz introduces the first dedicated RWA Attestation Engine designed specifically for Soroban**, defining four canonical schemas that transform agricultural harvests and ancestral textiles into audit-ready Real World Assets:

### Canonical Attestation Schemas

| Schema UID | Name | Description | Issuing Oracle / Entity | Verification Gate |
| :--- | :--- | :--- | :--- | :--- |
| `0x01_SCAA` | **`SCAAQualityAttestation`** | Specialty coffee cup score (>85 pts), moisture percentage (10-12%), defect count. | `AIQualityOracle` + Certified Q-Grader | Required for export premium pricing |
| `0x02_EUDR` | **`EUDRDeforestationAttestation`** | Geofence polygon verification against Sentinel-2 multispectral baseline (post-2020). | `AIEUDRSatelliteOracle` | Mandatory for European port customs clearance |
| `0x03_ORIG` | **`IndigenousProvenanceAttestation`** | Ancestral iconography validation, natural dye signature, municipal communal land title. | `AIVoiceOracle` + Local Agrarian Assembly | Unlocks Cultural Heritage NFT & origin stamp |
| `0x04_WGHT` | **`PhysicalDeliveryAttestation`** | Physical sack count, gross/tare weight, and acoustic acceptance confirmation. | Certified Weighmaster + MicoPay Terminal | Releases Escrow liquidity to the farmer |

### Attestation Lifecycle on Soroban

```rust
pub struct Attestation {
    pub schema_uid: BytesN<32>,
    pub recipient: Address,
    pub issuer: Address,
    pub payload_hash: BytesN<32>,
    pub expiration_time: u64,
    pub revoked: bool,
    pub signature: BytesN<64>,
}
```

Every attestation is registered on-chain with state TTL management, allowing external dApps, trade finance protocols, and roasters to run `verify_attestation()` in a single transaction.

---

## 🧠 The 4 Autonomous AI Oracles

### 1. `AIVoiceOracle` (Acoustic Indigenous Speech-to-Attestation)
Eliminates keyboard literacy barriers for speakers of indigenous languages:
- **Speech Ingestion:** Captures 24kbps Opus compressed audio in **Tu'un Savi (Mixteco)**, **Zapoteco**, and rural Spanish.
- **Phonetic & Semantic Normalization:** Translates rural terminology (*"Kuni yu kiti 120 kilos café"* -> `Product: Specialty Coffee, Quantity: 120kg, Variety: Typica, Community: Tijaltepec`).
- **Cryptographic Digest:** Generates a deterministic SHA-256 voice fingerprint anchored directly to the batch manifest.

### 2. `AIQualityOracle` (Computer Vision & SCAA Sensory Attestation)
- **Computer Vision Model:** Analyzes micro-photos of parchment grains, moisture meters, and foliar health.
- **Scoring Engine:** Calculates Specialty Coffee Association of America (SCAA) score. Lots above 85 points receive an automatic **Export Quality Attestation**.
- **Artisan Textiles:** Verifies backstrap loom warp/weft density and authenticates natural dye signatures (*grana cochinilla*, wild indigo / *añil*), protecting indigenous intellectual property from mass-market industrial counterfeits.

### 3. `AIEUDRSatelliteOracle` (EU Deforestation Regulation Compliance)
- **Geofence Matching:** Takes parcel GPS boundary coordinates and timestamps.
- **Multispectral Comparison:** Queries European Space Agency (ESA) Copernicus Sentinel-2 satellite imagery to cross-reference canopy cover against the December 31, 2020 cutoff date.
- **Automated Certification:** Issues a legally compliant EUDR digital attestation with QR auditability for customs authorities in Rotterdam, Hamburg, and Antwerp.

### 4. `AISettlementSolver` (Multi-Anchor Payment Routing Engine)
- Solves liquidity bottlenecks by analyzing real-time gas fees, FX spreads, and physical cash availability.
- Dynamically routes liquidity between **Etherfuse SPEI (Mexico)**, **MicoPay Cash-at-Scale (Mixteca)**, **Polar QR Simple (Bolivia)**, and **PIX (Brazil)** with zero transaction fees charged to the farmer.

---

## ⚙️ Soroban Smart Contracts

The protocol features a suite of high-performance, audited Soroban smart contracts written in Rust:

### 1. `LotPassport.rs`
Stores the canonical registry of agricultural and artisanal lots, linking physical QR tags to on-chain attestations, acoustic fingerprints, and custody changes.

### 2. `FairEscrow.rs`
- Locks buyer liquidity (USDC/EURC/MXNe) upon purchase order issuance.
- Enforces strict anti-coyote price guardrails (e.g., minimum $90 MXN/kg for certified specialty coffee vs. $35 MXN offered by predatory intermediaries).
- Releases funds atomically only when a valid `PhysicalDeliveryAttestation` is signed by the cooperative weighmaster.

### 3. `PerpetualRoyalties.rs`
Solves the historic exploitation of indigenous women artisans by encoding an immutable **10% perpetual royalty** on every secondary market resale of backstrap loom textiles, with an additional **2% allocated directly to the municipal community assembly (*Tequio Comunal*)** for public works (water wells, rural roads).

---

## 💳 Multi-Anchor Hybrid Settlement Rails

Producers choose how they receive their earnings with zero platform cuts:

| Country | Anchor Provider | Local Settlement Rail | Delivery Mechanism |
| :--- | :--- | :--- | :--- |
| **Mexico** | **Etherfuse** | **SPEI (Banxico)** | Direct wire transfer to Banco del Bienestar debit cards |
| **Mexico (Rural)** | **MicoPay** | **Physical Cash Voucher** | Immediate cash handout at the cooperative weighing scale |
| **Bolivia** | **Polar** | **QR Simple ASFI** | Instant QR bank transfer in Bolivianos (BOB) |
| **Brazil** | **PIX Anchor** | **Banco Central PIX** | Instant 24/7 settlement in Brazilian Reais (BRL) |

---

## 💻 Developer SDK (`@raiz-protocol/sdk`)

Third-party cooperatives, agtech platforms, and exporter dashboards can consume the protocol directly:

```typescript
import { RaizProtocolSDK } from '@raiz-protocol/sdk';

// 1. Initialize client with gas sponsorship
const raiz = new RaizProtocolSDK({
  network: 'stellar-mainnet',
  sponsorGas: true
});

// 2. Parse indigenous audio testimonial into canonical structure
const voiceManifest = raiz.ai.processVoiceLot(
  "Kuni yu kiti 120 kilos café de altura",
  "tuun_savi"
);

// 3. Request Computer Vision SCAA Attestation
const qualityAttestation = raiz.ai.assessQuality({
  productType: 'coffee',
  humidityPercent: 11.2,
  samplePhotos: ['https://storage.raiz.org/samples/lot-984.jpg']
});

// 4. Verify EUDR Zero-Deforestation Compliance
const eudrCertificate = raiz.ai.verifyEUDRCompliance([
  [-97.6834, 17.0345],
  [-97.6820, 17.0350],
  [-97.6815, 17.0335]
]);

// 5. Verify Attestation on Soroban
const isValid = await raiz.attestations.verify({
  schemaUid: '0x01_SCAA',
  attestationHash: qualityAttestation.attestationHash
});

console.log('Attestation Verified on Stellar:', isValid);
```

---

## 🗺️ Delivery Roadmap & Milestones

The project is executed by TecNM engineering teams targeting **Production Release on December 1, 2026**:

- **GitHub Project Board:** [https://github.com/orgs/Open-Hub-Tec/projects/1](https://github.com/orgs/Open-Hub-Tec/projects/1)
- **Gantt Roadmap View:** [https://github.com/orgs/Open-Hub-Tec/projects/1/views/2](https://github.com/orgs/Open-Hub-Tec/projects/1/views/2)
- **Sprint Kanban:** [https://github.com/orgs/Open-Hub-Tec/projects/1/views/3](https://github.com/orgs/Open-Hub-Tec/projects/1/views/3)

```
[Sprint 1: Rural Identity & Invisible Web3]  Oct 5 - Oct 18, 2026
  ├── #18: DID Passwordless OTP Authentication (WhatsApp/SMS)
  ├── #19: Physical NFC/QR Community Identity Cards
  └── #20: Account Abstraction & Gasless Stellar Paymaster Relay

[Sprint 2: Offline Attestations & Voice AI]  Oct 19 - Nov 01, 2026
  ├── #21: ACID Offline Outbox Buffer in IndexedDB
  ├── #22: AIVoiceOracle: Acoustic Speech-to-Attestation in Tu'un Savi
  └── #23: Physical-to-Digital Twin: ISO/IEC 18004 Vector Hang-Tag QR

[Sprint 3: Dual Payment Orchestration]       Nov 02 - Nov 15, 2026
  ├── #24: Etherfuse SPEI Direct Banking Rail (Banco del Bienestar)
  └── #25: MicoPay Cash Terminal at Physical Weighing Scales

[Sprint 4: Soroban Smart Contracts]          Nov 16 - Nov 22, 2026
  ├── #26: FairEscrow with On-Chain Attestation Verification Gate
  ├── #27: Perpetual Royalties & Tequio Fund Smart Contract
  └── #28: Verifiable Showcase & Direct Restaurant Settlement Portal

[Final Phase: Production Field Pilot]       Nov 23 - Dec 01, 2026
  └── #29: Mixteca Pilot with 15 Producers & Production v1.0.0 Release
```

---

## 👥 Team & Governance

### Core Engineering & Research Team
- **José Alfredo (Lead Architect & Maintainer):** Systems Engineer & Researcher at Open Hub TecNM.
- **Undergraduate Engineering Residents (TecNM Tlaxiaco):** Native indigenous students from Mixteca municipalities (*Ñuu Savi*) responsible for acoustic language models, field validations, and Soroban contract deployment.

### Institutional Backing
- **Instituto Tecnológico de Tlaxiaco (TecNM):** Academic and institutional research cradle.
- **Stellar Community Fund (SCF) & Drips Protocol:** Continuous public goods funding alignment.

---

<div align="center">
  <sub>Built with radical empathy and technological sovereignty in the Mixteca Highlands of Oaxaca.</sub>
  <br>
  <sub>Licensed under the <b>MIT License</b>. 2026 Raíz Protocol Contributors.</sub>
</div>
