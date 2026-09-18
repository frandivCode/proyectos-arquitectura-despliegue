# Entrega Técnica 2: Casas en Disputa - Modelado del Juego

## Decisiones de Modelado

**1. Estado inicial del tablero (10x10)**
Decidí representar el tablero utilizando una **matriz bidimensional**, es decir, un arreglo que contiene 10 arreglos de 10 posiciones.

- **Justificación:** Esta estructura se adapta muy bien a un sistema de coordenadas (fila, columna) y permite acceder a cualquier casilla en tiempo constante `O(1)`. Además, como es una estructura anidada, se puede serializar fácilmente a formato JSON para enviarla como estado del juego. Las posiciones vacías se inicializaron con el valor `0`.

**2. Generador de casas neutrales**
Para generar las 5 casas, utilicé un ciclo `while` combinado con `Math.random()`.

- **Justificación:** A diferencia de un ciclo `for` fijo, el `while` me permite seguir iterando hasta ubicar exactamente 5 posiciones válidas. También incorporé una validación con `if` para asegurar que las casas solo se coloquen en casillas con valor `0`, evitando pisar la posición inicial de los jugadores o superponerse con otra casa recién creada.

**3. Cálculo de movimientos (tablero toroidal)**
El cálculo de la nueva posición se separó en ejes: filas para Norte/Sur y columnas para Este/Oeste, según el movimiento ortogonal elegido.

- **Justificación matemática:** Para resolver el comportamiento toroidal, es decir, que al salir del tablero se reingrese por el lado opuesto, aplicué el operador módulo `%`. La fórmula utilizada fue `(posicionActual + pasos + 10) % 10`. Sumar el tamaño del tablero (`10`) antes del módulo evita resultados negativos en JavaScript al restar posiciones, lo que garantiza que la ficha reaparezca correctamente por el extremo opuesto.
