-- Revert goforwalk:init from pg

BEGIN;



DROP TABLE "users", "difficulty", "trek";
DROP DOMAIN IF EXISTS MAILCHECK;

COMMIT;