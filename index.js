import app from './app.js';
import { connectDB } from './database/db.js';

const PORT = 3000;

async function main() {
    await connectDB();

    app.listen(PORT, '0.0.0.0', () => {
        console.log(`Servidor Express corriendo en http://0.0.0.0:${PORT}`);
        console.log(`Prueba en navegador: http://IP-DE-UBUNTU:${PORT}/usuarios`);
    });
}

main();