import mongoose from 'mongoose';

const usuarioSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    usuario: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    rol: {
        type: String,
        required: true,
        enum: ['admin', 'empleado', 'gerente']
    }
}, {
    timestamps: true
});

export const Usuario = mongoose.model('Usuario', usuarioSchema, 'usuarios');