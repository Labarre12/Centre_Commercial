const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  idboutique: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  libelle: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  description: {
    type: String,
    required: true,
  },
  dateDebut: {
    type: Date,
    required: true,
  },
  dateFin: {
    type: Date,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  ouverture: {
    type: String,
    required: true,
  },
  fermeture: {
    type: String,
  },
  idCategorie: {
    type: Number,
    required: true,
  }
}, {
  timestamps: true
});

// Get a boutique by its ID
userSchema.statics.getByIdBoutique = async function(idBoutique) {
  try {
    return await this.findOne({ idboutique: idBoutique });
  } catch (error) {
    throw error;
  }
};

module.exports = mongoose.model('Boutique', userSchema);