-- Revert goforwalk:status-user from pg

BEGIN;

ALTER TABLE users 
    DROP COLUMN status;

COMMIT;
