require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('./src/models/Admin');
const Boutique = require('./src/models/Boutique');

const seeds = [
  { matricule: 'ADM001', mdp: 'admin123', role: 'ADMIN' },
  { matricule: 'BTQ001', mdp: 'boutique123', role: 'BOUTIQUE', idboutique: 'BTQ001' },
];

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI, { family: 4 });
  console.log('Connecté à MongoDB');

  // Créer la boutique BTQ001 si elle n'existe pas
  let boutiqueBTQ001 = await Boutique.findOne({ idboutique: 'BTQ001' });
  if (!boutiqueBTQ001) {
    boutiqueBTQ001 = await Boutique.create({
      idboutique: 'BTQ001',
      libelle: 'boutique test',
      description: 'Boutique de test',
      dateDebut: new Date('2024-01-01'),
      dateFin: new Date('2030-12-31'),
      url: 'https://placeholder.com/boutique.jpg',
      ouverture: '08:00',
      fermeture: '18:00',
      idCategorie: 1
    });
    console.log('✅  Boutique BTQ001 créée');
  } else {
    console.log('⚠️  Boutique BTQ001 existe déjà — ignorée');
  }

  for (const data of seeds) {
    const exists = await Admin.findOne({ matricule: data.matricule });
    if (exists) {
      if (data.role === 'BOUTIQUE' && data.idboutique && !exists.boutique) {
        const boutique = await Boutique.findOne({ idboutique: data.idboutique });
        if (boutique) {
          await Admin.updateOne({ _id: exists._id }, { boutique: boutique._id });
          console.log(`🔗  ${data.matricule} — boutique ${data.idboutique} liée`);
        } else {
          console.log(`⚠️  Boutique ${data.idboutique} introuvable — lien non appliqué`);
        }
      } else {
        console.log(`⚠️  ${data.matricule} existe déjà — ignoré`);
      }
      continue;
    }

    const payload = { matricule: data.matricule, mdp: data.mdp, role: data.role };

    if (data.role === 'BOUTIQUE' && data.idboutique) {
      const boutique = await Boutique.findOne({ idboutique: data.idboutique });
      if (boutique) {
        payload.boutique = boutique._id;
        console.log(`🔗  Boutique ${data.idboutique} liée`);
      } else {
        console.log(`⚠️  Boutique ${data.idboutique} introuvable — champ boutique non lié`);
      }
    }

    await Admin.create(payload);
    console.log(`✅  ${data.matricule} (${data.role}) créé`);
  }

  await mongoose.disconnect();
  console.log('Terminé.');
}

seed().catch(err => {
  console.error('Erreur :', err.message);
  process.exit(1);
});
