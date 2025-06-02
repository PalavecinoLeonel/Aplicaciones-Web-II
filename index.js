import express from 'express';
import productosRoutes from './routes/productos.js';
import usuariosRoutes from './routes/usuarios.js';
import ventasRoutes from './routes/ventas.js';

const app = express();
app.use(express.json());
app.use(express.static('public'));

// Rutas
app.use('/api/productos', productosRoutes);
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/ventas', ventasRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});