Table User
|Champ| Type| Spécificité| Description |  
|--|--|--|--|
| Code personne| INT| id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY| ID de la personne |
| Nom | Text| NOT NULL | Le nom de la personne |
| Prénom | Text| NOT NULL | Le prénom de la personne |
| Email | Email | NOT NULL UNIQUE| L'email de la personne |
| Mot de passe| Text | NOT NULL | Le mdp de la personne |
| Expérience | INT | DEFAULT 0 | L'expérience obtenue en participant au site |
| Grade| Text| DEFAULT 'escargot'| Le grade de l'utilisateur en fonction de son expérience |
| Crée le| TIMESTAMP| NOT NULL, DEFAULT CURRENT_TIMESTAMP| Date création |
| Modifier le| TIMESTAMP| NOT NULL, DEFAULT CURRENT_TIMESTAMP| Date modification |

Table Trek
| Champ | Type |Spécificité| Description |  
|--|--|--|--|
| Titre | Text| NOT NULL | Titre de la rando |
| Description | Text | DEFAULT "aucune description pour cette randonnée" | Description de la rando |
| Distance | INT | NOT NULL | Distance de la rando en KM |
| Coordonnées| INT ARRAY| DEFAULT [] | Tableaux des coordonées |
| Durée| TIMESTAMP | NOT NULL | Durée de la randonnée |
| Crée le| TIMESTAMP| NOT NULL, DEFAULT CURRENT_TIMESTAMP| Date création |
| Modifier le| TIMESTAMP| NOT NULL, DEFAULT CURRENT_TIMESTAMP| Date modification |

Table Commentaire
| Champ | Type |Spécificité| Description |  
|--|--|--|--|
| Titre | Text | NOT NULL (30) | Titre du commentaire |
| Description | Text | DEFAULT "" | Description facultative |
| Note | INT | DEFAULT 0 | Note donnée par le user |
| Crée le| TIMESTAMP| NOT NULL, DEFAULT CURRENT_TIMESTAMP| Date création |
| Modifier le| TIMESTAMP| NOT NULL, DEFAULT CURRENT_TIMESTAMP| Date modification |

Table Difficulté
| Champ| Type |Spécificité| Description |  
|--|--|--|--|
| Label| Text | NOT NULL | Difficulté possible : facile, intermédiaire etc... |
| Crée le| TIMESTAMP| NOT NULL, DEFAULT CURRENT_TIMESTAMP| Date création |
| Modifier le| TIMESTAMP| NOT NULL, DEFAULT CURRENT_TIMESTAMP| Date modification |
