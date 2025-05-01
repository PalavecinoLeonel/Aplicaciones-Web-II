import express from 'express';
import { leerJSON, escribirJSON } from '../utils/fileManager.js';
import { join } from 'path';

const router = express.Router();
const filePath = join(process.cwd(), 'data', 'usuarios.json');

// GET - listar todos los usuarios
router.get('/', async (req, res) => {
  const usuarios = await leerJSON(filePath);
  res.json(usuarios);
});

// GET - usuario por ID
router.get('/:id', async (req, res) => {
  const usuarios = await leerJSON(filePath);
  const usuario = usuarios.find(u => u.id == req.params.id);
  usuario ? res.json(usuario) : res.status(404).json({ error: 'Usuario no encontrado' });
});

// POST - agregar usuario
router.post('/', async (req, res) => {
  const usuarios = await leerJSON(filePath);
  const nuevoUsuario = { id: Date.now(), ...req.body };
  usuarios.push(nuevoUsuario);
  await escribirJSON(filePath, usuarios);
  res.status(201).json(nuevoUsuario);
});

// PUT - actualizar usuario
router.put('/:id', async (req, res) => {
  const usuarios = await leerJSON(filePath);
  const index = usuarios.findIndex(u => u.id == req.params.id);
  if (index !== -1) {
    usuarios[index] = { ...usuarios[index], ...req.body };
    await escribirJSON(filePath, usuarios);
    res.json(usuarios[index]);
  } else {
    res.status(404).json({ error: 'Usuario no encontrado' });
  }
});

// DELETE - eliminar usuario
router.delete('/:id', async (req, res) => {
  const usuarios = await leerJSON(filePath);
  const ventas = await leerJSON(join(process.cwd(), 'data', 'ventas.json'));

  const usuarioId = Number(req.params.id);
  const index = usuarios.findIndex(u => u.id === usuarioId);

  if (index === -1) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }

  // Filtrar ventas asociadas al usuario
  const ventasActualizadas = ventas.filter(v => v.usuarioId !== usuarioId);
  await escribirJSON(join(process.cwd(), 'data', 'ventas.json'), ventasActualizadas);

  // Eliminar usuario
  const eliminado = usuarios.splice(index, 1)[0];
  await escribirJSON(filePath, usuarios);

  res.json({ mensaje: 'Usuario eliminado junto con sus ventas asociadas', eliminado });
});

export default router;