/**
 * Seed complet — Centre Commercial
 * Insère des données réalistes pour tester toutes les fonctionnalités.
 * Usage : node seed_complet.js
 *
 * ⚠️  Ce script vide les collections avant d'insérer les nouvelles données.
 */

require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt   = require('bcrypt');

// ── Models ────────────────────────────────────────────────────────────────────
const Admin          = require('./src/models/Admin');
const Acheteur       = require('./src/models/Acheteur');
const Boutique       = require('./src/models/Boutique');
const Produit        = require('./src/models/Produit');
const Employe        = require('./src/models/Employe');
const Commande       = require('./src/models/Commande');
const Vente          = require('./src/models/Vente');
const AvisClient     = require('./src/models/Avis_client');
const Promotion      = require('./src/models/Promotion');
const Loyer          = require('./src/models/Loyer');
const Evenement      = require('./src/models/Evenement');
const Status         = require('./src/models/Status');
const Couleur        = require('./src/models/Couleur');
const CategorieProduit = require('./src/models/Categorie_produit');
const Emplacement    = require('./src/models/Emplacement');
const Parking        = require('./src/models/Parking');
const PlaceParking   = require('./src/models/PlaceParking');
const LiaisonCouleur = require('./src/models/Liaison_Couleur_Produit');
const Participation  = require('./src/models/Participation_boutique');

// ── Helpers ───────────────────────────────────────────────────────────────────
const today   = new Date();
const d = (y, m, j) => new Date(y, m - 1, j);
const ts = () => Date.now().toString() + Math.floor(Math.random() * 1000);

async function clean(...models) {
  for (const M of models) {
    try { await M.deleteMany({}); } catch (_) {}
  }
}

// ─────────────────────────────────────────────────────────────────────────────
async function main() {
  await mongoose.connect(process.env.MONGODB_URI, { family: 4 });
  console.log('✅  MongoDB connecté\n');

  // ── 1. Nettoyage ─────────────────────────────────────────────────────────
  console.log('🧹  Nettoyage des collections…');
  await clean(
    Admin, Acheteur, Boutique, Produit, Employe,
    Commande, Vente, AvisClient, Promotion, Loyer,
    Evenement, Status, Couleur, CategorieProduit,
    Emplacement, Parking, PlaceParking, LiaisonCouleur, Participation
  );

  // ── 2. Statuts ────────────────────────────────────────────────────────────
  console.log('📋  Statuts…');
  await Status.insertMany([
    { idstatus: 'STA001', libelle: 'En attente' },
    { idstatus: 'STA002', libelle: 'Confirmée'  },
    { idstatus: 'STA003', libelle: 'En livraison' },
    { idstatus: 'STA004', libelle: 'Livrée'     },
    { idstatus: 'STA005', libelle: 'Annulée'    },
    { idstatus: 'STA006', libelle: 'Payé'       },
    { idstatus: 'STA007', libelle: 'Impayé'     },
    { idstatus: 'STA008', libelle: 'Actif'      },
    { idstatus: 'STA009', libelle: 'Inactif'    },
  ]);

  // ── 3. Couleurs ───────────────────────────────────────────────────────────
  console.log('🎨  Couleurs…');
  const couleurs = await Couleur.insertMany([
    { idCouleur: 'CLR001', libelle: 'Noir'    },
    { idCouleur: 'CLR002', libelle: 'Blanc'   },
    { idCouleur: 'CLR003', libelle: 'Rouge'   },
    { idCouleur: 'CLR004', libelle: 'Bleu'    },
    { idCouleur: 'CLR005', libelle: 'Vert'    },
    { idCouleur: 'CLR006', libelle: 'Jaune'   },
    { idCouleur: 'CLR007', libelle: 'Gris'    },
    { idCouleur: 'CLR008', libelle: 'Rose'    },
  ]);

  // ── 4. Catégories produits ────────────────────────────────────────────────
  console.log('🏷️   Catégories produits…');
  await CategorieProduit.insertMany([
    { idCategorieProduit: 'CATP001', libelle: 'Vêtements'     },
    { idCategorieProduit: 'CATP002', libelle: 'Chaussures'    },
    { idCategorieProduit: 'CATP003', libelle: 'Accessoires'   },
    { idCategorieProduit: 'CATP004', libelle: 'Électronique'  },
    { idCategorieProduit: 'CATP005', libelle: 'Beauté / Soins'},
    { idCategorieProduit: 'CATP006', libelle: 'Livres'        },
    { idCategorieProduit: 'CATP007', libelle: 'Sport'         },
    { idCategorieProduit: 'CATP008', libelle: 'Restauration'  },
    { idCategorieProduit: 'CATP009', libelle: 'Bijoux'        },
  ]);

  // ── 5. Emplacements ───────────────────────────────────────────────────────
  console.log('📍  Emplacements…');
  await Emplacement.insertMany([
    { idEmplacement: 'EMP001', numéro: 'N0-A1' },
    { idEmplacement: 'EMP002', numéro: 'N0-A2' },
    { idEmplacement: 'EMP003', numéro: 'N0-B1' },
    { idEmplacement: 'EMP004', numéro: 'N1-A1' },
    { idEmplacement: 'EMP005', numéro: 'N1-A2' },
    { idEmplacement: 'EMP006', numéro: 'N1-B1' },
    { idEmplacement: 'EMP007', numéro: 'N2-FC1' },
    { idEmplacement: 'EMP008', numéro: 'N2-FC2' },
  ]);

  // ── 6. Parkings ───────────────────────────────────────────────────────────
  console.log('🅿️   Parkings…');
  await Parking.insertMany([
    { idParking: 'PARK001', libelle: 'Parking Nord – Niveau -1' },
    { idParking: 'PARK002', libelle: 'Parking Sud – Niveau -1'  },
    { idParking: 'PARK003', libelle: 'Parking Extérieur Est'    },
  ]);

  // ── 7. Boutiques ──────────────────────────────────────────────────────────
  console.log('🏪  Boutiques…');
  const boutiquesData = [
    {
      idboutique: 'BTQ001',
      libelle:    'Zara',
      categorie:  'Mode',
      description:'Vêtements tendance pour femme, homme et enfant.',
      dateDebut:  d(2022, 3, 1),
      dateFin:    d(2028, 12, 31),
      url:        'https://www.zara.com',
      ouverture:  '09:00',
      fermeture:  '20:30',
      idCategorie: 1,
    },
    {
      idboutique: 'BTQ002',
      libelle:    'Apple Store',
      categorie:  'Électronique',
      description:'iPhone, Mac, iPad et accessoires Apple officiels.',
      dateDebut:  d(2021, 6, 15),
      dateFin:    d(2029, 6, 14),
      url:        'https://www.apple.com',
      ouverture:  '10:00',
      fermeture:  '20:00',
      idCategorie: 2,
    },
    {
      idboutique: 'BTQ003',
      libelle:    'Nike',
      categorie:  'Sport',
      description:'Chaussures et vêtements de sport Nike.',
      dateDebut:  d(2020, 9, 1),
      dateFin:    d(2027, 8, 31),
      url:        'https://www.nike.com',
      ouverture:  '09:30',
      fermeture:  '20:00',
      idCategorie: 3,
    },
    {
      idboutique: 'BTQ004',
      libelle:    'Sephora',
      categorie:  'Beauté',
      description:'Parfums, maquillage et soins de beauté premium.',
      dateDebut:  d(2019, 1, 10),
      dateFin:    d(2026, 12, 31),
      url:        'https://www.sephora.com',
      ouverture:  '09:00',
      fermeture:  '20:30',
      idCategorie: 4,
    },
    {
      idboutique: 'BTQ005',
      libelle:    'FNAC',
      categorie:  'Livres',
      description:'Livres, musique, cinéma et high-tech.',
      dateDebut:  d(2018, 4, 5),
      dateFin:    d(2028, 4, 4),
      url:        'https://www.fnac.com',
      ouverture:  '09:00',
      fermeture:  '20:00',
      idCategorie: 5,
    },
    {
      idboutique: 'BTQ006',
      libelle:    "McDonald's",
      categorie:  'Restaurant',
      description:"Le fast-food préféré des familles – burgers, frites et McFlurry.",
      dateDebut:  d(2017, 2, 14),
      dateFin:    d(2030, 2, 13),
      url:        'https://www.mcdonalds.fr',
      ouverture:  '08:00',
      fermeture:  '23:00',
      idCategorie: 6,
    },
    {
      idboutique: 'BTQ007',
      libelle:    'Starbucks',
      categorie:  'Café',
      description:'Café de spécialité, thés et snacks dans une ambiance cosy.',
      dateDebut:  d(2021, 11, 1),
      dateFin:    d(2028, 10, 31),
      url:        'https://www.starbucks.fr',
      ouverture:  '07:30',
      fermeture:  '22:00',
      idCategorie: 6,
    },
    {
      idboutique: 'BTQ008',
      libelle:    'Bijou Brigitte',
      categorie:  'Bijoux',
      description:'Bijoux et accessoires tendance à prix accessible.',
      dateDebut:  d(2023, 5, 20),
      dateFin:    d(2027, 5, 19),
      url:        'https://www.bijou-brigitte.com',
      ouverture:  '10:00',
      fermeture:  '19:30',
      idCategorie: 7,
    },
  ];
  const boutiques = await Boutique.insertMany(boutiquesData);
  const bMap = {};
  boutiques.forEach(b => { bMap[b.idboutique] = b; });

  // ── 8. Admins ─────────────────────────────────────────────────────────────
  console.log('👤  Admins…');
  await Admin.insertMany([
    { matricule: 'ADM001', mdp: 'admin123',    role: 'ADMIN',    boutique: null },
    { matricule: 'BTQ001', mdp: 'boutique123', role: 'BOUTIQUE', boutique: bMap['BTQ001']._id },
    { matricule: 'BTQ002', mdp: 'boutique123', role: 'BOUTIQUE', boutique: bMap['BTQ002']._id },
    { matricule: 'BTQ003', mdp: 'boutique123', role: 'BOUTIQUE', boutique: bMap['BTQ003']._id },
    { matricule: 'BTQ004', mdp: 'boutique123', role: 'BOUTIQUE', boutique: bMap['BTQ004']._id },
    { matricule: 'BTQ005', mdp: 'boutique123', role: 'BOUTIQUE', boutique: bMap['BTQ005']._id },
    { matricule: 'BTQ006', mdp: 'boutique123', role: 'BOUTIQUE', boutique: bMap['BTQ006']._id },
    { matricule: 'BTQ007', mdp: 'boutique123', role: 'BOUTIQUE', boutique: bMap['BTQ007']._id },
    { matricule: 'BTQ008', mdp: 'boutique123', role: 'BOUTIQUE', boutique: bMap['BTQ008']._id },
  ]);

  // ── 9. Clients (Acheteurs) ────────────────────────────────────────────────
  console.log('🧑  Clients…');
  const mdpHash = await bcrypt.hash('client123', 10);
  const mdpHash2 = await bcrypt.hash('motdepasse456', 10);

  const clientsData = [
    { idAcheteur: 'ACH001', nom: 'Alice Martin',   mail: 'alice@example.com',   mdp: mdpHash,  contact: '0612345678', adresse: '12 rue de la Paix, Paris',     dateInscription: d(2024, 1, 15) },
    { idAcheteur: 'ACH002', nom: 'Bob Dupont',      mail: 'bob@example.com',     mdp: mdpHash,  contact: '0623456789', adresse: '5 avenue Victor Hugo, Lyon',   dateInscription: d(2024, 3, 22) },
    { idAcheteur: 'ACH003', nom: 'Charlie Moreau',  mail: 'charlie@example.com', mdp: mdpHash,  contact: '0634567890', adresse: '8 allée des Roses, Bordeaux',   dateInscription: d(2024, 5, 10) },
    { idAcheteur: 'ACH004', nom: 'Diana Lefevre',   mail: 'diana@example.com',   mdp: mdpHash2, contact: '0645678901', adresse: '3 impasse du Moulin, Toulouse', dateInscription: d(2025, 2, 28) },
    { idAcheteur: 'ACH005', nom: 'Ethan Bernard',   mail: 'ethan@example.com',   mdp: mdpHash2, contact: '0656789012', adresse: '22 rue Pasteur, Marseille',     dateInscription: d(2025, 7, 4)  },
  ];
  const clients = await Acheteur.insertMany(clientsData);
  const cMap = {};
  clients.forEach(c => { cMap[c.idAcheteur] = c; });

  // ── 10. Employés ──────────────────────────────────────────────────────────
  console.log('👔  Employés…');
  await Employe.insertMany([
    { idEmploye: 'EMP101', idboutique: 'BTQ001', nom: 'Sophie Laurent',   role: 'Responsable',  contact: '0611111111' },
    { idEmploye: 'EMP102', idboutique: 'BTQ001', nom: 'Lucas Petit',       role: 'Vendeur',       contact: '0622222222' },
    { idEmploye: 'EMP103', idboutique: 'BTQ002', nom: 'Julie Blanc',       role: 'Responsable',  contact: '0633333333' },
    { idEmploye: 'EMP104', idboutique: 'BTQ002', nom: 'Thomas Garnier',    role: 'Technicien',    contact: '0644444444' },
    { idEmploye: 'EMP105', idboutique: 'BTQ003', nom: 'Emma Richard',      role: 'Responsable',  contact: '0655555555' },
    { idEmploye: 'EMP106', idboutique: 'BTQ004', nom: 'Clara Simon',       role: 'Responsable',  contact: '0666666666' },
    { idEmploye: 'EMP107', idboutique: 'BTQ005', nom: 'Hugo Michel',       role: 'Responsable',  contact: '0677777777' },
    { idEmploye: 'EMP108', idboutique: 'BTQ006', nom: 'Léa Martin',        role: 'Manager',       contact: '0688888888' },
    { idEmploye: 'EMP109', idboutique: 'BTQ006', nom: 'Kevin Durand',      role: 'Équipier',      contact: '0699999999' },
    { idEmploye: 'EMP110', idboutique: 'BTQ007', nom: 'Pauline Leroy',     role: 'Barista',       contact: '0600000001' },
    { idEmploye: 'EMP111', idboutique: 'BTQ008', nom: 'Nathan Roux',       role: 'Vendeur',       contact: '0600000002' },
  ]);

  // ── 11. Liaisons Couleur-Produit (pré-créées) ─────────────────────────────
  const liaisonsData = [
    { idLiaisonCouleur: 'LC001', idcouleur: 'CLR001', idproduit: 'PRD001' }, // Noir
    { idLiaisonCouleur: 'LC002', idcouleur: 'CLR002', idproduit: 'PRD001' }, // Blanc
    { idLiaisonCouleur: 'LC003', idcouleur: 'CLR003', idproduit: 'PRD002' }, // Rouge
    { idLiaisonCouleur: 'LC004', idcouleur: 'CLR004', idproduit: 'PRD003' }, // Bleu
    { idLiaisonCouleur: 'LC005', idcouleur: 'CLR007', idproduit: 'PRD004' }, // Gris
    { idLiaisonCouleur: 'LC006', idcouleur: 'CLR001', idproduit: 'PRD005' }, // Noir
    { idLiaisonCouleur: 'LC007', idcouleur: 'CLR002', idproduit: 'PRD006' }, // Blanc
    { idLiaisonCouleur: 'LC008', idcouleur: 'CLR003', idproduit: 'PRD007' }, // Rouge
    { idLiaisonCouleur: 'LC009', idcouleur: 'CLR005', idproduit: 'PRD008' }, // Vert
    { idLiaisonCouleur: 'LC010', idcouleur: 'CLR001', idproduit: 'PRD009' }, // Noir
    { idLiaisonCouleur: 'LC011', idcouleur: 'CLR001', idproduit: 'PRD010' }, // Noir
    { idLiaisonCouleur: 'LC012', idcouleur: 'CLR001', idproduit: 'PRD011' }, // Noir
    { idLiaisonCouleur: 'LC013', idcouleur: 'CLR001', idproduit: 'PRD012' }, // Noir
    { idLiaisonCouleur: 'LC014', idcouleur: 'CLR001', idproduit: 'PRD013' }, // Noir
    { idLiaisonCouleur: 'LC015', idcouleur: 'CLR001', idproduit: 'PRD014' }, // Noir
    { idLiaisonCouleur: 'LC016', idcouleur: 'CLR008', idproduit: 'PRD015' }, // Rose
    { idLiaisonCouleur: 'LC017', idcouleur: 'CLR006', idproduit: 'PRD016' }, // Jaune
    { idLiaisonCouleur: 'LC018', idcouleur: 'CLR001', idproduit: 'PRD017' }, // Noir
    { idLiaisonCouleur: 'LC019', idcouleur: 'CLR001', idproduit: 'PRD018' }, // Noir
    { idLiaisonCouleur: 'LC020', idcouleur: 'CLR001', idproduit: 'PRD019' }, // Noir
    { idLiaisonCouleur: 'LC021', idcouleur: 'CLR001', idproduit: 'PRD020' }, // Noir
    { idLiaisonCouleur: 'LC022', idcouleur: 'CLR001', idproduit: 'PRD021' }, // Noir
    { idLiaisonCouleur: 'LC023', idcouleur: 'CLR001', idproduit: 'PRD022' }, // Noir
    { idLiaisonCouleur: 'LC024', idcouleur: 'CLR001', idproduit: 'PRD023' }, // Noir
  ];
  await LiaisonCouleur.insertMany(liaisonsData);

  // ── 12. Produits ──────────────────────────────────────────────────────────
  console.log('📦  Produits…');
  const produitsData = [
    // ── Zara (BTQ001) ────────────────────────────────────────────────────────
    { idProduit:'PRD001', libelle:'Robe Fleurie', idboutique:'BTQ001', url:'https://placehold.co/200', description:"Robe légère à motifs floraux, idéale pour l'été.", idCategorieProduit:'CATP001', idLiaisonCouleur:'LC001', categorie:'Vêtements', prix:59900, stock:25, couleur:'Noir' },
    { idProduit:'PRD002', libelle:'Jean Slim', idboutique:'BTQ001', url:'https://placehold.co/200', description:'Jean slim coupe moderne, stretch confortable.', idCategorieProduit:'CATP001', idLiaisonCouleur:'LC003', categorie:'Vêtements', prix:79900, stock:40, couleur:'Rouge' },
    { idProduit:'PRD003', libelle:'Veste en Jean', idboutique:'BTQ001', url:'https://placehold.co/200', description:'Veste en denim délavé, style casual chic.', idCategorieProduit:'CATP001', idLiaisonCouleur:'LC004', categorie:'Vêtements', prix:99000, stock:15, couleur:'Bleu' },
    { idProduit:'PRD004', libelle:'Pull Oversize', idboutique:'BTQ001', url:'https://placehold.co/200', description:'Pull oversize en maille douce, très tendance.', idCategorieProduit:'CATP001', idLiaisonCouleur:'LC005', categorie:'Vêtements', prix:69900, prixOriginal:89000, promotion:20, stock:30, couleur:'Gris' },
    // ── Apple Store (BTQ002) ─────────────────────────────────────────────────
    { idProduit:'PRD005', libelle:'iPhone 16 Pro', idboutique:'BTQ002', url:'https://placehold.co/200', description:'iPhone dernière génération avec puce A18 Pro, 48 Mpx.', idCategorieProduit:'CATP004', idLiaisonCouleur:'LC006', categorie:'Électronique', prix:1290000, stock:10, couleur:'Noir' },
    { idProduit:'PRD006', libelle:'MacBook Air M3', idboutique:'BTQ002', url:'https://placehold.co/200', description:"MacBook ultra-fin avec puce Apple M3, 18h d'autonomie.", idCategorieProduit:'CATP004', idLiaisonCouleur:'LC007', categorie:'Électronique', prix:1890000, stock:6, couleur:'Blanc' },
    { idProduit:'PRD007', libelle:'AirPods Pro 2', idboutique:'BTQ002', url:'https://placehold.co/200', description:'Écouteurs sans fil avec réduction de bruit active adaptative.', idCategorieProduit:'CATP004', idLiaisonCouleur:'LC008', categorie:'Électronique', prix:329000, stock:20, couleur:'Rouge' },
    // ── Nike (BTQ003) ────────────────────────────────────────────────────────
    { idProduit:'PRD008', libelle:'Air Max 270', idboutique:'BTQ003', url:'https://placehold.co/200', description:'Baskets lifestyle avec unité Air Max visible.', idCategorieProduit:'CATP002', idLiaisonCouleur:'LC009', categorie:'Chaussures', prix:179000, stock:22, couleur:'Vert' },
    { idProduit:'PRD009', libelle:'Dri-FIT T-Shirt', idboutique:'BTQ003', url:'https://placehold.co/200', description:"T-shirt de sport évacuant l'humidité pour l'entraînement.", idCategorieProduit:'CATP007', idLiaisonCouleur:'LC010', categorie:'Sport', prix:49900, stock:50, couleur:'Noir' },
    { idProduit:'PRD010', libelle:'Nike Pro Short', idboutique:'BTQ003', url:'https://placehold.co/200', description:'Short de compression haute performance.', idCategorieProduit:'CATP007', idLiaisonCouleur:'LC011', categorie:'Sport', prix:59900, stock:35, couleur:'Noir' },
    // ── Sephora (BTQ004) ─────────────────────────────────────────────────────
    { idProduit:'PRD011', libelle:'Sérum Visage', idboutique:'BTQ004', url:'https://placehold.co/200', description:'Sérum éclat concentré en vitamine C, anti-tache.', idCategorieProduit:'CATP005', idLiaisonCouleur:'LC012', categorie:'Beauté / Soins', prix:89000, stock:40, couleur:'Noir' },
    { idProduit:'PRD012', libelle:'Parfum Chanel N°5', idboutique:'BTQ004', url:'https://placehold.co/200', description:'Le parfum emblématique de Chanel, floral aldéhydé.', idCategorieProduit:'CATP005', idLiaisonCouleur:'LC013', categorie:'Beauté / Soins', prix:249000, stock:12, couleur:'Noir' },
    { idProduit:'PRD013', libelle:'Fond de Teint', idboutique:'BTQ004', url:'https://placehold.co/200', description:'Fond de teint couvrance modulable, tenue 24h.', idCategorieProduit:'CATP005', idLiaisonCouleur:'LC014', categorie:'Beauté / Soins', prix:55000, prixOriginal:69000, promotion:20, stock:28, couleur:'Noir' },
    // ── FNAC (BTQ005) ────────────────────────────────────────────────────────
    { idProduit:'PRD014', libelle:'Harry Potter Intégrale', idboutique:'BTQ005', url:'https://placehold.co/200', description:'La saga complète de J.K. Rowling en coffret collector.', idCategorieProduit:'CATP006', idLiaisonCouleur:'LC015', categorie:'Livres', prix:99000, stock:8, couleur:'Noir' },
    { idProduit:'PRD015', libelle:'Samsung Galaxy Tab S9', idboutique:'BTQ005', url:'https://placehold.co/200', description:'Tablette Android 11 pouces, 128 Go, AMOLED 120Hz.', idCategorieProduit:'CATP004', idLiaisonCouleur:'LC016', categorie:'Électronique', prix:890000, stock:7, couleur:'Rose' },
    { idProduit:'PRD016', libelle:'Casque Sony WH-1000XM5', idboutique:'BTQ005', url:'https://placehold.co/200', description:'Casque premium noise-cancelling leader du marché.', idCategorieProduit:'CATP004', idLiaisonCouleur:'LC017', categorie:'Électronique', prix:399000, stock:14, couleur:'Jaune' },
    // ── McDonald's (BTQ006) ──────────────────────────────────────────────────
    { idProduit:'PRD017', libelle:'Big Mac', idboutique:'BTQ006', url:'https://placehold.co/200', description:'Double steack haché, sauce Big Mac, salade, fromage.', idCategorieProduit:'CATP008', idLiaisonCouleur:'LC018', categorie:'Restauration', prix:12900, stock:200, couleur:'Noir' },
    { idProduit:'PRD018', libelle:'McFlurry Oreo', idboutique:'BTQ006', url:'https://placehold.co/200', description:"Glace vanille avec brisures d'Oreo.", idCategorieProduit:'CATP008', idLiaisonCouleur:'LC019', categorie:'Restauration', prix:5900, stock:300, couleur:'Noir' },
    { idProduit:'PRD019', libelle:'Happy Meal', idboutique:'BTQ006', url:'https://placehold.co/200', description:'Menu enfant avec jouet surprise.', idCategorieProduit:'CATP008', idLiaisonCouleur:'LC020', categorie:'Restauration', prix:9500, stock:150, couleur:'Noir' },
    // ── Starbucks (BTQ007) ───────────────────────────────────────────────────
    { idProduit:'PRD020', libelle:'Caramel Frappuccino', idboutique:'BTQ007', url:'https://placehold.co/200', description:'Café glacé mixé avec sauce caramel et chantilly.', idCategorieProduit:'CATP008', idLiaisonCouleur:'LC021', categorie:'Restauration', prix:7500, stock:500, couleur:'Noir' },
    { idProduit:'PRD021', libelle:'Matcha Latte', idboutique:'BTQ007', url:'https://placehold.co/200', description:'Thé matcha japonais avec lait vapeur onctueux.', idCategorieProduit:'CATP008', idLiaisonCouleur:'LC022', categorie:'Restauration', prix:6800, stock:500, couleur:'Noir' },
    { idProduit:'PRD022', libelle:'Cheesecake New-York', idboutique:'BTQ007', url:'https://placehold.co/200', description:'Cheesecake crémeux sur base de spéculoos.', idCategorieProduit:'CATP008', idLiaisonCouleur:'LC023', categorie:'Restauration', prix:5500, stock:100, couleur:'Noir' },
    // ── Bijou Brigitte (BTQ008) ──────────────────────────────────────────────
    { idProduit:'PRD023', libelle:'Collier Doré', idboutique:'BTQ008', url:'https://placehold.co/200', description:'Collier chaîne fine dorée, style minimaliste.', idCategorieProduit:'CATP009', idLiaisonCouleur:'LC024', categorie:'Bijoux', prix:29900, stock:60, couleur:'Noir' },
  ];
  const produits = await Produit.insertMany(produitsData);
  const pMap = {};
  produits.forEach(p => { pMap[p.idProduit] = p; });

  // ── 13. Promotions ────────────────────────────────────────────────────────
  console.log('🏷️   Promotions…');
  await Promotion.insertMany([
    {
      titre: 'Soldes Été Zara',
      description: 'Jusqu\'à -30% sur la collection estivale.',
      idBoutiques: ['BTQ001'],
      idProduits: ['PRD004'],
      typeReduction: 'pourcentage',
      valeur: 20,
      dateDebut: d(2026, 1, 1),
      dateFin:   d(2026, 3, 31),
      actif: true,
    },
    {
      titre: 'Offre Rentrée FNAC',
      description: 'Remise de 10% sur les tablettes et casques.',
      idBoutiques: ['BTQ005'],
      idProduits: ['PRD015', 'PRD016'],
      typeReduction: 'pourcentage',
      valeur: 10,
      dateDebut: d(2026, 2, 1),
      dateFin:   d(2026, 4, 30),
      actif: true,
    },
    {
      titre: 'Happy Hour McDonald\'s',
      description: 'Boisson offerte pour tout menu acheté de 15h à 17h.',
      idBoutiques: ['BTQ006'],
      idProduits: [],
      typeReduction: 'montant',
      valeur: 3500,
      dateDebut: d(2026, 2, 1),
      dateFin:   d(2026, 6, 30),
      actif: true,
    },
    {
      titre: 'Saint-Valentin Sephora',
      description: 'Coffret cadeau avec -15% sur les parfums.',
      idBoutiques: ['BTQ004'],
      idProduits: ['PRD012'],
      typeReduction: 'pourcentage',
      valeur: 15,
      dateDebut: d(2026, 2, 10),
      dateFin:   d(2026, 2, 28),
      actif: true,
    },
    {
      titre: 'Ventes Flash Nike',
      description: 'Semaine du sport : -25% sur les chaussures.',
      idBoutiques: ['BTQ003'],
      idProduits: ['PRD008'],
      typeReduction: 'pourcentage',
      valeur: 25,
      dateDebut: d(2026, 4, 1),
      dateFin:   d(2026, 4, 7),
      actif: false,
    },
  ]);

  // ── 14. Événements ────────────────────────────────────────────────────────
  console.log('📅  Événements…');
  const evenements = await Evenement.insertMany([
    { idevenement:'EVT001', libelle:'Fashion Week du Centre', dateDebut: d(2026,3,1), dateFin: d(2026,3,7),  cible:'Toutes boutiques Mode', idStatus:'STA008' },
    { idevenement:'EVT002', libelle:'Journée Tech & Gadgets', dateDebut: d(2026,3,15), dateFin: d(2026,3,15), cible:'Boutiques Électronique', idStatus:'STA008' },
    { idevenement:'EVT003', libelle:'Fête des Mères',        dateDebut: d(2026,5,31), dateFin: d(2026,6,1),  cible:'Beauté, Bijoux, Mode', idStatus:'STA009' },
    { idevenement:'EVT004', libelle:'Semaine du Sport',      dateDebut: d(2026,4,1),  dateFin: d(2026,4,7),  cible:'Nike, Sport', idStatus:'STA008' },
  ]);

  // ── 15. Participations boutiques aux événements ───────────────────────────
  await Participation.insertMany([
    { idparticipation:'PAR001', idevenement:'EVT001', idboutique:'BTQ001' },
    { idparticipation:'PAR002', idevenement:'EVT001', idboutique:'BTQ008' },
    { idparticipation:'PAR003', idevenement:'EVT002', idboutique:'BTQ002' },
    { idparticipation:'PAR004', idevenement:'EVT002', idboutique:'BTQ005' },
    { idparticipation:'PAR005', idevenement:'EVT003', idboutique:'BTQ004' },
    { idparticipation:'PAR006', idevenement:'EVT003', idboutique:'BTQ008' },
    { idparticipation:'PAR007', idevenement:'EVT004', idboutique:'BTQ003' },
  ]);

  // ── 16. Commandes ─────────────────────────────────────────────────────────
  console.log('🛒  Commandes…');
  await Commande.insertMany([
    {
      idcommande: 'CMD001',
      numero_commande: 'CC-2026-001',
      idboutique: 'BTQ001',
      produits: [
        { idproduit: 'PRD001', quantite: 2 },
        { idproduit: 'PRD004', quantite: 1 },
      ],
      idAcheteur: 'ACH001',
      idstatus: 'STA004',
      adresseLivraison: '12 rue de la Paix, 75001 Paris',
    },
    {
      idcommande: 'CMD002',
      numero_commande: 'CC-2026-002',
      idboutique: 'BTQ002',
      produits: [
        { idproduit: 'PRD007', quantite: 1 },
      ],
      idAcheteur: 'ACH002',
      idstatus: 'STA002',
      adresseLivraison: '5 avenue Victor Hugo, 69002 Lyon',
    },
    {
      idcommande: 'CMD003',
      numero_commande: 'CC-2026-003',
      idboutique: 'BTQ003',
      produits: [
        { idproduit: 'PRD008', quantite: 1 },
        { idproduit: 'PRD009', quantite: 2 },
      ],
      idAcheteur: 'ACH001',
      idstatus: 'STA003',
      adresseLivraison: '12 rue de la Paix, 75001 Paris',
    },
    {
      idcommande: 'CMD004',
      numero_commande: 'CC-2026-004',
      idboutique: 'BTQ004',
      produits: [
        { idproduit: 'PRD011', quantite: 1 },
        { idproduit: 'PRD013', quantite: 1 },
      ],
      idAcheteur: 'ACH003',
      idstatus: 'STA001',
      adresseLivraison: '8 allée des Roses, 33000 Bordeaux',
    },
    {
      idcommande: 'CMD005',
      numero_commande: 'CC-2026-005',
      idboutique: 'BTQ005',
      produits: [
        { idproduit: 'PRD014', quantite: 1 },
      ],
      idAcheteur: 'ACH004',
      idstatus: 'STA005',
      adresseLivraison: '3 impasse du Moulin, 31000 Toulouse',
    },
    {
      idcommande: 'CMD006',
      numero_commande: 'CC-2026-006',
      idboutique: 'BTQ006',
      produits: [
        { idproduit: 'PRD017', quantite: 2 },
        { idproduit: 'PRD018', quantite: 1 },
      ],
      idAcheteur: 'ACH002',
      idstatus: 'STA004',
      adresseLivraison: '5 avenue Victor Hugo, 69002 Lyon',
    },
  ]);

  // ── 17. Ventes ────────────────────────────────────────────────────────────
  console.log('💰  Ventes…');
  await Vente.insertMany([
    { idVente:'VNT001', idBoutique:'BTQ001', idProduit:'PRD001', quantite:2,  prix:59900,   idAcheteur:'ACH001' },
    { idVente:'VNT002', idBoutique:'BTQ001', idProduit:'PRD004', quantite:1,  prix:69900,   idAcheteur:'ACH001' },
    { idVente:'VNT003', idBoutique:'BTQ002', idProduit:'PRD007', quantite:1,  prix:329000,  idAcheteur:'ACH002' },
    { idVente:'VNT004', idBoutique:'BTQ003', idProduit:'PRD008', quantite:1,  prix:179000,  idAcheteur:'ACH001' },
    { idVente:'VNT005', idBoutique:'BTQ003', idProduit:'PRD009', quantite:2,  prix:49900,   idAcheteur:'ACH001' },
    { idVente:'VNT006', idBoutique:'BTQ006', idProduit:'PRD017', quantite:2,  prix:12900,   idAcheteur:'ACH002' },
    { idVente:'VNT007', idBoutique:'BTQ006', idProduit:'PRD018', quantite:1,  prix:5900,    idAcheteur:'ACH002' },
    { idVente:'VNT008', idBoutique:'BTQ004', idProduit:'PRD012', quantite:1,  prix:249000,  idAcheteur:'ACH003' },
    { idVente:'VNT009', idBoutique:'BTQ005', idProduit:'PRD015', quantite:1,  prix:890000,  idAcheteur:'ACH004' },
    { idVente:'VNT010', idBoutique:'BTQ007', idProduit:'PRD020', quantite:3,  prix:7500,    idAcheteur:'ACH005' },
  ]);

  // ── 18. Avis clients ──────────────────────────────────────────────────────
  console.log('⭐  Avis clients…');
  // On utilise _id MongoDB du produit comme idProduit (comme le fait le frontend)
  const p = pMap;
  await AvisClient.insertMany([
    { idAvis:'AVI001', idboutique:'BTQ001', idProduit: p['PRD001']._id.toString(), idAcheteur:'ACH001', note:5, commentaire:'Magnifique robe, tissu léger et agréable. Je recommande !',       avis:'Magnifique',  notation:5, date: d(2026,1,20) },
    { idAvis:'AVI002', idboutique:'BTQ001', idProduit: p['PRD002']._id.toString(), idAcheteur:'ACH003', note:4, commentaire:'Jean de bonne qualité, coupe parfaite. Livraison rapide.',        avis:'Bon produit', notation:4, date: d(2026,1,25) },
    { idAvis:'AVI003', idboutique:'BTQ002', idProduit: p['PRD005']._id.toString(), idAcheteur:'ACH002', note:5, commentaire:'iPhone exceptionnel, photo incroyable, très fluide.',             avis:'Top',         notation:5, date: d(2026,2,3)  },
    { idAvis:'AVI004', idboutique:'BTQ003', idProduit: p['PRD008']._id.toString(), idAcheteur:'ACH001', note:5, commentaire:'Les meilleures baskets que j\'ai portées. Super confortables.', avis:'Excellent',   notation:5, date: d(2026,2,10) },
    { idAvis:'AVI005', idboutique:'BTQ004', idProduit: p['PRD011']._id.toString(), idAcheteur:'ACH003', note:4, commentaire:'Sérum efficace, teint plus lumineux en 2 semaines.',             avis:'Efficace',    notation:4, date: d(2026,2,15) },
    { idAvis:'AVI006', idboutique:'BTQ005', idProduit: p['PRD016']._id.toString(), idAcheteur:'ACH004', note:5, commentaire:'Casque parfait, noise-cancelling bluffant. Son cristallin.',    avis:'Parfait',     notation:5, date: d(2026,2,18) },
    { idAvis:'AVI007', idboutique:'BTQ006', idProduit: p['PRD017']._id.toString(), idAcheteur:'ACH002', note:4, commentaire:'Classique McDonald\'s, toujours aussi bon !',                   avis:'Bon',         notation:4, date: d(2026,2,20) },
    { idAvis:'AVI008', idboutique:'BTQ007', idProduit: p['PRD020']._id.toString(), idAcheteur:'ACH005', note:5, commentaire:'Caramel Frappuccino parfait. Je reviens chaque jour !',          avis:'Parfait',     notation:5, date: d(2026,2,21) },
    { idAvis:'AVI009', idboutique:'BTQ001', idProduit: p['PRD004']._id.toString(), idAcheteur:'ACH002', note:3, commentaire:'Pull sympa mais la taille est grande, prendre -1.',             avis:'Correct',     notation:3, date: d(2026,2,22) },
    { idAvis:'AVI010', idboutique:'BTQ002', idProduit: p['PRD007']._id.toString(), idAcheteur:'ACH004', note:5, commentaire:'AirPods Pro au top. La transparence active est bluffante.',     avis:'Excellent',   notation:5, date: d(2026,2,23) },
  ]);

  // ── 19. Loyers ────────────────────────────────────────────────────────────
  console.log('🏢  Loyers…');
  const mois = today.getMonth() + 1;
  const annee = today.getFullYear();
  await Loyer.insertMany([
    { idLoyer:'LOY001', idboutique:'BTQ001', mois, annee, montant:450000,  datePaiement: new Date(), idStatus:'STA006' },
    { idLoyer:'LOY002', idboutique:'BTQ002', mois, annee, montant:680000,  datePaiement: new Date(), idStatus:'STA006' },
    { idLoyer:'LOY003', idboutique:'BTQ003', mois, annee, montant:520000,  datePaiement: new Date(), idStatus:'STA006' },
    { idLoyer:'LOY004', idboutique:'BTQ004', mois, annee, montant:390000,  datePaiement: new Date(), idStatus:'STA007' },
    { idLoyer:'LOY005', idboutique:'BTQ005', mois, annee, montant:430000,  datePaiement: new Date(), idStatus:'STA006' },
    { idLoyer:'LOY006', idboutique:'BTQ006', mois, annee, montant:250000,  datePaiement: new Date(), idStatus:'STA006' },
    { idLoyer:'LOY007', idboutique:'BTQ007', mois, annee, montant:180000,  datePaiement: new Date(), idStatus:'STA007' },
    { idLoyer:'LOY008', idboutique:'BTQ008', mois, annee, montant:310000,  datePaiement: new Date(), idStatus:'STA006' },
    // Mois précédents pour historique
    { idLoyer:'LOY009', idboutique:'BTQ001', mois: mois > 1 ? mois-1 : 12, annee: mois > 1 ? annee : annee-1, montant:450000, datePaiement: d(annee, mois > 1 ? mois-1 : 12, 5), idStatus:'STA006' },
    { idLoyer:'LOY010', idboutique:'BTQ002', mois: mois > 1 ? mois-1 : 12, annee: mois > 1 ? annee : annee-1, montant:680000, datePaiement: d(annee, mois > 1 ? mois-1 : 12, 5), idStatus:'STA006' },
  ]);

  // ── Places de parking ────────────────────────────────────────────────────
  console.log('🅿️   Places de parking (détail)…');
  const parkingSpots = [];
  // Secteur A — 16 places normales
  const dispoA = [true,true,true,false,true,true,false,true,true,false,true,true,true,false,true,true];
  for (let i = 1; i <= 16; i++) {
    parkingSpots.push({ numero:`A${i}`, secteur:'A', type:'normal', disponible: dispoA[i-1] });
  }
  // Secteur B — 12 places normales
  const dispoB = [true,false,true,true,false,true,true,true,false,true,false,true];
  for (let i = 1; i <= 12; i++) {
    parkingSpots.push({ numero:`B${i}`, secteur:'B', type:'normal', disponible: dispoB[i-1] });
  }
  // Secteur VIP — 4 places
  [true,false,true,false].forEach((d, i) =>
    parkingSpots.push({ numero:`VIP${i+1}`, secteur:'VIP', type:'VIP', disponible: d }));
  // Secteur PMR — 4 places handicap
  [true,true,false,true].forEach((d, i) =>
    parkingSpots.push({ numero:`PMR${i+1}`, secteur:'PMR', type:'PMR', disponible: d }));
  await PlaceParking.insertMany(parkingSpots);

  // ── Résumé ─────────────────────────────────────────────────────────────────
  console.log('\n✅  Seed terminé avec succès !\n');
  console.log('═══════════════════════════════════════════════════════');
  console.log('  COMPTES DE TEST');
  console.log('═══════════════════════════════════════════════════════');
  console.log('  Admin global   : matricule=ADM001       mdp=admin123');
  console.log('  Admin boutique : matricule=BTQ001…BTQ008 mdp=boutique123');
  console.log('───────────────────────────────────────────────────────');
  console.log('  Client 1 : alice@example.com   / client123');
  console.log('  Client 2 : bob@example.com     / client123');
  console.log('  Client 3 : charlie@example.com / client123');
  console.log('  Client 4 : diana@example.com   / motdepasse456');
  console.log('  Client 5 : ethan@example.com   / motdepasse456');
  console.log('═══════════════════════════════════════════════════════');
  console.log('\n  Boutiques    : 8 (dont 2 FoodCourt)');
  console.log('  Produits     : 23 (répartis sur toutes les boutiques)');
  console.log('  Promotions   : 5 (4 actives, 1 à venir)');
  console.log('  Commandes    : 6');
  console.log('  Avis clients : 10');
  console.log('  Loyers       : 10 (mois courant + historique)');
  console.log('  Parking      : 36 places (A×16, B×12, VIP×4, PMR×4)\n');

  await mongoose.disconnect();
  process.exit(0);
}

main().catch(err => {
  console.error('❌  Erreur seed :', err.message);
  process.exit(1);
});
