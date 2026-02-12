const mongoose = require('mongoose');
const Counter = require('./Counter');


const userSchema = new mongoose.Schema({
  idEmplacement: {
    type: String,
    unique: true,
  },
  numéro: {
    type: String,
    required: true,
    unique: true,
  }
}, {
  timestamps: true
});

userSchema.pre("save", async function(next) {
  if (!this.idEmplacement) {

    const counter = await Counter.findOneAndUpdate(
      { name: "emplacement" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    this.idEmplacement = "BOX" + counter.seq.toString().padStart(3, "0");
  }

  next();
})

module.exports = mongoose.model('Emplacement', userSchema);