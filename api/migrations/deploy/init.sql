-- Deploy goforwalk:init to pg

BEGIN;

DROP TABLE IF EXISTS "users", "trek", "difficulty";


CREATE TABLE "users" (
    "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "firstname" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL UNIQUE,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE "difficulty" (
    "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "label" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE "trek" (
    "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT DEFAULT 'aucune description pour cette randonnée',
    "distance" INT,
    "duration" INT NOT NULL,
    "city" TEXT NOT NULL,
    "coordinate" INT[],
    "pictures" TEXT[],
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ ,
    "user_id" INT NOT NULL REFERENCES "users"("id"),
    "difficulty_id" INT NOT NULL REFERENCES "difficulty"("id")
);

COMMIT;