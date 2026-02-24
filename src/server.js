const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/database');

const userRoutes = require('./routes/userRoutes');
const produitRoutes = require('./routes/produitRoutes');
const boutiqueRoutes = require('./routes/boutiqueRoutes');
const loyerRoutes = require('./routes/loyerRoutes');
const promotionRoutes = require('./routes/promotionRoutes');
const venteRoutes = require('./routes/venteRoutes');
const employeRoutes = require('./routes/employeRoutes');
const commandeRoutes = require('./routes/commandeRoutes');
const clientRoutes = require('./routes/clientRoutes');

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
app.use('/api/users', userRoutes);
app.use('/api/boutiques', boutiqueRoutes);
app.use('/api/produits', produitRoutes);
app.use('/api/loyer', loyerRoutes);
app.use('/api/promotions', promotionRoutes);
app.use('/api/ventes', venteRoutes);
app.use('/api/employes', employeRoutes);
app.use('/api/commandes', commandeRoutes);
app.use('/api/clients', clientRoutes);

// Route de base
app.get('/', (req, res) => {
  res.json({ message: 'Bienvenue sur l\'API' });
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
