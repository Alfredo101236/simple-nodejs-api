import { Articulo } from '../models/Articulo.js';

const obtenerSiguienteId = async () => {
    const ultimoArticulo = await Articulo.findOne().sort({ id: -1 });
    return ultimoArticulo ? ultimoArticulo.id + 1 : 1;
};

export const getArticulos = async (req, res) => {
    try {
        const articulos = await Articulo.find().sort({ id: 1 });
        res.json(articulos);
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
};

export const getArticulo = async (req, res) => {
    try {
        const id = Number(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({ mensaje: 'El id debe ser numérico' });
        }

        const articulo = await Articulo.findOne({ id });

        if (!articulo) {
            return res.status(404).json({ mensaje: 'Artículo no encontrado' });
        }

        res.json(articulo);
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
};

export const createArticulo = async (req, res) => {
    try {
        const nuevoId = req.body.id ? Number(req.body.id) : await obtenerSiguienteId();

        const nuevoArticulo = new Articulo({
            id: nuevoId,
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            precio: req.body.precio,
            stock: req.body.stock
        });

        const articuloGuardado = await nuevoArticulo.save();

        res.status(201).json({
            mensaje: 'Artículo creado correctamente',
            articulo: articuloGuardado
        });
    } catch (error) {
        res.status(400).json({
            mensaje: 'Datos inválidos para el artículo',
            error: error.message
        });
    }
};

export const updateArticulo = async (req, res) => {
    try {
        const id = Number(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({ mensaje: 'El id debe ser numérico' });
        }

        const articuloActualizado = await Articulo.findOneAndUpdate(
            { id },
            {
                nombre: req.body.nombre,
                descripcion: req.body.descripcion,
                precio: req.body.precio,
                stock: req.body.stock
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!articuloActualizado) {
            return res.status(404).json({ mensaje: 'Artículo no encontrado' });
        }

        res.json({
            mensaje: 'Artículo actualizado correctamente',
            articulo: articuloActualizado
        });
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
};

export const deleteArticulo = async (req, res) => {
    try {
        const id = Number(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({ mensaje: 'El id debe ser numérico' });
        }

        const articuloEliminado = await Articulo.findOneAndDelete({ id });

        if (!articuloEliminado) {
            return res.status(404).json({ mensaje: 'Artículo no encontrado' });
        }

        res.json({
            mensaje: 'Artículo eliminado correctamente',
            articulo: articuloEliminado
        });
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
};