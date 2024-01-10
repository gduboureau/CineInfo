
# Projet Programmation Web 

Bienvenue dans le projet de programmation web dédié aux films et séries. Cette application offre un accès facile aux informations telles que les bandes-annonces, les acteurs, et permet aux utilisateurs d'ajouter des films à leurs favoris, de donner des notes...

## Technologies utilisées

### Frontend :
   - React (v18.2.0)

### Backend :
   - Node.js avec Express (Express v4.18.2, Node v20.8.0)

### Base de données :
   - PostgreSQL (v16)

### Outils de Containerisation :
   - Docker (v3)

### Cache des Données :
   - Redis (v4.6.12)

## API utilisée
Pour récupérer l'ensemble des informations concernant les films et les séries, nous utilisons l'API TheMovieDB API.

## Lancement du projet

### Version de développement

#### 1. Installer les dépendances:
- Backend :
```bash
   cb backend
   npm install nodemon
```
- Frontend :
```bash
   cb frontend
   npm install react-scripts
```

#### 2. Lancer le projet:
À partir de la racine du projet, exécutez: 
```bash
   docker-compose -f docker-compose.dev.yml --build 
   docker-compose -f docker-compose.dev.yml up
```
Par la suite, sauf modifications des fichiers Docker, utilisez seulement la deuxième commande.

### Version de production

À partir de la racine du projet, exécutez: 
```bash
   docker-compose -f docker-compose.prod.yml --build 
   docker-compose -f docker-compose.prod.yml up
```
Par la suite, sauf modifications des fichiers Docker, utilisez seulement la deuxième commande.

## Documention Swagger
Une documentation des différentes routes utilisées entre le backend et le frontend est disponible via l'adresse http://localhost:8080/api-docs/ après avoir lancer le projet.

## Accès à l'Application

Une fois le projet lancé, vous pouvez accéder à l'application via votre navigateur à l'adresse http://localhost:3000.

N'oubliez pas de consulter la documentation pour les API et les fonctionnalités disponibles pour tirer le meilleur parti de cette application. Bonne exploration !