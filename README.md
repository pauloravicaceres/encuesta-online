# Encuesta Online Premium - Antigravity

Este proyecto es una aplicación web de encuesta moderna y segura diseñada para los estudiantes del curso Antigravity. Utiliza una arquitectura de frontend elegante con un backend proxy seguro para proteger las integraciones con Airtable y n8n.

## 🚀 Características

- **Diseño Premium**: Interfaz moderna con glassmorphism, gradientes dinámicos y tipografía Outfit.
- **Seguridad**: Arquitectura basada en un servidor proxy Node.js para ocultar credenciales de API.
- **Integraciones**: 
  - **Airtable**: Almacenamiento persistente de respuestas.
  - **n8n**: Automatización de notificaciones vía webhook.
- **Responsive**: Totalmente adaptable a móviles y tablets.

## 🛠️ Tecnologías

- **Frontend**: HTML5, CSS3, Vanilla JavaScript.
- **Backend**: Node.js, Express, Axios, Dotenv.
- **Diseño**: CSS Moderno (Glassmorphism).

## 📦 Instalación y Uso

### 1. Requisitos previos
- Node.js instalado.
- Una cuenta de Airtable y un webhook de n8n configurado.

### 2. Configuración del Servidor
1. Navega a la carpeta `server`.
2. Crea un archivo `.env` basado en los tokens proporcionados (ver walkthrough local).
3. Instala las dependencias:
   ```bash
   npm install
   ```
4. Inicia el servidor:
   ```bash
   node server.js
   ```

### 3. Ejecución del Frontend
Abre `index.html` en tu navegador o utiliza un servidor estático (como `serve` o `Live Server`).

---
Desarrollado con ❤️ por Antigravity AI.
