require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Configuración de Seguridad
app.use(cors()); // En producción, limita esto a tu dominio específico
app.use(express.json());

// Endpoint para procesar la encuesta
app.post('/api/survey', async (req, res) => {
    const { rawData, airtableData } = req.body;

    if (!rawData || !airtableData) {
        return res.status(400).json({ error: 'Datos incompletos' });
    }

    try {
        // Realizar peticiones protegidas desde el servidor
        const [airtableRes, n8nRes] = await Promise.all([
            axios.post(
                `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/${process.env.AIRTABLE_TABLE_ID}`,
                airtableData,
                {
                    headers: {
                        'Authorization': `Bearer ${process.env.AIRTABLE_TOKEN}`,
                        'Content-Type': 'application/json'
                    }
                }
            ),
            axios.post(process.env.N8N_WEBHOOK_URL, rawData)
        ]);

        console.log('✅ Respuestas procesadas y enviadas');
        res.status(200).json({ message: 'Encuesta procesada con éxito' });

    } catch (error) {
        console.error('❌ Error en el servidor:', error.response?.data || error.message);
        res.status(500).json({ error: 'Error interno al procesar la encuesta' });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor de seguridad corriendo en http://localhost:${PORT}`);
});
