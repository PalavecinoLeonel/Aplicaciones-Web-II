import express from 'express';
import cors from 'cors';
import productosRoutes from './routes/productos.js';
import usuariosRoutes from './routes/usuarios.js';
import ventasRoutes from './routes/ventas.js';
import { join } from 'path';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Rutas API
app.use('/api/productos', productosRoutes);
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/ventas', ventasRoutes);

// Front
app.use(express.static(join(process.cwd(), 'public')));

// Para hacer start server
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});