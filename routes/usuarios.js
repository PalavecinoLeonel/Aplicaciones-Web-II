import express from 'express';
import { leerJSON, escribirJSON } from '../utils/fileManager.js';
import { join } from 'path';
import bcrypt from 'bcrypt';

const router = express.Router();
const filePath = 'usuarios.json';
//const filePath = join(process.cwd(), 'data', 'usuarios.json');

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
  const { nombre, apellido, email, password, fechaNacimiento } = req.body;

  if (!nombre || !email || !password || !fechaNacimiento) {
    return res.status(400).json({ error: 'Faltan campos requeridos' });
  }

  const usuarios = await leerJSON(filePath);
  const existe = usuarios.find(u => u.email === email);

  if (existe) {
    return res.status(409).json({ error: 'El usuario ya existe' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const nuevoUsuario = {
    id: Date.now(),
    nombre,
    apellido,
    email,
    contraseña: hashedPassword,
    fechaNacimiento,
    activo: true
  };

  usuarios.push(nuevoUsuario);
  await escribirJSON(filePath, usuarios);

  res.status(201).json({ mensaje: 'Usuario registrado con éxito' });
});

router.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email y contraseña son requeridos' });
  }

  const usuarios = await leerJSON(filePath);
  const usuario = usuarios.find(u => u.email === email);

  if (!usuario) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }

  if (!usuario.activo) {
    return res.status(403).json({ error: 'Usuario inactivo' });
  }

  const passwordCorrecta = await bcrypt.compare(password, usuario.contraseña);

  if (!passwordCorrecta) {
    return res.status(401).json({ error: 'Contraseña incorrecta' });
  }

  // Omitir la contraseña antes de enviar al frontend
  const { contraseña, ...usuarioSinContraseña } = usuario;
  res.json(usuarioSinContraseña);
});













/*
router.post('/', async (req, res) => {
  const usuarios = await leerJSON(filePath);
  const nuevoUsuario = { id: Date.now(), ...req.body };
  usuarios.push(nuevoUsuario);
  await escribirJSON(filePath, usuarios);
  res.status(201).json(nuevoUsuario);
});
*/

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