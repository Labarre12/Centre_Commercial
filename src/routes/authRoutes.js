const express = require('express');
const router = express.Router();
const authController = require('../controllers/AuthController');
const connexionController = require('../controllers/client/connexionController');

// Auth admin (matricule) — URL inchangée
router.post('/login', authController.login);

// Auth client (email + JWT)
router.post('/client/register', connexionController.register);
router.post('/client/login', connexionController.login);
router.post('/client/logout', connexionController.logout);

module.exports = router;
