const mongoose = require('mongoose');
const Counter = require('./Counter');


const userSchema = new mongoose.Schema({
    idAcheteur: {
    type: String,
    unique: true,
  },
  nom: {
    type: String,
    required: true,
  },
  mail: {
    type: String,
    required: true,
  },
  mdp: {
    type: String,
    required: true,
  },
  dateInscription: {
    type: Date,
    default: Date.now,
  },
  contact: {
    type: String,
    required: true,
  },
  adresse: {
    type: String,
    required: true,
  }
}, {
  timestamps: true
});

userSchema.pre("save", async function() {
  if (!this.idAcheteur) {

    const counter = await Counter.findOneAndUpdate(
      { name: "acheteur" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    this.idAcheteur = "ACHAT" + counter.seq.toString().padStart(3, "0");
  }

})

module.exports = mongoose.model('Acheteur', userSchema);