let tablero = [];

for (let index = 0; index < 10; index++) {
    let fila = [];

    for (let j = 0; j < 10; j++) {
        fila.push(0);
    }

    tablero.push(fila);
}

tablero[0][0] = 'Ficha1';
tablero[9][9] = 'Ficha2';

let casasGeneradas = 0;

while (casasGeneradas < 5) {
    const fila = Math.floor(Math.random() * 10);
    const columna = Math.floor(Math.random() * 10);

    if (tablero[fila][columna] == 0) {
        tablero[fila][columna] = 'Casa';
        casasGeneradas++;
    }
}

function calcularNuevaPosicion(filaActual, columnaActual, pasos, direccion) {

    let nuevaFila = filaActual;
    let nuevaColumna = columnaActual;

    if (direccion == "N") {
        nuevaFila = (filaActual - pasos + 10) % 10
    } else if (direccion == "S") {
        nuevaFila = (filaActual + pasos + 10) % 10
    } else if (direccion == "E") {
        nuevaColumna = (columnaActual + pasos + 10) % 10
    } else {
        nuevaColumna = (columnaActual - pasos + 10) % 10
    }
    return [nuevaFila, nuevaColumna];
}
console.log(tablero);
console.log(calcularNuevaPosicion(0, 5, 2, "N"));
console.log(calcularNuevaPosicion(5, 9, 3, "E"));