-- Deploy goforwalk:seeding to pg

BEGIN;



INSERT INTO users(firstname, name, email, password) VALUES ('leo', 'wolff', 'leo.w@hotmail.fr', 'fhzeouvbuzvbzubv');

INSERT INTO difficulty(label) VALUES ('facile');
INSERT INTO difficulty(label) VALUES ('moyen');
INSERT INTO difficulty(label) VALUES ('difficile');

INSERT INTO treks (title, description, duration, city, user_id, difficulty_id) VALUES ('Honey Moon (Honigmond)', 'Morbi non lectus. Aliqu', 4, 'Paris', 1, 2);



COMMIT;
