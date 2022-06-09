-- Deploy goforwalk:init to pg

BEGIN;

DROP TABLE IF EXISTS "user", "trek", "difficulty";

CREATE DOMAIN MAILCHECK AS TEXT
  CHECK(
    VALUE ~ '^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$'
  )
;


CREATE TABLE "user" (
    "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "firstname" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" MAILCHECK NOT NULL UNIQUE,
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
    "distance" INT NOT NULL,
    "duration" TIMESTAMPTZ NOT NULL,
    "city" TEXT NOT NULL,
    "coordinate" INT[],
    "pictures" TEXT[],
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ ,
    "user_id" INT NOT NULL REFERENCES "user"("id"),
    "difficulty_id" INT NOT NULL REFERENCES "difficulty"("id")
);

COMMIT;