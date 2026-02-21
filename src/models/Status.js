const mongoose = require('mongoose');
const Counter = require('./Counter');

const userSchema = new mongoose.Schema({
    idstatus: {
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
  if (!this.idstatus) {

    const counter = await Counter.findOneAndUpdate(
      { name: "status" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    this.idstatus = "STAT" + counter.seq.toString().padStart(3, "0");
  }

  next();
})


module.exports = mongoose.model('Status', userSchema);