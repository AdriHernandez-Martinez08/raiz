<div align="center">

# 🌿 Raíz Protocol
### *Trazabilidad, Visibilidad y Origen Verificable en Stellar & Soroban para Comunidades Indígenas de Oaxaca*

[![License: MIT](https://img.shields.io/badge/License-MIT-emerald.svg)](./LICENSE)
[![Stellar: Built on Soroban](https://img.shields.io/badge/Stellar-Soroban%20%7C%20Horizon-black.svg?logo=stellar)](https://stellar.org)
[![Trustless Work: Escrow Infrastructure](https://img.shields.io/badge/Escrow-Trustless%20Work%20Audited-blueviolet.svg)](https://trustlesswork.com)
[![Institution: TecNM Campus Tlaxiaco](https://img.shields.io/badge/Development-TecNM%20Tlaxiaco-b45309.svg)](http://tlaxiaco.tecnm.mx/)
[![Status: MVP v1.2.0](https://img.shields.io/badge/Status-Validated%20MVP%20v1.2.0-success.svg)]()

<p align="center">
  <b>Infraestructura descentralizada de bienes públicos en Stellar: conectando a pequeños cafeticultores y artesanas de Tlaxiaco con mercados éticos mediante atestaciones criptográficas inmutables.</b>
  <br>
  <i>Diseñado y programado por estudiantes investigadores de Ingeniería en Sistemas Computacionales del <b>Instituto Tecnológico de Tlaxiaco (Oaxaca, México)</b></i>
</p>

[Visión General](#-visión-general) • [Los 3 Dolores que Resuelve](#-los-3-dolores-que-resuelve-en-tlaxiaco) • [Mapa de Usuario](#-mapa-de-experiencia-de-usuario-user-journey) • [Ecosistema](#-stack-del-ecosistema-stellar-dividir-y-conquistar) • [Inicio Rápido](#-inicio-rápido-quickstart) • [Documentación](#-centro-de-documentación)

---

</div>

## 📌 Visión General

**Raíz** es una plataforma descentralizada de **Trazabilidad, Visibilidad y Origen Verificable (RWA)** construida sobre la red **Stellar** y contratos inteligentes de **Soroban**. 

El proyecto nace en la **Mixteca Alta de Oaxaca (Heroica Ciudad de Tlaxiaco, Santa María Yucuhiti y San Cristóbal Amoltepec)** para resolver la exclusión digital de productores de café de especialidad y artesanas de telar de cintura mediante una interfaz **PWA Offline-First** con reconocimiento de voz en lengua originaria (*Tu'un Savi* / Mixteco).

> **Enfoque Territorial del MVP:**  
> La Fase 1 del proyecto está **100% acotada y validada en Tlaxiaco, Oaxaca**. Los planes de expansión transfronteriza hacia otros países forman parte de la Fase 2 del roadmap.

---

## 🎯 Los 3 Dolores que Resuelve en Tlaxiaco

Validado en campo por los estudiantes investigadores del TecNM con más de 50 productores y artesanas:

1. **Falta de Visibilidad Comercial:** Los artesanos y cafeticultores no tienen canales directos para exhibir y comercializar sus productos fuera de su localidad o municipio.
2. **Explotación por Intermediarios ("Coyotes"):** Los revendedores compran a precios muy bajos (hasta 70% por debajo del valor real) y no existen regalías para los productores originales cuando sus obras se revenden con alta plusvalía.
3. **Piratería y Falta de Certificación:** No existe un registro verificable del proceso artesanal o de la calidad del café, propiciando que personas externas plagien los diseños textiles ancestrales o vendan café genérico como café de especialidad.

---

## 🗺️ Mapa de Experiencia de Usuario (User Journey)

¿Cómo interactúa Don Juan (campesino de 65 años) y una tostaduría internacional en Raíz?

```text
┌───────────────────────────┐       ┌───────────────────────────┐       ┌───────────────────────────┐
│   1. PARCELA (SIN SEÑAL)  │       │  2. ACOPIO EN TLAXIACO    │       │   3. MERCADO Y CUSTODIA   │
│  - Don Juan presiona voz  │ ────> │  - SyncEngine ancla hash  │ ────> │  - Tostador escanea QR    │
│  - Habla en Mixteco/Esp.  │       │    SHA-256 en Soroban     │       │  - Deposita en Escrow de  │
│  - Guarda en IndexedDB    │       │  - Imprime etiqueta Hang- │       │    Trustless Work (USDC)  │
│  - Cero contraseñas       │       │    Tag con QR físico      │       │  - Retiro SPEI a Bienestar│
└───────────────────────────┘       └───────────────────────────┘       └───────────────────────────┘
```

> **Ver el Diagrama de Secuencia Técnico Completo (Mermaid):**  
> 👉 [Diagrama de Secuencia End-to-End en docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md#-2-diagrama-de-secuencia-de-interacci%C3%B3n-de-usuario-y-del-sistema-end-to-end)

---

## 🤝 Stack del Ecosistema Stellar ("Dividir y Conquistar")

Siguiendo el principio de arquitectura de integrar componentes auditados del ecosistema en vez de reinventar la rueda:

* **🤝 [Trustless Work](https://trustlesswork.com):** Custodia descentralizada de fondos (Escrow) basada en hitos (*milestones*) sobre Soroban. Libera 30% con atestación de origen y 70% con entrega física comprobada en la cooperativa ([ADR-001](./docs/adr/ADR-001-TRUSTLESS-WORK-ESCROW.md)).
* **⛓️ [Stellar Network & Soroban](https://stellar.org):** Registro inmutable del lote (`LotPassport.rs`), atestaciones de origen (`AttestationRegistry.rs`) y liquidación con tarifas insignificantes ($0.00001 USD).
* **🎙️ [PWA Web Audio & Gemini AI](https://ai.google.dev):** Interfaz sin teclado con reconocimiento de voz en *Tu'un Savi* y español rural sin dependencia de APIs de mensajería de pago como WhatsApp ([ADR-002](./docs/adr/ADR-002-COMMUNICATION-CHANNELS-AND-WHATSAPP-ALTERNATIVES.md)).
* **💳 [Etherfuse](https://etherfuse.com):** Rampa fiduciaria SPEI directa a cuentas de inclusión social (Banco del Bienestar / Finabien / Cajas Populares).

---

## 🚀 Inicio Rápido (Quickstart)

Para clonar, instalar y levantar la aplicación localmente en 3 comandos:

```bash
# 1. Clonar el repositorio
git clone https://github.com/Open-Hub-Tec/raiz.git
cd raiz

# 2. Instalar dependencias
npm install

# 3. Iniciar el entorno de desarrollo
npm run dev
```

Abre tu navegador en `http://localhost:3000`.

### Verificación de Calidad y Pruebas:
```bash
# Ejecutar la suite completa de 34+ pruebas automatizadas
npm run test

# Compilación y empaquetado para producción
npm run build
```

---

## 📚 Centro de Documentación

Toda la documentación técnica profunda está organizada de forma modular en [`docs/`](./docs/README.md):

* **[Especificación Oficial del MVP (Tlaxiaco)](./docs/MVP_SPECIFICATION.md):** Definición detallada de los 3 pilares, métricas de éxito y protocolo de campo.
* **[Especificación de Arquitectura de Software](./docs/ARCHITECTURE.md):** Diagrama de capas 1 a 5, patrones de diseño y flujo de datos.
* **[Registros de Decisiones de Arquitectura (ADRs)](./docs/adr/):**
  * [ADR-001: Adopción de Trustless Work Escrow](./docs/adr/ADR-001-TRUSTLESS-WORK-ESCROW.md)
  * [ADR-002: Desacoplamiento de WhatsApp y PWA Offline-First](./docs/adr/ADR-002-COMMUNICATION-CHANNELS-AND-WHATSAPP-ALTERNATIVES.md)
* **[Guía para Estudiantes y Contribuidores](./CONTRIBUTING.md):** Cómo tomar issues, abrir Pull Requests y colaborar en el proyecto.
* **[Índice Completo de Documentación](./docs/README.md):** Reportes de investigación de campo, estándares SEP y carpetas de Drips.

---

## 👥 Equipo y Gobernanza Académica

* **Institución:** Instituto Tecnológico de Tlaxiaco (TecNM - Oaxaca, México).
* **Carrera:** Ingeniería en Sistemas Computacionales.
* **Liderazgo del Proyecto:** Profe Jose Alfredo Roman Cruz y Nayeli (Líder Estudiantil).
* **Comunidad:** Estudiantes investigadores de Open Hub TecNM Campus Tlaxiaco.
* **Licencia:** [MIT Open Source](./LICENSE).
