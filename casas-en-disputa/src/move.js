const { elegirMovimiento } = require('./estrategia');

function move(req, res) {
    const estadoTablero = req.body;

    // Validación básica
    if (!estadoTablero || !estadoTablero.tablero) {
        return res.status(400).json({ error: "El estado del tablero es inválido o está vacío" });
    }

    const decisionFinal = elegirMovimiento(estadoTablero);
    return res.status(200).json(decisionFinal);
}

module.exports = { move };