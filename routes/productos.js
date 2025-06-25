import express from 'express';
import { leerJSON, escribirJSON } from '../utils/fileManager.js';



const router = express.Router();

const productosArchivo = 'productos.json';
const ventasArchivo = 'ventas.json';

router.get('/', async (req, res) => {
  const productos = await leerJSON(productosArchivo);
  res.json(productos);
});

router.get('/:id', async (req, res) => {
  const productos = await leerJSON(productosArchivo);
  const producto = productos.find(p => p.id == req.params.id);
  producto ? res.json(producto) : res.status(404).json({ error: 'Producto no encontrado' });
});

router.post('/', async (req, res) => {
  const productos = await leerJSON(productosArchivo);
  const nuevoProducto = { id: Date.now(), ...req.body };
  productos.push(nuevoProducto);
  await escribirJSON(productosArchivo, productos);
  res.status(201).json(nuevoProducto);
});

router.put('/:id', async (req, res) => {
  const productos = await leerJSON(productosArchivo);
  const index = productos.findIndex(p => p.id == req.params.id);
  if (index !== -1) {
    productos[index] = { ...productos[index], ...req.body };
    await escribirJSON(productosArchivo, productos);
    res.json(productos[index]);
  } else {
    res.status(404).json({ error: 'Producto no encontrado' });
  }
});

router.delete('/:id', async (req, res) => {
  const productos = await leerJSON(productosArchivo);
  const ventas = await leerJSON(ventasArchivo);

  const ventasFiltradas = ventas.filter(venta => venta.productoId != req.params.id);

  if (ventas.length === ventasFiltradas.length) {
    return res.status(404).json({ error: 'Producto no relacionado con ninguna venta' });
  }

  const nuevoArray = productos.filter(p => p.id != req.params.id);

  if (productos.length === nuevoArray.length) {
    return res.status(404).json({ error: 'Producto no encontrado' });
  }

  await escribirJSON(ventasArchivo, ventasFiltradas);
  await escribirJSON(productosArchivo, nuevoArray);

  res.json({ mensaje: 'Producto y sus ventas relacionadas eliminados' });
});

export default router;