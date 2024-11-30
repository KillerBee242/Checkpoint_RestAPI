const express = require('express');
const mongoose = require('mongoose');
const Otaku = require('./models/User');
const User = require('./models/User');
require('dotenv').config({ path: './config/.env' });

const app = express();
const port = process.env.PORT || 3000;

// Middleware pour analyser le corps des requêtes en JSON
app.use(express.json());

// Connexion à MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ Connexion MongoDB Atlas réussie !'))
    .catch(err => console.error('❌ Erreur de connexion :', err));
    
// Route de base pour tester l'application
app.get('/', (req, res) => {
    res.send('Hello World !');
});

// GET : Retourner tous les utilisateurs
app.get('/users', async (req, res) => {
    try {
        const users = await Otaku.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST : Ajouter un nouvel utilisateur
app.post('/users', async (req, res) => {
    const user = new Otaku(req.body);
    try {
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// POST : Ajouter plusieurs utilisateurs
app.post('/users/bulk', async (req, res) => {
    try {
        const users = await Otaku.insertMany(req.body);
        res.status(201).json(users);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
})

// PUT : Modifier un utilisateur par ID
app.put('/users/:id', async (req, res) => {
    try {
        const user = await Otaku.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(user);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE : Supprimer un utilisateur par ID
app.delete('/users/:id', async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: 'Utilisateur supprimé !' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Démarrer le serveur
app.listen(port, () => {
    console.log(`✅ Serveur en écoute sur le port ${port}`);
});