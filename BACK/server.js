// IMPORTS
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

// INITIALISATION DE L'APPLICATION EXPRESS
const app = express();
app.use(express.json()); // Pour parser les requêtes JSON
app.use(cors()); // Middleware CORS pour les requêtes cross-origin
const port = process.env.PORT || 3000; // Définition du port

// CONNEXION À LA BASE DE DONNÉES
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '7m38',
  database: 'ProviHub'
});

// GESTION DES ERREURS DE CONNEXION À LA BASE DE DONNÉES
db.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à la base de données :', err);
    process.exit(1); // Arrêter l'exécution du programme en cas d'erreur de connexion
  }
  console.log('Connecté à la base de données MySQL');
});

// ROUTE POUR L'ENREGISTREMENT D'UN UTILISATEUR
app.post('/register', async (req, res) => {
  try {
    // Vérification des champs requis
    const { identifiant, password } = req.body;
    if (!identifiant || !password) {
      return res.status(400).json({ error: 'Les champs identifiant et password sont requis.' });
    }

    // Vérification de l'existence de l'utilisateur dans la base de données
    const userExistsQuery = 'SELECT * FROM User WHERE identifiant = ?';
    db.query(userExistsQuery, [identifiant], async (err, results) => {
      if (err) {
        console.error('Erreur lors de la vérification de l\'existence de l\'utilisateur :', err);
        return res.status(500).json({ error: 'Erreur interne du serveur.' });
      }

      if (results.length > 0) {
        return res.status(400).json({ error: 'Cet utilisateur existe déjà.' });
      }

      // Hachage du mot de passe avant l'insertion dans la base de données
      const hashedPassword = await bcrypt.hash(password, 10);
      const userUUID = uuidv4();

      // Insertion de l'utilisateur dans la base de données
      const insertUserQuery = 'INSERT INTO User (identifiant, password, uuid) VALUES (?, ?, ?)';
      db.query(insertUserQuery, [identifiant, hashedPassword, userUUID], (insertErr) => {
        if (insertErr) {
          console.error('Erreur lors de l\'enregistrement de l\'utilisateur :', insertErr);
          return res.status(500).json({ error: 'Erreur interne du serveur.' });
        }

        res.status(201).json({ message: 'Utilisateur enregistré avec succès.' });
        console.log("Création d'un utilisateur.");
      });
    });
  } catch (error) {
    console.error('Erreur lors de l\'enregistrement de l\'utilisateur :', error);
    res.status(500).json({ error: 'Erreur interne du serveur.' });
  }
});

// ROUTE POUR LA CONNEXION D'UN UTILISATEUR
app.post('/login', async (req, res) => {
  try {
    const { identifiant, password } = req.body;

    // Recherche de l'utilisateur dans la base de données
    const query = 'SELECT * FROM User WHERE identifiant = ?';
    db.query(query, [identifiant], async (err, results) => {
      if (err) {
        console.error('Erreur lors de la requête à la base de données :', err);
        return res.status(500).json({ message: 'Erreur du serveur' });
      }

      if (results.length > 0) {
        const user = results[0];

        // Comparaison du mot de passe haché avec le mot de passe fourni
        const match = await bcrypt.compare(password, user.password);

        if (match) {
          const userUUID = user.uuid;

          // Configuration du cookie pour stocker l'UUID de l'utilisateur
          res.cookie('userUUID', userUUID, { httpOnly: true });
          res.status(200).json({ message: 'Connexion réussie', userUUID });
          console.log("Connexion à un compte effectuée");
        } else {
          res.status(401).json({ message: 'Identifiant ou mot de passe incorrect' });
        }
      } else {
        res.status(401).json({ message: 'Identifiant ou mot de passe incorrect' });
      }
    });
  } catch (error) {
    console.error('Erreur lors de la connexion de l\'utilisateur :', error);
    res.status(500).json({ error: 'Erreur interne du serveur.' });
  }
});

// addProjet

app.post('/addProjet', async (req, res) => {
  try {
    // Vérification des champs requis
    const { title, lien, description } = req.body;
    if (!title || !lien || !description) {
      return res.status(400).json({ error: 'Les champs title, lien et description sont requis.' });
    }

    // Insertion du projet dans la base de données
    const insertProjetQuery = 'INSERT INTO Projet (title, lien, description) VALUES (?, ?, ?)';
    db.query(insertProjetQuery, [title, lien, description], (insertErr) => {
      if (insertErr) {
        console.error('Erreur lors de l\'enregistrement du projet :', insertErr);
        return res.status(500).json({ error: 'Erreur interne du serveur.' });
      }

      res.status(201).json({ message: 'Projet ajouté avec succès.' });
      console.log("Ajout d'un projet.");
    });
  } catch (error) {
    console.error('Erreur lors de l\'ajout du projet :', error);
    res.status(500).json({ error: 'Erreur interne du serveur.' });
  }
});

// LANCEMENT DU SERVEUR
app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur le port ${port}`);
});
