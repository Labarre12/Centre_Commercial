const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
    trim: true
  },
  mdp: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  role: {
    type: String,
    required: true,
  }
}, {
  timestamps: true
});

const auditPlugin = require('../plugins/auditPlugin');
userSchema.plugin(auditPlugin, { modelName: 'User' });

module.exports = mongoose.model('User', userSchema);