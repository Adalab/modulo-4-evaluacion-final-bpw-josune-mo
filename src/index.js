// Importaciones
const express = require("express");
const mysql = require("mysql2/promise");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware para parsear JSON
app.use(express.json());
app.use(cors());

// Servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

// Conexión a la BBDD con variables de entorno
const getConnection = async () => {
  return await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
  });
};

// Insertar una nueva frase
app.post("/frases", async (req, res) => {
  const { texto, marca_tiempo, descripcion, personaje_id } = req.body;

  if (!texto || !marca_tiempo || !descripcion || !personaje_id) {
    return res.status(400).json({
      success: false,
      message:
        "Faltan campos obligatorios: texto, marca de tiempo, descripción o personaje",
    });
  }

  try {
    const connection = await getConnection();
    const [result] = await connection.execute(
      "INSERT INTO frases (texto, marca_tiempo, descripcion, personaje_id) VALUES (?, ?, ?, ?)",
      [texto, marca_tiempo, descripcion, personaje_id]
    );
    await connection.end();

    res.status(201).json({
      success: true,
      id: result.insertId,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al crear una frase",
    });
  }
});

// Listar todas las frases (con información del personaje y el título del capítulo)
app.get("/frases", async (req, res) => {
  try {
    const connection = await getConnection();
    const [rows] = await connection.execute(`
      SELECT frases.*, personajes.* 
      FROM frases 
      JOIN personajes ON frases.personaje_id = personajes.id;
    `);
    await connection.end();

    res.json({
      info: { count: rows.length },
      results: rows,
    });
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las frases" });
  }
});

// Obtener una frase específica
app.get("/frases/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const connection = await getConnection();
    const [rows] = await connection.execute(
      "SELECT * FROM frases WHERE id = ?",
      [id]
    );
    await connection.end();

    if (rows.length === 0) {
      return res.status(404).json({ error: "Frase no encontrada" });
    }

    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener la frase" });
  }
});

// Actualizar una frase existente
app.put("/frases/:id", async (req, res) => {
  const { id } = req.params;
  const { texto, marca_tiempo, descripcion, personaje_id } = req.body;

  if (!texto || !marca_tiempo || !descripcion || !personaje_id) {
    return res.status(400).json({
      success: false,
      message:
        "Faltan campos obligatorios: texto, marca de tiempo, descripción o personaje",
    });
  }

  try {
    const connection = await getConnection();
    const [result] = await connection.execute(
      "UPDATE frases SET texto = ?, marca_tiempo = ?, descripcion = ?, personaje_id = ? WHERE id = ?",
      [texto, marca_tiempo, descripcion, personaje_id, id]
    );
    await connection.end();

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Frase no encontrada",
      });
    }

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al actualizar la frase",
    });
  }
});

// Eliminar una frase
app.delete("/frases/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const connection = await getConnection();
    const [result] = await connection.execute(
      "DELETE FROM frases WHERE id = ?",
      [id]
    );
    await connection.end();

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Frase no encontrada",
      });
    }

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al eliminar la frase",
    });
  }
});

// Obtener todas las frases de un personaje específico
app.get("/frases/personaje/:personaje_id", async (req, res) => {
  const { personaje_id } = req.params;

  try {
    const connection = await getConnection();
    const [rows] = await connection.execute(
      "SELECT * FROM frases WHERE personaje_id = ?",
      [personaje_id]
    );
    await connection.end();

    if (rows.length === 0) {
      return res.status(404).json({ error: "No se encontraron frases para este personaje" });
    }

    res.json({
      info: { count: rows.length },
      results: rows,
    });
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las frases del personaje" });
  }
});

// Obtener todas las frases de un capítulo específico
// Pendiente 

// Listar todos los personajes
app.get("/personajes", async (req, res) => {
  try {
    const connection = await getConnection();
    const [rows] = await connection.execute("SELECT * FROM personajes;");
    await connection.end();

    res.json({
      info: { count: rows.length },
      results: rows,
    });
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los personajes" });
  }
});

// Listar todos los capítulos
app.get("/capitulos", async (req, res) => {
  try {
    const connection = await getConnection();
    const [rows] = await connection.execute("SELECT * FROM capitulos;");
    await connection.end();

    res.json({
      info: { count: rows.length },
      results: rows,
    });
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los capítulos" });
  }
});