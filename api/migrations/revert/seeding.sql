-- Revert goforwalk:seeding from pg

BEGIN;


TRUNCATE TABLE users, difficulty, trek;

COMMIT;
