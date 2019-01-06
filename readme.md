# Equivalent de Doodle pour planification des réunions

## Réalisé par :

 - Faredj HAMMACHE
 - Hocine ALOUANE
 - Farid HADJADJ
 - Abdelmalek HOUFEL


## Installation de l'application

 **1. MongoDB**
 
 La version MongoDB utilisée est la 4.0.5, téléchargeable depuis le lien ci dessous : 
 https://www.mongodb.com/download-center/community
 
 Ci-dessous le manuel de configuration de MongoDB
 https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/
 
 **2. NodeJs / Npm**
 
 La version de NodeJs utilisée est 8.11.3 
 La version Npm utilisée est 6.3.0
 
 **3. Installation des dépendances**
 - Dépendances de l'API Doodle :
	 - Depuis le terminal, se positionner dans la racine du projet et lancer la commande suivante : `npm install`
 - Dépendances de l'application Angular 6 :
 Pour installer les dépendances :
	 - Depuis un terminal, se positionner sur le chemin `/angular6`
	 - Puis exécuter la commande suivante : `npm install`
	 
## Lancement de l'application
 - Pour lancer l'API il faut se positionner dans la racine du projet depuis le terminal et exécuter la commande `npm start`
 - Pour lancer l'application Angular (front), il faut se positionner dans le dossier `/angular6`  et exécuter la commande `npm install`

Une fois lancés l'API est en écoute sur le port `:3000` et l'application Angular sur le port `:4200`

## Fonctionnalitées de l'application

 - Inscription d'un nouvel utilisateur.
 - Connexion avec un email et mot de passe.
 - Utilisation des JsonWebToken (JWT) pour l'authentification et sécurisation des routes.
 - Créstion d'une nouvelle réunion.
 - Possibilité de réserver dans la réunion.
 - Possibilité d'inviter à la réunion d'autre participants en envoyant la référence aux autre utilisateurs.
 
## Lancement des test

Avant de lancer les test il faut installer `mocha` comme module global à l'aide de la commande suivante `npm install --global mocha`

Puis depuis un terminal et en se positionant dans la racine du projet exécuter la commande suivante : `mocha`