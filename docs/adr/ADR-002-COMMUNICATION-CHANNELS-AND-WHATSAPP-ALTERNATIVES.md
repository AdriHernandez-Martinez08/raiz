# Architecture Decision Record (ADR-002)
## Evaluación de Canales de Interacción Rural y Desacoplamiento de WhatsApp

* **Estado:** Aprobado / Implementado
* **Fecha:** Septiembre 2026
* **Decisores:** Equipo de Arquitectura Raíz Protocol, TecNM Campus Tlaxiaco
* **Contexto:** Observaciones críticas de la reunión con Alberto Chaves y Brandon sobre la dependencia de plataformas propietarias.

---

### 1. Contexto y Problema
En las etapas iniciales de ideación se propuso utilizar WhatsApp como la interfaz conversacional principal para los campesinos y artesanas de Tlaxiaco, basándose en su ubicuidad aparente.

Sin embargo, tras el análisis técnico y la retroalimentación de los mentores, se identificaron **cuatro fallas estructurales críticas** al depender de WhatsApp:
1. **Falta Total de Resiliencia Offline:** WhatsApp no puede operar en las parcelas cafetaleras de la Mixteca Alta (Yucuhiti, Amoltepec) donde no existe cobertura celular ni señal de datos 3G/4G.
2. **Costos y Restricciones de la API de Meta (WhatsApp Business Cloud API):** Cada conversación con un productor cuesta dinero en comisiones por mensaje cobradas por Meta. Además, requiere procesos corporativos de verificación que excluyen a colectivos indígenas no constituidos formalmente.
3. **Riesgo Operativo de Suspensión (Vendor Lock-in):** Los algoritmos automáticos de Meta pueden suspender o bloquear números comunitarios sin derecho a réplica, deteniendo las operaciones de cosecha.
4. **Incapacidad Criptográfica del Cliente:** WhatsApp no permite generar, almacenar ni firmar hashes criptográficos de Stellar (`ed25519` / SHA-256) de manera local y soberana en el teléfono del usuario.

---

### 2. Matriz de Evaluación de Alternativas

| Criterio | 1. WhatsApp Bot | 2. PWA Offline-First (Web) | 3. Carnet QR Físico | 4. Telegram WebApp |
| :--- | :---: | :---: | :---: | :---: |
| **Funciona 100% sin internet** | ❌ Imposible | ✅ Sí (IndexedDB + Service Worker) | ✅ Sí (Soporte físico) | ❌ Requiere conexión |
| **Costo por mensaje / uso** | ❌ Tarifa por conversación Meta | ✅ **$0.00 (Estándares web abiertos)** | ✅ Costo único de impresión ($5 MXN) | ✅ **$0.00 (API abierta)** |
| **Soberanía y Código Abierto** | ❌ Código cerrado y propietario | ✅ **100% Código Abierto (W3C)** | ✅ Soberanía comunitaria | ⚠️ Plataforma externa |
| **Inclusión para Adultos Mayores** | ⚠️ Requiere escribir en teclado | ✅ **Voz nativa gigante (112px) y botones táctiles** | ✅ **Máxima (Cero tecnología personal)** | ⚠️ Requiere app instalada |
| **Firma Criptográfica Local** | ❌ No | ✅ **Sí (Web Crypto API + Ed25519)** | ✅ Sí (Clave delegada en cooperativa) | ⚠️ Limitada |

---

### 3. Decisión de Arquitectura para el MVP

1. **Canal Primario del MVP:** **Progressive Web App (PWA) Offline-First**.
   * Opera en cualquier navegador web moderno de smartphones económicos (Android).
   * Almacena datos localmente con IndexedDB cuando el productor está en la parcela sin señal.
   * Graba y procesa audio de voz (en lengua Mixteca *Tu'un Savi* y Español) con la API estándar `MediaRecorder` a 24kbps.
   * Sincroniza automáticamente en segundo plano cuando el productor llega a un punto con WiFi comunitario o datos.
2. **Mecanismo Inclusivo Zero-Tech:** **Carnet QR Físico Comunitario**.
   * Para campesinos y artesanas de la tercera edad que no cuentan con smartphone.
   * El promotor de la cooperativa o estudiante del TecNM escanea el carnet para autenticar el lote sin exigir contraseñas ni frases semilla de 24 palabras.
3. **Canal de Notificación Secundario (Opcional):** **Telegram WebApp / Bot abierto**.
   * Para compradores institucionales y tostadurías que deseen recibir alertas de nuevos lotes certificados sin incurrir en costos de licencias comerciales.

---

### 4. Consecuencias
* **Soberanía Tecnológica:** El proyecto es 100% independiente de Meta y de cualquier proveedor de mensajería de pago.
* **Cero Costos Recurrentes para la Comunidad:** No hay tarifas por mensaje ni cobros por API.
* **Verificación Real en Campo:** La app funciona en lo alto de la montaña donde se corta el café, resolviendo el problema real de Tlaxiaco.
