document.addEventListener('DOMContentLoaded', () => {
    const surveyForm = document.getElementById('survey-form');
    const surveySection = document.getElementById('survey-section');
    const successMessage = document.getElementById('success-message');

    surveyForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = surveyForm.querySelector('.submit-btn');
        const originalBtnText = submitBtn.textContent;
        
        // Obtener los datos del formulario
        const formData = new FormData(surveyForm);
        const rawData = Object.fromEntries(formData.entries());

        // Mapeo de datos para Airtable (asegurando tipos correctos)
        const airtableData = {
            records: [
                {
                    fields: {
                        "IDEstudiante": rawData.id_estudiante,
                        "NivelSatisfaccion": parseInt(rawData.nivel_satisfaccion),
                        "ClaridadContenido": parseInt(rawData.claridad_contenido),
                        "AplicabilidadPractica": parseInt(rawData.aplicabilidad_practica),
                        "ComentariosAdicionales": rawData.comentarios_adicionales
                    }
                }
            ]
        };

        // Configuración de Seguridad: Ahora usamos nuestro servidor proxy
        const BACKEND_URL = 'http://localhost:3001/api/survey';

        try {
            submitBtn.disabled = true;
            submitBtn.textContent = 'Enviando...';

            const response = await fetch(BACKEND_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ rawData, airtableData })
            });

            if (!response.ok) {
                throw new Error('Error al enviar la encuesta al servidor seguro');
            }

            console.log('Encuesta procesada de forma segura');

            // Mostrar mensaje de éxito
            surveyForm.classList.add('hidden');
            document.querySelector('.survey-header').classList.add('hidden');
            successMessage.classList.remove('hidden');

        } catch (error) {
            console.error('Error:', error);
            alert('Hubo un problema al enviar tu encuesta. Por favor, inténtalo de nuevo.');
            submitBtn.disabled = false;
            submitBtn.textContent = originalBtnText;
        }
    });

    // Efecto de mouse para el brillo del card (opcional para premium feel)
    const card = document.querySelector('.survey-card');
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX;
        const y = e.clientY;
        
        const cardRect = card.getBoundingClientRect();
        const cardX = x - cardRect.left;
        const cardY = y - cardRect.top;

        // Solo si el mouse está cerca o sobre el card
        if (x > cardRect.left - 100 && x < cardRect.right + 100 &&
            y > cardRect.top - 100 && y < cardRect.bottom + 100) {
            card.style.setProperty('--mouse-x', `${cardX}px`);
            card.style.setProperty('--mouse-y', `${cardY}px`);
        }
    });
});
