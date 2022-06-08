Table User
|Champ| Type| Spécificité| Description |  
|--|--|--|--|
| Code utilisateur| INT| id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY| ID de la personne |
| Prénom | Text| NOT NULL | Le prénom de la personne |
| Nom | Text| NOT NULL | Le nom de la personne |
| Email | Email | NOT NULL UNIQUE| L'email de la personne |
| Mot de passe| Text | NOT NULL | Le mdp de la personne |
| Crée le | TIMESTAMPTZ| NOT NULL, DEFAULT CURRENT_TIMESTAMP| Date création |
| Modifier le | TIMESTAMPTZ| NOT NULL, DEFAULT CURRENT_TIMESTAMP| Date modification |

Table Trek
| Champ | Type |Spécificité| Description |  
|--|--|--|--|
| Code trek | INT| id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY| ID de la randonnée |
| Titre | Text| NOT NULL | Titre de la rando |
| Description | Text | DEFAULT "aucune description pour cette randonnée" | Description de la rando |
| Distance | INT | NOT NULL | Distance de la rando en KM |
| Durée | TIMESTAMPTZ | NOT NULL | Durée de la randonnée |
| Ville | Text | NOT NULL | Nom de la ville |
| Coordonnées | INT ARRAY| DEFAULT [] | Tableaux des coordonées |
| Images| Text ARRAY | NULL | Image de la randonnée |
| Crée le | TIMESTAMPTZ| NOT NULL, DEFAULT CURRENT_TIMESTAMP| Date création |
| Modifier le | TIMESTAMPTZ| NOT NULL, DEFAULT CURRENT_TIMESTAMP| Date modification |


Table Difficulté
| Champ| Type |Spécificité| Description |  
|--|--|--|--|
| Code difficulté | INT| id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY| ID de la difficulté |
| Label | Text | NOT NULL | Difficulté possible : facile, intermédiaire etc... |
| Crée le | TIMESTAMPTZ| NOT NULL, DEFAULT CURRENT_TIMESTAMP| Date création |
| Modifier le | TIMESTAMPTZ| NOT NULL, DEFAULT CURRENT_TIMESTAMP| Date modification |
