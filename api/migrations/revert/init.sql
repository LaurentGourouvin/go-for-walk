-- Revert goforwalk:init from pg

BEGIN;

DROP TABLE "user", "difficulty", "trek";

COMMIT;
