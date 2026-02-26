const mongoose = require('mongoose');

/**
 * Plugin Mongoose d'audit.
 * Crée automatiquement une collection {ModelName}_audit avec les colonnes
 * old_{champ}, new_{champ} et operation (UPDATE | DELETE).
 *
 * Usage : schema.plugin(auditPlugin, { modelName: 'Produit' });
 */
module.exports = function auditPlugin(schema, options) {
  const modelName = options.modelName;
  const auditModelName = `${modelName}_audit`;

  // Collecter les chemins de premier niveau uniquement
  const fields = [];
  schema.eachPath((pathName) => {
    const skip = ['_id', '__v', 'createdAt', 'updatedAt'];
    if (!skip.includes(pathName) && !pathName.includes('.')) {
      fields.push(pathName);
    }
  });

  // Construire le schéma d'audit dynamiquement
  const auditDef = {
    operation: { type: String, enum: ['UPDATE', 'DELETE'], required: true },
    date: { type: Date, default: Date.now },
  };
  fields.forEach((field) => {
    auditDef[`old_${field}`] = { type: mongoose.Schema.Types.Mixed };
    auditDef[`new_${field}`] = { type: mongoose.Schema.Types.Mixed };
  });

  // Enregistrer le modèle d'audit (évite les doublons si rechargé)
  let AuditModel;
  try {
    AuditModel = mongoose.model(auditModelName);
  } catch {
    AuditModel = mongoose.model(auditModelName, new mongoose.Schema(auditDef));
  }

  // ── UPDATE ──────────────────────────────────────────────────────────────────

  // Capturer l'ancien document avant la mise à jour
  schema.pre(
    ['findOneAndUpdate', 'findByIdAndUpdate'],
    async function () {
      this._auditOldDoc = await this.model.findOne(this.getFilter()).lean();
    }
  );

  // Insérer dans l'audit après la mise à jour
  schema.post(
    ['findOneAndUpdate', 'findByIdAndUpdate'],
    async function (newDoc) {
      if (!this._auditOldDoc || !newDoc) return;
      const entry = { operation: 'UPDATE' };
      fields.forEach((field) => {
        entry[`old_${field}`] = this._auditOldDoc[field] ?? null;
        entry[`new_${field}`] = newDoc[field] ?? null;
      });
      await AuditModel.create(entry);
    }
  );

  // ── DELETE ──────────────────────────────────────────────────────────────────

  schema.post(
    ['findOneAndDelete', 'findByIdAndDelete'],
    async function (deletedDoc) {
      if (!deletedDoc) return;
      const entry = { operation: 'DELETE' };
      fields.forEach((field) => {
        entry[`old_${field}`] = deletedDoc[field] ?? null;
        entry[`new_${field}`] = null;
      });
      await AuditModel.create(entry);
    }
  );
};
