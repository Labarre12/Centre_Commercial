const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/database');

//appel dossier routes
const userRoutes = require('./routes/userRoutes');

// routes dossier admins
const authRoutes = require('./routes/admin/authRoutes');
const boutiqueRoutes = require('./routes/admin/boutiqueRoutes');
const dashboardRoutes = require('./routes/admin/dashboardRoutes');
const evenementRoutes = require('./routes/admin/evenementRoutes');
const boxRoutes = require('./routes/admin/boxRoutes');
const parkingRoutes = require('./routes/admin/parkingRoutes');


const app = express();
const PORT = process.env.PORT || 5000;

// Connexion à la base de données
connectDB();

require('./models');

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes api
app.use('/api/users', userRoutes);

app.use('/api/auth', authRoutes);
app.use('/api/boutique', boutiqueRoutes);
app.use('api/dashboard', dashboardRoutes);
app.use('api/evenement', evenementRoutes);
app.use('api/box', boxRoutes);
app.use('api/parking', parkingRoutes);


// Route de base
app.get('/', (req, res) => {
  res.json({ message: 'Bienvenue sur l\'API' });
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});

