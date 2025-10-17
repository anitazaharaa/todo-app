import express from "express";
import cors from "cors";
import pkg from "pg";
const { Pool } = pkg;

const app = express();
app.use(cors());
app.use(express.json());

// Konfigurasi koneksi ke PostgreSQL
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "todo_db",
  password: "12345678", // ganti sesuai PostgreSQL kamu
  port: 5432,
});

// GET semua data
app.get("/todos", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM todos ORDER BY id ASC");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(3000, () => {
  console.log("✅ Server running on http://localhost:3000");
});
