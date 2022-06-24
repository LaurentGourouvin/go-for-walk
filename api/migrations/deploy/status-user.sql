-- Deploy goforwalk:status-user to pg

BEGIN;

ALTER TABLE users 
    ADD status TEXT NOT NULL DEFAULT 'active';

COMMIT;
