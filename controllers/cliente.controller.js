import { Cliente } from '../models/Cliente.js';

const obtenerSiguienteId = async () => {
    const ultimoCliente = await Cliente.findOne().sort({ id: -1 });
    return ultimoCliente ? ultimoCliente.id + 1 : 1;
};

export const getClientes = async (req, res) => {
    try {
        const clientes = await Cliente.find().sort({ id: 1 });
        res.json(clientes);
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
};

export const getCliente = async (req, res) => {
    try {
        const id = Number(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({ mensaje: 'El id debe ser numérico' });
        }

        const cliente = await Cliente.findOne({ id });

        if (!cliente) {
            return res.status(404).json({ mensaje: 'Cliente no encontrado' });
        }

        res.json(cliente);
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
};

export const createCliente = async (req, res) => {
    try {
        const nuevoId = req.body.id ? Number(req.body.id) : await obtenerSiguienteId();

        const nuevoCliente = new Cliente({
            id: nuevoId,
            nombre: req.body.nombre,
            correo: req.body.correo,
            telefono: req.body.telefono,
            direccion: req.body.direccion
        });

        const clienteGuardado = await nuevoCliente.save();

        res.status(201).json({
            mensaje: 'Cliente creado correctamente',
            cliente: clienteGuardado
        });
    } catch (error) {
        res.status(400).json({
            mensaje: 'Datos inválidos para el cliente',
            error: error.message
        });
    }
};

export const updateCliente = async (req, res) => {
    try {
        const id = Number(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({ mensaje: 'El id debe ser numérico' });
        }

        const clienteActualizado = await Cliente.findOneAndUpdate(
            { id },
            {
                nombre: req.body.nombre,
                correo: req.body.correo,
                telefono: req.body.telefono,
                direccion: req.body.direccion
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!clienteActualizado) {
            return res.status(404).json({ mensaje: 'Cliente no encontrado' });
        }

        res.json({
            mensaje: 'Cliente actualizado correctamente',
            cliente: clienteActualizado
        });
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
};

export const deleteCliente = async (req, res) => {
    try {
        const id = Number(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({ mensaje: 'El id debe ser numérico' });
        }

        const clienteEliminado = await Cliente.findOneAndDelete({ id });

        if (!clienteEliminado) {
            return res.status(404).json({ mensaje: 'Cliente no encontrado' });
        }

        res.json({
            mensaje: 'Cliente eliminado correctamente',
            cliente: clienteEliminado
        });
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
};