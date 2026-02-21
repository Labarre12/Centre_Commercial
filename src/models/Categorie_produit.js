const mongoose = require('mongoose');
const Counter = require('./Counter');

const userSchema = new mongoose.Schema({
    idCategorieProduit: {
    type: String,
    unique: true,
  },
  libelle: {
    type: String,
    required: true,
  }
}, {
  timestamps: true
});

userSchema.pre("save", async function(next) {
  if (!this.idCategorieProduit) {

    const counter = await Counter.findOneAndUpdate(
      { name: "categorie_produit" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    this.idCategorieProduit = "CP" + counter.seq.toString().padStart(3, "0");
  }

  next();
})

module.exports = mongoose.model('Categorie_produit', userSchema);