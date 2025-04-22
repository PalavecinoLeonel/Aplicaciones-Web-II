import express from 'express';
import { leerJSON, escribirJSON } from '../utils/fileManager.js';
import { join } from 'path';

const router = express.Router();
const filePath = join('data', 'ventas.json');

router.get('/', (req, res) => {
  res.json(readData(filePath));
});

router.get('/:id', (req, res) => {
  const data = readData(filePath);
  const item = data.find(v => v.id == req.params.id);
  item ? res.json(item) : res.status(404).json({ error: 'Venta no encontrada' });
});

router.post('/', (req, res) => {
  const data = readData(filePath);
  const nueva = { id: Date.now(), ...req.body };
  data.push(nueva);
  writeData(filePath, data);
  res.status(201).json(nueva);
});

router.post('/usuario', (req, res) => {
  const { id_usuario } = req.body;
  const data = readData(filePath);
  const ventasUsuario = data.filter(v => v.id_usuario == id_usuario);
  res.json(ventasUsuario);
});

router.put('/:id', (req, res) => {
  const data = readData(filePath);
  const index = data.findIndex(v => v.id == req.params.id);
  if (index !== -1) {
    data[index] = { ...data[index], ...req.body };
    writeData(filePath, data);
    res.json(data[index]);
  } else {
    res.status(404).json({ error: 'Venta no encontrada' });
  }
});

export default router;