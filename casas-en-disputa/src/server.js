// Importaciones
const express = require('express');
const { calcularNuevaPosicion, elegirMovimiento } = require('./estrategia');

// Inicialización
const app = express();

// Middleware obligatorio para entender el JSON del árbitro
app.use(express.json());

// Middleware de Logs: Imprime en consola cada petición que llega
app.use((req, res, next) => {
    console.log(`Petición recibida: ${req.method} ${req.url}`);
    next(); // Pasa a la siguiente función
});

// Ruta Health (Para saber si el bot está vivo)
app.get('/health', (req, res) => {
    res.status(200).json({ status: "OK" });
});

// Ruta Move (Recibe el tablero del árbitro)
app.post('/move', (req, res) => {
    const estadoTablero = req.body;

    // Manejo de errores unificado: verificamos que el body no esté vacío y contenga el "tablero"
    if (!estadoTablero || Object.keys(estadoTablero).length === 0 || !estadoTablero.tablero) {
        return res.status(400).json({ error: "El estado del tablero es inválido o está vacío" });
    }

    // Llamamos a la función matemática en estrategia.js
    const decisionFinal = elegirMovimiento(estadoTablero);

    // Devolvemos la decisión final al árbitro
    return res.status(200).json(decisionFinal);
});

// Manejo de Error 404: Ruta inexistente
app.use((req, res) => {
    res.status(404).json({ error: "Ruta no encontrada" });
});

// Manejo de Error 500: Falla inesperada del servidor
app.use((err, req, res, next) => {
    console.error("Se rompió algo internamente:", err.message);
    res.status(500).json({ error: "Error interno del servidor" });
});

// 4. Encendido del servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Bot escuchando en el puerto ${PORT}`);
});