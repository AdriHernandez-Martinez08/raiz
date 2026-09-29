# 🎓 Guía del Desarrollador y Contribuidor TecNM (Campus Tlaxiaco)

¡Bienvenido al equipo de ingeniería de **Raíz Protocol**! 🌿

Este proyecto está siendo desarrollado por estudiantes y profesores de la carrera de **Ingeniería en Sistemas Computacionales** del **Instituto Tecnológico de Tlaxiaco (Oaxaca, México)**.

Tu trabajo aquí no es solo una tarea escolar: es código real que certifica cosechas, apoya a artesanas indígenas de nuestras comunidades y compite en financiamientos internacionales de **Drips Network** y **Stellar Community Fund (SCF)**.

---

## 🚀 1. Configuración de tu Computadora (En 3 Pasos)

### Requisitos Previos:
- Tener instalado **Node.js** (versión 20 o superior).
- Tener instalado **Git**.

### Paso 1: Clonar el repositorio
Abre tu terminal y ejecuta:
```bash
git clone https://github.com/Open-Hub-Tec/raiz.git
cd raiz
```

### Paso 2: Instalar dependencias
```bash
npm install
```

### Paso 3: Iniciar el servidor local
```bash
npm run dev
```
Abre tu navegador en `http://localhost:3000`. ¡Listo, ya tienes Raíz corriendo en tu máquina!

---

## 🧭 2. ¿Cómo elegir tu tarea en GitHub?

1. Ve al **Tablero del Proyecto en GitHub**:  
   👉 **[https://github.com/orgs/Open-Hub-Tec/projects/1](https://github.com/orgs/Open-Hub-Tec/projects/1)**
2. Revisa la columna **`Todo`** del Sprint actual.
3. Elige una issue que te interese (por ejemplo: `#18`, `#19`, `#20`, `#22`, etc.).
4. Deja un comentario en la issue diciendo: *"Hola, tomo esta tarea para el equipo TecNM"* y solicítale a @josealfredo79 que te asigne.

---

## 🛠️ 3. ¿En qué parte del código debo trabajar?

El repositorio es un **Monorepo** dividido por áreas de interés:

| Tu Interés / Especialidad | Dónde trabajar en el código | Ejemplos de lo que harás |
| :--- | :--- | :--- |
| **🎨 Frontend & UI Móvil** | `src/components/` | Pantallas de la app, botones gigantes, Modo Abuelo, vitrina de productos, modales. |
| **🗣️ Lengua Mixteca y Audio** | `src/utils/audioRecorder.ts`<br>`src/core/ai/RaizAIOracles.ts` | Grabación de voz en 24kbps Opus, reconocimiento de frases en Tu'un Savi, modales de voz. |
| **🧠 Inteligencia Artificial y Oráculos** | `src/core/ai/RaizAIOracles.ts` | Clasificación de calidad SCAA, validación satelital EUDR contra deforestación, prompts de Gemini. |
| **🔐 Criptografía e Identidad** | `src/core/crypto/`<br>`src/core/auth/` | Hashes SHA-256 canónicos, login por WhatsApp OTP, tarjetas físicas con código QR. |
| **💳 Pagos y Finanzas Rurales** | `src/core/payments/` | Integración de pagos con MicoPay (efectivo en báscula) y Etherfuse (SPEI / Banco Bienestar). |
| **🦀 Smart Contracts en Rust (Soroban)** | `contracts/` | Contratos inteligentes en Rust: `attestation_registry/`, `fair_escrow/`, `perpetual_royalties/`. |

---

## 🌿 4. Flujo de Trabajo con Git (Paso a Paso)

### 1. Asegúrate de estar actualizado
```bash
git checkout main
git pull origin main
```

### 2. Crea tu propia rama de trabajo
Usa un nombre descriptivo con el número de issue:
```bash
git checkout -b feature/issue-18-whatsapp-login
```

### 3. Haz tus cambios y pruébalos
Cada vez que avances, prueba tu código:
```bash
npm run test
```

### 4. Haz tus commits siguiendo el estándar
Usa mensajes claros en minúsculas:
- `feat: agregar validación de teléfono celular mexicano para OTP`
- `fix: corregir tamaño de botón de micrófono en modo abuelo`
- `docs: actualizar instrucciones en README`

```bash
git add .
git commit -m "feat: implementar validación de WhatsApp OTP para issue #18"
```

### 5. Sube tu rama a GitHub
```bash
git push origin feature/issue-18-whatsapp-login
```

---

## 🎁 5. Cómo abrir tu Pull Request (PR) y ganar crédito en Drips

1. Entra a [https://github.com/Open-Hub-Tec/raiz/pulls](https://github.com/Open-Hub-Tec/raiz/pulls) y haz clic en **"New Pull Request"**.
2. **MUY IMPORTANTE:** En la descripción del Pull Request, **DEBES incluir la palabra mágica** que vincula tu issue:
   ```markdown
   Closes #18
   ```
   *(o `Resolves #22`, sustituyendo por el número de tu issue).*
3. Al hacer esto:
   - El bot de **TecNM Contributor & Drips Reviewer** comentará automáticamente tu PR felicitándote y registrando tu elegibilidad para financiamiento.
   - El sistema de pruebas automáticas (CI) correrá todas las pruebas para verificar que no rompiste nada.
4. El mantenedor (@josealfredo79) revisará tu código, te dará retroalimentación amable si hace falta algo, y lo integrará a `main`.

---

## ✅ 6. Comprobación Final antes de enviar tu PR

Antes de subir tu código, corre este comando en tu terminal:
```bash
npm run lint && npm run test
```
Si ves el mensaje:
> `AUDITORÍA FINALIZADA CON ÉXITO: PRUEBAS APROBADAS, 0 FALLOS`

¡Felicidades! Tu código está listo para ser revisado y aprobado.

---

## 💬 7. ¿Tienes dudas o te trabaste?

- **En persona:** En el Laboratorio de Sistemas del TecNM Campus Tlaxiaco.
- **En GitHub:** Abre una duda en los comentarios de tu issue o en la pestaña *Discussions*.
- **En Discord:** En el canal de Stellar o el grupo de Open Hub TecNM.

*¡El talento de la Mixteca está construyendo el futuro de la tecnología con identidad comunitaria!* 🚀
