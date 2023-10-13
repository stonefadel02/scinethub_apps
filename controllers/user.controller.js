const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model'); 

// Fonction de gestion de l'inscription
exports.registerUser = async (req, res) => {
  const { username,fullname, email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: 'Cet e-mail est déjà enregistré.' });
    }

    const newUser = new User({ username,fullname, email, password });

    // Hacher le mot de passe
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(password, salt);

    await newUser.save();

    res.json({ message: 'Inscription réussie.' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur serveur');
  }
};

// Fonction de gestion de la connexion
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'Utilisateur non trouvé.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Mot de passe incorrect.' });
    }

    // Générer un jeton d'authentification (jsonwebtoken) à envoyer au client pour les futures requêtes.
    const token = jwt.sign({ userId: user._id }, 'mon_secret');

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur serveur');
  }
};
