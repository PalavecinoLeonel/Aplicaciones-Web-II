import express from 'express';
import { leerJSON, escribirJSON } from '../utils/fileManager.js';
import { join } from 'path';

const router = express.Router();
const filePath = join(process.cwd(), 'data', 'productos.json');
const ventasFilePath = join(process.cwd(), 'data', 'ventas.json');

// GET - listar todos los productos
router.get('/', async (req, res) => {
  const productos = await leerJSON(filePath);
  res.json(productos);
});

// GET - producto por ID
router.get('/:id', async (req, res) => {
  const productos = await leerJSON(filePath);
  const producto = productos.find(p => p.id == req.params.id);
  producto ? res.json(producto) : res.status(404).json({ error: 'Producto no encontrado' });
});

// POST - agregar producto
router.post('/', async (req, res) => {
  const productos = await leerJSON(filePath);
  const nuevoProducto = { id: Date.now(), ...req.body };
  productos.push(nuevoProducto);
  await escribirJSON(filePath, productos);
  res.status(201).json(nuevoProducto);
});

// PUT - actualizar producto
router.put('/:id', async (req, res) => {
  const productos = await leerJSON(filePath);
  const index = productos.findIndex(p => p.id == req.params.id);
  if (index !== -1) {
    productos[index] = { ...productos[index], ...req.body };
    await escribirJSON(filePath, productos);
    res.json(productos[index]);
  } else {
    res.status(404).json({ error: 'Producto no encontrado' });
  }
});

// DELETE - eliminar producto
router.delete('/:id', async (req, res) => {
  const productos = await leerJSON(filePath);
  const ventas = await leerJSON(ventasFilePath);

  // Es un filtro para las ventas que contienen el producto que se quiere eliminar
  const ventasFiltradas = ventas.filter(venta => venta.productoId != req.params.id);

  // Si el número de ventas no cambió, significa que no había ventas relacionadas con ese producto
  if (ventas.length === ventasFiltradas.length) {
    return res.status(404).json({ error: 'Producto no relacionado con ninguna venta' });
  }

  // Eliminar el producto de la lista de productos
  const nuevoArray = productos.filter(p => p.id != req.params.id);

  // Verificar si el producto fue encontrado
  if (productos.length === nuevoArray.length) {
    return res.status(404).json({ error: 'Producto no encontrado' });
  }

  // Guardar los cambios en ventas y productos
  await escribirJSON(ventasFilePath, ventasFiltradas);
  await escribirJSON(filePath, nuevoArray);

  res.json({ mensaje: 'Producto y sus ventas relacionadas eliminados' });
});

export default router;