import express from 'express';
import { leerJSON, escribirJSON } from '../utils/fileManager.js';
import { join } from 'path';

const router = express.Router();
const filePath = join('data', 'usuarios.json');

router.get('/', (req, res) => {
  res.json(readData(filePath));
});

router.get('/:id', (req, res) => {
  const data = readData(filePath);
  const item = data.find(u => u.id == req.params.id);
  item ? res.json(item) : res.status(404).json({ error: 'Usuario no encontrado' });
});

router.post('/', (req, res) => {
  const data = readData(filePath);
  const nuevo = { id: Date.now(), ...req.body };
  data.push(nuevo);
  writeData(filePath, data);
  res.status(201).json(nuevo);
});

router.post('/login', (req, res) => {
  const { email, contraseña } = req.body;
  const data = readData(filePath);
  const usuario = data.find(u => u.email === email && u.contraseña === contraseña);
  usuario ? res.json({ mensaje: 'Login correcto', usuario }) : res.status(401).json({ error: 'Credenciales inválidas' });
});

router.put('/:id', (req, res) => {
  const data = readData(filePath);
  const index = data.findIndex(u => u.id == req.params.id);
  if (index !== -1) {
    data[index] = { ...data[index], ...req.body };
    writeData(filePath, data);
    res.json(data[index]);
  } else {
    res.status(404).json({ error: 'Usuario no encontrado' });
  }
});

router.delete('/:id', (req, res) => {
  const usuarios = readData(filePath);
  const ventas = readData(join('data', 'ventas.json'));
  const userVentas = ventas.find(v => v.id_usuario == req.params.id);
  if (userVentas) {
    return res.status(400).json({ error: 'No se puede eliminar un usuario con ventas asociadas' });
  }
  const nuevos = usuarios.filter(u => u.id != req.params.id);
  if (usuarios.length === nuevos.length) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }
  writeData(filePath, nuevos);
  res.json({ mensaje: 'Usuario eliminado correctamente' });
});

export default router;