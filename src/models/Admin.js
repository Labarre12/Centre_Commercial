const mongoose = require('mongoose');
const Counter = require('./Counter');


const userSchema = new mongoose.Schema({
  matricule: {
    type: String,
    unique: true,
    trim: true
  },
  mdp: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ['ADMIN', 'BOUTIQUE']
  },
  boutique: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Boutique',
    default: null
  }
}, {
  timestamps: true
});


// AUTO GENERATION MATRICULE
userSchema.pre("save", async function() {
  if (!this.matricule) {

    const counter = await Counter.findOneAndUpdate(
      { name: "admin" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    this.matricule = "ADMIN" + counter.seq.toString().padStart(3, "0");
  }

})

module.exports = mongoose.model('Admin', userSchema);