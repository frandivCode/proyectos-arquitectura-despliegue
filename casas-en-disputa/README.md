# Entrega Técnica: Casas en Disputa - Modelado e Inteligencia del Bot

## Decisiones de Modelado y Arquitectura

### 1. Estado inicial del tablero (10x10)

Decidí representar el tablero utilizando una **matriz bidimensional** (un arreglo que contiene 10 arreglos de 10 posiciones).

- **Justificación:** Esta estructura se mapea perfectamente a un sistema de coordenadas (fila, columna) y permite acceder a cualquier casilla en tiempo constante `O(1)`. Además, al ser arreglos anidados, se puede serializar fácilmente a formato JSON para enviarlo como estado. Las posiciones vacías se inicializaron en `0` (o `""`).

### 2. Generador de Casas Neutrales

Para la generación de las 5 casas, utilicé un ciclo `while` combinado con `Math.random()`.

- **Justificación:** A diferencia de un ciclo `for` estricto, el `while` me garantiza que el bucle seguirá iterando hasta ubicar exactamente 5 casas válidas. Se incluyó una validación `if` para asegurar que las casas solo se coloquen en casillas vacías, evitando pisar la posición inicial de los jugadores o superponerse con otra casa recién creada.

### 3. Cálculo de Movimientos (Tablero Toroidal)

El cálculo de la nueva posición se independizó en ejes (Filas para Norte/Sur, Columnas para Este/Oeste) dependiendo del movimiento ortogonal elegido.

- **Justificación Matemática:** Para resolver el comportamiento toroidal (atravesar bordes) sin escribir múltiples condicionales restrictivos, apliqué el **operador módulo (`%`)**. La fórmula utilizada fue `(posicionActual + pasos + 10) % 10`. Sumar el tamaño del tablero (`10`) antes del módulo previene resultados negativos en JavaScript al restar posiciones, garantizando que la ficha reaparezca correctamente por el extremo opuesto.

### 4. Arquitectura Modular del Servidor (Node.js & Express)

Se fragmentó la aplicación original de un único archivo hacia una estructura de responsabilidades separadas: `server.js` (encendido), `app.js` (configuración y middlewares), `move.js` (controlador de rutas) y `estrategia.js` (lógica del juego).

- **Justificación:** Aislar la capa de red (el `listen` del puerto) de la lógica de negocio permite escalar el código fácilmente. Más importante aún, esta separación es un requisito indispensable para poder importar la aplicación en entornos de prueba automatizados sin dejar puertos bloqueados en el sistema operativo.

### 5. Estrategia de Búsqueda Óptima (Distancia Manhattan Toroidal)

Para la toma de decisiones del bot, se implementó un algoritmo que escanea el tablero, guarda las coordenadas y busca la casa neutral más cercana calculando la distancia en ambos ejes con la fórmula `Math.min(directa, 10 - directa)`.

- **Justificación:** El bot debe ser capaz de reconocer que, en un espacio toroidal de 10x10, la distancia máxima real a cualquier punto es de 5 casillas. Al evaluar simultáneamente el "camino interno" y el "camino por el borde", la lógica matemática prioriza cruzar los límites del mapa cuando la distancia directa supera los 5 pasos, optimizando drásticamente la ruta hacia la conquista.

### 6. Testing Automatizado y Entorno de Depuración

Se integraron las herramientas `Jest` y `Supertest` para evaluar el correcto funcionamiento de los endpoints, y se configuró un archivo `launch.json` para la depuración en VS Code.

- **Justificación:** `Supertest` permite simular el envío del tablero JSON por parte del árbitro mediante peticiones falsas a `POST /move` sin necesidad de levantar el servidor HTTP real. Además, la configuración del depurador permite establecer puntos de interrupción (_breakpoints_) durante la ejecución de las pruebas, lo cual resulta fundamental para trazar paso a paso los valores de las variables matemáticas al calcular las distancias toroidales.
