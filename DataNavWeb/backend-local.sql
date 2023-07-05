drop database db_masterproject;
create database db_masterproject;
use db_masterproject;

CREATE TABLE Entreprise (
  id int NOT NULL AUTO_INCREMENT,
  nom varchar(255) DEFAULT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE Carte (
  id int NOT NULL AUTO_INCREMENT,
  carte_data varchar(255) DEFAULT NULL,
  entreprise_id int DEFAULT NULL,
  PRIMARY KEY (id),
  KEY entreprise_id (entreprise_id),
  CONSTRAINT Carte_ibfk_1 FOREIGN KEY (entreprise_id) REFERENCES Entreprise (id)
);

CREATE TABLE Marqueur (
  id int NOT NULL AUTO_INCREMENT,
  description varchar(255) DEFAULT NULL,
  carte_id int DEFAULT NULL,
  PRIMARY KEY (id),
  KEY carte_id (carte_id),
  CONSTRAINT Marqueur_ibfk_1 FOREIGN KEY (carte_id) REFERENCES Carte (id)
);

CREATE TABLE Utilisateur (
  id int NOT NULL AUTO_INCREMENT,
  nom varchar(255) DEFAULT NULL,
  email varchar(255) DEFAULT NULL,
  mot_de_passe varchar(255) DEFAULT NULL,
  entreprise_id int DEFAULT NULL,
  PRIMARY KEY (id),
  KEY entreprise_id (entreprise_id),
  CONSTRAINT Utilisateur_ibfk_1 FOREIGN KEY (entreprise_id) REFERENCES Entreprise (id)
);

CREATE TABLE Tache (
  id int NOT NULL AUTO_INCREMENT,
  description varchar(255) DEFAULT NULL,
  statut varchar(255) DEFAULT NULL,
  utilisateur_id int DEFAULT NULL,
  PRIMARY KEY (id),
  KEY utilisateur_id (utilisateur_id),
  CONSTRAINT Tache_ibfk_1 FOREIGN KEY (utilisateur_id) REFERENCES Utilisateur (id)
);

CREATE TABLE Token (
  id int NOT NULL AUTO_INCREMENT,
  code int DEFAULT NULL,
  numServeur varchar(10) DEFAULT NULL,
  serverRoute varchar(20) DEFAULT NULL,
  carte_id int DEFAULT NULL,
  PRIMARY KEY (id),
  KEY carte_id (carte_id),
  CONSTRAINT Token_ibfk_1 FOREIGN KEY (carte_id) REFERENCES Carte (id)
);

INSERT INTO entreprise (nom) VALUES ('Equinix');
INSERT INTO utilisateur (entreprise_id,nom,email,mot_de_passe) VALUES (1,'Admin','admin@datanav.com','$2b$10$Abhxuz5qJ5Bgu1cITcM0F.mHK0rouM30sgxIjWxDCM8Tugx9cTJFG'); -- azerty