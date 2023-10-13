const express = require('express');
const router = express.Router();
const authController = require('../controllers/user.controller'); // Assurez-vous d'ajuster le chemin

// Route d'inscription
router.post('/register', authController.registerUser);

// Route de connexion
router.post('/login', authController.loginUser);

module.exports = router;
