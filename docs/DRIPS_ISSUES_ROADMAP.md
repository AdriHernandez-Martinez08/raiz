# 💧 Raíz Protocol: Decentralized Attestation & AI Oracle Roadmap

This document outlines the modular engineering tasks for developers, open-source contributors, and TecNM engineering students funded through the **Stellar Community Fund & Drips Network**.

Raíz is architected as an **RWA Attestation & AI Oracle Protocol on Stellar & Soroban**, decoupling rural edge capture, autonomous verification, smart contract escrow, and multi-anchor financial settlement.

---

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        RAÍZ ATTESTATION PROTOCOL DEPENDENCY GRAPH                      │
├─────────────────────────┬──────────────────────────┬───────────────────────────────────┤
│ LAYER 1: DID & IAM      │ LAYER 2: AI ORACLES      │ LAYER 4: SOROBAN ATTESTATIONS     │
├─────────────────────────┼──────────────────────────┼───────────────────────────────────┤
│ [US-101] #18            │ [US-201] #21             │ [US-401] #26                      │
│ Passwordless OTP DID    │ Offline ACID Buffer      │ FairEscrow Attestation Gate       │
│                         │                          │                                   │
│ [US-102] #19            │ [US-202] #22             │ [US-402] #27                      │
│ Physical QR Identity    │ Acoustic Voice Oracle    │ Perpetual Royalties & Tequio      │
│                         │                          │                                   │
│ [US-103] #20            │ [US-203] #23             │ [US-403] #28                      │
│ Gasless Account Relayer │ RWA Vector QR Hang-Tag   │ Verifiable Registry Showcase      │
└─────────────────────────┴──────────────────────────┴───────────────────────────────────┘
```

---

## 🟢 SPRINT 1: RURAL IDENTITY & INVISIBLE WEB3 WALLET (OCT 5 – OCT 18, 2026)

### 📌 Issue #18: `[US-101]` Decentralized Identity (DID): Passwordless Producer Authentication & Session Attestation via WhatsApp/SMS OTP
* **Target Component:** `src/core/auth/RaizAuthEngine.ts` & `src/components/RaizAuthModal.tsx`
* **Labels:** `drips-eligible`, `identity`, `authentication`, `phase-1`
* **Estimated Effort:** 200 USDC / Drips Tier 1 (1–2 days)
* **Goal:** Enables rural farmers to access the protocol via standard Mexican mobile numbers (+52) with zero seed phrases or passwords, generating a verifiable session attestation.

### 📌 Issue #19: `[US-102]` Physical Attestation Credential: NFC & QR Community Identity Cards for Elderly Producers
* **Target Component:** `src/core/auth/RaizAuthEngine.ts` (Method: `qr_card`)
* **Labels:** `drips-eligible`, `hardware`, `identity`, `elder-mode`, `phase-1`
* **Estimated Effort:** 250 USDC / Drips Tier 1 (2–3 days)
* **Goal:** Provides physical cryptographic laminated identity cards for illiterate and elder producers (60+ years old) in the Mixteca Highlands.

### 📌 Issue #20: `[US-103]` Account Abstraction & Fee-Bump Relay: Autonomous Keypair Management & Gas Sponsorship on Stellar
* **Target Component:** `src/core/crypto/CryptoEngine.ts` & Fee-Bump Relay
* **Labels:** `drips-eligible`, `stellar`, `account-abstraction`, `soroban`, `phase-1`
* **Estimated Effort:** 350 USDC / Drips Tier 2 (3–4 days)
* **Goal:** Automatically derives Stellar Ed25519 keypairs and sponsors 100% of network fees using Stellar CAP-0015 Fee-Bump transactions.

---

## 🟡 SPRINT 2: OFFLINE ATTESTATIONS & INDIGENOUS VOICE AI (OCT 19 – NOV 01, 2026)

### 📌 Issue #21: `[US-201]` Offline-First Attestation Buffer: ACID IndexedDB Persistence & Cryptographic Batch Sync for Mountain Fields
* **Target Component:** `src/utils/offlineStorage.ts` & `src/core/sync/SyncEngine.ts`
* **Labels:** `drips-eligible`, `offline-first`, `indexeddb`, `sync`, `phase-2`
* **Estimated Effort:** 350 USDC / Drips Tier 2 (3–5 days)
* **Goal:** Guarantees zero data loss in disconnected mountain microclimates through an ACID transactional outbox in IndexedDB with auto-sync on network reconnect.

### 📌 Issue #22: `[US-202]` AI Voice Oracle: Acoustic Indigenous Speech-to-Attestation in Tu'un Savi (Mixtec) & Rural Spanish
* **Target Component:** `src/core/ai/RaizAIOracles.ts` (`AIVoiceOracle`)
* **Labels:** `drips-eligible`, `ai-oracle`, `tuun-savi`, `multimodal-ai`, `phase-2`
* **Estimated Effort:** 400 USDC / Drips Tier 3 (4–5 days)
* **Goal:** Uses acoustic machine learning and 24kbps Opus compression to parse oral harvest registrations in Mixtec (*Tu'un Savi*) and Spanish into on-chain cryptographic manifests.

### 📌 Issue #23: `[US-203]` Cryptographic Physical-to-Digital Twin: ISO/IEC 18004 Vector Hang-Tag QR Anchor for Agricultural Lots
* **Target Component:** `src/components/ArtisanQrTagModal.tsx` & `src/utils/qrCodeGenerator.ts`
* **Labels:** `drips-eligible`, `qr-tag`, `rwa`, `traceability`, `phase-2`
* **Estimated Effort:** 250 USDC / Drips Tier 1 (2–3 days)
* **Goal:** Generates pure SVG high-contrast vector hang-tags for physical coffee sacks and artisan garments, linking physical commodities to the Stellar ledger.

---

## 🟣 SPRINT 3: DUAL PAYMENT ORCHESTRATION IN MEXICO (NOV 02 – NOV 15, 2026)

### 📌 Issue #24: `[US-301]` Multi-Anchor Settlement Rail: Direct SPEI Fiat Payout via Etherfuse & MXNe Banxico Integration
* **Target Component:** `src/core/payments/PaymentOrchestrator.ts` & `src/components/MyPaymentsModal.tsx`
* **Labels:** `drips-eligible`, `payments`, `spei`, `etherfuse`, `mexico`, `phase-3`
* **Estimated Effort:** 450 USDC / Drips Tier 3 (4–6 days)
* **Goal:** Converts international buyer USDC into Mexican Pesos (MXN) via Etherfuse and issues direct Banxico SPEI wire transfers to Banco del Bienestar debit cards.

### 📌 Issue #25: `[US-302]` Decentralized Cash-Out Rail: MicoPay Weighing Scale Liquidity Gateway for Unbanked Producers
* **Target Component:** `src/core/payments/PaymentOrchestrator.ts` & Weighing Scale Terminal
* **Labels:** `drips-eligible`, `payments`, `cash-out`, `micopay`, `rural`, `phase-3`
* **Estimated Effort:** 400 USDC / Drips Tier 3 (3–5 days)
* **Goal:** Enables unbanked producers to receive instant cash vouchers at the physical cooperative scale upon verified crop weigh-in.

---

## 🔵 SPRINT 4: SOROBAN SMART CONTRACTS & ATTESTATION ENGINE (NOV 16 – NOV 22, 2026)

### 📌 Issue #26: `[US-401]` Soroban Smart Contract: FairEscrow with On-Chain Attestation Verification (Quality & EUDR Gates)
* **Target Component:** `contracts/fair_escrow/src/lib.rs`
* **Labels:** `drips-eligible`, `soroban`, `smart-contracts`, `escrow`, `attestations`, `phase-4`
* **Estimated Effort:** 500 USDC / Drips Tier 4 (5–7 days)
* **Goal:** Implements a trustless Soroban escrow contract that verifies SCAA Quality (>85 pts) and EUDR Zero-Deforestation attestations before releasing purchase funds.

### 📌 Issue #27: `[US-402]` Soroban Smart Contract: Perpetual Royalties & Tequio Fund (Automated 10% Secondary Resale Distribution)
* **Target Component:** `contracts/perpetual_royalties/src/lib.rs`
* **Labels:** `drips-eligible`, `soroban`, `royalties`, `textiles`, `governance`, `phase-4`
* **Estimated Effort:** 450 USDC / Drips Tier 3 (4–5 days)
* **Goal:** Enforces a perpetual 10% resale royalty to female artisans on secondary market trades and routes 2% to municipal infrastructure funds (*Tequio Comunal*).

### 📌 Issue #28: `[US-403]` Protocol Registry & Consumer SDK: Verifiable Credential Showcase & B2B Buyer Settlement Portal
* **Target Component:** `src/components/BuyerShowcaseScreen.tsx` & `@raiz-protocol/sdk`
* **Labels:** `drips-eligible`, `sdk`, `b2b-portal`, `showcase`, `phase-4`
* **Estimated Effort:** 350 USDC / Drips Tier 2 (3–4 days)
* **Goal:** Connects specialty roasters, European importers, and ethical restaurants directly with certified communities through verifiable on-chain audits.

---

## 🔴 FINAL PHASE: PRODUCTION FIELD PILOT & RELEASE (NOV 23 – DEC 01, 2026)

### 📌 Issue #29: `[US-501]` Production Validation: 15-Producer Field Test in the Mixteca Highlands & Protocol v1.0.0 Genesis Release
* **Target Communities:** Tlaxiaco, San Pablo Tijaltepec, Santa María Yucuhiti, San Mateo Peñasco
* **Labels:** `drips-eligible`, `field-test`, `community-validation`, `production-release`, `phase-5`
* **Estimated Effort:** 600 USDC / Drips Tier 4 (7–10 days)
* **Goal:** Validates the end-to-end Attestation Protocol in real field conditions with 15 live indigenous producers across coffee, honey, and textiles, publishing the official Production Release v1.0.0.
