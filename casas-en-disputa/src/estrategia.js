function calcularNuevaPosicion(filaActual, columnaActual, pasos, direccion) {
    let nuevaFila = filaActual;
    let nuevaColumna = columnaActual;

    if (direccion === "N") { nuevaFila = (filaActual - pasos + 10) % 10; }
    else if (direccion === "S") { nuevaFila = (filaActual + pasos + 10) % 10; }
    else if (direccion === "E") { nuevaColumna = (columnaActual + pasos + 10) % 10; }
    else if (direccion === "O") { nuevaColumna = (columnaActual - pasos + 10) % 10; }

    return [nuevaFila, nuevaColumna];
}

function distanciaToroidal(pos1, pos2) {
    let directa = Math.abs(pos1 - pos2);
    return Math.min(directa, 10 - directa);
}

function elegirMovimiento(estadoTablero) {
    const jugador = estadoTablero.jugador;
    const tablero = estadoTablero.tablero;
    const pasos = estadoTablero.dado || 1;
    const rival = jugador === "A" ? "B" : "A";

    let misFichas = [];
    let casas = [];
    let fichasRivales = new Set();

    for (let f = 0; f < 10; f++) {
        for (let c = 0; c < 10; c++) {
            const celda = String(tablero[f][c] || "");
            if (celda === "N") {
                casas.push({ fila: f, columna: c });
            } else if (celda.startsWith(jugador) && /^([AB])\d+$/.test(celda)) {
                misFichas.push({ id: celda, fila: f, columna: c });
            } else if (celda.startsWith(rival) && /^([AB])\d+$/.test(celda)) {
                fichasRivales.add(`${f},${c}`);
            }
        }
    }

    let movimientos = {};
    let destinosPropiosOcupados = new Set();
    const direcciones = ["N", "S", "E", "O"];

    for (let i = 0; i < misFichas.length; i++) {
        let ficha = misFichas[i];
        let mejorDireccion = null;
        let mejorPuntaje = Infinity;

        for (const dir of direcciones) {
            const [destF, destC] = calcularNuevaPosicion(ficha.fila, ficha.columna, pasos, dir);
            const claveDestino = `${destF},${destC}`;

            if (fichasRivales.has(claveDestino) || destinosPropiosOcupados.has(claveDestino)) {
                continue;
            }

            if (casas.length === 0) {
                mejorDireccion = dir;
                break;
            }

            let distMinACasa = Infinity;
            for (const casa of casas) {
                const dist = distanciaToroidal(destF, casa.fila) + distanciaToroidal(destC, casa.columna);
                if (dist < distMinACasa) {
                    distMinACasa = dist;
                }
            }

            if (distMinACasa < mejorPuntaje) {
                mejorPuntaje = distMinACasa;
                mejorDireccion = dir;
            }
        }

        if (!mejorDireccion) {
            mejorDireccion = "N";
        }

        const [finalF, finalC] = calcularNuevaPosicion(ficha.fila, ficha.columna, pasos, mejorDireccion);
        destinosPropiosOcupados.add(`${finalF},${finalC}`);
        movimientos[ficha.id] = mejorDireccion;
    }

    return movimientos;
}

module.exports = { calcularNuevaPosicion, elegirMovimiento };