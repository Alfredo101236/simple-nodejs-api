import express from 'express';
import usuarioRoutes from './routes/usuario.routes.js';
import articuloRoutes from './routes/articulo.routes.js';
import clienteRoutes from './routes/cliente.routes.js';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send(`
        <h1>API REST con Express, MongoDB y Mongoose funcionando</h1>
        <p>Rutas disponibles:</p>
        <ul>
            <li>GET /usuarios</li>
            <li>GET /usuarios/:id</li>
            <li>POST /usuarios</li>
            <li>PUT /usuarios/:id</li>
            <li>DELETE /usuarios/:id</li>
            <li>GET /articulos</li>
            <li>GET /clientes</li>
        </ul>
    `);
});

app.use(usuarioRoutes);
app.use(articuloRoutes);
app.use(clienteRoutes);

export default app;