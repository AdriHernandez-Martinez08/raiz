<div align="center">

# 🌿 Raíz Protocol
### *Decentralized Attestation & AI Oracle Infrastructure for Agricultural Provenance, Fair Escrow & Real-World Assets (RWA) on Stellar & Soroban*

[![License: MIT](https://img.shields.io/badge/License-MIT-emerald.svg)](./LICENSE)
[![Stellar: Built on Soroban](https://img.shields.io/badge/Stellar-Soroban%20%7C%20Horizon-black.svg?logo=stellar)](https://stellar.org)
[![Trustless Work: Escrow Infrastructure](https://img.shields.io/badge/Escrow-Trustless%20Work%20Audited-blueviolet.svg)](https://trustlesswork.com)
[![Institution: TecNM Campus Tlaxiaco](https://img.shields.io/badge/Development-TecNM%20Tlaxiaco-b45309.svg)](http://tlaxiaco.tecnm.mx/)
[![Status: MVP v1.2.0](https://img.shields.io/badge/Status-Validated%20MVP%20v1.2.0-success.svg)]()

<p align="center">
  <b>Open-source decentralized public goods infrastructure on Stellar: Connecting unbanked smallholder coffee growers and indigenous artisans from Tlaxiaco, Oaxaca with global ethical buyers through verifiable on-chain attestations.</b>
  <br>
  <i>Designed and engineered by indigenous Computer Systems Engineering student-researchers at <b>Instituto Tecnológico de Tlaxiaco (Oaxaca, Mexico)</b></i>
</p>

[Overview](#-overview) • [The 3 Core Pains Solved](#-the-3-core-pains-solved-in-tlaxiaco) • [User Journey](#-user-journey-map) • [Ecosystem Stack](#-stellar-ecosystem-stack-divide-and-conquer) • [Quickstart](#-quickstart) • [Documentation Center](#-documentation-center)

---

</div>

## 📌 Overview

**Raíz** is a decentralized protocol for **Traceability, Visibility, and Verifiable Provenance (RWA)** built on the **Stellar Network** and **Soroban Smart Contracts**.

Born in the mountainous Mixteca Highlands of Oaxaca (**Heroica Ciudad de Tlaxiaco, Santa María Yucuhiti, and San Cristóbal Amoltepec**), Raíz solves the digital and economic exclusion of specialty coffee smallholders and backstrap-loom textile artisans through an **Offline-First PWA** powered by voice recognition in their native language (*Tu'un Savi* / Mixteco).

> **Territorial Scope of the MVP:**  
> Phase 1 is **strictly focused and validated in Tlaxiaco, Oaxaca**. Cross-border regional expansion across Latin America represents Phase 2 of our research roadmap.

---

## 🎯 The 3 Core Pains Solved in Tlaxiaco

Directly validated through field research by TecNM student teams with 50+ local producers and artisans:

1. **Commercial Invisibility:** Smallholders and artisans lack direct channels to showcase and sell their harvests and ancestral textiles outside their remote villages.
2. **Intermediary Exploitation (*Coyotaje*):** Predatory middlemen purchase crops at up to 70% below market value. Original creators receive zero royalties when their lots are resold with substantial margins.
3. **Counterfeiting & Lack of Certified Provenance:** The lack of a tamper-proof audit trail for specialty coffee cup scores and handcrafted weaving processes allows industrial counterfeiters to misappropriate indigenous designs and commercial coffee to be masqueraded as single-origin specialty microlots.

---

## 🗺️ User Journey Map

How do Don Juan (a 65-year-old coffee farmer) and an ethical international roaster interact through Raíz?

```text
┌───────────────────────────┐       ┌───────────────────────────┐       ┌───────────────────────────┐
│  1. PARCEL (OFFLINE EDGE) │       │  2. MUNICIPAL DISPATCH    │       │   3. BUYER SETTLEMENT     │
│  - Don Juan presses voice │ ────> │  - SyncEngine anchors     │ ────> │  - Roaster scans QR label │
│  - Speaks Mixteco/Spanish │       │    SHA-256 hash on Soroban│       │  - Locks USDC in          │
│  - Stored in IndexedDB    │       │  - Prints physical Hang-  │       │    Trustless Work Escrow  │
│  - Zero seed phrases      │       │    Tag QR label           │       │  - SPEI off-ramp to farmer│
└───────────────────────────┘       └───────────────────────────┘       └───────────────────────────┘
```

> **Detailed Technical Sequence Diagram (Mermaid):**  
> 👉 [View the End-to-End Sequence Diagram in docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md#-2-end-to-end-user-and-system-interaction-sequence-diagram)

---

## 🤝 Stellar Ecosystem Stack ("Divide and Conquer")

Following the engineering principle of integrating audited ecosystem building blocks rather than reinventing the wheel:

* **🤝 [Trustless Work](https://trustlesswork.com):** Multi-milestone decentralized smart contract escrow on Soroban. Releases a 30% advance payment upon origin attestation and the remaining 70% upon physical cooperative delivery ([ADR-001](./docs/adr/ADR-001-TRUSTLESS-WORK-ESCROW.md)).
* **⛓️ [Stellar Network & Soroban](https://stellar.org):** Immutable lot passports (`LotPassport.rs`), tamper-proof provenance schemas (`AttestationRegistry.rs`), and sub-cent transaction finality ($0.00001 USD).
* **🎙️ [PWA Web Audio & Gemini AI](https://ai.google.dev):** Keyboardless interface with speech-to-text for *Tu'un Savi* and rural Spanish—built on open W3C Progressive Web App standards with zero dependence on proprietary messaging platforms ([ADR-002](./docs/adr/ADR-002-OFFLINE-FIRST-PWA-AND-RURAL-IDENTITY.md)).
* **💳 [Etherfuse](https://etherfuse.com):** Direct fiat off-ramping (MXNe / SPEI) to financial inclusion debit cards (Banco del Bienestar / Finabien).

---

## 🚀 Quickstart

Clone, install, and launch Raíz locally in 3 commands:

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

### Quality Assurance & Automated Verification:
```bash
# Run the complete test suite (34+ automated tests)
npm run test

# Compile production bundle
npm run build
```

---

## 📚 Documentation Center

In-depth technical architecture and research documentation are organized modularly in [`docs/`](./docs/README.md):

* **[Validated MVP Specification (Tlaxiaco)](./docs/MVP_SPECIFICATION.md):** 3 core pillars, field acceptance criteria, and operational metrics.
* **[System Architecture Document](./docs/ARCHITECTURE.md):** 5-layer architectural diagram, design patterns, and cryptographic flow.
* **[Architecture Decision Records (ADRs)](./docs/adr/):**
  * [ADR-001: Trustless Work Escrow Adoption](./docs/adr/ADR-001-TRUSTLESS-WORK-ESCROW.md)
  * [ADR-002: Offline-First PWA & Zero-Seed Rural Identity Standards](./docs/adr/ADR-002-OFFLINE-FIRST-PWA-AND-RURAL-IDENTITY.md)
* **[Contributor & Student Guide](./CONTRIBUTING.md):** Step-by-step workflow for claiming issues, submitting Pull Requests, and earning Drips funding.
* **[Field Research & Usability](./docs/research/):** Interviews and usability audit reports from San Pablo Tijaltepec, Santa María Yucuhiti, and San Juan Ñumí.
* **[Full Documentation Index](./docs/README.md):** Table of contents for all technical and academic resources.

---

## 👥 Academic Governance & Team

* **Institution:** Instituto Tecnológico de Tlaxiaco (TecNM - Oaxaca, Mexico).
* **Department:** Computer Systems Engineering.
* **Project Leadership:** Prof. Jose Alfredo Roman Cruz & Nayeli (Student Lead).
* **Community:** Student-researchers at Open Hub TecNM Campus Tlaxiaco.
* **License:** [MIT Open Source](./LICENSE).
