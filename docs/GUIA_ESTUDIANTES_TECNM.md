# 📘 Manual de Vuelo: Conceptos y Comandos Clave para Estudiantes TecNM

Este manual rápido explica en lenguaje claro y directo los términos y herramientas que usamos a diario en **Raíz Protocol**.

---

## 🌟 1. Glosario Rápido: ¿De qué diablos hablamos en este proyecto?

### ¿Qué es Stellar?
Una red blockchain (como una gran libreta contable mundial compartida) diseñada para mover dinero en segundos por centavos de dólar. En vez de pagar comisiones bancarias del 7%, una transferencia cuesta fracciones de centavo.

### ¿Qué es Soroban?
El motor de **Smart Contracts** (contratos inteligentes) de Stellar. Está programado en **Rust**. Es código que se ejecuta en la blockchain y que nadie puede alterar ni apagar. Por ejemplo: *"Si el comprador deposita el dinero, no se lo entregues al vendedor hasta que la báscula confirme que entregó los 100 kilos de café"*.

### ¿Qué es una Atestación (*Attestation*)?
Es un **"sello o acta notarial digital"** firmado con criptografía. En vez de que un inspector viaje 8 horas a la sierra a firmar un papel que se puede mojar o falsificar, el Oráculo de Inteligencia Artificial analiza la foto o el satélite y estampa una atestación matemática en la blockchain.

### ¿Qué es un Oráculo de IA?
Un programa que conecta el mundo real con la blockchain.
- **AIVoiceOracle:** Escucha el mixteco (*Tu'un Savi*) y lo traduce a datos limpios.
- **AIQualityOracle:** Revisa la foto del grano de café y dice si tiene más de 85 puntos de calidad.
- **AIEUDRSatelliteOracle:** Revisa las fotos del satélite de la Unión Europea y confirma que no se taló selva.

### ¿Qué es MicoPay?
El sistema que permite entregar **efectivo en mano** al campesino en la báscula comunal cuando no tiene tarjeta de banco ni cuenta bancaria.

### ¿Qué es Etherfuse?
La empresa aliada que conecta Stellar con **Banxico (SPEI)** en México, permitiendo mandar pesos directo a las tarjetas del Banco del Bienestar.

---

## 🛠️ 2. Comandos de Git "Salva-Vidas"

### ¿Cómo ver en qué rama estoy y qué archivos modifiqué?
```bash
git status
```

### ¿Cómo deshacer cambios en un archivo si me equivoqué y quiero volver a empezar?
```bash
git checkout nombre_del_archivo.tsx
```

### ¿Cómo sincronizar mi rama local con los últimos cambios de main?
```bash
git checkout main
git pull origin main
git checkout mi-rama
git merge main
```

### ¿Cómo ver las pruebas locales?
```bash
npm run test
```

### ¿Cómo verificar que no tengo errores de TypeScript?
```bash
npm run lint
```

---

## 💡 3. Consejos de Oro de los Profesores e Investigadores

1. **Haz cambios pequeños:** Es 10 veces mejor mandar un Pull Request que modifique 30 líneas de código y resuelva un problema concreto, que intentar mandar 2,000 líneas juntas.
2. **Siempre corre `npm run test` antes de hacer `git push`:** Si las pruebas pasan en tu máquina, pasarán en el servidor de GitHub Actions.
3. **No tengas miedo de preguntar:** En la cultura del código abierto no hay preguntas tontas. Todos aprendemos rompiendo código en local.
