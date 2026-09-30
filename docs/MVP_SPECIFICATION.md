# 🌾 Especificación Oficial del MVP Validable: Raíz Protocol
### *Trazabilidad, Visibilidad y Origen Verificable en Tlaxiaco, Oaxaca*

* **Versión:** 1.2.0 (Release Candidate MVP)
* **Entidad Responsable:** Estudiantes Investigadores y Profesores del TecNM Campus Tlaxiaco
* **Ecosistema:** Stellar Network / Soroban Smart Contracts / Drips Network / Tech Rebel

---

## 🎯 1. Definición del Alcance Estricto del MVP

En alineación con las recomendaciones de los mentores (Alberto Chaves y Brandon), el MVP de Raíz **delimita estrictamente su alcance** para evitar la dispersión de esfuerzos y garantizar una validación contundente en el territorio:

> **Declaración de Misión del MVP:**  
> *"Dotar a los pequeños productores de café y artesanas textiles de la región de Tlaxiaco, Oaxaca, de una herramienta offline-first que garantice la trazabilidad de sus cosechas, la visibilidad comercial de su trabajo y la prueba matemática inmutable de su origen en la blockchain de Stellar."*

El MVP se enfoca en resolver **tres pilares fundamentales**:

```
                       ┌───────────────────────────────────────────────┐
                       │               MVP RAÍZ PROTOCOL               │
                       │             (Tlaxiaco, Oaxaca)                │
                       └───────────────────────┬───────────────────────┘
                                               │
           ┌───────────────────────────────────┼───────────────────────────────────┐
           │                                   │                                   │
           ▼                                   ▼                                   ▼
  1. TRAZABILIDAD                     2. VISIBILIDAD                      3. ORIGEN VERIFICABLE
  - Registro en parcela sin señal     - Pasaporte Digital del Lote        - Hash SHA-256 canónico
  - Voz en Mixteco o Español          - Ficha técnica pública             - Anclaje en Soroban (Stellar)
  - Captura de fotos y kilos          - Código QR físico impreso          - Inmunidad contra coyotaje
```

---

## 📍 2. Territorio y Usuarios Objetivo del Piloto

### A. Territorio de Validación Inicial
* **Municipio Sede:** Heroica Ciudad de Tlaxiaco, Oaxaca, México.
* **Comunidades Piloto:**
  1. **Santa María Yucuhiti:** Zona cafetalera de alta especialidad (1,600 a 2,000 msnm), variedades Typica, Bourbon y Pluma Hidalgo.
  2. **San Cristóbal Amoltepec:** Comunidad artesanal de telar de cintura y bordados tradicionales con tintes naturales.
  3. **San Agustín Tlacotepec:** Colectivo de cafeticultores tradicionales y productores de miel virgen de campanilla.

### B. Los 3 Actores del MVP

| Actor | Quién es | Su interacción con el MVP |
| :--- | :--- | :--- |
| **1. Productor / Artesana** | Campesinos (promedio 62 años, hablantes de Tu'un Savi o español rural). | Hablan por voz o tocan botones gigantes en la PWA para registrar su lote sin escribir contraseñas. Reciben su etiqueta QR física. |
| **2. Cooperativa / Validador Comunitario** | Directivos de la cooperativa de Tlaxiaco o estudiantes residentes del TecNM. | Cotejan la entrega física del lote en el centro de acopio y firman la atestación de recepción. |
| **3. Comprador Institucional (SMB)** | Tostadurías de especialidad e importadores éticos en México, EE.UU. o Europa. | Escanean el QR del lote, inspeccionan la ficha de trazabilidad y depositan en el Escrow de Trustless Work. |

---

## 🛠️ 3. El Flujo de Usuario Paso a Paso (Paso a Paso del MVP)

### Diagrama de Secuencia de Interacción de Usuario y del Sistema

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
    PWA->>PWA: 2. Web Audio API graba Opus a 24kbps y extrae datos de cosecha
    PWA->>Storage: 3. Guarda lote y audio de voz en IndexedDB (cero pérdida de datos)
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

### Paso 1: Captura en Parcela / Taller (Resiliencia 100% Offline)
1. El productor abre la **PWA de Raíz** en su smartphone básico (o acude con un promotor del TecNM).
2. Presiona el botón gigante de micrófono (112px ergonómico) y dicta los datos de su cosecha:  
   *Ejemplo en Mixteco:* `"Kuni yu una kiti café"` / *En Español:* `"120 kilos de café pergamino lavado en Yucuhiti"`.
3. La aplicación almacena el registro localmente en **IndexedDB**, garantizando cero pérdida de datos aunque no haya señal celular en el cafetal.

### Paso 2: Generación del Pasaporte Digital y Anclaje Criptográfico
1. El motor criptográfico (`CryptoEngine.ts`) genera un **Community Digest SHA-256 canónico** vinculando:
   * Código de lote unívoco (`MX-OAX-TLAX-2026-CAFE-01`).
   * Nombre de la familia productora y coordenadas protegidas de la parcela.
   * Variedad botánica, altitud y fecha de cosecha.
2. Al detectar señal de internet (WiFi comunitaria o red móvil al volver al pueblo), el motor de sincronización (`SyncEngine.ts`) ancla el digest en el smart contract `LotPassport` en **Stellar / Soroban**.

### Paso 3: Etiquetado Físico con Código QR (Hang-Tag ISO/IEC 18004)
1. La aplicación genera e imprime una etiqueta física resistente con el código QR vectorizado.
2. El QR se cose directamente al saco de café de yute o a la prenda textil.
3. El código QR contiene la URL pública canónica que apunta al Pasaporte Digital inmutable.

### Paso 4: Verificación Pública y Liquidación Condicionada
1. El comprador (tostador o cliente final) escanea el QR con cualquier teléfono sin instalar apps.
2. Visualiza:
   * Foto y audio en lengua originaria del productor.
   * Puntaje de calidad y certificación de no deforestación.
   * Transacción y bloque verificado en Stellar Horizon/Soroban.
3. El pago se ejecuta a través del contrato de custodia de **Trustless Work**, liberando el dinero directamente a la cuenta o billetera del campesino sin intermediarios usureros.

---

## 📊 4. Métricas de Éxito del MVP (Validación en Campo)

1. **50 Productores Activos en Tlaxiaco:** Registro formal de al menos 50 lotes reales durante el ciclo de cosecha 2026.
2. **0% Pérdida de Datos en Desconexión:** 100% de efectividad de guardado en parcelas sin señal celular.
3. **Tiempo de Registro < 3 Minutos:** Un productor puede registrar su lote completo en menos de 180 segundos por voz.
4. **Cero Dependencia de Frases Semilla (Zero-Seed):** 0% de campesinos obligados a escribir o memorizar contraseñas de 24 palabras en inglés.
5. **Atestación Inmutable en Stellar:** Cada lote cuenta con un hash verificable en Soroban Testnet/Mainnet.
