const mongoose = require('mongoose');
const Counter = require('./Counter');

const userSchema = new mongoose.Schema({
    idmouvement: {
    type: String,
    unique: true,
  },
  mouvement: {
    type: String,
    required: true,
  },
  quantite: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  idproduit: {
    type: String,
    required: true,
    unique: true,
  }
}, {
  timestamps: true
});

userSchema.pre("save", async function() {
  if (!this.idmouvement) {

    const counter = await Counter.findOneAndUpdate(
      { name: "mouvement" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    this.idmouvement = "MVT" + counter.seq.toString().padStart(3, "0");
  }

})


module.exports = mongoose.model('Mouvement_stock', userSchema);