const mongoose = require('mongoose');

// Définition du schéma
const otakuGamer = new mongoose.Schema({
    name: { type: String, required: true },
    age: Number,
    favGenres: [String],
    favMusic: [String]
});

// Définition du modèle basé sur le schéma
module.exports = mongoose.model('Otaku', otakuGamer);