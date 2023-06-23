set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

CREATE TABLE "public"."food" (
	"foodId"       serial     NOT NULL,
	"mealDescription"         TEXT        NOT NULL,
  "dayId"                   TEXT        NOT NULL,
	"createdAt"   timestamptz NOT NULL DEFAULT NOW(),
	"updatedAt"   timestamptz NOT NULL DEFAULT NOW(),
	CONSTRAINT "food_pk" PRIMARY KEY ("foodId")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "public"."users" (
  "userId" serial NOT NULL,
  "username" TEXT NOT NULL UNIQUE,
  "hashedPassword" TEXT NOT NULL,
  CONSTRAINT "users_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);

-- CREATE TABLE "public"."days" (
--   "dayId" serial NOT NULL,
--   "day" TEXT NOT NULL ,
--   CONSTRAINT "days_pk" PRIMARY KEY ("dayId")
-- ) WITH (
--   OIDS=FALSE
-- );

-- ALTER TABLE ONLY "public"."food"
-- ADD CONSTRAINT "fk_food" FOREIGN KEY ("dayId") REFERENCES days("dayId")
