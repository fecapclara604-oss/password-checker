const { getAllParticipants } = require('./database');

async function showDatabase() {
  console.log('\n======================================================');
  console.log('🗄️  REGISTRO DE PARTICIPANTES (participants.db)');
  console.log('======================================================\n');

  try {
    const records = await getAllParticipants();

    if (records.length === 0) {
      console.log('Nenhum participante registrado no banco de dados ainda.');
      console.log('Faça um teste no site informando um nome para registrá-lo!\n');
      process.exit(0);
    }

    console.table(
      records.map(r => ({
        'ID': `#${r.id}`,
        'Nome do Participante': r.name,
        'Data / Hora': r.created_at
      }))
    );

    console.log(`\nTotal de participantes registrados: ${records.length}\n`);
  } catch (err) {
    console.error('Erro ao consultar banco de dados:', err.message);
  } finally {
    process.exit(0);
  }
}

showDatabase();
