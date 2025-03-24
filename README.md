## MovieLand

MovieLand est une application web de cinéma permettant aux utilisateurs de choisir un film, une place de siège, un jour et une séance, puis de réserver. Un espace d'inscription et de connexion est également disponible.

## Installation

### Prérequis

Avant de commencer, assure-toi d'avoir installé :

- **[Node.js](https://nodejs.org/)**
- **npm** (installé avec Node.js)
- **MySQL** (pour la base de données)

### Installation du projet

1. **Cloner le dépôt :**

   ```bash
   git clone https://github.com/ton-utilisateur/MovieLand.git
   cd MovieLand
   ```

2. **Installation des dépendances du front-end :**

   ```bash
   cd frontend
   npm install
   ```

3. **Installation des dépendances du back-end :**

   ```bash
   cd ../backend
   npm install
   ```

### 🛠 Configuration

1. **Créer un fichier `.env` dans le dossier `backend` et configurer les variables :**

   ```bash
   APP_PORT=8081
   JWT_SECRET=mysecret
   JWT_ACCESS_TOKEN_EXPIRATION=2d
   MYSQL_URL=mysql://root:MDP@127.0.0.1:3306/cinema
   ```

2. **Configurer la base de données :**
   ```bash
   npx sequelize-cli db:create
   npx sequelize-cli db:migrate
   ```

### ▶️ Lancer l'application

1. **Démarrer le serveur back-end :**

   ```bash
   cd backend
   npm start
   ```

2. **Démarrer le front-end :**
   ```bash
   cd ../frontend
   npm run dev
   ```

### Ajouter des films avec une séance et une date

Dans le dossier `backend/fixtures`, utilise le fichier `index.js` pour ajouter des films et leurs séances :

```bash
cd backend/fixtures
node index.js
```

L'application MovieLand est maintenant prête ! 🎥🍿
