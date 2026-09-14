const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const DB_PATH = path.join(__dirname, 'participants.db');
const db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) {
    console.error('❌ Erro ao conectar ao banco de dados SQLite:', err.message);
  } else {
    console.log('📦 Conectado ao banco de dados SQLite (Participantes):', DB_PATH);
  }
});

// Inicialização da tabela de participantes (SOMENTE O NOME É ARMAZENADO)
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS participants (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `, (err) => {
    if (err) {
      console.error('❌ Erro ao criar tabela participants:', err.message);
    } else {
      console.log('✅ Tabela de participantes pronta (Apenas nomes registrados).');
    }
  });
});

/**
 * Salva SOMENTE o nome do participante no SQLite
 */
function saveParticipantName(name) {
  return new Promise((resolve, reject) => {
    const cleanName = (name && typeof name === 'string' && name.trim().length > 0)
      ? name.trim()
      : 'Visitante';

    db.run(
      `INSERT INTO participants (name) VALUES (?)`,
      [cleanName],
      function (err) {
        if (err) {
          console.error('Erro ao registrar nome do participante:', err.message);
          return reject(err);
        }
        resolve({ id: this.lastID, name: cleanName });
      }
    );
  });
}

/**
 * Recupera todos os nomes dos participantes registrados
 */
function getAllParticipants() {
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM participants ORDER BY id DESC`, [], (err, rows) => {
      if (err) {
        return reject(err);
      }
      resolve(rows);
    });
  });
}

/**
 * Limpa todos os registros do banco de participantes
 */
function clearAllParticipants() {
  return new Promise((resolve, reject) => {
    db.run(`DELETE FROM participants`, [], function (err) {
      if (err) {
        return reject(err);
      }
      resolve({ changes: this.changes });
    });
  });
}

module.exports = {
  db,
  saveParticipantName,
  getAllParticipants,
  clearAllParticipants
};
