const mongoose = require('mongoose');
const Counter = require('./Counter');


const userSchema = new mongoose.Schema({
  idCategorieBoutique: {
    type: String,
    unique: true,
  },
  idboutique: {
    type: String,
    required: true,
  },
  idEmplacement: {
    type: String,
    required: true,
   } 
}, {
  timestamps: true
});

userSchema.pre("save", async function(next) {
  if (!this.idCategorieBoutique) {

    const counter = await Counter.findOneAndUpdate(
      { name: "categorie_boutique" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    this.idCategorieBoutique = "CB" + counter.seq.toString().padStart(3, "0");
  }

  next();
})

module.exports = mongoose.model('Categorie_boutique', userSchema);