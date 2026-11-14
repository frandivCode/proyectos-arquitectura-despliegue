const app = require('./app');

const PORT = process.env.PORT || 3000;

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Bot escuchando en el puerto ${PORT}`);
    });
}

module.exports = app;