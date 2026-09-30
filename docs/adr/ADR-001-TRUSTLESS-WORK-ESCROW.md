# Architecture Decision Record (ADR-001)
## Adopción de Trustless Work como Infraestructura Estándar de Escrow en Soroban

* **Estado:** Aprobado / Implementado
* **Fecha:** Septiembre 2026
* **Decisores:** Equipo de Arquitectura Raíz Protocol, TecNM Campus Tlaxiaco
* **Contexto:** Validación con Alberto Chaves (Tech Rebel / Trustless Work) y Brandon (Stellar Ecosystem)

---

### 1. Contexto y Problema
En el modelo comercial de Raíz para productores agrícolas y artesanas de Tlaxiaco (Oaxaca), los compradores institucionales (tostadurías de café de especialidad, boutiques de moda ética, cooperativas) necesitan depositar fondos en garantía antes del envío de la cosecha o de las piezas textiles. El pago debe liberarse únicamente cuando se cumplan hitos verificables del mundo real:
1. Certificación de origen y calidad (atestación criptográfica).
2. Entrega física del lote verificada por la cooperativa o nodo local.

Inicialmente se contempló escribir un contrato de *FairEscrow* propio desde cero. Sin embargo, desarrollar, auditar formalmente y mantener un contrato de custodia de fondos propio incrementa drásticamente el riesgo de vulnerabilidades de seguridad, duplica esfuerzos en el ecosistema Stellar y distrae al equipo del verdadero valor del MVP: **la trazabilidad, visibilidad y origen verificable de las cosechas**.

---

### 2. Decisión
**Adoptar la infraestructura de contratos inteligentes de Trustless Work sobre Soroban (`@trustlesswork/sdk`) como el motor oficial de escrow condicionado de Raíz Protocol.**

Trustless Work proporciona:
* Contratos inteligentes de escrow auditados y probados en producción en la red Stellar / Soroban.
* Arquitectura basada en tres partes:
  * **Client (Comprador):** Deposita los fondos (USDC, EURC o activos Stellar).
  * **Service Provider / Producer (Productor/Artesana de Tlaxiaco):** Ejecuta la producción y entrega del lote.
  * **Approver / Arbitrator (Árbitro / Cooperativa Comunitaria):** Valida los hitos en caso de controversia o firma la liberación con base en la atestación de Raíz.
* Modelo de hitos (*milestones*): Los fondos se desbloquean paso a paso contra atestaciones digitales inmutables (`LotPassport` + `AttestationRegistry`).

---

### 3. Diagrama de Integración

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                                   RAÍZ PROTOCOL                                        │
│  - Captura en parcela (Tlaxiaco, Oaxaca)                                               │
│  - Atestación de Origen & Calidad (Community Digest SHA-256)                           │
│  - Pasaporte Digital del Lote (QR Code)                                                │
└───────────────────────────────────────────┬────────────────────────────────────────────┘
                                            │
                             Evento: Atestación de Hito Válida
                                            │
                                            ▼
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        TRUSTLESS WORK ESCROW (SOROBAN)                                 │
│  ┌──────────────────────────────────────────────────────────────────────────────────┐  │
│  │ 1. initialize_escrow(buyer, producer, approver, amount, milestones)             │  │
│  │ 2. deposit_funds(asset: USDC/MXNe)                                               │  │
│  │ 3. submit_milestone_proof(milestone_id, raiz_attestation_uid)                    │  │
│  │ 4. release_milestone_payment(milestone_id) -> Transferencia al Productor         │  │
│  └──────────────────────────────────────────────────────────────────────────────────┘  │
└───────────────────────────────────────────┬────────────────────────────────────────────┘
                                            │
                                            ▼
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                         LIQUIDACIÓN FIAT DE ÚLTIMA MILLA                               │
│  - Etherfuse SPEI (Banco del Bienestar / Cajas Populares de Oaxaca)                    │
│  - Red de transporte y liquidez comunitaria local                                      │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

### 4. Consecuencias

#### Positivas:
* **Seguridad y Auditoría:** Se delega la custodia financiera en contratos estandarizados y auditados del ecosistema Stellar.
* **Velocidad de Salida al Mercado:** El MVP se enfoca al 100% en la captura de campo, trazabilidad y visibilidad en Tlaxiaco.
* **Interoperabilidad:** Cualquier cliente o marketplace que ya use Trustless Work puede liquidar órdenes de café y artesanías de Tlaxiaco sin fricción.
* **Resolución Descentralizada de Conflictos:** Si un saco de café sufre merma en el transporte, la cooperativa comunitaria actúa como árbitro legítimo preconfigurado en el escrow.

#### Negativas / Mitigaciones:
* **Dependencia de Interfaz:** Si el contrato de Trustless Work actualiza sus interfaces Soroban, Raíz debe mantener actualizado el adaptador (`TrustlessWorkEscrowAdapter.ts`).
  * *Mitigación:* Se implementa un patrón adaptador desacoplado con pruebas automatizadas continuas.
