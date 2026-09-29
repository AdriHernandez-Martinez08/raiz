# Raíz Infrastructure Protocol Specification (v1.2.0)
## Decentralized RWA Commodity Layer, Autonomous AI Oracles & Multi-Anchor Settlement on Stellar

[![Raíz CI Quality & Integrity Gate](https://github.com/Open-Hub-Tec/raiz/actions/workflows/ci.yml/badge.svg)](https://github.com/Open-Hub-Tec/raiz/actions/workflows/ci.yml)
[![Open-Hub-Tec](https://img.shields.io/badge/TecNM-Tlaxiaco-blue)](https://github.com/Open-Hub-Tec)
[![Stellar](https://img.shields.io/badge/Blockchain-Stellar%20Soroban-black)](https://stellar.org)
[![Drips](https://img.shields.io/badge/Funding-Drips%20Eligible-green)](https://drips.network)

---

## 1. Overview & Architectural Vision

**Raíz** is an open-source decentralized infrastructure protocol built on **Stellar & Soroban**. It connects unbanked indigenous agricultural producers (specialty coffee, organic honey) and female textile artisans (backstrap loom weavers) directly with global specialty markets, DeFi impact pools, and ethical buyers.

Instead of operating as an isolated consumer marketplace, Raíz is architected as an **RWA (Real World Assets) Infrastructure Protocol** that any third-party cooperative, exporter, fintech, or agtech can consume via SDK.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    THIRD-PARTY CONSUMERS / CLIENTS                          │
│  (Coffee Cooperatives, Exporters, Fintechs, Agtechs, Impact Funds)          │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │ consumes via @raiz-protocol/sdk
┌──────────────────────────────────────▼──────────────────────────────────────┐
│                            RAÍZ PROTOCOL STACK                              │
├─────────────────────────────────────────────────────────────────────────────┤
│ 1. RAÍZ IDENTITY LAYER (Zero-Seed-Phrase IAM / DID)                         │
│    - Passwordless rural authentication: WhatsApp/SMS OTP + Community QR     │
│    - Deterministic Stellar account abstraction with gas sponsorship relay   │
├─────────────────────────────────────────────────────────────────────────────┤
│ 2. RAÍZ AUTONOMOUS AI ORACLES                                               │
│    - AIVoiceOracle: Acoustic & Dialect Normalization (Tu'un Savi / Spanish) │
│    - AIQualityOracle: Computer Vision SCAA & Backstrap Loom Attestation    │
│    - AIEUDRSatelliteOracle: EU Deforestation Regulation Geofence Proof      │
│    - AISettlementSolver: Multi-Anchor Path Payment & Liquidity Optimization │
├─────────────────────────────────────────────────────────────────────────────┤
│ 3. RAÍZ RWA SMART CONTRACTS (Soroban / Rust)                                │
│    - LotPassport: Immutable digital passport & proof-of-harvest             │
│    - FairEscrow: Trustless custody conditioned on physical parcel weighing │
│    - PerpetualRoyalties: 10% automated secondary resale to female artisans  │
├─────────────────────────────────────────────────────────────────────────────┤
│ 4. MULTI-ANCHOR HYBRID SETTLEMENT RAILS                                     │
│    - Mexico: Etherfuse (SPEI / MXNe) + MicoPay (Parcel scale cash points)   │
│    - Bolivia: Polar (ASFI QR Simple / BOB)                                  │
│    - Brazil: Banco Central do Brasil PIX (BRL Anchor)                       │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. The 4 Autonomous AI Oracles

### 1. `AIVoiceOracle` (Acoustic Indigenous Voice-to-Contract)
- **Input:** Audio recording or voice transcription in native Mixtec (*Tu'un Savi*), Zapotec, or rural Spanish.
- **Process:** Normalizes colloquial expressions (e.g., *"Kuni yu kiti 120 kilos café"*) into canonical parameters: `productType`, `variety`, `quantity`, `community`, `processType`.
- **Output:** Canonical JSON payload and 64-character SHA-256 digest ready for on-chain anchoring.

### 2. `AIQualityOracle` (RWA Computer Vision & Sensory Attestation)
- **Coffee Evaluation:** Evaluates bean defect counts (SCAA Specialty Standard), moisture level, and uniformity. Lots scoring >85 points are certified as *Specialty Q-Grade (Export)*.
- **Textile Evaluation:** Inspects backstrap loom warp/weft density, natural dye signatures (*grana cochinilla*, *añil*), and ancestral iconography (e.g. San Pablo Tijaltepec), preventing industrial counterfeiting.
- **Output:** Cryptographically signed `attestationHash` registered on Soroban.

### 3. `AIEUDRSatelliteOracle` (EU Deforestation Regulation Compliance)
- **Input:** Farmer parcel GPS polygon and harvest timestamp.
- **Process:** Compares multi-spectral satellite imagery (Copernicus Sentinel-2 & Landsat-9) against the December 31, 2020 deforestation cutoff baseline.
- **Output:** Official EUDR compliance certificate and polygon digest enabling immediate export clearance to European ports.

### 4. `AISettlementSolver` (Multi-Anchor Routing Engine)
- **Process:** Analyzes liquidity, exchange rates, and banking accessibility in real time.
- **Output:** Reroutes international escrow payouts (USDC/EURC) to either:
  - **Etherfuse SPEI:** Instant settlement to Banco del Bienestar debit cards.
  - **MicoPay Cash:** Instant cash voucher at the village cooperative scale.

---

## 3. Developer SDK Integration (`@raiz-protocol/sdk`)

Any developer or cooperative can integrate Raíz infrastructure:

```typescript
import { RaizProtocolSDK } from '@raiz-protocol/sdk';

// 1. Initialize SDK
const raiz = new RaizProtocolSDK({ network: 'stellar-mainnet', sponsorGas: true });

// 2. Parse voice in Mixtec
const voiceLot = raiz.ai.processVoiceLot("Kuni yu kiti 120 kilos café", "tuun_savi");

// 3. Certify Quality
const quality = raiz.ai.assessQuality({ productType: 'coffee' });

// 4. Solve Optimal Settlement Route
const route = raiz.ai.solveRoute(500, 'MX', 'banking_spei');

console.log('Lot Attestation Hash:', quality.attestationHash);
```

---

## 4. Soroban Smart Contracts (Rust)

1. **`LotPassport` (`contracts/lot_passport`)**:
   - Manages digital lifecycle, bag folios, acoustic signatures, and quality attestations.
2. **`FairEscrow` (`contracts/fair_escrow`)**:
   - Locks buyer liquidity until physical delivery and weighing confirmation.
   - Enforces anti-coyote price guardrails, 2% communal tequio funds, and 10% perpetual royalties to female artisans.

---

## 5. Maintained By

**Open Hub TecNM - Instituto Tecnológico de Tlaxiaco**  
Tlaxiaco, Oaxaca, México.  
*Building rural sovereign infrastructure on Stellar.*
