-- Revert goforwalk:init from pg

BEGIN;



DROP TABLE "users", "difficulty", "treks", "comments";

COMMIT;
