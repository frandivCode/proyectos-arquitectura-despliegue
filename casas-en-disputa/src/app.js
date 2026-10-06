const express = require('express');
const { move } = require('./move');

const app = express();

app.use(express.json());

app.use((req, res, next) => {
    console.log(`Petición recibida: ${req.method} ${req.url}`);
    next();
});

app.get('/health', (req, res) => res.status(200).json({ status: "OK" }));

// Conectamos la ruta con el controlador
app.post('/move', move);

app.use((req, res) => res.status(404).json({ error: "Ruta no encontrada" }));
app.use((err, req, res, next) => res.status(500).json({ error: "Error interno del servidor" }));

module.exports = app;