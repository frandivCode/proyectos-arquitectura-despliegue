const request = require('supertest');
const app = require('./app'); // Importamos la app, pero no el server.js

describe('Pruebas del Bot "Casas en Disputa"', () => {

    test('GET /health - Debe responder estado 200 y OK', async () => {
        const respuesta = await request(app).get('/health');
        expect(respuesta.statusCode).toBe(200);
        expect(respuesta.body).toEqual({ status: "OK" });
    });

    test('POST /move - Debe devolver error 400 si el tablero está vacío', async () => {
        const respuesta = await request(app).post('/move').send({});
        expect(respuesta.statusCode).toBe(400);
        expect(respuesta.body.error).toBeDefined();
    });

    test('POST /move - Debe calcular la distancia y moverse al Este (E)', async () => {
        const estadoPrueba = {
            jugador: "A",
            dado: 3,
            tablero: [
                ["", "", "", "", "", "", "", "", "", ""],
                ["", "", "", "", "", "", "", "", "", ""],
                ["", "", "", "", "", "", "", "", "", ""],
                ["", "", "", "", "", "", "", "", "", ""],
                ["", "", "A1", "", "", "N", "", "", "", ""],
                ["", "", "", "", "", "", "", "", "", ""],
                ["", "", "", "", "", "", "", "", "", ""],
                ["", "", "", "", "", "", "", "", "", ""],
                ["", "", "", "", "", "", "", "", "", ""],
                ["", "", "", "", "", "", "", "", "", ""]
            ]
        };

        const respuesta = await request(app).post('/move').send(estadoPrueba);
        expect(respuesta.statusCode).toBe(200);
        // Esperamos que decida ir al Este para buscar la "N"
        expect(respuesta.body).toEqual({ "A1": "E" });
    });
});