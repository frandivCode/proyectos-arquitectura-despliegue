# Entrega Técnica 2: Casas en Disputa - Modelado del Juego

## Decisiones de Modelado

**1. Estado inicial del tablero (10x10)**
Decidí representar el tablero utilizando una **matriz bidimensional** (un arreglo que contiene 10 arreglos de 10 posiciones).

- **Justificación:** Esta estructura se mapea perfectamente a un sistema de coordenadas (fila, columna) y permite acceder a cualquier casilla en tiempo constante `O(1)`. Además, al ser arreglos anidados, se puede serializar fácilmente a formato JSON para enviarlo como estado. Las posiciones vacías se inicializaron en `0`.

**2. Generador de Casas Neutrales**
Para la generación de las 5 casas, utilicé un ciclo `while` combinado con `Math.random()`.

- **Justificación:** A diferencia de un ciclo `for` estricto, el `while` me garantiza que el bucle seguirá iterando hasta ubicar exactamente 5 casas válidas. Se incluyó una validación `if` para asegurar que las casas solo se coloquen en casillas con valor `0`, evitando pisar la posición inicial de los jugadores o superponerse con otra casa recién creada.

**3. Cálculo de Movimientos (Tablero Toroidal)**
El cálculo de la nueva posición se independizó en ejes (Filas para Norte/Sur, Columnas para Este/Oeste) dependiendo del movimiento ortogonal elegido.

- **Justificación Matemática:** Para resolver el comportamiento toroidal (atravesar bordes) sin escribir múltiples condicionales restrictivos, apliqué el **operador módulo (`%`)**. La fórmula utilizada fue `(posicionActual + pasos + 10) % 10`. Sumar el tamaño del tablero (`10`) antes del módulo previene resultados negativos en JavaScript al restar posiciones, garantizando que la ficha reaparezca correctamente por el extremo opuesto.
