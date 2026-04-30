require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Configuración de Seguridad
app.use(cors()); // En producción, limita esto a tu dominio específico
app.use(express.json());

// Servir archivos estáticos del frontend
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint para procesar la encuesta
app.post('/api/survey', async (req, res) => {
    const { rawData, airtableData } = req.body;

    if (!rawData || !airtableData) {
        return res.status(400).json({ error: 'Datos incompletos' });
    }

    try {
        // 1. Enviar a Airtable (Crítico)
        const airtableRes = await axios.post(
            `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/${process.env.AIRTABLE_TABLE_ID}`,
            airtableData,
            {
                headers: {
                    'Authorization': `Bearer ${process.env.AIRTABLE_TOKEN}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        // 2. Enviar a n8n (Opcional - No bloquea si falla)
        try {
            await axios.post(process.env.N8N_WEBHOOK_URL, rawData);
            console.log('✅ Notificación n8n enviada');
        } catch (n8nError) {
            const status = n8nError.response?.status;
            const errorMsg = n8nError.response?.data?.message || n8nError.message;
            console.warn(`⚠️ Error n8n (Email no enviado) - Status: ${status} - Error: ${errorMsg}`);
            // No lanzamos el error para que la encuesta se considere exitosa
        }

        console.log('✅ Encuesta guardada en Airtable con éxito');
        res.status(200).json({ message: 'Encuesta procesada con éxito' });

    } catch (error) {
        console.error('❌ Error crítico en Airtable:', error.response?.data || error.message);
        res.status(500).json({ error: 'No se pudo guardar la encuesta en la base de datos' });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor de seguridad corriendo en http://localhost:${PORT}`);
});
