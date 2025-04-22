import fs from 'fs/promises';
const dataPath = './data';

export async function leerJSON(nombreArchivo) {
  const datos = await fs.readFile(`${dataPath}/${nombreArchivo}`, 'utf-8');
  return JSON.parse(datos);
}

export async function escribirJSON(nombreArchivo, datos) {
  await fs.writeFile(`${dataPath}/${nombreArchivo}`, JSON.stringify(datos, null, 2));
}