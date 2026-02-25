require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('./src/models/Admin');

const seeds = [
  { matricule: 'ADM001', mdp: 'admin123', role: 'ADMIN' },
  { matricule: 'BTQ001', mdp: 'boutique123', role: 'BOUTIQUE' },
];

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('Connecté à MongoDB');

  for (const data of seeds) {
    const exists = await Admin.findOne({ matricule: data.matricule });
    if (exists) {
      console.log(`⚠️  ${data.matricule} existe déjà — ignoré`);
    } else {
      await Admin.create(data);
      console.log(`✅  ${data.matricule} (${data.role}) créé`);
    }
  }

  await mongoose.disconnect();
  console.log('Terminé.');
}

seed().catch(err => {
  console.error('Erreur :', err.message);
  process.exit(1);
});
