import express from 'express';
import { leerJSON, escribirJSON } from '../utils/fileManager.js';
import { join } from 'path';

const router = express.Router();
const filePath = join(process.cwd(), 'data', 'ventas.json');

// GET - listar todas las ventas
router.get('/', async (req, res) => {
  const ventas = await leerJSON(filePath);
  res.json(ventas);
});

// GET - venta por ID
router.get('/:id', async (req, res) => {
  const ventas = await leerJSON(filePath);
  const venta = ventas.find(v => v.id == req.params.id);
  venta ? res.json(venta) : res.status(404).json({ error: 'Venta no encontrada' });
});

// POST - agregar venta
router.post('/', async (req, res) => {
  const ventas = await leerJSON(filePath);
  const nuevaVenta = { id: Date.now(), ...req.body };
  ventas.push(nuevaVenta);
  await escribirJSON(filePath, ventas);
  res.status(201).json(nuevaVenta);
});

// PUT - actualizar venta
router.put('/:id', async (req, res) => {
  const ventas = await leerJSON(filePath);
  const index = ventas.findIndex(v => v.id == req.params.id);
  if (index !== -1) {
    ventas[index] = { ...ventas[index], ...req.body };
    await escribirJSON(filePath, ventas);
    res.json(ventas[index]);
  } else {
    res.status(404).json({ error: 'Venta no encontrada' });
  }
});

// DELETE - eliminar venta
router.delete('/:id', async (req, res) => {
  const ventas = await leerJSON(filePath);
  const nuevoArray = ventas.filter(v => v.id != req.params.id);
  if (ventas.length === nuevoArray.length) {
    res.status(404).json({ error: 'Venta no encontrada' });
  } else {
    await escribirJSON(filePath, nuevoArray);
    res.json({ mensaje: 'Venta eliminada' });
  }
});

export default router;
