const mongoose = require('mongoose');
const Counter = require('./Counter');

const userSchema = new mongoose.Schema({
  idLoyer: {
    type: String,
    unique: true,
  },
  idboutique: {
    type: String,
    required: true,
  },
  mois: {
    type: Number,
    required: true,
  },
  annee: {
    type: Number,
    required: true,
  },
  montant: {
    type: Number,
    required: true,
  },
  datePaiement: {
    type: Date,
    required: true,
  },
  idStatus: {
    type: String,
    required: true,
  }
}, {
  timestamps: true
});

userSchema.pre("save", async function(next) {
  if (!this.idLoyer) {

    const counter = await Counter.findOneAndUpdate(
      { name: "loyer" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    this.idLoyer = "LOYER" + counter.seq.toString().padStart(3, "0");
  }

  next();
})

const auditPlugin = require('../plugins/auditPlugin');
userSchema.plugin(auditPlugin, { modelName: 'Loyer' });

module.exports = mongoose.model('Loyer', userSchema);