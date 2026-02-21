const mongoose = require('mongoose');
const Counter = require('./Counter');


const userSchema = new mongoose.Schema({
  idboutique: {
    type: String,
    unique: true,
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

userSchema.pre("save", async function(next) {
  if (!this.idboutique) {

    const counter = await Counter.findOneAndUpdate(
      { name: "boutique" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    this.idboutique = "B" + counter.seq.toString().padStart(3, "0");
  }

  next();
})

module.exports = mongoose.model('Boutique', userSchema);