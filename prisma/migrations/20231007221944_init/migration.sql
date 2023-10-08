-- CreateTable
CREATE TABLE "public"."events" (
    "id" VARCHAR(128) NOT NULL,
    "timestamp" TIMESTAMPTZ(6) NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL,
    "ended_at" TIMESTAMPTZ(6) NOT NULL,
    "started_at" TIMESTAMPTZ(6) NOT NULL,
    "last_modified_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "events_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "events_id_key" ON "public"."events"("id");
