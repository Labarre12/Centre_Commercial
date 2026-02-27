const mongoose = require('mongoose');
const Counter = require('./Counter');

const userSchema = new mongoose.Schema({
  idProduit: {
    type: String,
    unique: true,
  },
  libelle: {
    type: String,
    required: true,
  },
  idboutique: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  idCategorieProduit: {
    type: String,
    required: true,
  },
  idLiaisonCouleur: {
    type: String,
    required: true,
  },
  prix: { type: Number },
  prixOriginal: { type: Number },
  categorie: { type: String },
  stock: { type: Number, default: 0 },
  couleur: { type: String }
}, {
  timestamps: true
});

userSchema.pre("save", async function() {
  if (!this.idProduit) {

    const counter = await Counter.findOneAndUpdate(
      { name: "produit" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    this.idProduit = "PROD" + counter.seq.toString().padStart(3, "0");
  }

})

// Insert a new product
userSchema.statics.insertProduit = async function(data) {
  try {
    const produit = new this(data);
    return await produit.save();
  } catch (error) {
    throw error;
  }
};

// Get all products for a specific boutique
userSchema.statics.getListProduit = async function(idBoutique) {
  try {
    return await this.find({ idboutique: idBoutique });
  } catch (error) {
    throw error;
  }
};

// Get a product by its ID
userSchema.statics.getProduitByIDProduit = async function(idProduit) {
  try {
    return await this.findOne({ idProduit: idProduit });
  } catch (error) {
    throw error;
  }
};

const auditPlugin = require('../plugins/auditPlugin');
userSchema.plugin(auditPlugin, { modelName: 'Produit' });

module.exports = mongoose.model('Produit', userSchema);