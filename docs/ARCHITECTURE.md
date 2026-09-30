# 🏛️ Especificación de Arquitectura de Raíz Protocol
### *Arquitectura de Software y Protocolo Descentralizado en Stellar & Soroban*

* **Ecosistema:** Stellar Network / Soroban / Drips Network / TecNM Campus Tlaxiaco
* **Diseño Arquitectónico:** Offline-First, Event-Driven, Decoupled Adapter Pattern
* **Documentos de Decisión Asociados:** [ADR-001 (Trustless Work)](./adr/ADR-001-TRUSTLESS-WORK-ESCROW.md), [ADR-002 (Canales Rurales)](./adr/ADR-002-COMMUNICATION-CHANNELS-AND-WHATSAPP-ALTERNATIVES.md)

---

## 📐 1. Diagrama General de Capas del Sistema

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        CAPA 1: CLIENTE MÓVIL Y ACCESIBILIDAD                           │
│  - Progressive Web App (PWA) Offline-First (React 19 + Tailwind CSS)                   │
│  - Interfaz "Modo Abuelo": Botones táctiles gigantes (112px) y cero texto complejo     │
│  - Web Audio API: Grabación y normalización acústica (24kbps Opus)                     │
│  - Autenticación Zero-Seed: Carnet QR Físico Comunitario y OTP SMS                     │
└───────────────────────────────────────────┬────────────────────────────────────────────┘
                                            │
                                            ▼
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                      CAPA 2: NÚCLEO DE DOMINIO Y RESILIENCIA OFFLINE                   │
│  - Offline Storage Outbox: IndexedDB (ACID transaccional sin internet)                 │
│  - SyncEngine: Sincronización criptográfica reactiva al detectar conectividad          │
│  - CryptoEngine: Cálculo de Community Digest SHA-256 canónico y llaves Ed25519         │
│  - QR Engine: Generación vectorial SVG ISO/IEC 18004 para etiquetas Hang-Tag           │
└───────────────────────────────────────────┬────────────────────────────────────────────┘
                                            │
                                            ▼
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                      CAPA 3: ORÁCULOS DE IA Y ATESTACIONES (RWA)                       │
│  - AIVoiceOracle: Normalización acústica y extracción semántica (Mixteco / Español)    │
│  - AIQualityOracle: Evaluación sensorial SCAA (>85 pts) y patrimonio artesanal maestro │
│  - AIEUDRSatelliteOracle: Geocercado Sentinel-2 para cumplimiento anti-deforestación   │
│  - Attestation Registry: Emisión de credenciales verificables tipo EAS para Stellar    │
└───────────────────────────────────────────┬────────────────────────────────────────────┘
                                            │
                                            ▼
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                   CAPA 4: CONTRATOS INTELIGENTES EN SOROBAN (STELLAR)                  │
│  ┌─────────────────────────┐ ┌─────────────────────────┐ ┌──────────────────────────┐ │
│  │   lot_passport (Rust)   │ │ attestation_registry(RS)│ │  TRUSTLESS WORK ESCROW   │ │
│  │ Identidad inmutable del │ │ Esquemas y validación   │ │ Custodia y liberación por│ │
│  │ lote y origen Tlaxiaco  │ │ descentralizada on-chain│ │ hitos verificables       │ │
│  └─────────────────────────┘ └─────────────────────────┘ └──────────────────────────┘ │
└───────────────────────────────────────────┬────────────────────────────────────────────┘
                                            │
                                            ▼
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                       CAPA 5: RIELES DE LIQUIDACIÓN Y ÚLTIMA MILLA                     │
│  - Etherfuse Anchor: Conversión atómica USDC -> MXNe -> Transferencias SPEI Banxico    │
│  - Cuentas de Inclusión: Banco del Bienestar, Finabien y Cajas Populares de la Mixteca  │
│  - Red de transporte y nodos locales de efectivo para campesinos no bancarizados       │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 🔄 2. Diagrama de Secuencia de Interacción de Usuario y del Sistema (End-to-End)

El siguiente diagrama detalla la secuencia completa de eventos e interacciones de los tres actores humanos (**Productor**, **Comprador Institucional** y **Cooperativa de Tlaxiaco**) con el software cliente, el almacenamiento offline, el anclaje en Stellar y el contrato de custodia de **Trustless Work**:

```mermaid
sequenceDiagram
    autonumber
    actor Productor as 🌾 Productor / Artesana<br/>(Don Juan - Yucuhiti)
    participant PWA as 📱 Raíz PWA Client<br/>(Offline-First)
    participant Storage as 💾 IndexedDB Outbox<br/>(Almacenamiento Local)
    participant Sync as 🔄 Sync & Crypto Engine<br/>(SHA-256 / Ed25519)
    participant Soroban as ⛓️ Stellar / Soroban<br/>(LotPassport & Attestation)
    actor Comprador as ☕ Comprador B2B / Tostador<br/>(Specialty Coffee SMB)
    participant TW as 🤝 Trustless Work Escrow<br/>(Milestone-based Soroban)
    actor Coop as 🏛️ Cooperativa Tlaxiaco<br/>(Árbitro / Validador)
    participant Payout as 💳 Rieles de Pago<br/>(Etherfuse SPEI / Efectivo)

    %% FASE 1: REGISTRO OFFLINE EN PARCELA
    Note over Productor,Storage: FASE 1: Registro en Parcela (100% Offline en Tlaxiaco)
    Productor->>PWA: 1. Presiona botón gigante de micrófono y habla en Mixteco o Español
    PWA->>PWA: 2. Web Audio API graba Opus a 24kbps y extrae datos de cosecha (kilos, variedad)
    PWA->>Storage: 3. Guarda lote y audio de voz en IndexedDB (cero pérdida de datos sin señal)
    PWA-->>Productor: 4. Muestra confirmación visual amigable y folio provisional (MX-2026-CAFE-01)

    %% FASE 2: SINCRONIZACIÓN AL DETECTAR RED
    Note over Storage,Soroban: FASE 2: Sincronización y Anclaje Criptográfico en Stellar
    PWA->>Sync: 5. Detecta conexión a Internet (WiFi comunitaria o datos al volver al pueblo)
    Sync->>Storage: 6. Lee lote pendiente de la Outbox local
    Sync->>Sync: 7. Genera Community Digest SHA-256 canónico y firma Ed25519
    Sync->>Soroban: 8. Invoca lot_passport::register_lot(digest, productor, coords)
    Soroban-->>Sync: 9. Emite comprobante inmutable (Tx Hash y Ledger Number en Stellar)
    Sync->>Storage: 10. Actualiza estado local del lote a 'ANCLADO_ON_CHAIN'
    PWA-->>Productor: 11. Genera etiqueta Hang-Tag física con código QR (ISO/IEC 18004)

    %% FASE 3: FONDEO EN TRUSTLESS WORK ESCROW
    Note over Comprador,TW: FASE 3: Negociación y Fondeo en Escrow (Trustless Work)
    Comprador->>PWA: 12. Escanea código QR y visualiza Pasaporte Digital del Lote
    Comprador->>TW: 13. initialize_escrow(buyer, producer, coop_tlaxiaco, 1500 USDC)
    Comprador->>TW: 14. deposit_funds(1500 USDC en custodia inteligente Soroban)
    TW-->>TW: 15. Contrato bloquea fondos (30% Hito 1: Origen / 70% Hito 2: Entrega)

    %% FASE 4: LIBERACIÓN DE HITOS Y ENTREGA FÍSICA
    Note over TW,Payout: FASE 4: Verificación de Hitos y Liquidación de Fondos
    Sync->>TW: 16. submit_milestone_proof(Hito 1: Atestación de Origen Raíz verificada)
    TW->>Payout: 17. Libera 30% de anticipo ($450 USDC) directamente al Productor
    Productor->>Coop: 18. Entrega sacos de café físicos en el Centro de Acopio de Tlaxiaco
    Coop->>PWA: 19. Escanea QR del saco y coteja calidad física y número de costales
    Coop->>TW: 20. submit_milestone_proof(Hito 2: Recepción Física Aprobada)
    TW->>Payout: 21. Libera 70% de liquidación final ($1,050 USDC)
    Payout-->>Productor: 22. Depósito en Banco del Bienestar (SPEI MXN) o red de efectivo local
    TW-->>Comprador: 23. Transfiere la propiedad digital inmutable del lote certificado
```

### Desglose de Fases de la Secuencia:

1. **Fase 1 (Parcela 100% Offline):** Don Juan se encuentra en las montañas de Santa María Yucuhiti sin cobertura celular. Abre la PWA de Raíz, presiona el botón gigante de micrófono (112px ergonómico), habla en *Tu'un Savi* (Mixteco) y la app almacena localmente el audio y los metadatos en IndexedDB.
2. **Fase 2 (Anclaje en Stellar al volver al pueblo):** Al llegar a un punto con señal o WiFi en Tlaxiaco, el `SyncEngine` procesa la outbox, calcula el digest SHA-256 e interactúa con los contratos Soroban de Stellar, emitiendo la etiqueta física con código QR para el saco de café.
3. **Fase 3 (Fondeo B2B con Trustless Work):** El comprador institucional en Europa o CDMX escanea el QR, revisa la prueba de origen y calidad, y deposita 1,500 USDC en el contrato de custodia de **Trustless Work** sobre Soroban.
4. **Fase 4 (Liquidación por Hitos y Entrega):** El productor recibe un anticipo del 30% ($450 USDC) garantizado por la atestación de origen. Al entregar los sacos en la cooperativa de Tlaxiaco, el árbitro comunal confirma la recepción física y el contrato de Trustless Work libera automáticamente el 70% restante ($1,050 USDC) vía SPEI hacia su tarjeta del Banco del Bienestar.

---

## 📂 3. Estructura de Directorios del Repositorio (Mapeo Técnico)

Para facilitar la incorporación de colaboradores y estudiantes del TecNM, el monorepo organiza sus responsabilidades de forma modular:

```text
raiz/
├── contracts/                     # Contratos inteligentes en Rust para Soroban
│   ├── attestation_registry/      # Registro de esquemas y atestaciones de origen
│   ├── lot_passport/              # Pasaporte digital inmutable de cosechas
│   ├── perpetual_royalties/       # Motor de regalías para artesanas (8% / 2%)
│   └── fair_escrow/               # Implementación base de custodia comunitaria
├── docs/                          # Documentación arquitectónica y de campo
│   ├── adr/                       # Architecture Decision Records (ADR-001, ADR-002)
│   ├── MVP_SPECIFICATION.md       # Especificación estricta del MVP para Tlaxiaco
│   ├── ARCHITECTURE.md            # Este documento de arquitectura
│   └── research/                  # Reportes de investigación de campo en Tlaxiaco
├── src/
│   ├── components/                # Componentes React de UI (PWA / Modo Abuelo)
│   │   ├── ChatScreen.tsx         # Interfaz conversacional y registro por voz
│   │   ├── DigitalPassportScreen.tsx # Visualizador público del Pasaporte Digital
│   │   ├── ArtisanQrTagModal.tsx  # Generador de etiquetas físicas QR (Hang-Tag)
│   │   └── TopAppBar.tsx          # Cabecera principal con selector de roles
│   ├── core/                      # Lógica de dominio pura (desacoplada de UI)
│   │   ├── ai/                    # Oráculos de IA (Voz, Calidad SCAA, Satélite EUDR)
│   │   ├── auth/                  # Motor de identidad Zero-Seed y carnet QR
│   │   ├── blockchain/            # Adaptadores Soroban y Trustless Work Escrow
│   │   ├── crypto/                # Generación de SHA-256 canónico y firmas
│   │   ├── settlement/            # Orquestador de liquidación híbrida (Etherfuse/SPEI)
│   │   └── sync/                  # Motor de sincronización offline (IndexedDB)
│   └── tests/                     # Suite completa de pruebas unitarias y de sistema
└── drips.config.json              # Configuración de splits para financiamiento Drips
```

---

## 🔒 3. Integración con Trustless Work

Siguiendo el estándar fijado en el [ADR-001](./adr/ADR-001-TRUSTLESS-WORK-ESCROW.md), el protocolo no reinventa contratos de custodia de fondos, sino que consume la infraestructura de **Trustless Work** a través de la clase `TrustlessWorkEscrowAdapter`:

1. **Depósito:** El comprador institucional deposita USDC o MXNe en el contrato de Trustless Work.
2. **Hito 1 (Anticipo de Cosecha - 30%):** Se libera automáticamente cuando el smart contract verifica la atestación de origen emitida por Raíz en Tlaxiaco (`0x01_ORIGIN`).
3. **Hito 2 (Liquidación Final - 70%):** Se libera cuando la cooperativa de Tlaxiaco emite la atestación física de recepción (`0x04_DELIVERY`).
4. **Arbitraje:** Si el café presenta discrepancia de humedad o peso, la cooperativa comunitaria actúa como árbitro predefinido en Trustless Work para mediar.

---

## 📡 4. Política de Canales y Resiliencia Offline

Siguiendo el [ADR-002](./adr/ADR-002-COMMUNICATION-CHANNELS-AND-WHATSAPP-ALTERNATIVES.md):
* El canal primario es una **Progressive Web App (PWA)** estándar W3C, eliminando la dependencia de WhatsApp, los costos de la API de Meta y las restricciones de conectividad en montaña.
* Los datos se persisten en **IndexedDB** localmente y se transfieren a Stellar en lotes atómicos criptográficos cuando el dispositivo detecta conexión.
