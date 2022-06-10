-- Verify goforwalk:init on pg

BEGIN;

SELECT "id", "title", "description", "distance", "duration", "city", "coordinate", "pictures" FROM "treks" WHERE false;

SELECT "id", "label" FROM "difficulty" WHERE false;

SELECT "id", "firstname", "name", "email", "password" FROM "users" WHERE false;

ROLLBACK;
