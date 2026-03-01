const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/database');

//appel dossier routes

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const produitRoutes = require('./routes/produitRoutes');
const boutiqueRoutes = require('./routes/boutiqueRoutes');
const loyerRoutes = require('./routes/loyerRoutes');
const promotionRoutes = require('./routes/promotionRoutes');
const venteRoutes = require('./routes/venteRoutes');
const employeRoutes = require('./routes/employeRoutes');
const commandeRoutes = require('./routes/commandeRoutes');
const clientRoutes = require('./routes/client/clientRoutes');

// routes dossier admins
const adminAuthRoutes = require('./routes/admin/authRoutes');
const adminBoutiqueRoutes = require('./routes/admin/boutiqueRoutes');
const dashboardRoutes = require('./routes/admin/dashboardRoutes');
const evenementRoutes = require('./routes/admin/evenementRoutes');
const boxRoutes = require('./routes/admin/boxRoutes');
const parkingRoutes = require('./routes/admin/parkingRoutes');

const commandePayerRoutes = require('./routes/commandePayer');


const app = express();
const PORT = process.env.PORT || 5000;

// Connexion à la base de données
connectDB();

require('./models');

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/boutiques', boutiqueRoutes);
app.use('/api/produits', produitRoutes);
app.use('/api/loyer', loyerRoutes);
app.use('/api/promotions', promotionRoutes);
app.use('/api/ventes', venteRoutes);
app.use('/api/employes', employeRoutes);
app.use('/api/commandes', commandeRoutes);

app.use('/api/admin/auth', adminAuthRoutes);
app.use('/api/admin/boutique', adminBoutiqueRoutes);
app.use('/api/admin/dashboard', dashboardRoutes);
app.use('/api/admin/evenement', evenementRoutes);
app.use('/api/admin/box', boxRoutes);
app.use('/api/admin/parking', parkingRoutes);

app.use('/api/commande-payer', commandePayerRoutes);


// Route de base
app.get('/', (req, res) => {
  res.json({ message: 'Bienvenue sur l\'API' });
});
// Routes client (montées en dernier pour ne pas écraser les routes boutique)
app.use('/api', clientRoutes);

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
