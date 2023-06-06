set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

CREATE TABLE "public"."food" (
	"foodId"       serial     NOT NULL,
	"name"        TEXT        NOT NULL,
	"calories"    real        NOT NULL,
	"dayOfWeek"   integer     NOT NULL,
	"week"        integer     NOT NULL,
	"apiDetails"  TEXT        NOT NULL,
	"createdAt"   timestamptz NOT NULL,
	"updatedAt"   timestamptz NOT NULL,
	CONSTRAINT "food_pk" PRIMARY KEY ("foodId")
) WITH (
  OIDS=FALSE
);
