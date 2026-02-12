const mongoose = require('mongoose');
const Counter = require('./Counter');

const userSchema = new mongoose.Schema({
  idpromotion: {
    type: String,
    trim: true
  },
  titre: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: false
  },
  idBoutiques: {
    type: [String], 
    required: true,
    default: []
  },
  idProduits: {
    type: [String], 
    required: false,
    default: []
  },
  typeReduction: {
    type: String,
    enum: ['pourcentage', 'montant'], 
    required: true
  },
  valeur: {
    type: Number, 
    required: true
  },
  dateDebut: {
    type: Date,
    required: true
  },
  dateFin: {
    type: Date,
    required: true
  },
  actif: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

userSchema.pre("save", async function(next) {
  if (!this.idpromotion) {

    const counter = await Counter.findOneAndUpdate(
      { name: "promotion" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    this.idpromotion = "PROMO" + counter.seq.toString().padStart(3, "0");
  }

  next();
})


module.exports = mongoose.model('Promotion', userSchema);
