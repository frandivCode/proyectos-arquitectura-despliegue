# 📚 Proyectos - Arquitectura y Despliegue

Repositorio correspondiente a la materia **Arquitectura y Despliegue**, donde se encuentran diferentes trabajos prácticos y ejercicios relacionados con el desarrollo, ejecución y organización de proyectos utilizando **Node.js, JavaScript, npm y Git**.

---

## 📂 Contenido del repositorio

### 🔹 01 - Proyecto Diagnóstico

Primer proyecto práctico orientado al reconocimiento del entorno de **Node.js** y el uso de **npm**.

En este proyecto se trabaja con:

* Objeto nativo `process` de Node.js.
* `console.log()`.
* Acceso a propiedades mediante notación de punto.
* Argumentos recibidos desde la terminal mediante `process.argv`.
* Inicialización de proyectos con `npm`.
* Creación y configuración de `package.json`.
* Ejecución de scripts personalizados mediante npm.

Para ejecutarlo:

```bash
cd 01-proyecto
npm install
npm run diagnostico
```

El proyecto contiene principalmente:

```text
01-proyecto/
├── img/
├── diagnostico.js
├── package.json
└── README.md
```

---

### 🔹 02 - Casas en Disputa

Segundo proyecto práctico centrado en el **modelado de un juego utilizando JavaScript**.

El proyecto representa un tablero de **10 × 10** mediante una matriz bidimensional y permite trabajar con diferentes elementos del juego.

Entre los conceptos utilizados se encuentran:

* Matrices bidimensionales.
* Generación de posiciones aleatorias.
* Validación de posiciones.
* Movimiento de jugadores.
* Coordenadas de tablero.
* Operador módulo `%`.
* Tableros toroidales.
* Manejo de estados mediante estructuras de datos.

#### 🧩 Tablero

El tablero se representa mediante una matriz de 10 filas por 10 columnas:

```text
10 × 10
```

Cada posición representa una casilla del tablero.

Esta estructura permite acceder a una posición utilizando coordenadas:

```javascript
tablero[fila][columna]
```

#### 🏠 Casas neutrales

Las casas se generan de manera aleatoria utilizando `Math.random()`.

El sistema verifica que una casa solamente pueda colocarse en una posición disponible, evitando ocupar una casilla que ya esté utilizada.

#### 🔄 Movimiento toroidal

El tablero permite atravesar los límites y aparecer nuevamente por el extremo contrario.

Para conseguir este comportamiento se utiliza el operador módulo:

```javascript
(nuevaPosicion + tamañoTablero) % tamañoTablero
```

De esta manera, los jugadores pueden desplazarse más allá de los límites del tablero sin generar posiciones inválidas.

---

## 🛠️ Tecnologías utilizadas

| Tecnología     | Uso                             |
| -------------- | ------------------------------- |
| **JavaScript** | Desarrollo de los proyectos     |
| **Node.js**    | Ejecución del código JavaScript |
| **npm**        | Gestión de paquetes y scripts   |
| **Git**        | Control de versiones            |
| **GitHub**     | Almacenamiento y colaboración   |

---

## 🚀 Instalación

Para obtener una copia local del repositorio:

```bash
git clone https://github.com/frandivCode/proyectos-arquitectura-despliegue.git
```

Ingresar al proyecto:

```bash
cd proyectos-arquitectura-despliegue
```

Desde allí se puede acceder a cada uno de los trabajos.

---

## ▶️ Ejecución

Cada proyecto posee su propio `README.md` con información específica sobre su funcionamiento y ejecución.

### Proyecto Diagnóstico

```bash
cd 01-proyecto
npm install
npm run diagnostico
```

### Casas en Disputa

```bash
cd casas-en-disputa
node index.js
```

---

## 🎯 Objetivos

Los principales objetivos de estos proyectos son:

* Comprender el funcionamiento básico de **Node.js**.
* Familiarizarse con el gestor de paquetes **npm**.
* Utilizar correctamente argumentos de línea de comandos.
* Practicar estructuras de datos en JavaScript.
* Aplicar lógica de programación a un problema concreto.
* Modelar estados y comportamientos de un sistema.
* Utilizar **Git y GitHub** para gestionar el código fuente.
* Aplicar buenas prácticas de organización y documentación.

---

## 📁 Estructura general

```text
proyectos-arquitectura-despliegue/
│
├── 01-proyecto/
│   ├── img/
│   ├── diagnostico.js
│   ├── package.json
│   └── README.md
│
├── casas-en-disputa/
│   ├── index.js
│   └── README.md
│
└── README.md
```

---

## 👨‍💻 Autor

**fran Zapata**
**Mati Menchaca

Repositorio:

https://github.com/frandivCode/proyectos-arquitectura-despliegue
