import { Router } from 'express';
import {
    getArticulos,
    getArticulo,
    createArticulo,
    updateArticulo,
    deleteArticulo
} from '../controllers/articulo.controller.js';

const router = Router();

router.get('/articulos', getArticulos);
router.get('/articulos/:id', getArticulo);
router.post('/articulos', createArticulo);
router.put('/articulos/:id', updateArticulo);
router.delete('/articulos/:id', deleteArticulo);

export default router;