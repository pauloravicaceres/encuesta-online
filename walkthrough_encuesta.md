# Encuesta de Opinión - Curso Antigravity

He creado una página de encuesta moderna y sofisticada para tus estudiantes, utilizando HTML5, CSS3 y JavaScript vanilla. El diseño se centra en una estética **premium** con efectos de glassmorphism, gradientes dinámicos y una experiencia de usuario fluida.

## 🚀 Características Principales

- **Arquitectura Segura**: Implementación de un servidor proxy Node.js para ocultar credenciales.
- **Protección de Tokens**: Uso de variables de entorno (.env) en el servidor.
- **Integración Blindada**: Las llamadas a Airtable y n8n se procesan desde el backend.
- **Diseño Glassmorphism**: Una interfaz semi-transparente que se siente moderna y ligera.
- **Interacciones Suaves**: Micro-animaciones al pasar el mouse y al enviar el formulario.
- **Responsive**: Totalmente adaptable a dispositivos móviles y tablets.
- **SEO Optimizado**: Incluye etiquetas meta y estructura semántica correcta.

## 🛠️ Estructura del Proyecto

El proyecto consta de los siguientes archivos en la carpeta `proyecto-encuesta`:

1.  **[index.html](file:///d:/Paulo/Cursos/IA/Google%20Antigravity/proyecto-encuesta/index.html)**: Estructura del formulario y contenido.
2.  **[style.css](file:///d:/Paulo/Cursos/IA/Google%20Antigravity/proyecto-encuesta/style.css)**: Estilos premium y sistema de diseño.
3.  **[script.js](file:///d:/Paulo/Cursos/IA/Google%20Antigravity/proyecto-encuesta/script.js)**: Lógica de la interfaz (sin credenciales expuestas).
4.  **[server/server.js](file:///d:/Paulo/Cursos/IA/Google%20Antigravity/proyecto-encuesta/server/server.js)**: Servidor proxy seguro que maneja las APIs.
5.  **[server/.env](file:///d:/Paulo/Cursos/IA/Google%20Antigravity/proyecto-encuesta/server/.env)**: Archivo privado con las credenciales (tokens y URLs).
6.  **[bg.png](file:///d:/Paulo/Cursos/IA/Google%20Antigravity/proyecto-encuesta/bg.png)**: Imagen de fondo abstracta.

## 🛡️ Mejoras de Seguridad Realizadas

1.  **Eliminación de Hardcoding**: Se han borrado los tokens de Airtable y URLs de webhooks del código JavaScript que descarga el navegador.
2.  **Servidor Intermediario**: El cliente ahora se comunica con un backend propio (`http://localhost:3001`), el cual posee los permisos para hablar con las APIs externas.
3.  **Variables de Entorno**: Las credenciales se almacenan en un archivo `.env` que nunca se expone al usuario final.
4.  **Control de CORS**: El servidor backend actúa como barrera de seguridad adicional.

La encuesta ahora está conectada directamente con tu tabla de Airtable. Cada vez que un estudiante envía el formulario, se crea un nuevo registro con los siguientes campos mapeados:

- `id_estudiante` ➔ **IDEstudiante**
- `nivel_satisfaccion` ➔ **NivelSatisfaccion** (Numérico)
- `claridad_contenido` ➔ **ClaridadContenido** (Numérico)
- `aplicabilidad_practica` ➔ **AplicabilidadPractica** (Numérico)
- `comentarios_adicionales` ➔ **ComentariosAdicionales**

## 📧 Automatización con n8n

Además de Airtable, la encuesta realiza una llamada a un webhook de **n8n**. Esta integración está diseñada para:
1.  **Recibir los datos** de la encuesta instantáneamente.
2.  **Enviar un email** de notificación (o agradecimiento) automáticamente.
3.  **Procesar información** adicional según el flujo configurado en n8n.

## 📝 Preguntas Incluidas

Tal como solicitaste, la encuesta incluye:
- **ID del Estudiante**: Campo de texto obligatorio.
- **Nivel de Satisfacción**: Escala visual del 1 al 5.
- **Claridad del Contenido**: Escala visual del 1 al 5.
- **Aplicabilidad Práctica**: Escala visual del 1 al 5.
- **Comentarios Adicionales**: Área de texto libre para feedback detallado.

---
> [!TIP]
> Para ver la página en acción, simplemente abre el archivo `index.html` en cualquier navegador moderno.
