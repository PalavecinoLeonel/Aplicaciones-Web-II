import express from 'express';
import { leerJSON, escribirJSON } from '../utils/fileManager.js';
import { join } from 'path';

const router = express.Router();
const filePath = join('data', 'productos.json');

// GET - listar todos los productos
router.get('/', (req, res) => {
  const productos = readData(filePath);
  res.json(productos);
});

// GET - producto por ID
router.get('/:id', (req, res) => {
  const productos = readData(filePath);
  const producto = productos.find(p => p.id == req.params.id);
  producto ? res.json(producto) : res.status(404).json({ error: 'Producto no encontrado' });
});

// POST - agregar producto
router.post('/', (req, res) => {
  const productos = readData(filePath);
  const nuevoProducto = { id: Date.now(), ...req.body };
  productos.push(nuevoProducto);
  writeData(filePath, productos);
  res.status(201).json(nuevoProducto);
});

// PUT - actualizar producto
router.put('/:id', (req, res) => {
  const productos = readData(filePath);
  const index = productos.findIndex(p => p.id == req.params.id);
  if (index !== -1) {
    productos[index] = { ...productos[index], ...req.body };
    writeData(filePath, productos);
    res.json(productos[index]);
  } else {
    res.status(404).json({ error: 'Producto no encontrado' });
  }
});

// DELETE - eliminar producto
router.delete('/:id', (req, res) => {
  const productos = readData(filePath);
  const nuevoArray = productos.filter(p => p.id != req.params.id);
  if (productos.length === nuevoArray.length) {
    res.status(404).json({ error: 'Producto no encontrado' });
  } else {
    writeData(filePath, nuevoArray);
    res.json({ mensaje: 'Producto eliminado' });
  }
});

export default router;