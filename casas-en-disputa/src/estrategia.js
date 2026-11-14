function calcularNuevaPosicion(filaActual, columnaActual, pasos, direccion) {
    let nuevaFila = filaActual;
    let nuevaColumna = columnaActual;

    if (direccion == "N") { nuevaFila = (filaActual - pasos + 10) % 10; }
    else if (direccion == "S") { nuevaFila = (filaActual + pasos + 10) % 10; }
    else if (direccion == "E") { nuevaColumna = (columnaActual + pasos + 10) % 10; }
    else { nuevaColumna = (columnaActual - pasos + 10) % 10; }

    return [nuevaFila, nuevaColumna];
}

function distanciaToroidal(pos1, pos2) {
    let directa = Math.abs(pos1 - pos2);
    return Math.min(directa, 10 - directa);
}

function elegirMovimiento(estadoTablero) {
    const jugador = estadoTablero.jugador;
    const tablero = estadoTablero.tablero;
    let misFichas = [];
    let casas = [];

    for (let f = 0; f < 10; f++) {
        for (let c = 0; c < 10; c++) {
            if (tablero[f][c] === "N") {
                casas.push({ fila: f, columna: c });
            } else if (tablero[f][c] !== "" && tablero[f][c].startsWith(jugador)) {
                misFichas.push({ id: tablero[f][c], fila: f, columna: c });
            }
        }
    }

    let movimientos = {};

    for (let i = 0; i < misFichas.length; i++) {
        let ficha = misFichas[i];

        if (casas.length === 0) {
            movimientos[ficha.id] = "N";
            continue;
        }

        let casaMasCercana = casas[0];
        let distanciaMinima = 100;

        for (let j = 0; j < casas.length; j++) {
            let casa = casas[j];
            let distFila = distanciaToroidal(ficha.fila, casa.fila);
            let distCol = distanciaToroidal(ficha.columna, casa.columna);
            let distanciaTotal = distFila + distCol;

            if (distanciaTotal < distanciaMinima) {
                distanciaMinima = distanciaTotal;
                casaMasCercana = casa;
            }
        }

        let dirFila = casaMasCercana.fila - ficha.fila;
        let dirCol = casaMasCercana.columna - ficha.columna;

        let distFilaToroidal = distanciaToroidal(ficha.fila, casaMasCercana.fila);
        let direccionElegida = "N";

        if (distFilaToroidal > 0) {
            if (dirFila > 0) {
                direccionElegida = dirFila <= 5 ? "S" : "N";
            } else {
                direccionElegida = Math.abs(dirFila) <= 5 ? "N" : "S";
            }
        } else {
            if (dirCol > 0) {
                direccionElegida = dirCol <= 5 ? "E" : "O";
            } else {
                direccionElegida = Math.abs(dirCol) <= 5 ? "O" : "E";
            }
        }

        movimientos[ficha.id] = direccionElegida;
    }

    return movimientos;
}

module.exports = { calcularNuevaPosicion, elegirMovimiento };