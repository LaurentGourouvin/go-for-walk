-- Revert goforwalk:init from pg

BEGIN;



DROP TABLE "users", "difficulty", "treks";
DROP DOMAIN IF EXISTS MAILCHECK;

COMMIT;
