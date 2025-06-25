import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataPath = path.join(__dirname, '..', 'data');

console.log('🔍 dataPath:', dataPath);

export async function leerJSON(nombreArchivo) {
  const ruta = path.join(dataPath, nombreArchivo);
  const datos = await fs.readFile(ruta, 'utf-8');
  return JSON.parse(datos);
}

export async function escribirJSON(nombreArchivo, datos) {
  const ruta = path.join(dataPath, nombreArchivo);
  await fs.writeFile(ruta, JSON.stringify(datos, null, 2));
}
