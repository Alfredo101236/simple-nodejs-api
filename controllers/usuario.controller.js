import { Usuario } from '../models/Usuario.js';

const obtenerSiguienteId = async () => {
    const ultimoUsuario = await Usuario.findOne().sort({ id: -1 });
    return ultimoUsuario ? ultimoUsuario.id + 1 : 1;
};

export const getUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.find().sort({ id: 1 });
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
};

export const getUsuario = async (req, res) => {
    try {
        const id = Number(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({ mensaje: 'El id debe ser numérico' });
        }

        const usuario = await Usuario.findOne({ id });

        if (!usuario) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }

        res.json(usuario);
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
};

export const createUsuario = async (req, res) => {
    try {
        const nuevoId = req.body.id ? Number(req.body.id) : await obtenerSiguienteId();

        const nuevoUsuario = new Usuario({
            id: nuevoId,
            usuario: req.body.usuario,
            password: req.body.password,
            rol: req.body.rol
        });

        const usuarioGuardado = await nuevoUsuario.save();

        res.status(201).json({
            mensaje: 'Usuario creado correctamente',
            usuario: usuarioGuardado
        });
    } catch (error) {
        res.status(400).json({
            mensaje: 'Datos inválidos. Revisa usuario, password y rol',
            error: error.message
        });
    }
};

export const updateUsuario = async (req, res) => {
    try {
        const id = Number(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({ mensaje: 'El id debe ser numérico' });
        }

        const usuarioActualizado = await Usuario.findOneAndUpdate(
            { id },
            {
                usuario: req.body.usuario,
                password: req.body.password,
                rol: req.body.rol
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!usuarioActualizado) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }

        res.json({
            mensaje: 'Usuario actualizado correctamente',
            usuario: usuarioActualizado
        });
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
};

export const deleteUsuario = async (req, res) => {
    try {
        const id = Number(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({ mensaje: 'El id debe ser numérico' });
        }

        const usuarioEliminado = await Usuario.findOneAndDelete({ id });

        if (!usuarioEliminado) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }

        res.json({
            mensaje: 'Usuario eliminado correctamente',
            usuario: usuarioEliminado
        });
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
};